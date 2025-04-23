import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { CrearCategoriaComponent } from '../crear-categoria/crear-categoria.component';
import { Router } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { Categorias } from '../../models/categorias';
import { CommonModule } from '@angular/common';
import { EditarCategoriaComponent } from '../editar-categoria/editar-categoria.component';

@Component({
  selector: 'app-listar-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-categoria.component.html',
  styleUrl: './listar-categoria.component.css'
})
export class ListarCategoriaComponent {

  categorias: Categorias[] = [];
  @ViewChild('modalContainer', { read: ViewContainerRef, static: true }) modalContainer!: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private router: Router,
    private categoriasService: CategoriasService
  ) { }

  ngOnInit(): void {
    this.cargarCategorias();
    this.categoriasService.categorias$.subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  cargarCategorias(): void {
    this.categorias = this.categoriasService.obtenerCategorias();
  }

  irACategorias(): void {
    this.router.navigate(['/crear-categoria']);
  }

  editarCategoria(categoria: Categorias): void {
    localStorage.setItem('categoriaAEditar', JSON.stringify(categoria));
    this.router.navigate(['/editar-categoria']);
  }

  eliminarCategoria(id: number) {
    this.categoriasService.eliminarCategoria(id);
    this.cargarCategorias();
  }

  guardarEnLocalStorage(): void {
    localStorage.setItem('categorias', JSON.stringify(this.categorias));
    this.cargarCategorias();
  }

  abrirModal() {
    this.modalContainer.clear();

    const factory = this.resolver.resolveComponentFactory(CrearCategoriaComponent);
    const componentRef = this.modalContainer.createComponent(factory);
  }

  openModalEditarCategoria(categoria: any) {
    this.modalContainer.clear();

    const factory = this.resolver.resolveComponentFactory(EditarCategoriaComponent);
    const componentRef = this.modalContainer.createComponent(factory);

    const categoriaCopia = { ...categoria };
    componentRef.instance.categoria = categoriaCopia;

    componentRef.instance.onClose.subscribe((categoriaEditada: any) => {
      if (categoriaEditada) {
        let INDEX = this.categorias.findIndex((cat) => cat.id === categoria.id);
        if (INDEX !== -1) {
          this.categorias[INDEX] = categoriaEditada
        }
      }
    })
  }
}