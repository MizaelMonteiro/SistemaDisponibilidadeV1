import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LateralMenu} from '../../components/lateral-menu/lateral-menu';

@Component({
  selector: 'app-layout-principal',
  imports: [RouterOutlet, LateralMenu],
  templateUrl: './layout-principal.html',
  styleUrl: './layout-principal.scss'
})
export class LayoutPrincipal {}