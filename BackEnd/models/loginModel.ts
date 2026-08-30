import conexao from "../infraestrutura/conexao.ts"

import type {  UsuarioLogin } from "./usuario.ts";


export class LoginModel{
    

    logar(usuarioLogar: UsuarioLogin) {
        const sql = `
            SELECT *
            FROM usuarios
            WHERE email = ?
            AND senha = ?
        `;

        return new Promise((resolve, reject) => {

            conexao.query(
                sql,
                [usuarioLogar.email, usuarioLogar.senha],
                (error, resposta) => {

                    if (error) {
                        reject(error);
                        return;
                    }

                    const usuarios = Array.isArray(resposta) ? resposta : [];

                    if (usuarios.length === 0) {
                        reject(new Error("Usuário ou senha incorretos"));
                        console.log("Usuário ou senha incorretos")
                        return;
                    }

                    resolve(resposta);
                    console.log('Login deu certo')
                }
            );
        });
    }
}

export default new LoginModel()