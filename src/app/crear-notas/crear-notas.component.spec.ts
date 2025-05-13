import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearNotasComponent } from './crear-notas.component';
import { Router } from '@angular/router';
import { NotasService } from '../services/notas.service';
import { Nota } from '../models/notas.model';

describe('CrearNotasComponent', () => {
  let component: CrearNotasComponent;
  let fixture: ComponentFixture<CrearNotasComponent>;
  let mockNotasService: jasmine.SpyObj<NotasService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockNotasService = jasmine.createSpyObj('NotasService', ['obtenerNotas', 'agregarNota', 'eliminarNota']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockNotasService.obtenerNotas.and.returnValue([]); // Asegura que nunca sea undefined

    await TestBed.configureTestingModule({
      imports: [CrearNotasComponent],
      providers: [
        { provide: NotasService, useValue: mockNotasService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar notas desde el servicio en el constructor', () => {
    const notasMock: Nota[] = [
      { id: 1, titulo: 'Nota 1', contenido: 'Contenido 1', fecha: '2025-01-01', hora: '10:00', completadoHoy: false }
    ];
    mockNotasService.obtenerNotas.and.returnValue(notasMock);

    const newComponent = new CrearNotasComponent(mockRouter, mockNotasService);
    expect(newComponent.notas).toEqual(notasMock);
  });

  it('debe guardar una nota válida y navegar a /notas', () => {
    component.nuevaNota = {
      titulo: 'Test',
      contenido: 'Contenido',
      fecha: '2025-05-13',
      hora: '10:00'
    };
    component.notas = [];

    spyOn(localStorage, 'setItem');
    mockNotasService.agregarNota.and.stub();

    component.agregarNota();

    expect(component.notas.length).toBe(1);
    expect(mockNotasService.agregarNota).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/notas']);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('no debe agregar nota si algún campo está vacío', () => {
    spyOn(window, 'alert');

    // Asegura que notas está inicializado
    component.notas = [];

    component.nuevaNota = {
      titulo: '',
      contenido: '',
      fecha: '',
      hora: ''
    };

    component.agregarNota();

    expect(window.alert).toHaveBeenCalledWith('Debes llenar todos los campos');
    expect(mockNotasService.agregarNota).not.toHaveBeenCalled();
    expect(component.notas.length).toBe(0);
  });

  it('debe eliminar una nota correctamente', () => {
    component.notas = [
      { id: 1, titulo: 'T1', contenido: 'C1', fecha: '2025-01-01', hora: '10:00', completadoHoy: false },
      { id: 2, titulo: 'T2', contenido: 'C2', fecha: '2025-01-02', hora: '11:00', completadoHoy: false }
    ];
    mockNotasService.eliminarNota.and.stub();

    component.eliminarNota(1);

    expect(component.notas.length).toBe(1);
    expect(component.notas[0].id).toBe(2);
    expect(mockNotasService.eliminarNota).toHaveBeenCalledWith(1);
  });

  it('debe navegar al cancelar', () => {
    component.cancelar();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/notas']);
  });

  it('debe cargar notas desde localStorage si hay datos', () => {
    const mockNotas: Nota[] = [
      { id: 1, titulo: 'Nota', contenido: 'Contenido', fecha: '2025-01-01', hora: '10:00', completadoHoy: false }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockNotas));

    component.cargarListasDesdeLocalStorage();

    expect(component.notas).toEqual(mockNotas);
  });

  it('no debe modificar notas si no hay datos en localStorage', () => {
    component.notas = [{ id: 5, titulo: 'Ex', contenido: 'X', fecha: 'X', hora: 'X', completadoHoy: false }];
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.cargarListasDesdeLocalStorage();

    expect(component.notas.length).toBe(1);
    expect(component.notas[0].id).toBe(5);
  });
});
