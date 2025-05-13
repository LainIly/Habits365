import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearCategoriaComponent } from './crear-categoria.component';
import { CategoriasService } from '../../services/categorias.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Categorias } from '../../models/categorias';

describe('CrearCategoriaComponent', () => {
  let component: CrearCategoriaComponent;
  let fixture: ComponentFixture<CrearCategoriaComponent>;
  let categoriasServiceMock: any;

  beforeEach(async () => {
    categoriasServiceMock = {
      categorias$: of([]),
      obtenerCategorias: jasmine.createSpy('obtenerCategorias').and.returnValue([]),
      agregarCategoria: jasmine.createSpy('agregarCategoria')
    };

    await TestBed.configureTestingModule({
      imports: [CrearCategoriaComponent],
      providers: [
        { provide: CategoriasService, useValue: categoriasServiceMock },
        { provide: Router, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('no debería agregar una categoría si faltan datos', () => {
    spyOn(window, 'alert');
    component.nuevaCategoria = { titulo: '', fecha: '' };
    component.agregarCategoria();
    expect(window.alert).toHaveBeenCalledWith('Debes llenar todos los campos');
    expect(categoriasServiceMock.agregarCategoria).not.toHaveBeenCalled();
  });

  it('debería agregar una categoría cuando los datos son válidos', () => {
    component.nuevaCategoria = { titulo: 'Prueba', fecha: '2025-05-12' };
    component.agregarCategoria();
    expect(categoriasServiceMock.agregarCategoria).toHaveBeenCalledWith(jasmine.objectContaining({
      titulo: 'Prueba',
      fecha: '2025-05-12'
    }));
  });

  it('debería cerrar el modal después de agregar una categoría', () => {
    component.nuevaCategoria = { titulo: 'Prueba', fecha: '2025-05-12' };
    component.agregarCategoria();
    expect(component.modal).toBeFalse();
  });

  it('debería cargar las categorías desde localStorage', () => {
    const datosPrueba: Categorias[] = [{ id: 1, titulo: 'Test', fecha: '2025-05-12' }];
    localStorage.setItem('categorias', JSON.stringify(datosPrueba));

    component.cargarListasDesdeLocalStorage();

    expect(component.categorias).toEqual(datosPrueba);
  });
});
