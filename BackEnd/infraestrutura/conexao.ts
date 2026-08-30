import mysql from 'mysql2'
const conexao = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"mizael",
    password:"Mmnf777@",
    database:"TesteExpress"
})

export default conexao;     