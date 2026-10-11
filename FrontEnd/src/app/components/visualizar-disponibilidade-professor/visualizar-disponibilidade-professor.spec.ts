import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarDisponibilidadeProfessor } from './visualizar-disponibilidade-professor';

describe('VisualizarDisponibilidadeProfessor', () => {
  let component: VisualizarDisponibilidadeProfessor;
  let fixture: ComponentFixture<VisualizarDisponibilidadeProfessor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarDisponibilidadeProfessor],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarDisponibilidadeProfessor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
