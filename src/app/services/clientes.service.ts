import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cliente } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  private headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.apiKey}`
  };

  constructor() { }

  // Crear un cliente
  crearCliente(cliente: Cliente): Observable<any> {
    const url = `${this.apiUrl}/clientes_crear`;
    const body = {
      api_key: this.apiKey,
      registros: [{ clientes: cliente }]
    };

    return from(CapacitorHttp.post({
      url,
      headers: this.headers,
      data: body
    })).pipe(
      map(response => {
        if (response.status !== 200) {
          throw new Error('Error en la respuesta: ' + response.data); // Lanza un error si el status no es 200
        }
        return response.data;
      }),
      catchError(error => {
        console.error('Error en la petición HTTP:', error);
        return of(null); // Puedes usar `throwError` si quieres propagar el error
      })
    );
  }

  // Editar un cliente
  editarCliente(cliente: Cliente): Observable<any> {
    const url = `${this.apiUrl}/clientes_editar`;
    const body = {
      api_key: this.apiKey,
      registros: [
        {
          clientes: {
            ...cliente,
            usuariomodificacion: 'PERSEO',
            fechamodificacion: new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)
          }
        }
      ]
    };

    return from(CapacitorHttp.post({
      url,
      headers: this.headers,
      data: body
    })).pipe(
      map(response => {
        if (response.status !== 200) {
          throw new Error('Error en la respuesta: ' + response.data);
        }
        return response.data;
      }),
      catchError(error => {
        console.error('Error en la petición HTTP:', error);
        return of(null);
      })
    );
  }

  // Eliminar un cliente
  eliminarCliente(clientesid: number): Observable<any> {
    const url = `${this.apiUrl}/clientes_eliminar`;
    const body = {
      api_key: this.apiKey,
      clientesid: clientesid
    };

    return from(CapacitorHttp.post({
      url,
      headers: this.headers,
      data: body,
      responseType: 'text'
    })).pipe(
      map(response => {
        if (response.status !== 200) {
          throw new Error('Error en la respuesta: ' + response.data);
        }
        try {
          return JSON.parse(response.data as string);
        } catch (e) {
          return response.data;
        }
      }),
      catchError(error => {
        console.error('Error en la petición HTTP:', error);
        return of(null);
      })
    );
  }

  // Consultar clientes
  getClientes(): Observable<any> {
    const url = `${this.apiUrl}/clientes_consulta`;
    const body = {
      api_key: this.apiKey
    };

    return from(CapacitorHttp.post({
      url,
      headers: this.headers,
      data: body
    })).pipe(
      map(response => {
        if (response.status !== 200) {
          throw new Error('Error en la respuesta: ' + response.data);
        }
        return response.data;
      }),
      catchError(error => {
        console.error('Error en la petición HTTP:', error);
        return of(null);
      })
    );
  }
}
