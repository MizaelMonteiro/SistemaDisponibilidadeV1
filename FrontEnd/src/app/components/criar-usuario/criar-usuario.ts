import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios-service';
import type { NivelAcesso } from '../exibir-usuarios/usuario';
@Component({
    selector: 'app-criar-usuario',
    imports: [FormsModule],
    styleUrl: './criar-usuario.scss',
    templateUrl: './criar-usuario.html'
})
export class CriarUsuario {

    readonly #usuariosService = inject(UsuariosService);

    nome="";
    identificadorInst="";
    email="";
    senha="";
    nivelAcesso: NivelAcesso = "PROFESSOR";
    ativo=true;
    criarUsuario() {

        const novoUsuario = {
            nome: this.nome,
            identificadorInst: this.identificadorInst,
            email: this.email,
            senha: this.senha,
            nivelAcesso: this.nivelAcesso,
            ativo: this.ativo
        };

        this.#usuariosService.criar(novoUsuario)
            .subscribe({
                next: resposta => {
                    console.log("Usuário criado!", resposta);
                },
                error: erro => {
                    console.log("Erro:", erro);
                }
            });
    }
}