import mysql from 'mysql2'
const conexao = mysql.createPool({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"sistema_disponibilidade",
    connectionLimit: 10
})

export default conexao;     