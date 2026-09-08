import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { UsuarioLogin } from "../models/usuario.ts";
import loginModel from "../models/loginModel.ts";

export class LoginController {
  async logar(usuarioLogin: UsuarioLogin) {
    const resultado: any = await loginModel.buscarPorEmail(usuarioLogin.email);

    if (resultado.length === 0) {
      console.log("Usuário ou senha incorretos");
      throw new Error("Usuário ou senha incorretos");
    }

    const usuario = resultado[0];

    const senhaCorreta = await bcrypt.compare(
      usuarioLogin.senha,
      usuario.senha,
    );

    if (!senhaCorreta) {
      console.log("Usuário ou senha incorretos");
      throw new Error("Usuário ou senha incorretos");
    }

    const token = jwt.sign(
      {
        idUsuario: usuario.idUsuario,
        email: usuario.email,
        nivelAcesso: usuario.nivelAcesso
      },
      process.env.JWTSECRET!,
      {
        expiresIn: "1h",
      },
    );

    console.log("login deu certo");

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      token: token,
    };
  }
}

export default new LoginController();
