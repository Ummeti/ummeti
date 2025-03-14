'use client';

import { motion } from 'framer-motion';
import { useActionState, useState } from 'react';
import { updateStatsAction } from '@/app/actions/updateStatsAction';

export default function UpdateStatsForm({ stats }) {
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

  const [isAuto, setIsAuto] = useState(stats?.isAuto ?? false);

  const handleToggleChange = (e) => {
    setIsAuto(e.target.checked);
  };

  const handleSubmit = async (formData) => {
    formData.set('isAuto', isAuto ? 'true' : 'false');
    return formAction(formData);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-gray-900 text-3xl font-bold mb-6">
        Update Stats
      </h2>
      <form
        action={handleSubmit}
        className="mt-8 space-y-6 max-w-xl mx-auto bg-white p-6 shadow-lg rounded-xl border border-gray-200"
        noValidate
      >
        <div className="relative">
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="projects"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Projects
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Auto Count</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAuto}
                  onChange={handleToggleChange}
                  className="sr-only peer"
                  disabled={isPending}
                />
                <div
                  className={`w-11 h-6 rounded-full peer transition-colors duration-200 ease-in-out ${
                    isAuto ? 'bg-main' : 'bg-gray-300'
                  }`}
                ></div>
                <span
                  className={`absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                    isAuto ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></span>
              </label>
            </div>
          </div>

          {isAuto && (
            <div className="flex items-center gap-2 mb-2 text-xs text-main bg-gray-50 p-2 rounded-md">
              <div>!</div>
              <span>
                Projects count will be automatically fetched from the database
              </span>
            </div>
          )}

          <div className="relative">
            <input
              type="number"
              name="projects"
              id="projects"
              placeholder={
                isAuto ? 'Auto-fetched from database' : 'Enter custom count'
              }
              defaultValue={state.formObject?.projects || stats?.projects}
              className={`w-full rounded-lg py-3 pl-4 pr-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                isAuto
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-gray-900'
              }`}
              disabled={isPending || isAuto}
            />
          </div>
          {state.errors?.projects && (
            <p className="text-red-500 text-sm mt-1">{state.errors.projects}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="supporters"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Number of Supporters
          </label>
          <input
            type="number"
            name="supporters"
            id="supporters"
            placeholder="Number of Supporters"
            defaultValue={state.formObject?.supporters || stats?.supporters}
            className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none transition-colors disabled:cursor-not-allowed"
            disabled={isPending}
          />
          {state.errors?.supporters && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.supporters}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="served"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Number of Served
          </label>
          <input
            type="number"
            name="served"
            id="served"
            placeholder="Number of People Served"
            defaultValue={state.formObject?.served || stats?.served}
            className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none transition-colors disabled:cursor-not-allowed"
            disabled={isPending}
          />
          {state.errors?.served && (
            <p className="text-red-500 text-sm mt-1">{state.errors.served}</p>
          )}
        </div>

        <motion.button
          type="submit"
          className="w-full text-white bg-main hover:bg-main-lighter rounded-lg px-4 py-3 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update Stats'}
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
