import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Disponibilidade } from './disponibilidade';

@Injectable({
  providedIn: 'root',
})
export class DisponibilidadeService {
  readonly API = 'http://localhost:3000';
  readonly #http = inject(HttpClient);

  buscarDisponibilidade() {
    return this.#http.get<Disponibilidade[]>(`${this.API}/disponibilidade`);
  }
  buscarDisponibilidadeProfessor(idProfessor: number) {
    return this.#http.get<Disponibilidade[]>(
      `${this.API}/disponibilidade/professor/${idProfessor}`,
    );
  }

  salvarDisponibilidade(horarios: number[], justificativa: string) {
    console.log('justificativa enviada para o backend:', justificativa);
    return this.#http.post(`${this.API}/disponibilidade`, {
      horarios,
      justificativa,
    });
  }

  buscarMinhaJustificativa() {
    return this.#http.get<any>(`${this.API}/justificativa`);
   
  }
  buscarJustificativaProfessor(idProfessor: number) {
  return this.#http.get<any>(
    `${this.API}/justificativa/professor/${idProfessor}`
  );
}
}
