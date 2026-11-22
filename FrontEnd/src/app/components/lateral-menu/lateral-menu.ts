import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsuariosService } from '../../services/usuarios-service';


@Component({
  selector: 'app-lateral-menu',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './lateral-menu.html',
  styleUrl: './lateral-menu.scss',
})
export class LateralMenu implements OnInit {
  readonly #usuariosService = inject(UsuariosService);
  readonly #router = inject(Router);

  protected nomeUsuario = signal('');
  protected nivelAcesso = signal('');
  protected carregando = signal(false);

  constructor() {
    effect(() => {
      this.#usuariosService.usuarioAtualizado();

      if (localStorage.getItem('token')) {
        this.buscarUsuario();
      }
    });
  }
  ngOnInit(): void {
    this.buscarUsuario();
  }

  private buscarUsuario(): void {
    if (!localStorage.getItem('token')) {
      return;
    }

    this.carregando.set(true);

    this.#usuariosService.buscarUsuarioAutenticado().subscribe({
      next: (usuario) => {
        this.nomeUsuario.set(usuario.Nome);
        this.nivelAcesso.set(usuario.NivelAcesso);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao buscar usuário autenticado:', erro);
        this.carregando.set(false);
      },
    });
  }

  protected coordenador(): boolean {
    return this.nivelAcesso() === 'COORDENADOR';
  }

  protected professor(): boolean {
    return this.nivelAcesso() === 'PROFESSOR';
  }

  protected get estaLogado(): boolean {
    return localStorage.getItem('token') !== null;
  }

  protected logout(): void {
    this.#usuariosService.logout();
    this.#router.navigate(['/login']);
  }
}