'use client';

import AssetListPage from "@/components/AssetList";
import { Asset } from '@/types/asset';
import { StatusActive } from '@/types/statusActive';
import { useState, useEffect, useCallback } from 'react';
import { assetService, statusActiveService } from "@/services/assetService";
import { LoadingOverlay } from '@/components/LoadingOverlay';

export default function Home() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [statusOptions, setStatusOptions] = useState<StatusActive[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            // Busca os ativos e os status em paralelo
            const [assetsData, statusData] = await Promise.all([
                assetService.getAll(),
                statusActiveService.getAll()
            ]);
            setAssets(assetsData.assets || []);
            setStatusOptions(statusData.statusActive || []);
        } catch (error) {
            console.error("Falha ao carregar dados da página:", error);
            // toast.error("Não foi possível carregar os dados.");
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDataUpdate = () => {
        fetchData();
    };

    if (isLoading) {
        return <LoadingOverlay message="Carregando ativos..." />;
    }

    return (
        <div className="w-full">
            <AssetListPage
                assets={assets}
                statusOptions={statusOptions}
                onDataUpdate={handleDataUpdate}
            />
        </div>
    );
}