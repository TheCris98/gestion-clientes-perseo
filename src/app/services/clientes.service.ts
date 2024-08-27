import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Cliente } from '../models/models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  // Crear un cliente
  crearCliente(cliente: Cliente): Observable<any> {
    const url = `${this.apiUrl}/clientes_crear`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`  // Agrega el token de autenticación
    });

    const body = {
      api_key: this.apiKey,
      registros: [
        {
          clientes: cliente
        }
      ]
    };

    return this.http.post(url, body, { headers });
  }

  // Editar un cliente
  editarCliente(cliente: Cliente): Observable<any> {
    const url = `${this.apiUrl}/clientes_editar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`  // Agrega el token de autenticación
    });

    const body = {
      api_key: this.apiKey,
      registros: [
        {
          clientes: {
            ...cliente,              // Propaga todas las propiedades del cliente para la actualización
            usuariomodificacion: 'PERSEO',  // Usuario que realizó la modificación
            fechamodificacion: new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)  // Fecha y hora de la modificación en formato YYYYMMDDHHmmSS
          }
        }
      ]
    };

    return this.http.post(url, body, { headers });
  }

  // Eliminar un cliente
  eliminarCliente(clientesid: number): Observable<any> {
    const url = `${this.apiUrl}/clientes_eliminar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });
  
    const body = {
      api_key: this.apiKey,
      clientesid: clientesid,
    };
  
    return this.http.post(url, body, { headers, responseType: 'text' as 'json' }).pipe(
      // Maneja la respuesta como texto
      map(response => {
        // Intenta parsear la respuesta como JSON
        try {
          return JSON.parse(response as string);
        } catch (e) {
          // Si no es un JSON, retorna el texto directamente
          return response;
        }
      }),
      catchError(error => {
        console.error('Error al eliminar el cliente: ', error);
        return of(null); // Maneja el error y devuelve un Observable vacío
      })
    );
  }
  

  // Consultar clientes
  getClientes(): Observable<any> {
    const url = `${this.apiUrl}/clientes_consulta`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`  // Agrega el token de autenticación
    });

    // El cuerpo aquí debe ser exactamente el mismo que en Postman
    const body = {
      'api_key': this.apiKey
    };

    return this.http.post(url, body, { headers });
  }
}
