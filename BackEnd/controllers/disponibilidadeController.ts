import disponibilidadeModel from "../models/disponibilidadeModel.ts";
import professorModel from "../models/professorModel.ts";
import justificativaDisponibilidadeModel from "../models/justificativaDisponibilidadeModel.ts";

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

  // Método responsável por receber a requisição HTTP
  async salvarDisponibilidadeProfessor(req: Request, res: Response) {
    try {
      const usuario: any = req.usuario;

      const idUsuario = Number(usuario?.idUsuario);

      const { horarios, justificativa } = req.body;

      if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        return res.status(401).json({
          mensagem: "Usuário não autenticado.",
        });
      }

      if (!Array.isArray(horarios)) {
        return res.status(400).json({
          mensagem: "Lista de horários inválida.",
        });
      }

      if (
        !horarios.every(
          (id: any) => Number.isInteger(id) && id >= 1 && id <= 85,
        )
      ) {
        return res.status(400).json({
          mensagem: "Existem horários inválidos na lista.",
        });
      }

      if (typeof justificativa !== "string") {
        return res.status(400).json({
          mensagem: "Justificativa inválida.",
        });
      }

      const textoJustificativa = justificativa.trim();

      // Se houver horários não selecionados, exige justificativa.
      if (horarios.length < 85 && textoJustificativa === "") {
        return res.status(400).json({
          mensagem: "Informe uma justificativa para os horários indisponíveis.",
        });
      }

      const resultado = await this.salvarDisponibilidade(
        idUsuario,
        horarios,
        textoJustificativa,
      );

      return res.status(200).json(resultado);
    } catch (error) {
      console.error("Erro ao salvar disponibilidade:", error);

      return res.status(500).json({
        mensagem: "Erro ao salvar disponibilidade.",
      });
    }
  }

  // Método responsável pelas operações no banco de dados
  salvarDisponibilidade(
    idUsuario: number,
    horarios: number[],
    justificativa: string,
  ) {
    return professorModel
      .buscarIdProfessorPorUsuario(idUsuario)
      .then(async (resultado: any) => {
        if (resultado.length === 0) {
          throw new Error("Professor não encontrado para este usuário");
        }

        const idProfessor = resultado[0].IdProfessor;

        // Remove os horários cadastrados anteriormente.
        await disponibilidadeModel.limparDisponibilidadeProfessor(idProfessor);

        // Cadastra os novos horários, caso exista algum selecionado.
        if (horarios.length > 0) {
          await disponibilidadeModel.cadastrarDisponibilidades(
            idProfessor,
            horarios,
          );
        }

        // Salva ou atualiza a justificativa.
        if (justificativa !== "") {
          await justificativaDisponibilidadeModel.salvar(
            idProfessor,
            justificativa,
          );
        } else {
          // Remove a justificativa anterior, caso exista.
          await justificativaDisponibilidadeModel.remover(idProfessor);
        }

        return {
          mensagem: "Disponibilidade salva com sucesso.",
        };
      });
  }

  async consultarMinhaJustificativa(req: Request, res: Response) {
    try {
      console.log("Usuário recebido pelo controller:", req.usuario);

      const usuario: any = req.usuario;
      const idUsuario = Number(usuario?.idUsuario);

      console.log("ID do usuário:", idUsuario);

      if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        return res.status(401).json({
          mensagem: "Usuário não autenticado.",
        });
      }

      const resultado: any =
        await professorModel.buscarIdProfessorPorUsuario(idUsuario);

      console.log("Resultado da busca do professor:", resultado);

      if (!resultado || resultado.length === 0) {
        return res.status(404).json({
          mensagem: "Professor não encontrado.",
        });
      }

      const idProfessor = Number(resultado[0].IdProfessor);

      console.log("ID do professor:", idProfessor);

      if (!Number.isInteger(idProfessor) || idProfessor <= 0) {
        throw new Error("ID do professor inválido.");
      }

      const justificativa: any =
        await justificativaDisponibilidadeModel.consultar(idProfessor);

      if (!justificativa || justificativa.length === 0) {
        return res.status(200).json(null);
      }

      return res.status(200).json(justificativa[0]);
    } catch (error) {
      console.error("Erro ao consultar justificativa:", error);

      return res.status(500).json({
        mensagem: "Erro ao consultar justificativa.",
      });
    }
  }

  async consultarJustificativaProfessor(req: Request, res: Response) {
    try {
      const idProfessor = Number(req.params.idProfessor);

      // Verifica se o identificador recebido é válido.
      if (!Number.isInteger(idProfessor) || idProfessor <= 0) {
        return res.status(400).json({
          mensagem: "ID do professor inválido.",
        });
      }

      // Consulta a justificativa pelo ID do professor.
      const justificativa: any =
        await justificativaDisponibilidadeModel.consultar(idProfessor);

      // Caso o professor não tenha justificativa cadastrada.
      if (!justificativa || justificativa.length === 0) {
        return res.status(200).json(null);
      }

      return res.status(200).json(justificativa[0]);
    } catch (error) {
      console.error("Erro ao consultar justificativa do professor:", error);

      return res.status(500).json({
        mensagem: "Erro ao consultar justificativa do professor.",
      });
    }
  }
}

export default new DisponibilidadeController();
