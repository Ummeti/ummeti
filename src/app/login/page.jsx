'use client';
import '../globals.css';
import { useActionState } from 'react';
import { motion } from 'framer-motion';
import { signInAction } from '../actions/signInAction';

export default function SignIn() {
  const initialState = {
    success: false,
    message: '',
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    signInAction,
    initialState
  );

  return (
    <div className="py-40 px-4">
      <h1 className="text-center text-gray-900 text-3xl font-bold font-manrope leading-normal">
        Sign in
      </h1>
      <form
        action={formAction}
        className="mt-8 space-y-4 max-w-xl mx-auto bg-white p-4 sm:p-6 md:p-8 shadow-lg rounded-lg"
        noValidate
      >
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            required
            aria-label="Email Address"
            disabled={isPending}
          />
          {state.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>

        <motion.button
          type="submit"
          className="text-white bg-main hover:bg-main-lighter tracking-wide rounded-lg text-sm px-4 py-3 flex items-center justify-center w-full !mt-6 disabled:bg-gray-400"
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          {isPending ? 'Sending Link...' : 'Send Link'}
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
