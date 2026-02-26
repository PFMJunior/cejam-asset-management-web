export interface Asset {
    id: number;
    name: string;
    code: string;
    status: 'Disponível' | 'Em uso';
}