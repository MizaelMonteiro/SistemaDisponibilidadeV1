import { Connection } from 'mysql2';

class Tabelas {
    private conexao!: Connection;

    init(conexao: Connection): void {
        this.conexao = conexao;
        this.criarTabelaUsuarios();
    }

    criarTabelaUsuarios(): void {
        const sql = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                senha VARCHAR(100) NOT NULL
            );
        `;

        this.conexao.query(sql, (error) => {
            if (error) {
                console.log("Eita, deu erro na hora de criar a tabela usuarios");
                console.log(error.message);
                return;
            }

            console.log("Show, criou a tabela usuarios com sucesso...");
        });
    }
}

export default new Tabelas();