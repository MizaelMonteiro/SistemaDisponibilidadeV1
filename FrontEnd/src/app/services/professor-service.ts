import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Professor } from './professor';

@Injectable({
    providedIn: 'root'
})
export class ProfessorService {

    readonly API = 'http://localhost:3000';
    readonly #http = inject(HttpClient);

    buscarProfessor(): Observable<Professor> {
        return this.#http.get<Professor>(
            `${this.API}/professores/buscarIndividual`
        );
    }
    buscarTodosProfessores(): Observable<Professor[]> {
        return this.#http.get<Professor[]>(
            `${this.API}/professores`
        );
    }
}