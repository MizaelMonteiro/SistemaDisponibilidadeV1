import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
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
  readonly usuarioAtualizado = signal(0);
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
  

  notificarLogin() {
    this.usuarioAtualizado.update(valor => valor + 1);
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
