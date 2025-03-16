'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { updateCategoryAction } from '@/app/actions/categoryActions';
import { useActionState } from 'react';

export default function UpdateCategoryForm({ categoryId, initialTitle }) {
  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: { title: initialTitle },
  };

  const [state, formAction, isPending] = useActionState(
    updateCategoryAction,
    initialState
  );

  const [title, setTitle] = useState(initialTitle);

  const handleSubmit = async (formData) => {
    formData.set('id', categoryId);
    formAction(formData);
  };

  return (
    <div className="py-8">
      <h2 className="text-center text-gray-900 text-3xl font-bold font-manrope leading-normal">
        Update Category
      </h2>
      <form
        action={handleSubmit}
        className="mt-8 space-y-4 max-w-xl mx-auto bg-white p-4 sm:p-6 md:p-8 shadow-lg rounded-lg"
        noValidate
      >
        <div>
          <input
            type="text"
            name="title"
            placeholder="Category Title"
            className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-label="Category Title"
            disabled={isPending}
          />
          {state.errors?.title && (
            <p className="text-red-500 text-sm mt-1">{state.errors.title}</p>
          )}
        </div>

        <motion.button
          type="submit"
          className="text-white bg-main hover:bg-main-lighter tracking-wide rounded-lg text-sm px-4 py-3 flex items-center justify-center w-full !mt-6 disabled:bg-gray-400"
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update Category'}
        </motion.button>

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
