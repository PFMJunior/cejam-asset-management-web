'use client';

import React from 'react';
import { User } from '@/types/user';

export interface UserSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  users: User[];
  defaultOptionLabel?: string | false;
}

export function UserSelect({
  users,
  defaultOptionLabel = 'Selecione um usuário...',
  className = 'w-full px-4 py-2 border rounded-md bg-white',
  ...props
}: UserSelectProps) {
  return (
    <select className={className} {...props}>
      {defaultOptionLabel !== false && (
        <option value="">{defaultOptionLabel}</option>
      )}
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.nome}
        </option>
      ))}
    </select>
  );
}
