import conexao from "../infraestrutura/conexao.ts";

export class ProfessorModel {
  obterTodosProfessores() {
    const sql = `
        SELECT
          p.IdProfessor,
          u.Nome
        FROM Professor p
        INNER JOIN Usuario u
          ON p.IdUsuario = u.IdUsuario
        WHERE p.Ativo = 1
          AND u.Ativo = 1
        ORDER BY u.Nome;
    `;

    return new Promise((resolve, reject) => {
      conexao.query(sql, (error, resposta) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(resposta);
      });
    });
  }

  criar(idUsuario: number) {
    const sql = `
            INSERT INTO Professor
            ( IdUsuario, Ativo)
            VALUES (?, ?)
        `;

    return new Promise((resolve, reject) => {
      conexao.query(sql, [idUsuario, true], (error, resposta) => {
        if (error) {
          console.log("Deu erro no insert professor");
          console.log(error);
          reject(error);
          return;
        }
        console.log("Deu certo o insert professor");
        resolve(resposta);
      });
    });
  }

  relacionarUsuarioProf(idUsuario: number) {
    const sql = `
            SELECT
                p.IdProfessor,
                p.IdUsuario,
                p.Ativo
            FROM Professor p
            WHERE p.IdUsuario = ?
        `;

    return new Promise((resolve, reject) => {
      conexao.query(sql, [idUsuario], (error, resposta) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(resposta);
      });
    });
  }

  buscarIdProfessorPorUsuario(idUsuario: number) {
    const sql = `
        SELECT IdProfessor
        FROM Professor
        WHERE IdUsuario = ?;
    `;

    return new Promise((resolve, reject) => {
      conexao.query(sql, [idUsuario], (error, resposta) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(resposta);
      });
    });
  }

  buscarProfessorPorUsuario(idUsuario: number) {
    const sql = `
        SELECT
            p.IdProfessor,
            u.Nome
        FROM Professor p
        INNER JOIN Usuario u
            ON p.IdUsuario = u.IdUsuario
        WHERE p.IdUsuario = ?;
    `;

    return new Promise((resolve, reject) => {
      conexao.query(sql, [idUsuario], (error, resposta) => {
        if (error) {
          console.log("Deu erro ao buscar professor");
          reject(error);
          return;
        }

        console.log("Buscar professor deu certo");
        resolve(resposta);
      });
    });
  }
  
}

export default new ProfessorModel();
