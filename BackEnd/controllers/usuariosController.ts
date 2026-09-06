import type { UsuarioCriacao } from "../models/usuario.ts"
import type {UsuarioAtualizacao } from "../models/usuario.ts"
import type { UsuarioLogin } from "../models/usuario.ts"
import bcrypt from "bcrypt";

import usuariosModel from "../models/usuariosModel.ts"

export class UsuariosController{
    buscar(){
        return usuariosModel.listar()
    }
    async criar(novoUsuario:UsuarioCriacao){
        const senhaHash = await bcrypt.hash(novoUsuario.senha, 10);
        const usuario = {
            ...novoUsuario,
            senha: senhaHash
        };
        
        return usuariosModel.criar(usuario);
    }
    atualizar(usuarioAtualizado:UsuarioAtualizacao,id:number){
        return usuariosModel.atualizar(usuarioAtualizado,id)
    }
    deletar(id:number){
        return usuariosModel.deletar(id)
    }
    validarLogin(usuarioLogar: UsuarioLogin){
        return usuariosModel.logar(usuarioLogar)
    }
}

export default new UsuariosController()