import conexao from "../infraestrutura/conexao.ts";

class CoordenadorModel {
    criar(idUsuario: number) {
        const sql = `
            INSERT INTO Coordenador (IdUsuario, Ativo)
            VALUES (?, ?)
        `;

        return new Promise((resolve, reject) => {
            conexao.query(sql, [idUsuario, true], (error, resposta) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(resposta);
            });
        });
    }
}

export default new CoordenadorModel();