import { Routes } from '@angular/router';
import { ExibirUsuarios } from './components/exibir-usuarios/exibir-usuarios';
import { CriarUsuario } from './components/criar-usuario/criar-usuario';
import { TelaLogin } from './components/tela-login/tela-login';

export const routes: Routes = [
    {path: 'listar', component: ExibirUsuarios },
    {path: '', redirectTo: '/listar', pathMatch: 'full'},
    {path: 'criar', component: CriarUsuario },
    {path: 'login', component: TelaLogin }
];