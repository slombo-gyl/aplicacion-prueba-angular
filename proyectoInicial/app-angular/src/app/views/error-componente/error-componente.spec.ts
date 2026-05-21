import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponente } from './error-componente';

describe('ErrorComponente', () => {
  let component: ErrorComponente;
  let fixture: ComponentFixture<ErrorComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorComponente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorComponente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
