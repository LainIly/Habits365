import { Injectable } from '@angular/core';
import { Categorias } from '../models/categorias';

@Injectable({
  providedIn: 'root'
})
export class CrearCategoriasService {

  private categorias: Categorias[] = [];

  constructor() {
    const datosGuardados = localStorage.getItem('categorias');
    if (datosGuardados) {
      this.categorias = JSON.parse(datosGuardados)
    }
  }

  obtenerCategorias (): Categorias[] {
    return this.categorias;
  }

  agregarCategoria (n: Omit<Categorias, 'id'>) : Categorias {
    const nuevaCategoria: Categorias = {
      id: Date.now(),
      ...n
    };
    this.categorias.push(nuevaCategoria);
    this.guardarEnLocalStorage();
    return nuevaCategoria;
  }

  eliminarCategoria(id: number) : void {
    this.categorias = this.categorias.filter(n => n.id !== id);
    this.guardarEnLocalStorage();
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem('categorias', JSON.stringify(this.categorias));
  }
}