import conexao from "../infraestrutura/conexao.ts";

export class JustificativaDisponibilidadeModel {
  salvar(idProfessor: number, justificativa: string) {
    const sql = `
            INSERT INTO JustificativaDisponibilidade
                (IdProfessor, Justificativa)
            VALUES (?, ?)

            ON DUPLICATE KEY UPDATE
                Justificativa = VALUES(Justificativa);
        `;

    return new Promise((resolve, reject) => {
      conexao.query(sql, [idProfessor, justificativa], (error, resposta) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(resposta);
      });
    });
  }
  
  consultar(idProfessor: number) {
   console.log("Consultando justificativa para o professor com ID:", idProfessor);
    const sql = `
            SELECT Justificativa, DataAtualizacao
            FROM JustificativaDisponibilidade
            WHERE IdProfessor = ?;
        `;
    
    return new Promise((resolve, reject) => {
      conexao.query(sql, [idProfessor], (error, resposta) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(resposta);
      });
    });
  }

  remover(idProfessor: number) {
    const sql = `
        DELETE FROM JustificativaDisponibilidade
        WHERE IdProfessor = ?;
    `;

    return new Promise((resolve, reject) => {
      conexao.query(sql, [idProfessor], (error, resposta) => {
        if (error) {
          console.error("Erro ao remover justificativa:", error);
          reject(error);
          return;
        }

        resolve(resposta);
      });
    });
  }
}

export default new JustificativaDisponibilidadeModel();
