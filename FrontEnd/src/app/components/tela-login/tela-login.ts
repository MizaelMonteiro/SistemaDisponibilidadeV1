import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios-service';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-tela-login',
  styleUrl: './tela-login.scss',
  templateUrl: './tela-login.html',
})
export class TelaLogin {
  readonly #usuariosService = inject(UsuariosService);


    email = '';
    senha = '';
    readonly #router = inject(Router);

    logarUsuario() {

        const usuarioLogar = {
            email: this.email,
            senha: this.senha
        };

        this.#usuariosService.login(usuarioLogar)
            .subscribe({
                next: resposta => {
                    console.log("Usuário logado!", resposta);
                    this.#router.navigate(['/listar']);
                },
                error: erro => {
                    console.log("Erro:", erro);
                }
            });
    }
}
