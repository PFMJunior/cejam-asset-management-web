export interface AssetPayload {
    nome               : string;
    codigoIdentificacao: string;
    statusId           : number;
    usuarioId?         : number;
    observacao?        : string;
}

// alias antigo mantido para compatibilidade
export type RequestAssetJson = AssetPayload;
