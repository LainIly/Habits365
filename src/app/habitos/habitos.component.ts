import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Habito } from '../models/habitos.model';
import { HabitosService } from '../services/habitos.service';

@Component({
  selector: 'app-habitos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './habitos.component.html',
  styleUrls: ['./habitos.component.css']
})
export class HabitosComponent implements OnInit {
  habitos: Habito[] = [];

  constructor(
    private router: Router,
    private habitosService: HabitosService
  ) {}

  ngOnInit(): void {
    this.cargarHabitos();
  }

  cargarHabitos(): void {
    this.habitos = this.habitosService.obtenerHabitos();
  }

  irAHabitos(): void {
    this.router.navigate(['/crear-habitos']);
  }

  editarHabito(habito: Habito): void {
    localStorage.setItem('habitoAEditar', JSON.stringify(habito));
    this.router.navigate(['/editar-habito']);
  }

  eliminarHabito(id: number): void {
    this.habitosService.eliminarHabito(id); 
    this.cargarHabitos();
  }

  marcarCompletado(habito: Habito): void {
    habito.completadoHoy = true;

    const fechaHoraActual = new Date(`${habito.fecha}T${habito.hora}`);
    const frecuencia = habito.frecuencia.toLowerCase();

    if (frecuencia === 'diario') {
      fechaHoraActual.setDate(fechaHoraActual.getDate() + 1);
    } else if (frecuencia === 'semanal') {
      fechaHoraActual.setDate(fechaHoraActual.getDate() + 7);
    } else if (frecuencia === 'mensual') {
      fechaHoraActual.setMonth(fechaHoraActual.getMonth() + 1);
    }

    const nuevaFecha = fechaHoraActual.toISOString().split('T')[0];
    const nuevaHora = fechaHoraActual.toTimeString().split(':').slice(0, 2).join(':');

    habito.fecha = nuevaFecha;
    habito.hora = nuevaHora;

    setTimeout(() => {
      habito.completadoHoy = false;
      this.guardarEnLocalStorage();
    }, 1000);

    this.guardarEnLocalStorage();
  }

  guardarEnLocalStorage(): void {
    localStorage.setItem('habitos', JSON.stringify(this.habitos));
  }
}
