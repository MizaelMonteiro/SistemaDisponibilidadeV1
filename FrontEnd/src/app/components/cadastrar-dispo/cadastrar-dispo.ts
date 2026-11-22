import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Horario } from '../../services/horario';
import { HorariosService } from '../../services/horario-service';
import { DisponibilidadeService } from '../../services/disponibilidade-service';
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
  imports: [CommonModule],
  selector: 'app-cadastrar-dispo',
  styleUrl: './cadastrar-dispo.scss',
  templateUrl: './cadastrar-dispo.html',
})
export class CadastrarDispo implements OnInit {
  readonly #usuariosService = inject(UsuariosService);
  readonly #horariosService = inject(HorariosService);

  readonly #disponibilidadeService = inject(DisponibilidadeService);
  readonly #router = inject(Router);

  protected horarios = signal<Horario[]>([]);
  protected linhas = signal<LinhaHorario[]>([]);
  protected horariosSelecionados = signal<number[]>([]);

  protected mostrarModalJustificativa = signal(false);
  protected justificativa = signal('');
  protected quantidadeIndisponivel = signal(0);

  ngOnInit(): void {
    this.buscarJustificativa();
    this.#horariosService.obterTodos().subscribe({
      next: (horarios) => {
        //console.log('Horários recebidos:', horarios);

        this.horarios.set(horarios);
        this.montarGrade();

        this.buscarDisponibilidade();
      },

      error: (erro) => {
        console.error('Erro ao buscar horários:', erro);
      },
    });
  }

  private montarGrade(): void {
    const horarios = this.horarios();

    const novasLinhas: LinhaHorario[] = [];

    for (let i = 0; i < 17; i++) {
      novasLinhas.push({
        hora: horarios[i].HoraInicio,

        segunda: horarios[i],

        terca: horarios[i + 17],

        quarta: horarios[i + 34],

        quinta: horarios[i + 51],

        sexta: horarios[i + 68],
      });
    }

    this.linhas.set(novasLinhas);

    //console.log('Grade montada:', this.linhas());
  }

  protected alternarHorario(idHorario: number, evento: Event): void {
    const checkbox = evento.target as HTMLInputElement;

    const selecionados = this.horariosSelecionados();

    if (checkbox.checked) {
      this.horariosSelecionados.set([...selecionados, idHorario]);
    } else {
      this.horariosSelecionados.set(selecionados.filter((id) => id !== idHorario));
    }

    console.log('Horários selecionados:', this.horariosSelecionados());
  }

  protected estaSelecionado(idHorario: number): boolean {
    return this.horariosSelecionados().includes(idHorario);
  }

  protected limparSelecao(): void {
    this.horariosSelecionados.set([]);

    console.log('Seleção limpa');
  }

  private buscarDisponibilidade(): void {
    this.#disponibilidadeService.buscarDisponibilidade().subscribe({
      next: (disponibilidades) => {
        console.log('Disponibilidades recebidas:', disponibilidades);

        const horarios = disponibilidades.map((disponibilidade) => disponibilidade.IdHorario);

        this.horariosSelecionados.set(horarios);
      },

      error: (erro) => {
        console.error('Erro ao buscar disponibilidade:', erro);
      },
    });
  }

  protected salvarDisponibilidade(): void {
    this.verificarDisponibilidade();
  }

  get estaLogado() {
    return localStorage.getItem('token') !== null;
  }
  logout() {
    console.log('Você fez logout eu acho');
    this.#usuariosService.logout();
    console.log('Você fez logout');
  }

  private salvarDados(justificativa: string): void {
    this.#disponibilidadeService
      .salvarDisponibilidade(this.horariosSelecionados(), justificativa)
      .subscribe({
        next: (resposta) => {
          console.log('Disponibilidade salva:', resposta);
          this.#router.navigate(['/minha-disponibilidade']);
        },

        error: (erro) => {
          console.error('Erro ao salvar disponibilidade:', erro);
        },
      });
  }

  protected verificarDisponibilidade(): void {
    const horarios = this.horariosSelecionados();

    const quantidadeIndisponivel = 85 - horarios.length;

    if (quantidadeIndisponivel > 0) {
      this.quantidadeIndisponivel.set(quantidadeIndisponivel);

      this.mostrarModalJustificativa.set(true);

      return;
    }

    this.salvarDados('');
  }

  protected confirmarJustificativa(): void {
    const texto = this.justificativa().trim();

    if (!texto) {
      return;
    }

    this.#disponibilidadeService
      .salvarDisponibilidade(this.horariosSelecionados(), texto)
      .subscribe({
        next: (resposta) => {
          console.log('Disponibilidade salva:', resposta);
          this.mostrarModalJustificativa.set(false);
          this.#router.navigate(['/minha-disponibilidade']);
        },

        error: (erro) => {
          console.error('Erro ao salvar disponibilidade:', erro);
        },
      });
  }

  protected cancelarJustificativa(): void {
    this.mostrarModalJustificativa.set(false);
  
  }

  private buscarJustificativa(): void {
    this.#disponibilidadeService.buscarMinhaJustificativa().subscribe({
      next: (resposta) => {
        this.justificativa.set(resposta?.Justificativa || '');
      },
      error: (erro) => {
        console.error('Erro ao buscar justificativa:', erro);
        console.error('Mensagem do backend:', erro.error);
      },
    });
  }
}
