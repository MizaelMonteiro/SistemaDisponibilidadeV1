import mysql from 'mysql2'
const conexao = mysql.createPool({
    host:"localhost",
    port:3306,
    user:"mizael",
    password:"Mmnf777@",
    database:"sistema_disponibilidade",
    connectionLimit: 10
})

export default conexao;     