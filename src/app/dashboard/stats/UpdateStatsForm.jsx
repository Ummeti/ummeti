'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useActionState } from 'react';
import { updateStatsAction } from '@/app/actions/updateStatsAction';

export default function UpdateStatsForm({ stats, projectsCount }) {
  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: {},
  };

  const [state, formAction, isPending] = useActionState(
    updateStatsAction,
    initialState
  );

  // Manage local state for projects count
  const [projects, setProjects] = useState(
    state.formObject?.projects || stats?.projects || projectsCount
  );

  return (
    <div className="py-8">
      <h2 className="text-center text-gray-900 text-3xl font-bold">
        Update Stats
      </h2>
      <form
        action={formAction}
        className="mt-8 space-y-4 max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg"
        noValidate
      >
        {/* Projects */}
        <div className="relative">
          <input
            type="number"
            name="projects"
            placeholder="Number of Projects"
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none 
            appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
            [-moz-appearance:textfield]"
            disabled={isPending}
            min="1"
            max="1000000"
            required
          />
          {state.errors?.projects && (
            <p className="text-red-500 text-sm mt-1">{state.errors.projects}</p>
          )}
          {/* Reset Button */}
          <button
            type="button"
            onClick={() => setProjects(projectsCount)}
            className="absolute right-4 top-3 text-sm text-main-dark disabled:text-gray-400"
            disabled={projects === projectsCount}
          >
            Reset
          </button>
        </div>

        {/* Supporters */}
        <div>
          <input
            type="number"
            name="supporters"
            placeholder="Number of Supporters"
            defaultValue={state.formObject?.supporters || stats?.supporters}
            className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            min="1"
            max="1000000"
            required
          />
          {state.errors?.supporters && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.supporters}
            </p>
          )}
        </div>

        {/* Served */}
        <div>
          <input
            type="number"
            name="served"
            placeholder="Number of People"
            defaultValue={state.formObject?.served || stats?.served}
            className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            min="1"
            max="1000000"
            required
          />
          {state.errors?.served && (
            <p className="text-red-500 text-sm mt-1">{state.errors.served}</p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full text-white bg-main hover:bg-main-lighter rounded-lg px-4 py-3 flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update Stats'}
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
