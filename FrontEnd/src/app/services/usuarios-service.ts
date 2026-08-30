import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, UsuarioCriacao, UsuarioLogin } from '../components/exibir-usuarios/usuario';

@Service()
export class UsuariosService {
  readonly API = 'http://localhost:3000';
  readonly #http = inject(HttpClient);

  obterTodos(): Observable<Usuario[]> {
    return this.#http.get<Usuario[]>(`${this.API}/usuarios`);
  }

  criar(usuario: UsuarioCriacao) {
    return this.#http.post(
        `${this.API}/usuarios`,
        usuario
    );
  }

  login(usuario:UsuarioLogin){
    return this.#http.post(
        `${this.API}/login`,
        usuario
    );
  }
}
