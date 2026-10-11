import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfessorService } from '../../services/professor-service';
import type { Professor } from '../../services/professor';

@Component({
  imports: [],
  selector: 'app-listar-professores',
  styleUrl: './listar-professores.scss',
  templateUrl: './listar-professores.html',
})
export class ListarProfessores implements OnInit {
  readonly #professorService = inject(ProfessorService);
  readonly #router = inject(Router);

  professores = signal<Professor[]>([]);
  carregando = signal(true);
  mensagemErro = signal('');

  ngOnInit(): void {
    this.buscarProfessores();
  }

  buscarProfessores(): void {
    this.carregando.set(true);
    this.mensagemErro.set('');

    this.#professorService.buscarTodosProfessores().subscribe({
      next: (professores) => {
        this.professores.set(professores);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao buscar professores:', erro);

        this.mensagemErro.set(
          'Não foi possível carregar a lista de professores.'
        );

        this.carregando.set(false);
      }
    });
  }

  consultarDisponibilidade(idProfessor: number): void {
    this.#router.navigate(['/disponibilidade-professor', idProfessor]);
  }
    voltarParaHome(): void {
    this.#router.navigate(['/home']);
  }
}