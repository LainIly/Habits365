import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Habito } from '../models/habitos.model';

@Component({
  selector: 'app-editar-habito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-habito.component.html',
  styleUrls: ['./editar-habito.component.css']
})
export class EditarHabitoComponent {

  habito: Habito = {
    id: 0,
    nombre: '',
    frecuencia: '',
    hora: '',
    fecha: '',
    categoria: '',
    completadoHoy: false
  };

  constructor(private router: Router) {
    const habitoGuardado = localStorage.getItem('habitoAEditar');
    if (habitoGuardado) {
      this.habito = JSON.parse(habitoGuardado);
    }
  }

guardarCambios(): void {
  // Validaciones básicas
  if (!this.habito.nombre.trim()) {
    alert('El nombre del hábito es obligatorio.');
    return;
  }

  if (this.habito.nombre.length > 20) {
    alert('El nombre del hábito no puede tener más de 20 caracteres.');
    return;
  }

  if (!this.habito.frecuencia.trim()) {
    alert('La frecuencia del hábito es obligatoria.');
    return;
  }

  if (!this.habito.fecha.trim()) {
    alert('La fecha del hábito es obligatoria.');
    return;
  }

  if (!this.habito.hora.trim()) {
    alert('La hora del hábito es obligatoria.');
    return;
  }

  // Validación adicional para la fecha (si es inválida)
  if (isNaN(Date.parse(this.habito.fecha))) {
    alert('La fecha del hábito no es válida.');
    return;
  }

  const listaHabitos = localStorage.getItem('habitos');
  let habitos: Habito[] = listaHabitos ? JSON.parse(listaHabitos) : [];

  const index = habitos.findIndex(h => h.id === this.habito.id);
  if (index !== -1) {

    // Actualizar el hábito
    habitos[index] = this.habito;
    localStorage.setItem('habitos', JSON.stringify(habitos));
    alert('Hábito editado correctamente.');
    this.router.navigate(['/habitos']);
  }
}

  cancelar(): void {
    this.router.navigate(['/habitos']);
  }
}
