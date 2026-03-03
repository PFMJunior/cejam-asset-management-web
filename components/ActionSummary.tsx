'use client';

import React from 'react';
import { User } from '@/types/user';

export interface ActionSummaryProps {
    usuarioId?: number | string | null;
    users?: User[];
}

export function ActionSummary({ usuarioId, users = [] }: ActionSummaryProps) {
    const isEmpty = usuarioId === '' || usuarioId === undefined || usuarioId === null;
    const nomeUsuario = isEmpty
        ? ''
        : users.find((u) => u.id === usuarioId)?.nome || '';

    if (isEmpty) {
        return (
            <div className="p-3 bg-orange-100 text-orange-800 rounded-lg text-sm transition-all duration-300">
                <p>
                    Você está prestes a <span className="font-bold">emprestar</span> este ativo para{' '}
                    <strong>{nomeUsuario || 'usuário selecionado'}</strong>.
                    O status será atualizado para <span className="font-semibold">Em Uso</span>.
                </p>
            </div>
        );
    }

    return (
        <div className="p-3 bg-blue-100 text-blue-800 rounded-lg text-sm transition-all duration-300">
            <p>
                Você está prestes a registrar a <span className="font-bold">devolução</span> deste ativo.
                O status será atualizado para <span className="font-semibold">Disponível</span>.
            </p>
        </div>
    );
}
