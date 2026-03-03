'use client';

import { useState, useEffect } from 'react';
import { assetService, userService } from '@/services/assetService';
import { StatusActive } from '@/types/statusActive';
import { UpdateAssetPayload } from '@/types/asset';
import { toast } from 'react-hot-toast';
import { User } from '@/types/user';
import { StatusSelect } from './StatusSelect';
import { UserSelect } from './UserSelect';
import { ActionSummary } from './ActionSummary';
import { LoadingOverlay } from './LoadingOverlay';

interface EditModalProps {
    assetId: number;
    onClose: () => void;
    onUpdate: () => void;
    statusOptions: StatusActive[];
}

export default function EditAssetModal({ assetId, onClose, onUpdate, statusOptions }: EditModalProps) {
    const [usersList, setUsersList] = useState<User[]>([]);
    const [loading, setLoading]     = useState(true);

    interface EditFormData {
      nome: string;
      statusId: number | '';
      usuarioId: number | '';
      observacao: string;
    }

    const [formData, setFormData] = useState<EditFormData>({
        nome      : '',
        statusId  : '' ,
        usuarioId : '' ,
        observacao: ''
    });

    useEffect(() => {
        async function loadData() {
            try {
                // Se o seu service de usuário ainda não existir, substitua por um fetch direto para teste
                const [asset, user] = await Promise.all([
                    assetService.getById(assetId),
                    userService.getAll().catch(() => ({ users: [] })) 
                ]);
                // console.log("Aaaaaaaaaaaaaaaa:", asset);

                setUsersList(user.users || []);
                setFormData({
                    nome      : asset.nome,
                    statusId  : asset.status.id,
                    usuarioId : asset.idUsuario || '',
                    observacao: asset.observacao || ''
                });
                
                // Verifique se usersList vem como array direto ou dentro de um objeto
                // setUsersList(Array.isArray(usersList) ? usersList : usersList.users || []);
            } catch {
                toast.error("Erro ao carregar dados do ativo");
                onClose();
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [assetId, onClose]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validação simples
        if (!formData.nome || !formData.statusId) {
            toast.error("Nome e Status são obrigatórios.");
            return;
        }

        const payload: UpdateAssetPayload = {
            nome: formData.nome,
            statusId: Number(formData.statusId),
            // Envia null se o valor for '', que corresponde a "Nenhum"
            usuarioId: formData.usuarioId === '' ? null : Number(formData.usuarioId),
            observacao: formData.observacao
        };

        try {
            setLoading(true);
            setLoading(true);
            await assetService.update(assetId, payload);
            toast.success("Ativo atualizado com sucesso!");
            onUpdate();
            onClose();
        } catch (error) {
            let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";

            if (error instanceof Error) {
                // Se for uma instância de Error, sabemos que ele tem uma propriedade 'message'.
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingOverlay />;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">Editar Ativo</h2>
                
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input 
                            type="text"
                            className="w-full mt-1 border rounded-md p-2 bg-gray-50"
                            value={formData.nome}
                            onChange={e => setFormData({...formData, nome: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <StatusSelect
                            statusOptions={statusOptions}
                            value={String(formData.statusId)}
                            onChange={e => setFormData({...formData, statusId: Number(e.target.value)})}
                            className="w-full mt-1 border rounded-md p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Atribuir a</label>
                        <UserSelect
                            users={usersList}
                            defaultOptionLabel="Nenhum"
                            value={String(formData.usuarioId)}
                            onChange={e => setFormData({...formData, usuarioId: e.target.value === '' ? '' : Number(e.target.value)})}
                            className="w-full mt-1 border rounded-md p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Observação (Opcional)</label>
                        <textarea
                            className="w-full mt-1 border rounded-md p-2"
                            rows={3}
                            value={formData.observacao}
                            onChange={e => setFormData({...formData, observacao: e.target.value})}
                            placeholder="Descreva detalhes sobre o estado ou uso do ativo..."
                        />
                    </div>

                    <div className="pt-2">
                        <ActionSummary usuarioId={formData.usuarioId} users={usersList} />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">{formData.usuarioId ? 'Registrar Devolução' : 'Emprestar Ativo'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}