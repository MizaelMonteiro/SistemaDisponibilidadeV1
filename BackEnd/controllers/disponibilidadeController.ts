import disponibilidadeModel from "../models/disponibilidadeModel.ts";
import professorModel from "../models/professorModel.ts";
import type { Request, Response } from "express";

export class DisponibilidadeController {
  consultarDisponibilidade(idUsuario: number) {
    return professorModel
      .buscarIdProfessorPorUsuario(idUsuario)
      .then((resultado: any) => {
        if (resultado.length === 0) {
          throw new Error("Professor não encontrado para este usuário");
        }

        const idProfessor = resultado[0].IdProfessor;

        return disponibilidadeModel.consultarDisponibilidadeProfessor(
          idProfessor,
        );
      });
  }

  async consultarDisponibilidadeProfessor(req: Request, res: Response) {
    try {
      const idProfessor = Number(req.params.idProfessor);

      if (!Number.isInteger(idProfessor) || idProfessor <= 0) {
        return res.status(400).json({
          mensagem: "ID do professor inválido.",
        });
      }

      const disponibilidade =
        await disponibilidadeModel.consultarDisponibilidadeProfessor(
          idProfessor,
        );

      return res.status(200).json(disponibilidade);
    } catch (error) {
      console.error("Erro ao consultar disponibilidade do professor:", error);

      return res.status(500).json({
        mensagem: "Erro ao consultar disponibilidade do professor.",
      });
    }
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
            return disponibilidadeModel.cadastrarDisponibilidades(
              idProfessor,
              horarios,
            );
          });
      });
  }
}

export default new DisponibilidadeController();
