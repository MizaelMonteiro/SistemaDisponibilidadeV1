import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios-service';

interface Usuario {
  IdUsuario: number;
  Nome: string;
  IdentificadorInst: string;
  Email: string;
  NivelAcesso: 'PROFESSOR' | 'COORDENADOR';
  Ativo: boolean;
}

@Component({
  selector: 'app-perfil-usuario',
  imports: [CommonModule],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.scss'
})
export class PerfilUsuario implements OnInit {

  readonly #usuariosService = inject(UsuariosService);

  usuario = signal<Usuario | null>(null);
  carregando = signal(true);
  mensagemErro = signal('');

  ngOnInit(): void {
    this.buscarPerfil();
  }

  buscarPerfil(): void {
    this.carregando.set(true);
    this.mensagemErro.set('');

    this.#usuariosService.buscarUsuarioPorIdParaPerfil().subscribe({
      next: (usuario) => {
        this.usuario.set(usuario);
        this.carregando.set(false);
      },

      error: (erro) => {
        console.error('Erro ao carregar o perfil:', erro);

        this.mensagemErro.set(
          'Não foi possível carregar os dados do perfil.'
        );

        this.carregando.set(false);
      }
    });
  }

  obterNivelAcesso(): string {
    const nivel = this.usuario()?.NivelAcesso;

    if (nivel === 'PROFESSOR') {
      return 'Professor';
    }

    if (nivel === 'COORDENADOR') {
      return 'Coordenador';
    }

    return 'Não informado';
  }

  obterSituacao(): string {
    return this.usuario()?.Ativo ? 'Ativo' : 'Inativo';
  }

  obterIniciais(): string {
    const nome = this.usuario()?.Nome;

    if (!nome) {
      return '?';
    }

    const partes = nome.trim().split(/\s+/);

    if (partes.length === 1) {
      return partes[0].charAt(0).toUpperCase();
    }

    return (
      partes[0].charAt(0) +
      partes[partes.length - 1].charAt(0)
    ).toUpperCase();
  }
}