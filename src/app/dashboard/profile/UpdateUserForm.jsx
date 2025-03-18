'use client';

import { motion } from 'framer-motion';
import { useActionState, useEffect } from 'react';
import { UploadIcon } from '../ui/Icons';
import { updateUserAction } from '@/app/actions/userActions';
import { useNotification } from '../context/NotificationContext';

export default function UpdateUserForm({ user }) {
  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: {},
  };

  const [state, formAction, isPending] = useActionState(
    updateUserAction,
    initialState
  );

  const { showNotification } = useNotification();

  useEffect(() => {
    if (state.message) {
      showNotification({
        message: state.message,
        type: state.success ? 'success' : 'error',
      });
    }
  }, [state.message]);

  return (
    <div className="py-8">
      <h2 className="text-center text-gray-900 text-3xl font-bold">
        My Profile
      </h2>
      <form
        action={formAction}
        className="mt-8 space-y-4 max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg"
        noValidate
      >
        {/* Name */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            defaultValue={state.formObject?.name || user.name}
            className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            required
          />
          {state.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            defaultValue={state.formObject?.email || user.email}
            className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            required
          />
          {state.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>

        {/* Profile Picture Upload */}
        <div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-100">
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
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
              <span>Upload Profile Picture</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full text-white bg-main hover:bg-main-lighter rounded-lg px-4 py-3 flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update Profile'}
        </motion.button>

        {/* Success/Error Message */}
        {state.message && (
          <p
            className={`text-sm mt-4 text-center ${
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
