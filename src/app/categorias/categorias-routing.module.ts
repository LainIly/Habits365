import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias.component';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { ListarCategoriaComponent } from './listar-categoria/listar-categoria.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriasComponent,
    children: [
      {
        path: 'register',
        component: CrearCategoriaComponent,
      },
      {
        path: 'list/edit/:id',
        component: EditarCategoriaComponent,
      },
      {
        path: 'list',
        component: ListarCategoriaComponent,
      }
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule { 

}