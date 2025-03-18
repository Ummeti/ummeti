'use client';
import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { updatePostAction } from '@/app/actions/postActions';
import Toggle from '@/app/dashboard/ui/Toggle';
import { CautionIcon, RemoveIcon, UploadIcon } from '@/app/dashboard/ui/Icons';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/app/dashboard/context/NotificationContext';

export default function UpdatePostForm({ post = {} }) {
  const [newImages, setNewImages] = useState([]);

  const [existingImages, setExistingImages] = useState(
    post?.images?.map((img) => ({
      id: img,
      img: typeof img === 'string' ? img : '/placeholder.svg',
      toRemove: false,
    })) || []
  );

  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: post,
  };

  const [state, formAction, isPending] = useActionState(
    updatePostAction,
    initialState
  );

  const [isMain, setIsMain] = useState(post.isMain);
  const { showNotification } = useNotification();
  const router = useRouter();

  const handleFileChange = (e) => {
    const newImagesArray = Array.from(e.target.files || []).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setNewImages((prev) => [...prev, ...newImagesArray]);
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index].preview);
      return updated;
    });
  };

  const toggleExistingImageRemoval = (index) => {
    setExistingImages((prev) =>
      prev.map((img, i) =>
        i === index ? { ...img, toRemove: !img.toRemove } : img
      )
    );
  };

  useEffect(() => {
    if (state.message) {
      showNotification({
        message: state.message,
        type: state.success ? 'success' : 'error',
      });
    }
    if (state.success) {
      router.push('/dashboard');
    }
  }, [state.message, router]);

  return (
    <div className="py-8">
      <h2 className="text-center text-gray-900 text-3xl font-bold font-manrope">
        Update Post
      </h2>
      <form
        action={(formData) => {
          newImages.forEach((image) => formData.append('images', image.file));
          formData.set('isMain', isMain.toString());
          formData.set('id', post.id);
          const imagesToRemove = existingImages
            .filter((img) => img.toRemove)
            .map((img) => img.id);
          imagesToRemove.forEach((imageUrl) => {
            formData.append('imagesToRemove', imageUrl);
          });

          formAction(formData);
        }}
        className="mt-8 space-y-4 max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg"
        noValidate
      >
        {/* Post fields */}
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            defaultValue={state.formObject?.title ?? post.title}
          />
          {state.errors?.title && (
            <p className="text-red-500 text-sm">{state.errors.title}</p>
          )}
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Description"
            rows="8"
            className="w-full rounded-lg px-4 py-3 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            defaultValue={state.formObject?.description ?? post.description}
          />
          {state.errors?.description && (
            <p className="text-red-500 text-sm">{state.errors.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="isMain"
            className="block text-sm font-medium text-gray-700"
          >
            Show on Homepage
          </label>
          <Toggle
            isChecked={isMain}
            onChange={() => setIsMain((prev) => !prev)}
            isPending={isPending}
          />
        </div>

        {isMain && (
          <div className="flex items-center gap-2 mb-2 text-xs text-main bg-gray-50 p-2 rounded-md">
            <CautionIcon />
            <span>Post will be visible on the homepage</span>
          </div>
        )}

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-gray-700 text-sm font-medium">
              Current Images
            </h3>
            <div className="grid gap-2 grid-cols-3">
              {existingImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative border rounded-lg p-2 h-28 overflow-hidden ${
                    image.toRemove ? 'opacity-50' : ''
                  }`}
                >
                  <Image
                    src={
                      typeof image.img === 'string'
                        ? image.img
                        : '/placeholder.svg'
                    }
                    alt="existing image"
                    fill
                    className="object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => toggleExistingImageRemoval(index)}
                    className={`absolute top-1 right-1 p-1 rounded-full text-white ${
                      image.toRemove ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    disabled={isPending}
                  >
                    {image.toRemove ? 'Undo' : <RemoveIcon />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Images Upload */}
        <div className="space-y-2">
          <h3 className="text-gray-700 text-sm font-medium">Add New Images</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-100">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              disabled={isPending}
            />
            <label
              htmlFor="file-upload"
              className={`cursor-pointer flex flex-col items-center text-gray-600 text-sm font-medium ${
                isPending ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <UploadIcon />
              <span>Drop files or</span>
              <span className="text-main font-semibold">Browse</span>
            </label>
          </div>
          {state.errors?.images && (
            <p className="text-red-500 text-sm">{state.errors.images}</p>
          )}
        </div>

        {/* New Image Previews */}
        {newImages.length > 0 && (
          <div className="grid gap-2 grid-cols-3">
            {newImages.map((image, index) => (
              <div
                key={index}
                className="relative border rounded-lg p-2 h-28 overflow-hidden"
              >
                <Image
                  src={image.preview || '/placeholder.svg'}
                  alt="preview"
                  fill
                  className="object-cover rounded-md"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  disabled={isPending}
                >
                  <RemoveIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full text-white bg-main hover:bg-main-lighter rounded-lg text-sm px-4 py-3 disabled:bg-gray-400"
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update'}
        </motion.button>

        {/* Status Message */}
        {state.message && (
          <p
            className={`text-sm text-center ${
              state.success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
