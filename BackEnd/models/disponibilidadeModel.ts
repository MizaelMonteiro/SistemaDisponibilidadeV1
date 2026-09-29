import conexao from "../infraestrutura/conexao.ts";
import type { DisponibilidadeCriacao } from "./disponibilidade.ts";

export class DisponibilidadeModel {

    consultarDisponibilidadeProfessor(idProfessor: number) {

        const sql = `
            SELECT
                d.IdDisponibilidade,
                d.IdProfessor,
                d.IdHorario
            FROM Disponibilidade d
            WHERE d.IdProfessor = ?;
        `;

        return new Promise((resolve, reject) => {

            conexao.query(
                sql,
                [idProfessor],
                (error, resposta) => {

                    if (error) {
                        console.log("Deu erro ao consultar disponibilidade");
                        reject(error);
                        return;
                    }

                    console.log("Consultar disponibilidade deu certo");
                    resolve(resposta);
                }
            );
        });
    }


    limparDisponibilidadeProfessor(idProfessor: number) {

        const sql = `
            DELETE FROM Disponibilidade
            WHERE IdProfessor = ?;
        `;

        return new Promise((resolve, reject) => {

            conexao.query(
                sql,
                [idProfessor],
                (error, resposta) => {

                    if (error) {
                        console.log("Deu erro ao limpar disponibilidade");
                        reject(error);
                        return;
                    }

                    console.log("Limpar disponibilidade deu certo");
                    resolve(resposta);
                }
            );
        });
    }


    cadastrarDisponibilidade(disponibilidade: DisponibilidadeCriacao) {

        const sql = `
            INSERT INTO Disponibilidade
                (IdProfessor, IdHorario)
            VALUES
                (?, ?);
        `;

        return new Promise((resolve, reject) => {

            conexao.query(
                sql,
                [
                    disponibilidade.IdProfessor,
                    disponibilidade.IdHorario
                ],
                (error, resposta) => {

                    if (error) {
                        console.log("Deu erro no insert disponibilidade:",error);
                        reject(error);
                        return;
                    }

                    console.log("Cadastrar disponibilidade deu certo");
                    resolve(resposta);
                }
            );
        });
    }


    cadastrarDisponibilidades(
        idProfessor: number,
        horarios: number[]
    ) {

        const sql = `
            INSERT INTO Disponibilidade
                (IdProfessor, IdHorario)
            VALUES ?
        `;

        const valores = horarios.map(idHorario => [
            idProfessor,
            idHorario
        ]);

        return new Promise((resolve, reject) => {

            conexao.query(
                sql,
                [valores],
                (error, resposta) => {

                    if (error) {
                        console.log("Deu erro ao cadastrar disponibilidades", error);
                        reject(error);
                        return;
                    }

                    console.log("Disponibilidades cadastradas com sucesso");
                    resolve(resposta);
                }
            );
        });
    }
}

export default new DisponibilidadeModel();