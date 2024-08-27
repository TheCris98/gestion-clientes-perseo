import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/models/models';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  // Lista de clientes a mostrar en la vista
  clientes: Cliente[] = [];

  constructor(
    private clientesService: ClientesService, // Servicio para obtener los clientes
    private router: Router, // Router para navegación
    private route: ActivatedRoute // ActivatedRoute para obtener parámetros de la ruta
  ) { }

  ngOnInit() {
    this.getClientes(); // Obtener clientes al inicializar el componente
    // Suscribirse a los parámetros de consulta para actualizar la lista si es necesario
    this.route.queryParams.subscribe(params => {
      if (params['update']) {
        this.getClientes(); // Actualizar lista si el parámetro `update` está presente
      }
    });
  }

  // Método para obtener la lista de clientes desde el servicio
  getClientes() {
    this.clientesService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data.clientes; // Asignar los clientes obtenidos al array local
        console.log(this.clientes); // Imprimir los clientes en la consola
        console.log('Hubo éxito en la respuesta');
      },
      error: (error) => {
        console.error('Hubo un error:', error); // Imprimir error en la consola en caso de falla
      }
    });
  }

  // Método para navegar a la página de edición de cliente
  editarCliente(cliente: Cliente) {
    this.router.navigate(['/clientes/editar-cliente'], { state: { cliente } });
  }
}
