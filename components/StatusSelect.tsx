'use client';

import React from 'react';
import { StatusActive } from '@/types/statusActive';

export interface StatusSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  statusOptions: StatusActive[];
  defaultOptionLabel?: string;
}

export function StatusSelect({
  statusOptions,
  defaultOptionLabel = 'Selecione um status...',
  className = 'w-full px-4 py-2 border rounded-md bg-white',
  ...props
}: StatusSelectProps) {
  return (
    <select className={className} {...props}>
      <option value="">{defaultOptionLabel}</option>
      {statusOptions.map((status) => (
        <option key={status.id} value={status.id}>
          {status.nome}
        </option>
      ))}
    </select>
  );
}
