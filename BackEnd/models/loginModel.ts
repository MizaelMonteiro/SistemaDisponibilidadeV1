import conexao from "../infraestrutura/conexao.ts";

class LoginModel {

    buscarPorEmail(email: string) {

        const sql = "SELECT * FROM usuarios WHERE email = ?";

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