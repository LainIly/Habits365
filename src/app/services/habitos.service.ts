import { Injectable } from '@angular/core';
import { Habito } from '../models/habitos.model';

@Injectable({
  providedIn: 'root'
})
export class HabitosService {
  private clave = 'habitos';

  obtenerHabitos(): Habito[] {
    const data = localStorage.getItem(this.clave);
    return data ? JSON.parse(data) : [];
  }

  agregarHabito(habito: Omit<Habito, 'id'>): Habito {
    const habitos = this.obtenerHabitos();
    const nuevoHabito: Habito = { ...habito, id: Date.now() };
    habitos.push(nuevoHabito);
    localStorage.setItem(this.clave, JSON.stringify(habitos));
    return nuevoHabito;
  }

  eliminarHabito(id: number) {
    const habitos = this.obtenerHabitos().filter(h => h.id !== id);
    localStorage.setItem(this.clave, JSON.stringify(habitos));
  }

  obtenerHabitoPorId(id: number): Habito | undefined {
    const habitos = this.obtenerHabitos();
    return habitos.find(h => h.id === id);
  }
}
