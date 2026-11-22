import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ProfessorService } from '../../services/professor-service';
import { DisponibilidadeService } from '../../services/disponibilidade-service';

import type { Professor } from '../../services/professor';
import type { Disponibilidade } from '../../services/disponibilidade';

import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

@Component({
  selector: 'app-visualizar-disponibilidade-professor',
  imports: [CommonModule],
  templateUrl: './visualizar-disponibilidade-professor.html',
  styleUrl: './visualizar-disponibilidade-professor.scss',
})
export class VisualizarDisponibilidadeProfessor implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #professorService = inject(ProfessorService);
  readonly #disponibilidadeService = inject(DisponibilidadeService);

  professor = signal<Professor | null>(null);
  horariosDisponiveis = signal<Set<number>>(new Set());

  carregando = signal(true);
  mensagemErro = signal('');

  justificativa = signal('');
  mostrarJustificativa = signal(false);

  readonly diasSemana = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
  ];

  readonly horarios = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    hora: `${String(7 + Math.floor((i * 60) / 60)).padStart(2, '0')}:${String((i * 60) % 60).padStart(2, '0')}`,
  }));

  ngOnInit(): void {
    const idProfessor = Number(this.#route.snapshot.paramMap.get('idProfessor'));

    if (!Number.isInteger(idProfessor) || idProfessor <= 0) {
      this.mensagemErro.set('O identificador do professor é inválido.');
      this.carregando.set(false);
      return;
    }

    forkJoin({
      professores: this.#professorService.buscarTodosProfessores(),
      disponibilidade: this.#disponibilidadeService.buscarDisponibilidadeProfessor(idProfessor),
      justificativa: this.#disponibilidadeService.buscarJustificativaProfessor(idProfessor),
    }).subscribe({
      next: ({ professores, disponibilidade, justificativa }) => {
        
        const professorEncontrado = professores.find(
          (professor) => professor.IdProfessor === idProfessor,
        );
        console.log('Resposta da disponibilidade:', disponibilidade);
        console.log('Resposta da justificativa:', justificativa);
        console.log('É um array?', Array.isArray(disponibilidade));
        if (!professorEncontrado) {
          this.mensagemErro.set('Professor não encontrado.');
          this.carregando.set(false);
          return;
        }

        this.professor.set(professorEncontrado);
        this.justificativa.set(justificativa?.Justificativa || '');

        this.horariosDisponiveis.set(
          new Set(disponibilidade.map((item) => Number(item.IdHorario))),
        );

        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao consultar disponibilidade do professor:', erro);

        this.mensagemErro.set('Não foi possível carregar a disponibilidade deste professor.');

        this.carregando.set(false);
      },
    });
  }

  horarioDisponivel(idHorario: number): boolean {
    return this.horariosDisponiveis().has(idHorario);
  }

  obterIdHorario(diaIndex: number, horarioIndex: number): number {
    return diaIndex * 17 + horarioIndex + 1;
  }

  voltarParaProfessores(): void {
    this.#router.navigate(['/professores']);
  }



  exportarPDF(): void {
    const professor = this.professor();

    if (!professor) {
      return;
    }

    const documento = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    documento.setFontSize(18);
    documento.text('Disponibilidade do Professor', 14, 18);

    documento.setFontSize(12);
    documento.text(`Professor: ${professor.Nome}`, 14, 27);

    const cabecalho = [['Horário', ...this.diasSemana]];

    const linhas = this.horarios.map((horario, horarioIndex) => {
      const celulas = this.diasSemana.map((_, diaIndex) => {
        const idHorario = this.obterIdHorario(diaIndex, horarioIndex);

        return this.horarioDisponivel(idHorario) ? 'Disponível' : 'Indisponível';
      });

      return [horario.hora, ...celulas];
    });

    autoTable(documento, {
      head: cabecalho,
      body: linhas,
      startY: 34,
      theme: 'grid',

      styles: {
        halign: 'center',
        valign: 'middle',
        fontSize: 9,
        cellPadding: 3,
      },

      headStyles: {
        fillColor: [49, 86, 163],
        textColor: 255,
        fontStyle: 'bold',
      },

      columnStyles: {
        0: {
          cellWidth: 22,
          fontStyle: 'bold',
        },
      },

      didParseCell: (dados) => {
        if (dados.section !== 'body' || dados.column.index === 0) {
          return;
        }

        if (dados.cell.raw === 'Disponível') {
          dados.cell.styles.fillColor = [220, 252, 231];
          dados.cell.styles.textColor = [22, 101, 52];
        } else {
          dados.cell.styles.fillColor = [241, 245, 249];
          dados.cell.styles.textColor = [100, 116, 139];
        }
      },

      margin: {
        top: 12,
        right: 14,
        bottom: 12,
        left: 14,
      },
    });

    const nomeArquivo = professor.Nome
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_');

    documento.save(`disponibilidade_${nomeArquivo}.pdf`);
  }
  abrirJustificativa(): void {
  this.mostrarJustificativa.set(true);
}

  fecharJustificativa(): void {
    this.mostrarJustificativa.set(false);
  }
}
