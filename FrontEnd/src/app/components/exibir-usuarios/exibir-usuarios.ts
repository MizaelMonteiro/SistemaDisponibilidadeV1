import { Component, inject, signal } from '@angular/core';
import { Usuario } from './usuario';
import { UsuariosService } from '../../services/usuarios-service';

@Component({
  imports: [],
  selector: 'app-exibir-usuarios',
  styleUrl: './exibir-usuarios.scss',
  templateUrl: './exibir-usuarios.html',
})
export class ExibirUsuarios {
  readonly #usuariosService = inject(UsuariosService)
  protected usuarios = 
    signal<Usuario[]>([])

  constructor() {
    this.#usuariosService.obterTodos().subscribe(
      res => {
        console.log(res);
        this.usuarios.set(res);
      })
  }
}
