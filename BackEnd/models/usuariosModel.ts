import conexao from "../infraestrutura/conexao.ts";
import type {
    UsuarioCriacao,
    UsuarioAtualizacao
} from "./usuario.ts";

export class UsuariosModel {

    listar() {
        const sql = `SELECT
        IdUsuario AS idUsuario,
        Nome AS nome,
        IdentificadorInst AS identificadorInst,
        Email AS email,
        Senha AS senha,
        NivelAcesso AS nivelAcesso,
        Ativo AS ativo
        FROM Usuario`;

        return new Promise((resolve, reject) => {

            conexao.query(sql, (error, resposta) => {

                if (error) {
                    console.log("Deu erro no select");
                    reject(error);
                    return;
                }

                console.log("Listar deu certo");
                resolve(resposta);
            });
        });
    }


    criar(novoUsuario: UsuarioCriacao) {
        const sql = "INSERT INTO Usuario SET ?";

        return new Promise((resolve, reject) => {

            conexao.query(sql, novoUsuario, (error, resposta) => {

                if (error) {
                    console.log("Deu erro no insert");
                    reject(error);
                    return;
                }

                console.log("Insert deu certo");
                resolve(resposta);
            });
        });
    }


    atualizar(usuarioAtualizado: UsuarioAtualizacao, id: number) {
        const sql = "UPDATE Usuario SET ? WHERE IdUsuario = ?";

        return new Promise((resolve, reject) => {

            conexao.query(
                sql,
                [usuarioAtualizado, id],
                (error, resposta) => {

                    if (error) {
                        console.log("Deu erro no update");
                        reject(error);
                        return;
                    }

                    console.log("Update deu certo");
                    resolve(resposta);
                }
            );
        });
    }


    deletar(id: number) {
        const sql = "DELETE FROM Usuario WHERE IdUsuario = ?";

        return new Promise((resolve, reject) => {

            conexao.query(sql, [id], (error, resposta) => {

                if (error) {
                    console.log("Deu erro no deletar");
                    reject(error);
                    return;
                }

                console.log("Deletar deu certo");
                resolve(resposta);
            });
        });
    }
}

export default new UsuariosModel();