'use client';

import { motion } from 'framer-motion';
import { addUserAction } from '@/app/actions/userActions';
import { useActionState, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { useRouter } from 'next/navigation';

export default function AddUserForm() {
  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: undefined,
  };
  const [state, formAction, isPending] = useActionState(
    addUserAction,
    initialState
  );

  const { showNotification } = useNotification();
  const router = useRouter();

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
        Add User
      </h2>
      <form
        action={formAction}
        className="mt-8 space-y-4 max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg"
        noValidate
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            defaultValue={state.formObject?.name ?? ''}
          />
          {state.errors?.name && (
            <p className="text-red-500 text-sm">{state.errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            defaultValue={state.formObject?.email ?? ''}
          />
          {state.errors?.email && (
            <p className="text-red-500 text-sm">{state.errors.email}</p>
          )}
        </div>

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
