'use client';

import { motion } from 'framer-motion';
import { useActionState } from 'react';
import { submitReviewAction } from '@/app/actions/reviewActions';

export default function ReviewForm() {
  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: {},
  };

  const [state, formAction, isPending] = useActionState(
    submitReviewAction,
    initialState
  );

  return (
    <div className="bg-gray-100 p-4 sm:p-8 md:p-12 rounded-lg shadow-lg w-full">
      <form action={formAction} className="space-y-6" noValidate>
        <div className="md:flex gap-6">
          <div className="flex-1">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              defaultValue={state.formObject?.firstName || ''}
              maxLength={50}
              className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
              disabled={isPending}
              required
            />
            {state.errors?.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.firstName}
              </p>
            )}
          </div>
          <div className="flex-1 mt-6 md:mt-0">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              defaultValue={state.formObject?.lastName || ''}
              maxLength={50}
              className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
              disabled={isPending}
              required
            />
            {state.errors?.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.lastName}
              </p>
            )}
          </div>
        </div>
        <div>
          <textarea
            name="text"
            placeholder="Your Review"
            defaultValue={state.formObject?.text || ''}
            maxLength={300}
            rows={4}
            className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            required
          />
          {state.errors?.text && (
            <p className="text-red-500 text-sm mt-1">{state.errors.text}</p>
          )}
        </div>
        <motion.button
          type="submit"
          className="w-full text-white bg-main hover:bg-main-lighter rounded-lg px-4 py-3 flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          {isPending ? 'Submitting...' : 'Submit Review'}
        </motion.button>
        {state.message && (
          <p
            className={`text-sm mt-4 text-center ${
              state.success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {state.success
              ? 'Review submitted successfully! It will appear after approval.'
              : state.message}
          </p>
        )}
      </form>
    </div>
  );
}
