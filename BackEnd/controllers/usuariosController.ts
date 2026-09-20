import type { UsuarioCriacao } from "../models/usuario.ts";
import type { UsuarioAtualizacao } from "../models/usuario.ts";
import bcrypt from "bcrypt";

import usuariosModel from "../models/usuariosModel.ts";
import professorModel from "../models/professorModel.ts";

export class UsuariosController {
  buscar() {
    return usuariosModel.listar();
  }

  async criar(novoUsuario: UsuarioCriacao) {
    const senhaHash = await bcrypt.hash(novoUsuario.senha, 10);

    const usuario = {
      ...novoUsuario,
      senha: senhaHash,
    };

    const resultado: any = await usuariosModel.criar(usuario);

    const idUsuario = resultado.insertId;

    if (novoUsuario.nivelAcesso === "PROFESSOR") {
      await professorModel.criar(idUsuario);
    }

    return resultado;
  }

  atualizar(usuarioAtualizado: UsuarioAtualizacao, id: number) {
    return usuariosModel.atualizar(usuarioAtualizado, id);
  }

  deletar(id: number) {
    return usuariosModel.deletar(id);
  }
}

export default new UsuariosController();
