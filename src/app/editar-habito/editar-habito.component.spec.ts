import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHabitoComponent } from './editar-habito.component';

describe('EditarHabitoComponent', () => {
  let component: EditarHabitoComponent;
  let fixture: ComponentFixture<EditarHabitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarHabitoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditarHabitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('El nombre del hábito es obligatorio', () => {
    component.habito.nombre = '';
    component.habito.frecuencia = 'Diaria';
    spyOn(window, 'alert');
    component.guardarCambios();
    expect(window.alert).toHaveBeenCalledWith('El nombre del hábito es obligatorio.');
  });

  it('No debe guardar los cambios si el nombre del hábito tiene más de 20 caracteres', () => {
    component.habito.nombre = 'Leer un libro todos los días de la semana';
    component.habito.frecuencia = 'Diaria';
    spyOn(window, 'alert');
    component.guardarCambios();
    expect(window.alert).toHaveBeenCalledWith('El nombre del hábito no puede tener más de 20 caracteres.');
  });

  it('No debe guardar los cambios si la fecha del hábito está vacía', () => {
    component.habito.nombre = 'Leer';
    component.habito.frecuencia = 'Diaria';
    component.habito.fecha = '';
    spyOn(window, 'alert');
    component.guardarCambios();
    expect(window.alert).toHaveBeenCalledWith('La fecha del hábito es obligatoria.');
  });

  it('No debe guardar los cambios si la fecha del hábito no es válida', () => {
    component.habito.nombre = 'Leer';
    component.habito.frecuencia = 'Diaria';
    component.habito.fecha = 'fecha-invalida';
    component.habito.hora = '08:00';
    spyOn(window, 'alert');
    component.guardarCambios();
    expect(window.alert).toHaveBeenCalledWith('La fecha del hábito no es válida.');
  });

  it('No debe guardar los cambios si la hora del hábito está vacía', () => {
    component.habito.nombre = 'Leer';
    component.habito.frecuencia = 'Diaria';
    component.habito.fecha = '2025-05-14';
    component.habito.hora = '';
    spyOn(window, 'alert');
    component.guardarCambios();
    expect(window.alert).toHaveBeenCalledWith('La hora del hábito es obligatoria.');
  });


  it('Debe guardar los cambios si todos los campos son válidos', () => {
    component.habito = {
      id: 1,
      nombre: 'Leer',
      frecuencia: 'Diaria',
      hora: '08:00',
      fecha: '2025-05-14',
      categoria: 'Personal',
      completadoHoy: false
    };

    const habitos = [
      { id: 1, nombre: 'Leer un libro todos los días de la semana', frecuencia: 'Diaria', hora: '07:00', fecha: '2025-05-14', categoria: 'Salud', completadoHoy: false }
    ];
    localStorage.setItem('habitos', JSON.stringify(habitos));

    component.guardarCambios();

    const habitosActualizados = JSON.parse(localStorage.getItem('habitos') || '[]');
    expect(habitosActualizados[0].nombre).toBe('Leer');
  });
});
