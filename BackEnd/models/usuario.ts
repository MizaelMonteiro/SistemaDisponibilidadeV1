export type Usuario = {
    idUsuario: number;
    nome: string;
    identificadorInst: string;
    email: string;
    senha: string;
    nivelAcesso: "PROFESSOR" | "COORDENADOR";
    ativo: boolean;
};
export type UsuarioCriacao = {
    nome: string;
    identificadorInst: string;
    email: string;
    senha: string;
    nivelAcesso: "PROFESSOR" | "COORDENADOR";
    ativo?: boolean;
};

export type UsuarioAtualizacao = {
    nome?: string;
    identificadorInst?: string;
    email?: string;
    senha?: string;
    nivelAcesso?: "PROFESSOR" | "COORDENADOR";
    ativo?: boolean;
};

export type UsuarioLogin = {
    email: string;
    senha: string;
};