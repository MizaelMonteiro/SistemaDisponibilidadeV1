import { Routes } from '@angular/router';
import { ExibirUsuarios } from './components/exibir-usuarios/exibir-usuarios';
import { CriarUsuario } from './components/criar-usuario/criar-usuario';
import { TelaLogin } from './components/tela-login/tela-login';
import { TelaInicial } from './components/tela-inicial/tela-inicial';
import { CadastrarDispo } from './components/cadastrar-dispo/cadastrar-dispo';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
    {path: 'listar', component: ExibirUsuarios ,canActivate: [authGuard]},
    {path: '', redirectTo: '/listar', pathMatch: 'full'},
    {path: 'criar', component: CriarUsuario },
    {path: 'login', component: TelaLogin },
    {path: 'home', component: TelaInicial },
    {path: 'cadastrarDispo', component: CadastrarDispo }
];