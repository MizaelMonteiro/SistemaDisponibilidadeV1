import conexao from "../infraestrutura/conexao.ts";

export class horaioModel{

    buscarTodos() {

        const sql = `
            SELECT
            IdHorario,
            DiaSemana,
            HoraInicio
            FROM Horario
            ORDER BY IdHorario;`;

    }
    
}