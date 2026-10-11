import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, UsuarioAutenticado, UsuarioCriacao, UsuarioLogin } from '../components/exibir-usuarios/usuario';
import { LoginResposta } from './login';
import { Router } from '@angular/router';
import { UsuarioPerfil } from './usuario';

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

  buscarUsuarioAutenticado() {
    return this.#http.get<UsuarioAutenticado>(`${this.API}/usuarios/me`);
  } 
  consultarTodasDisponibilidades(): Observable<any> {
    return this.#http.get(`${this.API}/disponibilidades`);
  }
  buscarUsuarioPorIdParaPerfil() {
    return this.#http.get<UsuarioPerfil>(
      `${this.API}/usuarios/perfil`
    );
  }

}
