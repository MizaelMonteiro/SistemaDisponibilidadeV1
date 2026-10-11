import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExibirUsuarios } from "./components/exibir-usuarios/exibir-usuarios";
import { CriarUsuario } from "./components/criar-usuario/criar-usuario";
import {LateralMenu} from './components/lateral-menu/lateral-menu';
import { LayoutPrincipal } from './layouts/layout-principal/layout-principal';

@Component({
  selector: 'app-root',
  imports: [LayoutPrincipal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('FrontEnd');
}
