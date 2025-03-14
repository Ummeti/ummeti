'use client';
import Toggle from './Toggle';
import { startTransition, useActionState, useState } from 'react';

export default function ToggleItemMain({ isMain, id, ToggleItemMainAction }) {
  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: {},
  };

  const [state, formAction, isPending] = useActionState(
    ToggleItemMainAction,
    initialState
  );

  const [isItemMain, setIsItemMain] = useState(isMain ?? false);

  const handleToggleChange = () => {
    const newState = !isItemMain;
    setIsItemMain(newState);

    startTransition(() => {
      const formData = new FormData();
      formData.set('id', id);
      formData.set('isMain', newState ? 'true' : 'false');
      formAction(formData);
    });
  };

  return (
    <div>
      <Toggle
        isChecked={isItemMain}
        onChange={handleToggleChange}
        isPending={isPending}
      />
      {/* {state?.message && (
        <p
          className={`text-sm text-center ${
            state.success ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {state.message}
        </p>
      )}

      {state?.errors?.isMain && (
        <p className="text-red-500 text-sm">{state.errors.isMain}</p>
      )} */}
    </div>
  );
}
