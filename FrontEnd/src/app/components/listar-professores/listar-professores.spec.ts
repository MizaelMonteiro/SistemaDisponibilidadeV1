import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarProfessores } from './listar-professores';

describe('ListarProfessores', () => {
  let component: ListarProfessores;
  let fixture: ComponentFixture<ListarProfessores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarProfessores],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarProfessores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
