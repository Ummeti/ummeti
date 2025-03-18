'use client';

import { RemoveIcon } from './Icons';
import { useNotification } from '../context/NotificationContext';
import { useState } from 'react';

export default function RemoveButton({ onRemove, id, email }) {
  const [isPending, setIsPending] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    const result = await onRemove(email || id);
    setIsPending(false);

    if (result.message) {
      showNotification({
        message: result.message,
        type: result.success ? 'success' : 'error',
      });
    }
  };

  return (
    <button
      onClick={handleSubmit}
      type="submit"
      className="disabled:text-gray-300"
      disabled={isPending}
    >
      <RemoveIcon />
    </button>
  );
}
