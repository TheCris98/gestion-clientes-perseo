import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearClientePageRoutingModule } from './crear-cliente-routing.module';

import { CrearClientePage } from './crear-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearClientePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearClientePage]
})
export class CrearClientePageModule {}
