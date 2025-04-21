import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Nota } from '../models/notas.model';
import { NotasService } from '../services/notas.service';


@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent {
  notas: Nota[] = [];

  constructor (
    private router: Router,
    private notasService: NotasService
  ) {}

  ngOnInit (): void {
    this.cargasNotas();
  }

  cargasNotas () : void {
    this.notas = this.notasService.obtenerNotas();
  }

  irANotas () : void {
    this.router.navigate(['/crear-notas']);
  }

  editarNota(nota : Nota): void {
    localStorage.setItem('notaAEditar', JSON.stringify(nota));
    this.router.navigate(['/editar-nota']);
  }

  eliminarNota (id: number) {
    this.notasService.eliminarNota(id); 
    this.cargasNotas();
  }

  marcarCompletado(nota: Nota): void {
    nota.completadoHoy = true;

    setTimeout (() => {
      nota.completadoHoy = false;
      this.guardarEnLocalStorage();
    }, 1000);
    this.guardarEnLocalStorage();
  }

  guardarEnLocalStorage(): void {
    localStorage.setItem('notas', JSON.stringify(this.notas));
  } 

}
