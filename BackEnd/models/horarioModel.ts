import conexao from "../infraestrutura/conexao.ts";

export class HorarioModel{


    listar() {
        const sql = `
        SELECT
        IdHorario,
        DiaSemana,
        HoraInicio
        FROM Horario
        ORDER BY IdHorario;`;

        return new Promise((resolve, reject) => {

            conexao.query(sql, (error, resposta) => {

                if (error) {
                    console.log("Deu erro no select horarios");
                    reject(error);
                    return;
                }

                console.log("Listar horarios deu certo");
                resolve(resposta);
            });
        });
    }


}

export default new HorarioModel();