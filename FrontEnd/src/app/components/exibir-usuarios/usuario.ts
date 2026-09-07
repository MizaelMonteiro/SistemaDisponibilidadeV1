export type Usuario = {
    id: number;
    nome: string;
    email: string;
    senha: string;
};

export type UsuarioCriacao = {

    nome: string;
    email: string;
    senha: string;
};

export type UsuarioLogin = {
    email?: string;
    senha?: string;
};

