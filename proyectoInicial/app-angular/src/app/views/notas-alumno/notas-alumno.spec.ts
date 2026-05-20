import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasAlumno } from './notas-alumno';

describe('NotasAlumno', () => {
  let component: NotasAlumno;
  let fixture: ComponentFixture<NotasAlumno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasAlumno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasAlumno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
