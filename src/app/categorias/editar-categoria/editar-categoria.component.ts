import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categorias } from '../../models/categorias';
import { Router } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-editar-categoria',
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent {

  categorias: Categorias[] = [];
  modal: boolean = true;
  onClose: any;

  categoria: Categorias = {
    id: 0,
    titulo: '',
    fecha: ''
  }

  constructor (
    private router: Router,
    private categoriasService: CategoriasService
  ) {
    // const categoriaGuardada = localStorage.getItem('categoriaAEditar');
    // if (categoriaGuardada) {
    //   this.categoria = JSON.parse(categoriaGuardada);
    // }
    this.categorias = this.categoriasService.obtenerCategorias();
    this.cargarListasDesdeLocalStorage();
  }
  

  cargarListasDesdeLocalStorage () {
    const datosGuardados = localStorage.getItem('categorias');
    if (datosGuardados) {
      this.categorias = JSON.parse(datosGuardados);
    }
  }

  guardarListasEnLocalStorage () {
    localStorage.setItem('categorias', JSON.stringify(this.categorias));
  }

  guardarCambios (): void {
    const listaCategorias = localStorage.getItem('categorias');
    let categorias: Categorias[] = listaCategorias ? JSON.parse(listaCategorias) : [];

    const index = categorias.findIndex(c => c.id === this.categoria.id);
    if (index !== -1) {
      categorias[index] = this.categoria;
      localStorage.setItem('categorias', JSON.stringify(categorias));
      this.router.navigate(['/listar-categoria']);
    }
    this.categoriasService.editarCategoria(this.categoria);
    this.cerrarModal();
  }

  cerrarModal () {
    this.modal = false;
  }
}
