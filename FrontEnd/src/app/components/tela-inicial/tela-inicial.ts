import { Component, inject, signal } from '@angular/core';
import { UsuariosService } from '../../services/usuarios-service';
import { ProfessorService } from '../../services/professor-service';
import type {UsuarioAutenticado} from '../exibir-usuarios/usuario';
import { NgClass } from '../../../../node_modules/@angular/common/types/_common_module-chunk';

@Component({
  imports: [],
  selector: 'app-tela-inicial',
  styleUrl: './tela-inicial.scss',
  templateUrl: './tela-inicial.html',
})
export class TelaInicial {
  readonly #usuariosService = inject(UsuariosService)
  readonly #professorService = inject(ProfessorService);
  protected nomeUsuario = signal('');
  protected nivelAcesso = signal('');
  
  ngOnInit(): void {

    this.#usuariosService.buscarUsuarioAutenticado().subscribe({
    next: (usuario) => {
      this.nomeUsuario.set(usuario.Nome);
      this.nivelAcesso.set(usuario.NivelAcesso);
    },
    error: (erro) => {
      console.error('Erro ao buscar usuário:', erro);
    }
    
  });
  

}

  get estaLogado() {
    return localStorage.getItem('token') !== null;
    
  }
  coordenador() {
    const nivelAcesso = this.nivelAcesso();
    return nivelAcesso === 'COORDENADOR';
  }
  professor() {
    const nivelAcesso = this.nivelAcesso();
    return nivelAcesso === 'PROFESSOR';
  }

  logout(){
    console.log("Você fez logout eu acho")
    this.#usuariosService.logout()
    console.log("Você fez logout")
  }
}
