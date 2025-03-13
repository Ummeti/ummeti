'use client';

import { ApproveIcon } from './Icons';

export default function ApproveButton({ onApprove, id }) {
  return (
    <button onClick={() => onApprove(id)}>
      <ApproveIcon />
    </button>
  );
}
