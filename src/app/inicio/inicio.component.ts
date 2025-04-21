import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habito } from '../models/habitos.model';
import { Nota } from '../models/notas.model';
import { Router } from '@angular/router';

type Recordatorio = Habito | Nota;

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  habitos: Habito[] = [];
  notas: Nota[] = [];
  recordatorioProximo: string = '';
  recordatorioProximoHora: string = '';

  constructor(private router: Router) {
    const datosHabitos = localStorage.getItem('habitos');
    const datosNotas = localStorage.getItem('notas');

    if (datosHabitos) {
      this.habitos = JSON.parse(datosHabitos);
    }

    if (datosNotas) {
      this.notas = JSON.parse(datosNotas);
    }
    const combinados: Recordatorio[] = [...this.habitos, ...this.notas];
    const conFechaYHora = combinados.filter((item): item is Recordatorio => {
      return 'fecha' in item && 'hora' in item;
    });
    const ordenados = conFechaYHora.sort((a, b) => {
      const fechaA = new Date(`${a.fecha} ${a.hora}`);
      const fechaB = new Date(`${b.fecha} ${b.hora}`);
      return fechaA.getTime() - fechaB.getTime();
    });

    const proximo = ordenados[0];

    if (proximo) {
      const descripcion =
        'nombre' in proximo
          ? proximo.nombre
          : 'titulo' in proximo
          ? proximo.titulo
          : 'Sin título';

      this.recordatorioProximo = `${descripcion} - ${proximo.fecha} a las ${proximo.hora}`;
      this.recordatorioProximoHora = proximo.hora;
    }
  }

  irACrearHabito() {
    this.router.navigate(['/crear-habitos']);
  }

  irACrearNota() {
    this.router.navigate(['/crear-notas']);
  }

  irAHabitos() {
    this.router.navigate(['/habitos']);
  }

  irANotas() {
    this.router.navigate(['/notas']);
  }
}
