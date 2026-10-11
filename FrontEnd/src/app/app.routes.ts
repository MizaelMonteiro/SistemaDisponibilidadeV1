import { Routes } from '@angular/router';
import { ExibirUsuarios } from './components/exibir-usuarios/exibir-usuarios';
import { CriarUsuario } from './components/criar-usuario/criar-usuario';
import { TelaLogin } from './components/tela-login/tela-login';
import { TelaInicial } from './components/tela-inicial/tela-inicial';
import { CadastrarDispo } from './components/cadastrar-dispo/cadastrar-dispo';
import { authGuard } from './guards/auth-guard';
import { MinhaDisponibilidade } from './components/minha-disponibilidade/minha-disponibilidade';
import { ListarProfessores } from './components/listar-professores/listar-professores';
import { PerfilUsuario } from './components/perfil-usuario/perfil-usuario';

import { coordenadorGuard } from './guards/coordenador-guard';
import { VisualizarDisponibilidadeProfessor } from './components/visualizar-disponibilidade-professor/visualizar-disponibilidade-professor';


export const routes: Routes = [
    {path: 'listar', component: ExibirUsuarios ,canActivate: [authGuard]},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'criar', component: CriarUsuario },
    {path: 'login', component: TelaLogin },
    {path: 'home', component: TelaInicial },
    {path: 'cadastrarDispo', component: CadastrarDispo, canActivate: [authGuard] },
    {path: 'minha-disponibilidade', component: MinhaDisponibilidade, canActivate: [authGuard] },
    {path: 'professores',component: ListarProfessores, canActivate: [authGuard, coordenadorGuard]},
    {path: 'disponibilidade-professor/:idProfessor',component: VisualizarDisponibilidadeProfessor},
    {path: 'perfil', component: PerfilUsuario, canActivate: [authGuard] },

    
];