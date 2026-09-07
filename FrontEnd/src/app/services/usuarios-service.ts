import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, UsuarioCriacao, UsuarioLogin } from '../components/exibir-usuarios/usuario';
import { LoginResposta } from './login';
import { Router } from '@angular/router';

@Service()
export class UsuariosService {
  readonly API = 'http://localhost:3000';
  readonly #http = inject(HttpClient);

  readonly #router = inject(Router);

  obterTodos(): Observable<Usuario[]> {
    return this.#http.get<Usuario[]>(`${this.API}/usuarios`);
  }

  criar(usuario: UsuarioCriacao) {
    return this.#http.post(
        `${this.API}/usuarios`,
        usuario
    );
  }

  logar(usuario: UsuarioLogin): Observable<LoginResposta> {
    return this.#http.post<LoginResposta>(
        `${this.API}/login`,
        usuario
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.#router.navigate(['/login']);
  }
}
