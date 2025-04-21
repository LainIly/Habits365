import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Nota } from '../models/notas.model';

@Component({
  selector: 'app-editar-nota',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-nota.component.html',
  styleUrl: './editar-nota.component.css'
})
export class EditarNotaComponent {

  nota: Nota = {
    id: 0,
    titulo: '',
    contenido: '',
    hora: '',
    fecha: '',
    completadoHoy: false
  }

  constructor (
    private router: Router
  ) {
    const notaGuardada = localStorage.getItem('notaAEditar');
    if (notaGuardada) {
      this.nota = JSON.parse(notaGuardada);
    }
  }

  guardarCambios (): void {
    const listaNotas = localStorage.getItem('notas');
    let notas: Nota[] = listaNotas ? JSON.parse(listaNotas) : [];

    const index = notas.findIndex(n => n.id === this.nota.id);
    if (index !== -1) {
      notas[index] = this.nota;
      localStorage.setItem('notas', JSON.stringify(notas));
      this.router.navigate(['/notas']);
    }
  }

  cancelar (): void {
    this.router.navigate(['/notas']);
  }
}
