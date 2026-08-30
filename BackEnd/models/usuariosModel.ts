import conexao from "../infraestrutura/conexao.ts"
import { Connection } from "mysql2";
import type {  UsuarioCriacao, UsuarioLogin } from "./usuario.ts";
import type {  UsuarioAtualizacao } from "./usuario.ts";

export class UsuariosModel{
    listar(){
        const sql = "SELECT * FROM usuarios"
        return new Promise((resolve,reject)=>{

            conexao.query(sql,{},(error,resposta)=>{
                if(error){
                    console.log("Deu erro no select")
                    reject(error)
                    
                }
                console.log("Listar deu certo")
                resolve(resposta)
            })
        })
    }

    criar(novoUsuario:UsuarioCriacao){
        const sql = "INSERT INTO usuarios SET ?"
        return new Promise((resolve,reject)=>{
            conexao.query(sql,novoUsuario,(error,resposta)=>{
                if(error){
                    reject(error)
                    console.log("Deu erro no insert")
                
                }
                resolve(resposta)
                console.log("Insert deu certo")
            
            })
        })

    }
    atualizar(usuarioAtualizado:UsuarioAtualizacao, id:number){
        const sql = "UPDATE usuarios SET ? WHERE id = ?"
        return new Promise((resolve,reject)=>{
            conexao.query(sql,[usuarioAtualizado,id],(error,resposta)=>{
                if(error){
                    reject(error)
                    console.log("Deu erro no update")
                
                }
                resolve(resposta)
                console.log("Update deu certo")
            
            })
        })
            
    }
    deletar(id:number){
        const sql = "DELETE FROM usuarios WHERE id = ?"
        return new Promise((resolve,reject)=>{
            conexao.query(sql,id,(error,resposta)=>{
                if(error){
                    reject(error)
                    console.log("Deu erro no deletar")
             
                }
                resolve(resposta)
                console.log("Deletar deu certo")
            
            })
        })
            
    }


    logar(usuarioLogar: UsuarioLogin) {
    const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

    return new Promise((resolve, reject) => {
        conexao.query(
            sql,
            [usuarioLogar.email, usuarioLogar.senha],
            (error, resposta) => {

                if (error) {
                    reject(error);
                    
                    return;
                }

                resolve(resposta);
                
                
            }
        );
    });
}
}

export default new UsuariosModel()