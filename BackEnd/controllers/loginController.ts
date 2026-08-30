
import loginModel from "../models/loginModel.ts"
import type { UsuarioLogin } from "../models/usuario.ts"



export class LoginController{

    validarLogin(usuarioLogar: UsuarioLogin){
        return loginModel.logar(usuarioLogar)
    }
}

export default new LoginController()