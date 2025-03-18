'use client';

import { ApproveIcon } from './Icons';
import { useNotification } from '../context/NotificationContext';
import { useState } from 'react';

export default function ApproveButton({ onApprove, id }) {
  const [isPending, setIsPending] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    const result = await onApprove(id);
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
      <ApproveIcon />
    </button>
  );
}
