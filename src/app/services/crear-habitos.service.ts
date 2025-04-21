import { Injectable } from '@angular/core';
import { Habito } from '../models/habitos.model'; 

@Injectable({
  providedIn: 'root'
})
export class HabitosService {
  private habitos: Habito[] = [];

  constructor() {
    const datosGuardados = localStorage.getItem('habitos');
    if (datosGuardados) {
      this.habitos = JSON.parse(datosGuardados);
    }
  }

  obtenerHabitos(): Habito[] {
    return this.habitos;
  }

  agregarHabito(h: Omit<Habito, 'id'>): Habito {
    const nuevoHabito: Habito = {
      id: Date.now(),
      ...h
    };
    this.habitos.push(nuevoHabito);
    this.guardarEnLocalStorage();
    return nuevoHabito;
  }

  eliminarHabito(id: number): void {
    this.habitos = this.habitos.filter(h => h.id !== id);
    this.guardarEnLocalStorage();
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem('habitos', JSON.stringify(this.habitos));
  }
}
