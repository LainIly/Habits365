import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./inicio/inicio.component').then(m => m.InicioComponent)
  },
  {
    path: 'habitos',
    loadComponent: () =>
      import('./habitos/habitos.component').then(m => m.HabitosComponent)
  },
  {
    path: 'crear-habitos',
    loadComponent: () =>
      import('./crear-habitos/crear-habitos.component').then(m => m.CrearHabitosComponent)
  },
  {
    path: 'editar-habito',
    loadComponent: () =>
      import('./editar-habito/editar-habito.component').then(m => m.EditarHabitoComponent)
  },
  {
    path: 'notas',
    loadComponent: () =>
      import('./notas/notas.component').then(m => m.NotasComponent)
  },
  {
    path: 'crear-notas',
    loadComponent: () =>
      import('./crear-notas/crear-notas.component').then(m => m.CrearNotasComponent)
  },
  {
    path: 'editar-nota',
    loadComponent: () =>
      import('./editar-nota/editar-nota.component').then(m => m.EditarNotaComponent)
  },
  {
    path: 'estadisticas',
    loadComponent: () =>
      import('./estadisticas/estadisticas.component').then(m => m.EstadisticasComponent)
  },
  {
    path: 'configuracion',
    loadComponent: () =>
      import('./configuracion/configuracion.component').then(m => m.ConfiguracionComponent)
  },
  {
    path: 'categorias',
    loadComponent: () =>
      import('./categorias/categorias.component').then(m => m.CategoriasComponent)
  },
  {
    path: 'crear-categoria',
    loadComponent: () =>
      import('./categorias/crear-categoria/crear-categoria.component').then(m => m.CrearCategoriaComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
