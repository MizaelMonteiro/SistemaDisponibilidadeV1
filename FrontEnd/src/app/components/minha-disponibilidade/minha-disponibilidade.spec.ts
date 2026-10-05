import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhaDisponibilidade } from './minha-disponibilidade';

describe('MinhaDisponibilidade', () => {
  let component: MinhaDisponibilidade;
  let fixture: ComponentFixture<MinhaDisponibilidade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhaDisponibilidade],
    }).compileComponents();

    fixture = TestBed.createComponent(MinhaDisponibilidade);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
