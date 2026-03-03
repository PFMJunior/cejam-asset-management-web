'use client'; // Arquivos de erro devem ser Client Components

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center p-10 bg-red-50 border border-red-200 rounded-xl">
            <h2 className="text-xl font-bold text-red-800">Ops! Algo deu errado.</h2>
            <p className="text-red-600 mb-4">{error.message}</p>
            <button
                onClick={() => reset()} // Tenta carregar a página novamente
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
                Tentar novamente
            </button>
        </div>
    );
}