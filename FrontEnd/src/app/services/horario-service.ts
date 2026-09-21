import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from './horario';

@Injectable({
    providedIn: 'root'
})
export class HorariosService {

    readonly API = 'http://localhost:3000';

    readonly #http = inject(HttpClient);

    obterTodos(): Observable<Horario[]> {
        return this.#http.get<Horario[]>(
            `${this.API}/horarios`
        );
    }
}