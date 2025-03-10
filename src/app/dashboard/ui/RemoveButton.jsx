'use client';

import { RemoveIcon } from './Icons';

export default function RemoveButton({ onRemove, id, email }) {
  return (
    <button onClick={() => onRemove(email || id)}>
      <RemoveIcon />
    </button>
  );
}
