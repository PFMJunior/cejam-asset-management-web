export interface Movement {
    id: number;
    ativoId: number;
    usuarioId: number;
    dataEmprestimo: string;
    dataDevolucao: string | null;
    observacao?: string;
    ativo: {
        nome: string;
        codigoIdentificacao: string;
    };
    usuario: {
        nome: string;
    };
}

export interface ResponseAllMovementsJson {
    movements: Movement[];
}