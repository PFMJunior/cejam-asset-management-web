'use client';

import Link from 'next/link';
import { User } from '@/types/user';
import toast from 'react-hot-toast';
import { UserSelect } from './UserSelect';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StatusSelect } from './StatusSelect';
import { StatusActive } from '@/types/statusActive';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AssetPayload } from '@/types/RequestAssetJson';
import { assetService, userService } from '@/services/assetService';

interface FormInputs {
  nome               : string;
  codigoIdentificacao: string;
  statusId           : string;
  usuarioId?         : string;
  observacao?        : string;
}

export default function NewAsset({ statusOptions }: { statusOptions: StatusActive[] }) {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            nome: "",
            codigoIdentificacao: "",
            statusId: "",
            usuarioId: "",
            observacao: ""
        }
    });

    const watchedStatusId = watch('statusId');
    const isEmUso = watchedStatusId === '2';

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await userService.getAll();
                setUsers(response.users);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                toast.error('Erro ao carregar usuários.');
            }
        }
        fetchUsers();
    }, []);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if (data.statusId === '') {
            toast.error('Por favor, selecione um status.');
            return;
        }

        if (isEmUso && !data.usuarioId) {
            toast.error('Para colocar um ativo \'Em Uso\', é obrigatório selecionar um usuário.');
            return;
        }

        const payload: AssetPayload = {
            nome               : data.nome,
            codigoIdentificacao: data.codigoIdentificacao,
            statusId           : Number(data.statusId),
            usuarioId          : isEmUso && data.usuarioId ? Number(data.usuarioId) : undefined,
            observacao         : isEmUso ? data.observacao : undefined,
        };

        try {
            await assetService.create(payload);
            toast.success('Ativo cadastrado com sucesso!');
            
            setTimeout(() => {
                router.push('/');
                router.refresh();
            }, 1000);

        } catch (error: unknown) {
            let errorMessage = 'Erro desconhecido ao cadastrar.';
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            toast.error(errorMessage);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Novo Ativo</h1>
                <Link 
                    href="/" 
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                    ← Voltar para listagem
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            {...register("nome", { 
                                required: "Nome é obrigatório",
                                maxLength: { value: 20, message: "Máximo de 20 caracteres" }
                            })}
                            className="w-full px-4 py-2 border rounded-md"
                            maxLength={20}
                        />
                        {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Código</label>
                        <input
                            type="text"
                            {...register("codigoIdentificacao", { 
                                required: "Código é obrigatório",
                                maxLength: { value: 15, message: "Máximo de 15 caracteres" }
                            })}
                            className="w-full px-4 py-2 border rounded-md"
                            maxLength={15}
                        />
                        {errors.codigoIdentificacao && <p className="text-red-500 text-xs mt-1">{errors.codigoIdentificacao.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <StatusSelect
                            statusOptions={statusOptions}
                            {...register("statusId", { required: "Status é obrigatório" })}
                        />
                        {errors.statusId && <p className="text-red-500 text-xs mt-1">{errors.statusId.message}</p>}
                    </div>

                    {isEmUso && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Usuário Responsável</label>
                                <UserSelect
                                    users={users}
                                    {...register("usuarioId", { required: isEmUso ? "Usuário é obrigatório para status 'Em Uso'" : false })}
                                />
                                {errors.usuarioId && <p className="text-red-500 text-xs mt-1">{errors.usuarioId.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Observação (Movimentação)</label>
                                <textarea
                                    {...register("observacao")}
                                    rows={3}
                                    className="w-full px-4 py-2 border rounded-md"
                                ></textarea>
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Salvar Ativo
                    </button>
                </form>
            </div>
        </div>
    );
}