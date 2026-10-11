import type { UsuarioCriacao } from "../models/usuario.ts";
import type { UsuarioAtualizacao } from "../models/usuario.ts";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import usuariosModel from "../models/usuariosModel.ts";
import professorModel from "../models/professorModel.ts";
import coordenadorModel from "../models/coordenadorModel.ts";

export class UsuariosController {
  buscar() {
    return usuariosModel.listar();
  }

  async buscarUsuarioAutenticado(req: Request, res: Response) {
    try {
      const tokenUsuario = req.usuario as jwt.JwtPayload;
      const idUsuario = Number(tokenUsuario.idUsuario);

      const resultado: any =
        await usuariosModel.consultarUsuarioPorId(idUsuario);

      if (resultado.length === 0) {
        return res.status(404).json({
          mensagem: "Usuário não encontrado.",
        });
      }

      return res.status(200).json(resultado[0]);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);

      return res.status(500).json({
        mensagem: "Erro ao buscar usuário.",
      });
    }
  }

  async buscarUsuarioPorIdParaPerfil(req: Request, res: Response) {
    try {
      const usuarioToken = req.usuario;

      if (
        !usuarioToken ||
        typeof usuarioToken === "string" ||
        !("idUsuario" in usuarioToken)
      ) {
        return res.status(401).json({
          mensagem: "Usuário não autenticado.",
        });
      }

      const idUsuario = Number(usuarioToken.idUsuario);

      if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        return res.status(401).json({
          mensagem: "Identificador de usuário inválido.",
        });
      }

      const resultado: any =
        await usuariosModel.consultarUsuarioPorIdParaPerfil(idUsuario);

      if (resultado.length === 0) {
        return res.status(404).json({
          mensagem: "Usuário não encontrado.",
        });
      }

      return res.status(200).json(resultado[0]);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);

      return res.status(500).json({
        mensagem: "Erro ao buscar usuário.",
      });
    }
  }

  async criar(novoUsuario: UsuarioCriacao) {
    const senhaHash = await bcrypt.hash(novoUsuario.senha, 10);

    if (
      novoUsuario.nivelAcesso !== "PROFESSOR" &&
      novoUsuario.nivelAcesso !== "COORDENADOR"
    ) {
      throw new Error("Nível de acesso inválido");
    }

    const usuario = {
      ...novoUsuario,
      senha: senhaHash,
    };

    const resultado: any = await usuariosModel.criar(usuario);

    const idUsuario = resultado.insertId;

    if (novoUsuario.nivelAcesso === "PROFESSOR") {
      await professorModel.criar(idUsuario);
    }
    if (novoUsuario.nivelAcesso === "COORDENADOR") {
      await coordenadorModel.criar(idUsuario);
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
