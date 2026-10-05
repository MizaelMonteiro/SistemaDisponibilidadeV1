import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';

import { Horario } from '../../services/horario';
import { HorariosService } from '../../services/horario-service';
import { DisponibilidadeService } from '../../services/disponibilidade-service';
import { ProfessorService } from '../../services/professor-service';
import { UsuariosService } from '../../services/usuarios-service';

interface LinhaHorario {
  hora: string;
  segunda: Horario;
  terca: Horario;
  quarta: Horario;
  quinta: Horario;
  sexta: Horario;
}

@Component({
  selector: 'app-minha-disponibilidade',
  imports: [CommonModule],
  templateUrl: './minha-disponibilidade.html',
  styleUrl: './minha-disponibilidade.scss'
})
export class MinhaDisponibilidade implements OnInit {

  readonly #horariosService = inject(HorariosService);
  readonly #disponibilidadeService = inject(DisponibilidadeService);
  readonly #professorService = inject(ProfessorService);
  readonly #usuariosService = inject(UsuariosService)

  protected nomeProfessor = signal('');
  protected linhas = signal<LinhaHorario[]>([]);
  protected horariosSelecionados = signal<number[]>([]);

  ngOnInit(): void {

    this.buscarProfessor();

    this.#horariosService.obterTodos().subscribe({
      next: (horarios) => {
        this.montarGrade(horarios);
        this.buscarDisponibilidade();
      },
      error: (erro) => {
        console.error('Erro ao buscar horários:', erro);
      }
    });
  }

  private buscarProfessor(): void {
    this.#professorService.buscarProfessor().subscribe({
      next: (professor) => {
        this.nomeProfessor.set(professor.Nome);
      },
      error: (erro) => {
        console.error('Erro ao buscar professor:', erro);
      }
    });
  }

  private montarGrade(horarios: Horario[]): void {

    const novasLinhas: LinhaHorario[] = [];

    for (let i = 0; i < 17; i++) {
      novasLinhas.push({
        hora: horarios[i].HoraInicio,
        segunda: horarios[i],
        terca: horarios[i + 17],
        quarta: horarios[i + 34],
        quinta: horarios[i + 51],
        sexta: horarios[i + 68]
      });
    }

    this.linhas.set(novasLinhas);
  }

  private buscarDisponibilidade(): void {

    this.#disponibilidadeService.buscarDisponibilidade().subscribe({
      next: (disponibilidades) => {

        const horarios = disponibilidades.map(
          (disponibilidade) => disponibilidade.IdHorario
        );

        this.horariosSelecionados.set(horarios);
      },

      error: (erro) => {
        console.error('Erro ao buscar disponibilidade:', erro);
      }
    });
  }

  protected estaDisponivel(idHorario: number): boolean {
    return this.horariosSelecionados().includes(idHorario);
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