import conexao from "../infraestrutura/conexao.ts";

export class horaioModel{

    consultarDisponibilidadeProfessor() {

        const sql = `
            SELECT
            d.IdDisponibilidade,
            d.IdProfessor,
            d.IdHorario
            FROM Disponibilidade d
            WHERE d.IdProfessor = ?;`;

    }
    
}