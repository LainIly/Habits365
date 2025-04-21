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
    const listaHabitos = localStorage.getItem('habitos');
    let habitos: Habito[] = listaHabitos ? JSON.parse(listaHabitos) : [];

    const index = habitos.findIndex(h => h.id === this.habito.id);
    if (index !== -1) {
      habitos[index] = this.habito;
      localStorage.setItem('habitos', JSON.stringify(habitos));
      this.router.navigate(['/habitos']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/habitos']);
  }
}
