import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios-service';

@Component({
    selector: 'app-criar-usuario',
    imports: [FormsModule],
    styleUrl: './criar-usuario.scss',
    templateUrl: './criar-usuario.html'
})
export class CriarUsuario {

    readonly #usuariosService = inject(UsuariosService);

    nome = '';
    email = '';
    senha = '';

    criarUsuario() {

        const novoUsuario = {
            nome: this.nome,
            email: this.email,
            senha: this.senha
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