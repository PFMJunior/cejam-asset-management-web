'use client';

import { Asset } from '@/types/asset';
import React, { useState } from 'react';

const mockAssets: Asset[] = [
  { id: 1, name: 'Monitor Dell', code: 'MON-001', status: 'Disponível' },
  { id: 2, name: 'Teclado Logitech', code: 'TEC-002', status: 'Em uso' },
  { id: 3, name: 'Projetor Epson', code: 'PROJ-003', status: 'Disponível' },
];

export default function AssetList() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);

  return (
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
                <td className="px-6 py-4 text-sm text-gray-900">{asset.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{asset.code}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      asset.status === 'Disponível'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {asset.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  <button
                    disabled={asset.status === 'Em uso'}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    Emprestar
                  </button>
                  <button
                    disabled={asset.status === 'Disponível'}
                    className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    Devolver
                  </button>
                  <button className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
