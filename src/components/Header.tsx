import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">Controle de Ativos</h1>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Início
              </Link>
            </li>
            <li>
              <Link href="/assets" className="hover:text-gray-300 transition">
                Ativos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
