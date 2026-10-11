export interface Usuario {
  IdUsuario: number;
  Nome: string;
  Email: string;
  NivelAcesso: 'PROFESSOR' | 'COORDENADOR';
}
export interface UsuarioPerfil{
  IdUsuario: number;
  Nome: string;
  IdentificadorInst: string;
  Email: string;
  NivelAcesso: 'PROFESSOR' | 'COORDENADOR';
  Ativo: boolean;
}