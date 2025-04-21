import { Injectable } from '@angular/core';
import { Nota } from '../models/notas.model';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private clave = 'notas';

  obtenerNotas (): Nota[] {
    const data = localStorage.getItem(this.clave);
    return data ? JSON.parse(data) : [];
  }

  agregarNota (nota: Omit<Nota, 'id'>): Nota {
    const notas = this.obtenerNotas();
    const nuevaNota: Nota = { ...nota, id: Date.now() };
    notas.push(nuevaNota);
    localStorage.setItem(this.clave, JSON.stringify(notas));
    return nuevaNota;
  }

  eliminarNota (id: number) {
    const notas = this.obtenerNotas().filter(n => n.id !== id);
    localStorage.setItem(this.clave, JSON.stringify(notas));
  }

  obtenerNotaPorId (id: number): Nota | undefined {
    const notas = this.obtenerNotas();
    return notas.find(n => n.id === id);
  }

}
