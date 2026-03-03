'use client';

import { Movement } from '@/types/movements';

interface MovementDetailsModalProps {
  isOpen: boolean;
  movement: Movement | null;
  onClose: () => void;
}

export default function MovementDetailsModal({ isOpen, movement, onClose }: MovementDetailsModalProps) {
  if (!isOpen || !movement) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Detalhes da Movimentação</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Ativo:</span> {movement.ativo.nome} ({movement.ativo.codigoIdentificacao})
          </p>
          <p>
            <span className="font-medium">Responsável:</span> {movement.usuario.nome}
          </p>
          <p>
            <span className="font-medium">Empréstimo:</span>{' '}
            {new Date(movement.dataEmprestimo).toLocaleDateString('pt-BR')}
          </p>
          <p>
            <span className="font-medium">Devolução:</span>{' '}
            {movement.dataDevolucao
              ? new Date(movement.dataDevolucao).toLocaleDateString('pt-BR')
              : 'Pendente'}
          </p>
          <p>
            <span className="font-medium">Status:</span>{' '}
            {movement.dataDevolucao ? 'Concluído' : 'Em Posse'}
          </p>
          {movement.observacao && (
            <p>
              <span className="font-medium">Descrição:</span> {movement.observacao}
            </p>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
