import type { UsuarioCriacao } from "../models/usuario.ts"
import type {UsuarioAtualizacao } from "../models/usuario.ts"
import type { UsuarioLogin } from "../models/usuario.ts"

import usuariosModel from "../models/usuariosModel.ts"

export class UsuariosController{
    buscar(){
        return usuariosModel.listar()
    }
    criar(novoUsuario:UsuarioCriacao){
        return usuariosModel.criar(novoUsuario)
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