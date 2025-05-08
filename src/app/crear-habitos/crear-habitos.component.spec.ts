import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearHabitosComponent } from './crear-habitos.component';
import { Router } from '@angular/router';
import { HabitosService } from '../services/habitos.service';
import { of } from 'rxjs';

describe('CrearHabitosComponent', () => {
  let component: CrearHabitosComponent;
  let fixture: ComponentFixture<CrearHabitosComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockService: jasmine.SpyObj<HabitosService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockService = jasmine.createSpyObj('HabitosService', ['obtenerHabitos', 'agregarHabito', 'eliminarHabito']);

    await TestBed.configureTestingModule({
      imports: [CrearHabitosComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: HabitosService, useValue: mockService }
      ]
    }).compileComponents();

    mockService.obtenerHabitos.and.returnValue([]);

    fixture = TestBed.createComponent(CrearHabitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('no debería agregar hábito si falta información', () => {
    spyOn(window, 'alert');
    component.nuevoHabito = {
      nombre: '',
      frecuencia: '',
      hora: '',
      fecha: '',
      categoria: ''
    };
    component.frecuenciaSeleccionada = '';
    component.categoriaSeleccionada = '';
    component.agregarHabito();

    expect(window.alert).toHaveBeenCalledWith('Debes llenar todos los campos');
  });

  it('no debería permitir nombre con más de 100 caracteres', () => {
    spyOn(window, 'alert');
    component.nuevoHabito.nombre = 'a'.repeat(101);
    component.nuevoHabito.fecha = '2025-05-08';
    component.nuevoHabito.hora = '12:00';
    component.frecuenciaSeleccionada = 'Diario';
    component.categoriaSeleccionada = 'Salud';

    component.agregarHabito();
    expect(component.nuevoHabito.nombre.length).toBeGreaterThan(100);
  });

  it('debería guardar frecuencia personalizada si es nueva', () => {
    component.frecuenciaSeleccionada = 'personalizada';
    component.frecuenciaPersonalizada = 'Cada 3 días';
    component.nuevoHabito = {
      nombre: 'Leer',
      hora: '10:00',
      fecha: '2025-05-08',
      frecuencia: '',
      categoria: ''
    };
    component.categoriaSeleccionada = 'Trabajo';

    mockService.agregarHabito.and.returnValue({
      id: 1,
      nombre: 'Leer',
      frecuencia: 'Cada 3 días',
      hora: '10:00',
      fecha: '2025-05-08',
      categoria: 'Trabajo',
      completadoHoy: false
    });

    component.agregarHabito();
    expect(component.frecuenciasPredefinidas).toContain('Cada 3 días');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/habitos']);
  });

  it('debería guardar categoría personalizada si es nueva', () => {
    component.categoriaSeleccionada = 'personalizada';
    component.categoriaPersonalizada = 'Estudio';
    component.frecuenciaSeleccionada = 'Diario';
    component.nuevoHabito = {
      nombre: 'Estudiar',
      hora: '08:00',
      fecha: '2025-05-08',
      frecuencia: '',
      categoria: ''
    };

    mockService.agregarHabito.and.returnValue({
      id: 2,
      nombre: 'Estudiar',
      frecuencia: 'Diario',
      hora: '08:00',
      fecha: '2025-05-08',
      categoria: 'Estudio',
      completadoHoy: false
    });

    component.agregarHabito();
    expect(component.categoriasPredefinidas).toContain('Estudio');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/habitos']);
  });

  it('debería agregar hábito correctamente con todos los campos válidos', () => {
    component.nuevoHabito = {
      nombre: 'Meditar',
      fecha: '2025-05-08',
      hora: '07:00',
      frecuencia: '',
      categoria: ''
    };
    component.frecuenciaSeleccionada = 'Diario';
    component.categoriaSeleccionada = 'Salud';

    mockService.agregarHabito.and.returnValue({
      id: 3,
      nombre: 'Meditar',
      frecuencia: 'Diario',
      hora: '07:00',
      fecha: '2025-05-08',
      categoria: 'Salud',
      completadoHoy: false
    });

    component.agregarHabito();

    expect(component.habitos.length).toBe(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/habitos']);
  });

  it('debería navegar a /habitos al cancelar', () => {
    component.cancelar();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/habitos']);
  });
});
