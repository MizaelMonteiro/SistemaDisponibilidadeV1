import conexao from "../infraestrutura/conexao.ts";

class LoginModel {

    buscarPorEmail(email: string) {

        const sql = `
            SELECT
                IdUsuario AS idUsuario,
                Nome AS nome,
                IdentificadorInst AS identificadorInst,
                Email AS email,
                Senha AS senha,
                NivelAcesso AS nivelAcesso,
                Ativo AS ativo
            FROM Usuario
            WHERE Email = ?
            AND Ativo = TRUE
        `;

        return new Promise((resolve, reject) => {

            conexao.query(sql, [email], (error, resposta) => {

                if (error) {
                    reject(error);
                    return;
                }

                resolve(resposta);
            });
        });
    }
}

export default new LoginModel();