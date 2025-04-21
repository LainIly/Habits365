import { Injectable } from '@angular/core';
import { Nota } from '../models/notas.model';

@Injectable({
  providedIn: 'root'
})
export class CrearNotasService {

  private notas: Nota[] = [];

  constructor() {
    const datosGuardados = localStorage.getItem('notas');
    if (datosGuardados) {
      this.notas = JSON.parse(datosGuardados);
    }
  }

  obtenerNotas (): Nota[] {
    return this.notas;
  }

  agregarNota (n: Omit<Nota, 'id'>) : Nota {
    const nuevaNota: Nota = {
      id: Date.now(),
      ...n
    };
    this.notas.push(nuevaNota);
    this.guardarEnLocalStorage();
    return nuevaNota;
  }

  eliminarNota(id: number) : void {
    this.notas = this.notas.filter(n => n.id !== id);
    this.guardarEnLocalStorage();
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem('notas', JSON.stringify(this.notas));
  } 
}
