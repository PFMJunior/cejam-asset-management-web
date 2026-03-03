import { StatusActive } from './statusActive';

export interface Asset {
  id                 : number;
  nome               : string;
  statusId           : number;
  codigoIdentificacao: string;
  /**
   * O próprio objeto de status relacionado, conforme retornado pela API.
   */
  status             : StatusActive;
  usuario?           : { id: number; nome: string };
  observacao?        : string;
  idUsuario?         : number;
}

export interface ResponseAllAssetsJson {
  assets: Asset[];
}

// re-export para simplificar imports em componentes que já importam de asset.ts
export type StatusAtivo = StatusActive;

/**
 * Formato esperado pela API ao atualizar um ativo existente.
 * A diferença para `Asset` é que não há `id` e `usuarioId` pode ser nulo.
 */
export interface UpdateAssetPayload {
  nome: string;
  statusId: number;
  usuarioId: number | null;
  observacao?: string;
}
