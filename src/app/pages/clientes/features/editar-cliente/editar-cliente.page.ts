import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/models/models';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.page.html',
  styleUrls: ['./editar-cliente.page.scss'],
})
export class EditarClientePage implements OnInit {
  cliente: any;

  constructor(
    private router: Router,
    private clienteService: ClientesService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // Recupera el estado pasado a través de la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.cliente = navigation.extras.state['cliente'];
    }
  }

  // Método para mostrar mensajes de toast
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

  // Método para guardar los cambios en el cliente
  guardarCambios() {
    this.clienteService.editarCliente(this.cliente).subscribe({
      next: (data) => {
        if (data) {
          // Solo maneja el éxito si `data` no es null
          console.log('Cliente editado con éxito:', data);
          this.presentToast('Cliente editado exitosamente', 1500, 'success', 'checkmark-done-outline');
          this.router.navigate(['clientes'], { queryParams: { update: true } });
        } else {
          // Maneja el caso en que `data` es null o vacío
          console.error('La respuesta fue nula o inválida');
          this.presentToast('No se pudieron guardar los cambios', 1500, 'danger', 'close-outline');
        }
      },
      error: (error) => {
        // Maneja el error y muestra un mensaje apropiado
        console.error('Problema al editar el cliente:', error);
        this.presentToast('Error inesperado', 1500, 'danger', 'close-outline');
      }
    });
  }


  // Método para eliminar el cliente
  async eliminarCliente() {
    // Crea una alerta para confirmar la eliminación
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // Redirige a la página de clientes si el usuario cancela
            this.router.navigate(['clientes']);
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Procede con la eliminación del cliente si el usuario confirma
            this.clienteService.eliminarCliente(this.cliente.clientesid).subscribe({
              next: (data) => {
                if (data) {
                  // Solo maneja el éxito si `data` no es null
                  console.log('Cliente eliminado con éxito:', data);
                  this.presentToast('Cliente eliminado exitosamente', 1500, 'success', 'trash-bin-outline');
                  this.router.navigate(['clientes'], { queryParams: { update: true } });
                } else {
                  // Maneja el caso en que `data` es null o vacío
                  console.error('La respuesta fue nula o inválida');
                  this.presentToast('No se pudo eliminar el cliente', 1500, 'danger', 'close-outline');
                }
              },
              error: (error) => {
                // Maneja el error y muestra un mensaje apropiado
                console.error('Error al eliminar el cliente:', error);
                this.presentToast('Error inesperado', 1500, 'danger', 'close-outline');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
