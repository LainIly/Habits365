import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitosService } from '../services/habitos.service'; 
import { Habito } from '../models/habitos.model'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-habitos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-habitos.component.html',
  styleUrls: ['./crear-habitos.component.css']
})
export class CrearHabitosComponent {
  habitos: Habito[] = [];

  nuevoHabito: Omit<Habito, 'id' | 'completadoHoy'> = {
    nombre: '',
    frecuencia: '',
    hora: '',
    fecha: '',
    categoria: ''
  };

  frecuenciasPredefinidas: string[] = [];
  categoriasPredefinidas: string[] = [];

  frecuenciaSeleccionada = '';
  frecuenciaPersonalizada = '';
  categoriaSeleccionada = '';
  categoriaPersonalizada = '';

  constructor(private habitosService: HabitosService, private router: Router) {
    this.habitos = this.habitosService.obtenerHabitos();
    this.cargarListasDesdeLocalStorage();
  }

  cargarListasDesdeLocalStorage() {
    const frec = localStorage.getItem('frecuencias');
    const cat = localStorage.getItem('categorias');

    this.frecuenciasPredefinidas = frec ? JSON.parse(frec) : ['Diario', 'Semanal', 'Mensual'];
    this.categoriasPredefinidas = cat ? JSON.parse(cat) : ['Salud', 'Trabajo', 'Casa'];
  }

  guardarListasEnLocalStorage() {
    localStorage.setItem('frecuencias', JSON.stringify(this.frecuenciasPredefinidas));
    localStorage.setItem('categorias', JSON.stringify(this.categoriasPredefinidas));
  }

  agregarHabito() {
    const { nombre, hora, fecha } = this.nuevoHabito;

    if (!nombre || !fecha || !hora || !this.frecuenciaSeleccionada || !this.categoriaSeleccionada) {
      alert('Debes llenar todos los campos');
      return;
    }

    let frecuenciaFinal = this.frecuenciaSeleccionada;
    if (frecuenciaFinal === 'personalizada') {
      frecuenciaFinal = this.frecuenciaPersonalizada.trim();
      if (!frecuenciaFinal) {
        alert('Debes escribir una frecuencia personalizada');
        return;
      }
      if (!this.frecuenciasPredefinidas.includes(frecuenciaFinal)) {
        this.frecuenciasPredefinidas.push(frecuenciaFinal);
        this.guardarListasEnLocalStorage();
      }
    }

    let categoriaFinal = this.categoriaSeleccionada;
    if (categoriaFinal === 'personalizada') {
      categoriaFinal = this.categoriaPersonalizada.trim();
      if (!categoriaFinal) {
        alert('Debes escribir una categoría personalizada');
        return;
      }
      if (!this.categoriasPredefinidas.includes(categoriaFinal)) {
        this.categoriasPredefinidas.push(categoriaFinal);
        this.guardarListasEnLocalStorage();
      }
    }

    const nuevoHabitoCompleto: Omit<Habito, 'id'> = {
      ...this.nuevoHabito,
      frecuencia: frecuenciaFinal,
      categoria: categoriaFinal,
      completadoHoy: false
    };

    const agregado = this.habitosService.agregarHabito(nuevoHabitoCompleto);
    if (agregado) {
      this.habitos.push(agregado);
      this.router.navigate(['/habitos']);

      this.nuevoHabito = { nombre: '', frecuencia: '', hora: '', fecha: '', categoria: '' };
      this.frecuenciaSeleccionada = '';
      this.frecuenciaPersonalizada = '';
      this.categoriaSeleccionada = '';
      this.categoriaPersonalizada = '';
    }
  }

  cancelar() {
    this.router.navigate(['/habitos']);
  }

  eliminarHabito(id: number) {
    this.habitosService.eliminarHabito(id);
    this.habitos = this.habitos.filter(h => h.id !== id);
  }
  
}
