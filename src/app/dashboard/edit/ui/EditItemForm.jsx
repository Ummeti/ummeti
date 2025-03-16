'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { addProjectAction } from '@/app/actions/projectActions';
import {
  CategoryIcon,
  CautionIcon,
  RemoveIcon,
  UploadIcon,
} from '../../ui/Icons';
import { useActionState } from 'react';
import Toggle from '../../ui/Toggle';

export default function EditItemForm({ categories }) {
  const [images, setImages] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);

  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: undefined,
  };
  const [state, formAction, isPending] = useActionState(
    addProjectAction,
    initialState
  );

  const [isMain, setIsMain] = useState(false);

  useEffect(() => {
    if (state.success) {
      setImages([]);
      setShowNewCategory(false);
    }
  }, [state.success]);

  const handleFileChange = (e) => {
    const newImages = Array.from(e.target.files || []).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="py-8">
      <h2 className="text-center text-gray-900 text-3xl font-bold font-manrope">
        Add Project
      </h2>
      <form
        action={(formData) => {
          images.forEach((image) => formData.append('images', image.file));
          formData.set('isMain', isMain);
          formAction(formData);
        }}
        className="mt-8 space-y-4 max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg"
        noValidate
      >
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            defaultValue={state.formObject?.title ?? ''}
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
            defaultValue={state.formObject?.description ?? ''}
          />
          {state.errors?.description && (
            <p className="text-red-500 text-sm">{state.errors.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="projects"
            className="block text-sm font-medium text-gray-700"
          >
            Show on Homepage
          </label>
          <Toggle
            isChecked={isMain}
            onChange={() => setIsMain((prevState) => !prevState)}
            isPending={isPending}
          />
        </div>

        {isMain && (
          <div className="flex items-center gap-2 mb-2 text-xs text-main bg-gray-50 p-2 rounded-md">
            <CautionIcon />
            <span>Project will be visible on the homepage</span>
          </div>
        )}

        <div className="space-y-2">
          {showNewCategory ? (
            <div>
              <input
                type="text"
                name="category"
                placeholder="New category name"
                className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
                defaultValue={state.formObject?.category ?? ''}
                disabled={isPending}
              />
              <button
                type="button"
                onClick={() => setShowNewCategory(false)}
                className="text-main text-sm mt-2"
                disabled={isPending}
              >
                Choose an existing category
              </button>
            </div>
          ) : (
            <div>
              <select
                name="category"
                className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
                onChange={(e) => setShowNewCategory(e.target.value === 'new')}
                defaultValue={state.formObject?.category ?? ''}
                disabled={isPending}
              >
                <option value="">Select a category</option>
                {categories &&
                  Categories?.map((cat) => (
                    <option key={cat.id} value={cat.title}>
                      {cat.title}
                    </option>
                  ))}
                <option value="new">Add new category</option>
              </select>
            </div>
          )}

          {state.errors?.category && (
            <>
              <p className="text-red-500 text-sm">{state.errors.category[0]}</p>
              <p className="text-red-500 text-sm">{state.errors.category[1]}</p>
            </>
          )}
        </div>

        <div>
          <input
            type="number"
            name="raised"
            placeholder="Amount Raised ($)"
            className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            defaultValue={state.formObject?.raised ?? 0}
          />
          {state.errors?.raised && (
            <p className="text-red-500 text-sm">{state.errors.raised}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="goal"
            placeholder="Goal Amount ($)"
            className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            defaultValue={state.formObject?.goal ?? 0}
          />
          {state.errors?.goal && (
            <p className="text-red-500 text-sm">{state.errors.goal}</p>
          )}
        </div>

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
            <span className="text-main font-semibold">Browse</span>
          </label>
        </div>
        {state.errors?.images && (
          <p className="text-red-500 text-sm">{state.errors.images}</p>
        )}

        {images.length > 0 && (
          <div className="grid gap-2 grid-cols-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative border rounded-lg p-2 h-28 overflow-hidden"
              >
                <Image
                  src={image.preview}
                  alt="preview"
                  fill
                  className="object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  disabled={isPending}
                >
                  <RemoveIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        <motion.button
          type="submit"
          className="w-full text-white bg-main hover:bg-main-lighter rounded-lg text-sm px-4 py-3 disabled:bg-gray-400"
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </motion.button>

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
