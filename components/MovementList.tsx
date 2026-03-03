'use client';

import { Movement } from '@/types/movements';
import { useState } from 'react';
import MovementDetailsModal from './MovementDetailsModal';
// import { format } from 'date-fns';
// import { ptBR } from 'date-fns/locale';

export default function MovementList({ movements }: { movements: Movement[] }) {
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const openDetails = (mov: Movement) => {
    setSelectedMovement(mov);
    setDetailOpen(true);
  };

  const closeDetails = () => {
    setDetailOpen(false);
    setSelectedMovement(null);
  };

  return (
    <>
      <MovementDetailsModal
        isOpen={detailOpen}
        movement={selectedMovement}
        onClose={closeDetails}
      />

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Histórico de Movimentações</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ativo</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Responsável</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Empréstimo</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Devolução</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {movements.map((mov) => (
              <tr
                key={mov.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => openDetails(mov)}
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{mov.ativo.nome}</div>
                  <div className="text-xs text-gray-500">{mov.ativo.codigoIdentificacao}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {mov.usuario.nome}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(mov.dataEmprestimo).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {mov.dataDevolucao 
                    ? new Date(mov.dataDevolucao).toLocaleDateString('pt-BR') 
                    : <span className="text-gray-400 italic">Pendente</span>
                  }
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    mov.dataDevolucao 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {mov.dataDevolucao ? 'Concluído' : 'Em Posse'}
                  </span>
                </td>
              </tr>
            ))}
            {movements.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  Nenhuma movimentação registrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}