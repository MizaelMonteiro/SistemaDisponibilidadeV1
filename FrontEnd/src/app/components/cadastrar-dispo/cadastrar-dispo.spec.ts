import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarDispo } from './cadastrar-dispo';

describe('CadastrarDispo', () => {
  let component: CadastrarDispo;
  let fixture: ComponentFixture<CadastrarDispo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarDispo],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarDispo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
