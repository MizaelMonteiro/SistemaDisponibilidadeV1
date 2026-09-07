import { Component, inject } from '@angular/core';
import { UsuariosService } from '../../services/usuarios-service';

@Component({
  imports: [],
  selector: 'app-tela-inicial',
  styleUrl: './tela-inicial.scss',
  templateUrl: './tela-inicial.html',
})
export class TelaInicial {
  readonly #usuariosService = inject(UsuariosService)

  get estaLogado() {
    return localStorage.getItem('token') !== null;
  }
  logout(){
    console.log("Você fez logout eu acho")
    this.#usuariosService.logout()
    console.log("Você fez logout")
  }
}
