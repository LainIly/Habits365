import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categorias } from '../../models/categorias';
import { Router } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css'
})
export class CrearCategoriaComponent {

  categorias: Categorias[] = [];
  modal: boolean = true;

  nuevaCategoria: Omit<Categorias, 'id'> = {
    titulo: '',
    fecha: ''
  }

  constructor(
    private router: Router,
    private categoriasService: CategoriasService
  ) {
    this.categorias = this.categoriasService.obtenerCategorias();
    this.cargarListasDesdeLocalStorage();
  }

  ngOnInit() {
    this.categoriasService.categorias$.subscribe(categorias => {
      this.categorias = this.categorias;
    });
  }

  cargarListasDesdeLocalStorage() {
    const datosGuardados = localStorage.getItem('categorias');
    if (datosGuardados) {
      this.categorias = JSON.parse(datosGuardados);
    }
  }

  guardarListasEnLocalStorage() {
    localStorage.setItem('categorias', JSON.stringify(this.categorias));
  }

  agregarCategoria() {
    const { titulo, fecha } = this.nuevaCategoria;

    if (!titulo || !fecha) {
      alert('Debes llenar todos los campos');
      return;
    }

    const nuevaCategoria: Categorias = {
      id: Date.now(),
      ...this.nuevaCategoria
    }

    this.categoriasService.agregarCategoria(nuevaCategoria);
    this.cerrarModal();
  }
  
  cerrarModal() {
    this.modal = false;
  }
}
