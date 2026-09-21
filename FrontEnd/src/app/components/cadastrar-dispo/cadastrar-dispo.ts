import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';

import { Horario } from '../../services/horario';
import { HorariosService } from '../../services/horario-service';

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

    readonly #horariosService = inject(HorariosService);

    protected horarios = signal<Horario[]>([]);

    protected linhas = signal<LinhaHorario[]>([]);

    protected horariosSelecionados = signal<number[]>([]);


    ngOnInit(): void {

        this.#horariosService.obterTodos()
            .subscribe({

                next: (horarios) => {

                    console.log('Horários recebidos:', horarios);

                    this.horarios.set(horarios);

                    this.montarGrade();

                },

                error: (erro) => {

                    console.error(
                        'Erro ao buscar horários:',
                        erro
                    );

                }

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

                sexta: horarios[i + 68]

            });
        }

        this.linhas.set(novasLinhas);

        console.log(
            'Grade montada:',
            this.linhas()
        );
    }


    protected alternarHorario(
        idHorario: number,
        evento: Event
    ): void {

        const checkbox =
            evento.target as HTMLInputElement;

        const selecionados =
            this.horariosSelecionados();


        if (checkbox.checked) {

            this.horariosSelecionados.set([
                ...selecionados,
                idHorario
            ]);

        } else {

            this.horariosSelecionados.set(
                selecionados.filter(
                    id => id !== idHorario
                )
            );

        }

        console.log(
            'Horários selecionados:',
            this.horariosSelecionados()
        );
    }


    protected estaSelecionado(
        idHorario: number
    ): boolean {

        return this.horariosSelecionados()
            .includes(idHorario);
    }


    protected limparSelecao(): void {

        this.horariosSelecionados.set([]);

        console.log('Seleção limpa');
    }


    protected salvarDisponibilidade(): void {

        console.log(
            'Horários que serão salvos:',
            this.horariosSelecionados()
        );
    }
}