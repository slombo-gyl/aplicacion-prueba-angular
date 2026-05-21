import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlumno } from './detalle-alumno';

describe('DetalleAlumno', () => {
  let component: DetalleAlumno;
  let fixture: ComponentFixture<DetalleAlumno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleAlumno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleAlumno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
