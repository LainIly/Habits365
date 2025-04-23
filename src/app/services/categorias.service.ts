import { Injectable } from '@angular/core';
import { Categorias } from '../models/categorias';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categoriasSubject = new BehaviorSubject<Categorias[]>([]);
  categorias$ = this.categoriasSubject.asObservable();

  constructor () {
    const categoriasGuardadas = localStorage.getItem('categorias');
    const categorias = categoriasGuardadas ? JSON.parse(categoriasGuardadas) : [];
    this.categoriasSubject.next(categorias);
  }

  obtenerCategorias (): Categorias[] {
    return this.categoriasSubject.getValue();
  }

  agregarCategoria (categoria: Categorias) {
    const categorias = [ ...this.categoriasSubject.getValue(), categoria];
    this.categoriasSubject.next(categorias);
    localStorage.setItem('categorias', JSON.stringify(categorias));
  }

  editarCategoria (categoria: Categorias) {
    const categorias = this.categoriasSubject.getValue().map(c => c.id === categoria.id ? categoria : c);
    this.categoriasSubject.next(categorias);
    localStorage.setItem('categorias', JSON.stringify(categorias));
  }

  eliminarCategoria (id: number) {
    const categorias = this.categoriasSubject.getValue().filter(c => c.id !== id);
    this.categoriasSubject.next(categorias);
    localStorage.setItem('categorias', JSON.stringify(categorias));
  }
}
