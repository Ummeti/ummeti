'use client';
import { useNotification } from '../context/NotificationContext';
import Toggle from './Toggle';
import { startTransition, useActionState, useEffect, useState } from 'react';

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
  const { showNotification } = useNotification();

  useEffect(() => {
    if (state.message) {
      showNotification({
        message: state.message,
        type: state.success ? 'success' : 'error',
      });
    }
  }, [state.message]);

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
    </div>
  );
}
