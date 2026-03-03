export interface User {
    id: number;
    nome: string;
    email: string;
}

export interface ResponseAllUsersJson {
  users: User[];
}