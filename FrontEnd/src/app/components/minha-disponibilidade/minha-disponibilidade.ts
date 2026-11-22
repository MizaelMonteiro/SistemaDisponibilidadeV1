import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';

import { Horario } from '../../services/horario';
import { HorariosService } from '../../services/horario-service';
import { DisponibilidadeService } from '../../services/disponibilidade-service';
import { ProfessorService } from '../../services/professor-service';
import { UsuariosService } from '../../services/usuarios-service';

import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

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

  protected mostrarJustificativa = signal(false);
  protected justificativa = signal('');


  

  ngOnInit(): void {
    this.buscarJustificativa();
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
  protected exportarPDF(): void {
  const documento = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  documento.setFontSize(18);
  documento.text('Minha disponibilidade semanal', 14, 18);

  documento.setFontSize(11);
  documento.text(
    `Professor: ${this.nomeProfessor()}`,
    14,
    27
  );

  const cabecalho = [[
    'Horário',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira'
  ]];

  const corpo = this.linhas().map((linha) => {
    return [
      linha.hora,
      this.estaDisponivel(linha.segunda.IdHorario) ? 'Disponível' : 'Indisponível',
      this.estaDisponivel(linha.terca.IdHorario) ? 'Disponível' : 'Indisponível',
      this.estaDisponivel(linha.quarta.IdHorario) ? 'Disponível' : 'Indisponível',
      this.estaDisponivel(linha.quinta.IdHorario) ? 'Disponível' : 'Indisponível',
      this.estaDisponivel(linha.sexta.IdHorario) ? 'Disponível' : 'Indisponível'
    ];
  });

  autoTable(documento, {
    head: cabecalho,
    body: corpo,
    startY: 34,
    theme: 'grid',

    styles: {
      fontSize: 9,
      halign: 'center',
      cellPadding: 3
    },

    headStyles: {
      fillColor: [36, 87, 167],
      textColor: 255,
      fontStyle: 'bold'
    },

    columnStyles: {
      0: {
        fontStyle: 'bold',
        cellWidth: 25
      }
    },

    didParseCell: (dados) => {
      if (dados.section === 'body' && dados.column.index > 0) {
        if (dados.cell.raw === 'Disponível') {
          dados.cell.styles.fillColor = [220, 252, 231];
          dados.cell.styles.textColor = [22, 101, 52];
        } else {
          dados.cell.styles.fillColor = [243, 244, 246];
          dados.cell.styles.textColor = [107, 114, 128];
        }
      }
    }
  });

  const nomeArquivo = this.nomeProfessor()
    .trim()
    .replace(/[^a-zA-Z0-9À-ÿ_-]+/g, '_');

  documento.save(`minha_disponibilidade_${nomeArquivo || 'professor'}.pdf`);
}


private buscarJustificativa(): void {
  this.#disponibilidadeService.buscarMinhaJustificativa().subscribe({
    next: (resposta) => {
      this.justificativa.set(resposta?.Justificativa || '');
    },
    error: (erro) => {
      console.error('Erro ao buscar justificativa:', erro);
      console.error('Mensagem do backend:', erro.error);
    }
  });
}

protected abrirJustificativa(): void {
  this.mostrarJustificativa.set(true);
}

protected fecharJustificativa(): void {
  this.mostrarJustificativa.set(false);
}

}