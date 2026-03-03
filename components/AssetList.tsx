'use client';

import toast from 'react-hot-toast';
import { useCallback, useState } from 'react';
import EditAssetModal from './EditAssetModal';
import { Asset } from '@/types/asset';
import { StatusActive } from '@/types/statusActive';
import ConfirmationModal from './ConfirmationModal';
import { assetService } from '@/services/assetService';

export default function AssetListPage({ assets, statusOptions, onDataUpdate }: { assets: Asset[]; statusOptions: StatusActive[]; onDataUpdate: () => void }) {
    const [editingId, setEditingId]                   = useState<number | null>(null);
    const [assetToDelete, setAssetToDelete]           = useState<{ id: number; nome: string } | null>(null);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

    const handleDeleteClick = (asset: { id: number; nome: string }) => {
        setAssetToDelete(asset);
        setIsConfirmingDelete(true);
    };

    const handleCancelDelete = () => {
        setIsConfirmingDelete(false);
        setAssetToDelete(null);
    };

    const handleConfirmDelete = useCallback(async () => {
        if (!assetToDelete) return;

        try {
            await assetService.delete(assetToDelete.id);
            toast.success(`Ativo "${assetToDelete.nome}" removido com sucesso!`);
            onDataUpdate();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Ocorreu um erro inesperado ao remover o ativo.");
            }
        } finally {
            // Fecha o modal de confirmação após a tentativa
            handleCancelDelete();
        }
    }, [assetToDelete, onDataUpdate]);

    return (
        <>
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Ativos</h2>
                </div>

                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Código</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map(asset => (
                            <tr key={asset.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">{asset.nome}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{asset.codigoIdentificacao}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            asset.status.nome === 'Disponível'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                                    {asset.status.nome}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm flex gap-2">
                                    <button
                                        disabled={asset.nome === 'Em uso'}
                                        onClick={() => setEditingId(asset.id)}
                                        className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                                    >
                                        Editar
                                    </button>
                                    {/* <button
                                    disabled={asset.nome === 'Disponível'}
                                    className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                                    >
                                    Devolver
                                    </button> */}
                                    <button
                                        onClick={() => handleDeleteClick({ id: asset.id, nome: asset.nome })}
                                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            {editingId && (
                <EditAssetModal
                    assetId={editingId}
                    statusOptions={statusOptions} 
                    onClose={() => setEditingId(null)}
                    onUpdate={onDataUpdate}
                />
            )}

            <ConfirmationModal
                isOpen={isConfirmingDelete}
                title="Confirmar Remoção"
                message={
                    <p>
                        Você tem certeza que deseja remover o ativo <strong>{assetToDelete?.nome}</strong>?
                          

                        Esta ação não pode ser desfeita.
                    </p>
                }
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                confirmText="Sim, Remover"
            />
        </>
    );
}
