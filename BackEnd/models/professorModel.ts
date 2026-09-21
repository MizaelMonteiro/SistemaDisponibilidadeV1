import conexao from "../infraestrutura/conexao.ts";

export class ProfessorModel {

    criar(idUsuario: number) {

        const sql = `
            INSERT INTO Professor
            ( IdUsuario, Ativo)
            VALUES (?, ?)
        `;

        return new Promise((resolve, reject) => {

            conexao.query(
                sql,
                [ idUsuario, true],
                (error, resposta) => {

                    if (error) {
                        
                        console.log("Deu erro no insert professor");
                        console.log(error);
                        reject(error);
                        return;
                    }
                    console.log("Deu certo o insert professor");
                    resolve(resposta);
                }
            );
        });
        }

    relacionarUsuarioProf(idUsuario: number) {

        const sql = `
            SELECT
                p.IdProfessor,
                p.IdUsuario,
                p.Ativo
            FROM Professor p
            WHERE p.IdUsuario = ?
        `;

        return new Promise((resolve, reject) => {

            conexao.query(
                sql,
                [idUsuario],
                (error, resposta) => {

                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(resposta);
                }
            );
        });
    }
}

export default new ProfessorModel();