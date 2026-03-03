import MovementList from "@/components/MovementList";
import { movementsService } from "@/services/assetService";

export default async function MovementsPage() {
    const data = await movementsService.getAll();

    if (data.movements.length === 0) {
        return (
            <div className="text-center p-20 border-2 border-dashed rounded-lg">
                <p className="text-gray-500">Nenhuma movimentação encontrada no sistema.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <MovementList movements={data.movements} />
        </div>
    );
}