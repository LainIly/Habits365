import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  avatarLoaded = false;
  avatarUrl = 'https://i.pinimg.com/736x/23/8b/f1/238bf108e37cff674f47ea5cc3d27c55.jpg';

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkImage();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  checkImage() {
    const img = new Image();
    img.src = this.avatarUrl;
    img.onload = () => this.avatarLoaded = true;
    img.onerror = () => this.avatarLoaded = false;
  }

  handleImageError() {
    this.avatarLoaded = false;
    this.avatarUrl = 'assets/default-avatar.png';
  }

  goToUserPage() {
    this.router.navigate(['/user']);
  }

  irAInicio() {
    this.router.navigate(['/']);
    this.isCollapsed = true;
  }

  irAHabitos() {
    this.router.navigate(['/habitos']);
    this.isCollapsed = true;
  }

  irANotas() {
    this.router.navigate(['/notas']);
    this.isCollapsed = true;
  }

  irAEstadisticas() {
    this.router.navigate(['/estadisticas']);
    this.isCollapsed = true;
  }

  irAHistorial() {
    this.router.navigate(['/historial']);
    this.isCollapsed = true;
  }

  irAConfiguracion() {
    this.router.navigate(['/configuracion']);
    this.isCollapsed = true;
  }

  irACategorias() {
    this.router.navigate(['/crear-categoria']);
    this.isCollapsed = true;
  }
}
