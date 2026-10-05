import { Component, inject, signal } from '@angular/core';
import { UsuariosService } from '../../services/usuarios-service';
import { ProfessorService } from '../../services/professor-service';

@Component({
  imports: [],
  selector: 'app-tela-inicial',
  styleUrl: './tela-inicial.scss',
  templateUrl: './tela-inicial.html',
})
export class TelaInicial {
  readonly #usuariosService = inject(UsuariosService)
  readonly #professorService = inject(ProfessorService);
  protected nomeProfessor = signal('');
  
  ngOnInit(): void {

    this.#professorService.buscarProfessor().subscribe({
        next: (professor) => {
            this.nomeProfessor.set(professor.Nome);
        },
        error: (erro) => {
            console.error('Erro ao buscar professor:', erro);
        }
    });

}

  get estaLogado() {
    return localStorage.getItem('token') !== null;
  }
  logout(){
    console.log("Você fez logout eu acho")
    this.#usuariosService.logout()
    console.log("Você fez logout")
  }
}
