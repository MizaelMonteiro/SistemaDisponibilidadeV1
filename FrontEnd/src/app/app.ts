import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExibirUsuarios } from "./components/exibir-usuarios/exibir-usuarios";
import { CriarUsuario } from "./components/criar-usuario/criar-usuario";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('FrontEnd');
}
