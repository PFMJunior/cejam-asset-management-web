import { ResponseAllUsersJson } from '@/types/user';
import { AssetPayload } from '@/types/RequestAssetJson';
import { ResponseAllMovementsJson } from '@/types/movements';
import { ResponseAllStatusActiveJson } from '@/types/statusActive';
import { Asset, ResponseAllAssetsJson, UpdateAssetPayload } from '@/types/asset';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_SOURCE_URL || 'https://localhost:7115/api';

export const assetService = {
    getAll: async (): Promise<ResponseAllAssetsJson> => {
    const response = await fetch(`${API_BASE_URL}/assets`, {
        // next: { revalidate: 10 }
        cache: 'no-store'
    });

    // Tratativa para 204 No Content
    if (response.status === 204) {
      return { assets: [] };
    }

    if (!response.ok) {
        throw new Error(`Erro ao buscar ativos: ${response.statusText}`);
    }
        return response.json();
    },

    create: async (data: AssetPayload): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/assets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error("Erro da API:", errorData);

            const errorMessage = errorData?.errors 
                ? Object.values(errorData.errors).flat()[0] 
                : errorData?.message;

            throw new Error(errorMessage || `Erro ${response.status}: Verifique os dados enviados.`);
        }
    },

    getById: async (id: number): Promise<Asset> => {
        const response = await fetch(`${API_BASE_URL}/assets/${id}`, { cache: 'no-store' });

        if (!response.ok) {
            // Tenta ler o corpo da resposta de erro para obter detalhes.
            // O .catch(null) é uma segurança caso a resposta de erro não tenha corpo ou não seja um JSON válido.
            const errorData = await response.json().catch(() => null);
            
            // Loga o erro no console para facilitar a depuração.
            console.error(`Erro ao buscar ativo com ID ${id}:`, errorData);

            // Tenta extrair a mensagem de erro específica.
            // Acessa a lista de 'errors' e pega a primeira mensagem.
            const errorMessage = errorData?.errors?.[0] || `Erro ${response.status}: Não foi possível encontrar o ativo.`;

            // Lança um erro com a mensagem detalhada.
            throw new Error(errorMessage);
        }

        // Se a resposta for 'ok', retorna o JSON do ativo.
        return response.json();
    },

    update: async (id: number, data: UpdateAssetPayload): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Se a resposta não for 'ok' (ou seja, status 200-299), algo deu errado.
        if (!response.ok) {
            // Tenta extrair uma mensagem de erro do corpo da resposta, como no seu método 'create'.
            const errorData = await response.json().catch(() => null);
            console.error("Erro da API ao atualizar:", errorData);

            const errorMessage = errorData?.errors 
                ? Object.values(errorData.errors).flat().join(' ') 
                : 'Falha ao atualizar o ativo. Verifique os dados e tente novamente.';

            throw new Error(errorMessage);
        }
    },

    delete: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
            method: 'DELETE',
        });

        // Se a resposta não for 204 ou 200, algo deu errado.
        if (response.status !== 204 && response.status !== 200) {
            const errorData = await response.json().catch(() => null);
            // Extrai a mensagem de erro da API (ex: "Ativo não encontrado!")
            const errorMessage = errorData?.errors?.[0] || `Falha ao remover o ativo (status: ${response.status}).`;
            throw new Error(errorMessage);
        }
    },
};

export const statusActiveService = {
    getAll: async (): Promise<ResponseAllStatusActiveJson> => {
    const response = await fetch(`${API_BASE_URL}/statusactive`, {
        next: { revalidate: 10 }
    });

    // Tratativa para 204 No Content
    if (response.status === 204) {
      return { statusActive: [] };
    }

    if (!response.ok) {
        throw new Error(`Erro ao buscar Status Ativos: ${response.statusText}`);
    }
        return response.json();
    },
};

export const userService = {
    getAll: async (): Promise<ResponseAllUsersJson> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
        next: { revalidate: 10 }
    });

    // Tratativa para 204 No Content
    if (response.status === 204) {
      return { users: [] };
    }

    if (!response.ok) {
        throw new Error(`Erro ao buscar Usuários: ${response.statusText}`);
    }
        return response.json();
    },
};

export const movementsService = {
    getAll: async (): Promise<ResponseAllMovementsJson> => {
    const response = await fetch(`${API_BASE_URL}/movements`, {
        // next: { revalidate: 10 }
        cache: 'no-store'
    });

    // Tratativa para 204 No Content
    if (response.status === 204) {
      return { movements: [] };
    }

    if (!response.ok) {
        throw new Error(`Erro ao buscar Movimentações: ${response.statusText}`);
    }
        return response.json();
    },
};