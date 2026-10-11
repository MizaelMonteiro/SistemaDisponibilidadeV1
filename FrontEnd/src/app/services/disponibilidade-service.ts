import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Disponibilidade } from './disponibilidade';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadeService {

  readonly API = 'http://localhost:3000';
  readonly #http = inject(HttpClient);

  buscarDisponibilidade() {
    return this.#http.get<Disponibilidade[]>(
      `${this.API}/disponibilidade`
    );
  }
  buscarDisponibilidadeProfessor(idProfessor: number) {
  return this.#http.get<Disponibilidade[]>(
    `${this.API}/disponibilidade/professor/${idProfessor}`
  );
}

  salvarDisponibilidade(horarios: number[]) {
    return this.#http.post(
      `${this.API}/disponibilidade`,
      { horarios }
    );
  }
}