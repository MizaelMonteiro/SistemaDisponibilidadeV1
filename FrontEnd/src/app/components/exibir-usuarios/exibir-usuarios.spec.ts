import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExibirUsuarios } from './exibir-usuarios';

describe('ExibirUsuarios', () => {
  let component: ExibirUsuarios;
  let fixture: ComponentFixture<ExibirUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExibirUsuarios],
    }).compileComponents();

    fixture = TestBed.createComponent(ExibirUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
