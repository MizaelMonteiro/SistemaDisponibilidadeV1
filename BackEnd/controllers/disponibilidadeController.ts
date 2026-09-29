import disponibilidadeModel from "../models/disponibilidadeModel.ts";
import professorModel from "../models/professorModel.ts";

export class DisponibilidadeController {

    consultarDisponibilidade(idUsuario: number) {
        return professorModel
            .buscarIdProfessorPorUsuario(idUsuario)
            .then((resultado: any) => {

                if (resultado.length === 0) {
                    throw new Error("Professor não encontrado para este usuário");
                }

                const idProfessor = resultado[0].IdProfessor;

                return disponibilidadeModel
                    .consultarDisponibilidadeProfessor(idProfessor);
            });
    }

    salvarDisponibilidade(idUsuario: number, horarios: number[]) {
        return professorModel
            .buscarIdProfessorPorUsuario(idUsuario)
            .then((resultado: any) => {

                if (resultado.length === 0) {
                    throw new Error("Professor não encontrado para este usuário");
                }

                const idProfessor = resultado[0].IdProfessor;

                return disponibilidadeModel
                    .limparDisponibilidadeProfessor(idProfessor)
                    .then(() => {
                        return disponibilidadeModel
                            .cadastrarDisponibilidades(
                                idProfessor,
                                horarios
                            );
                    });
            });
    }
}

export default new DisponibilidadeController();