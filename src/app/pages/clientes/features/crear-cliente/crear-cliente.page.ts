import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.page.html',
  styleUrls: ['./crear-cliente.page.scss'],
})
export class CrearClientePage implements OnInit {
  clienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // Inicializa el formulario con los controles y validaciones
    this.clienteForm = this.fb.group({
      razonsocial: ['', Validators.required],
      nombrecomercial: [''],
      direccion: [''],
      identificacion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono1: [''],
      telefono2: [''],
      telefono3: [''],
      provinciasid: ['', Validators.required],
      ciudadesid: ['', Validators.required],
      parroquiasid: ['', Validators.required],
      tipoidentificacion: ['C', Validators.required],
      estado: [true, Validators.required]
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.clienteForm.valid) {
      this.clienteService.crearCliente(this.clienteForm.value).subscribe(
        response => {
          console.log('Cliente creado con éxito:', response);
          this.presentToast('Cliente agregado exitosamente', 2000, 'success', 'person-add-outline');
          this.router.navigate(['clientes'], { queryParams: { update: true } });  // Redirige a la página principal de clientes
        },
        error => {
          console.error('Error al crear el cliente:', error);
          this.presentToast('Error inesperado', 1500, 'danger', 'close-outline');
        }
      );
    }
  }

  // Método para mostrar un mensaje de toast
  async presentToast(message: string, duration: number, color: string, icon: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,  // Duración del Toast en milisegundos
      position: 'bottom',  // Posición del Toast (top, bottom, middle)
      color: color,  // Color del Toast (puede ser success, warning, danger, etc.)
      icon: icon,  // Icono del Toast
      cssClass: 'custom-toast'  // Clase CSS personalizada para estilos adicionales
    });

    await toast.present();
  }
}
