import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotasService } from '../services/notas.service';
import { Nota } from '../models/notas.model';

@Component ({
    selector: 'app-crear-notas',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './crear-notas.component.html',
    styleUrls: ['./crear-notas.component.css']
})

export class CrearNotasComponent {
    notas: Nota[] = [];

    nuevaNota: Omit<Nota, 'id' | 'completadoHoy'> = {
        titulo: '',
        contenido: '',
        hora: '',
        fecha: '',
    };

    constructor (
        private router: Router,
        private notasService: NotasService
    ) {
        this.notas = this.notasService.obtenerNotas();
        this.cargarListasDesdeLocalStorage();
    }

    cargarListasDesdeLocalStorage() {
        const datosGuardados = localStorage.getItem('notas');
        if (datosGuardados) {
            this.notas = JSON.parse(datosGuardados);
        }
    }

    guardarListasEnLocalStorage() {
        localStorage.setItem('notas', JSON.stringify(this.notas));
    }

    agregarNota() {
        const { titulo, contenido, hora, fecha } = this.nuevaNota;

        if (!titulo || !contenido || !fecha || !hora) {
            alert('Debes llenar todos los campos');
            return;
        }

        const nuevaNota: Nota = {
            id: Date.now(),
            completadoHoy: false,
            ...this.nuevaNota
        };

        this.notas.push(nuevaNota);
        this.notasService.agregarNota(nuevaNota);
        this.guardarListasEnLocalStorage();
        this.router.navigate(['/notas']);
    }

    cancelar () {
        this.router.navigate(['/notas']);
    }

    eliminarNota (id: number) {
        this.notasService.eliminarNota(id); 
        this.notas = this.notas.filter(n => n.id !== id);
    }

}