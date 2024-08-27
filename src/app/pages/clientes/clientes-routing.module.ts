import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesPage } from './clientes.page';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage
  },
  {
    path: 'editar-cliente',
    loadChildren: () => import('./features/editar-cliente/editar-cliente.module').then(m => m.EditarClientePageModule)
  },  {
    path: 'crear-cliente',
    loadChildren: () => import('./features/crear-cliente/crear-cliente.module').then( m => m.CrearClientePageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesPageRoutingModule { }
