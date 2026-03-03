'use client';

import React from 'react';

export interface LoadingOverlayProps {
  /** Texto exibido dentro do box de carregamento. */
  message?: string;
}

export function LoadingOverlay({ message = 'Carregando...' }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">{message}</div>
    </div>
  );
}
