import conexao from "../infraestrutura/conexao.ts";

export class professorModel{

    relacionarUsuarioProf(idUsuario: string) {

        const sql = `
            SELECT
            p.IdProfessor,
            p.Matricula,
            p.IdUsuario,
            p.Ativo
            FROM Professor p
            WHERE p.IdUsuario = ?;`;

    }
    
}