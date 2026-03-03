import NewAsset from "@/components/NewAsset";
import { statusActiveService } from "@/services/assetService";

export default async function NewAssetPage() {
    const statusData = await statusActiveService.getAll();
    // console.log("aaaaaaaaaaa", statusData);

    return (
        <div className="w-full">
            <NewAsset statusOptions={statusData.statusActive} />
        </div>
    );
}