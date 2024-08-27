Gestor Clientes Perseo

# Este proyecto es una prueba para testear el consumo de una API del servidor de pruebas de Perseo Software, está construido en Ionic/Angular versión 7.2.0, con un enfoque de desarrollo cross-platform.

## Tabla de Contenidos

1. Descripción
2. Instalación
3. Contacto


### Descripción
El objetivo de este proyecto es evaluar las habilidades del postulante, mediante la elaboración de una solución sencilla para la gestión de clientes de Perseo, dónde se accede a una API provista por la empresa, misma que cuenta con distintos endpoints para cada función de gestión, explicadas a continuación:

API_URL: https://perseo-data-c1.app
API_KEY: 'MI_API_KEY'

Headers: {
    'Content-Type': 'application/json',
    'Authorization': Bearer API_KEY
  };

Crear Cliente
Endpoint : clientes_crear

Procedimiento utilizado para el registro de los clientes en el sistema contable Perseo.

Nota: Si el cliente ya existe, devuelve el id y código del cliente con que se encuentra registrado en el sistema.

Ejemplo: API_URL/api/clientes_crear

Body: 
{
    "api_key": API_KEY,
	"registros":
	[
		{
			"clientes":
			{
				"clientesid":1, 
				"clientescodigo":"CL00000003",
				"codigocontable":"1.1.02.05.01",
				"clientes_gruposid":1,
				"provinciasid":"09",
				"ciudadesid":"0901",
				"razonsocial":"QUINTERO MARQUEZ JOSE",
				"parroquiasid":"090111",
				"clientes_zonasid":1,
                "clientes_rutasid":1,
				"nombrecomercial":"",
				"direccion":"SANTO DOMINGO",
				"identificacion":"0800374142",
				"tipoidentificacion":"C",
				"email":"pinta@tmail.com",
				"telefono1":"0993250851",
				"telefono2":"",
				"telefono3":"",
				"vendedoresid":3,
				"cobradoresid":3,
				"creditocupo":10000,
				"creditodias":30,
				"estado":true,
				"tarifasid":1,
				"forma_pago_empresaid":1,
				"ordenvisita":0,
				"latitud":"",
				"longitud":"",
                "usuariocreacion":"PERSEO",
				"fechacreacion":"20190730111642",
				"fechamodificacion":"20190620113822"
			}
		}
	]
}

Esto retornará un response de éxito con los datos del nuevo cliente

Response:
{
  "clientes": [
    {
      "clientesid_viejo": 1,
      "clientesid_nuevo": 3,
      "clientes_codigo": "CL00000003"
    }
  ]
}

Consultar Clientes
Endpoint : clientes_consulta

Devuelve todos los clientes almacenados en el sistema central y que su estado sea activo, de acuerdo con el parámetro que se haya enviado.
Tomar en cuenta que al realizar una búsqueda personalizada, se debe enviar solo 1 de los 4 parámetros solicitados; es decir, que realiza la busque por:

- id del cliente
- Razón Social o nombre comercial del cliente
- Código del cliente
- Identificación

Ejemplo: API_URL/api/clientes_consulta

Body:
{
    "api_key": API_KEY
}

Esto retornará todos los clientes registrados.

Editar Cliente
Endpoint : clientes_editar

Procedimiento utilizado para actualizar los datos de los clientes ya existentes.

Ejemplo: API_URL/api/clientes_editar

Body:
{
    "api_key": API_KEY,
	"registros":
	[
		{
			"clientes":
			{
				"clientesid":3, 
				"clientescodigo":"CL00000003",
				"codigocontable":"1.1.02.05.01",
				"clientes_gruposid":1,
				"provinciasid":"09", 
				"ciudadesid":"0901",
				"razonsocial":"QUINTERO MARQUEZ JOSE GABRIEL",
				"parroquiasid":"090111",
				"clientes_zonasid":1,
                "clientes_rutasid":1,
				"nombrecomercial":"",
				"direccion":"SANTO DOMINGO",
				"identificacion":"0800374142001",
				"tipoidentificacion":"R",
				"email":"pinta@tmail.com",
				"telefono1":"0993250851",
				"telefono2":"0996314786",
				"telefono3":"",
				"vendedoresid":3,
				"cobradoresid":3,
				"creditocupo":10000,
				"creditodias":30,
				"estado":true,
				"tarifasid":1,
				"forma_pago_empresaid":1,
				"ordenvisita":0,
				"latitud":"",
				"longitud":"",
                "usuariomodificacion":"PERSEO",
				"fechamodificacion":"20190620113822"
			}
		}
	]
}

Esto retornará un response de éxito con los ids del cliente editado

Response:
{
  "clientes": [
    {
      "clientesid": 3,
      "clientescodigo": "CL00000003"
    }
  ]
}

Eliminar Cliente
Endpoint : clientes_eliminar

Procedimiento utilizado para realizar la eliminación de un cliente, de acuerdo al id que envía.
Nota: Antes de realizar el proceso de eliminación, se verifique que el cliente no tenga documentos asociados, si es así enviar un mensaje de error en formato JSON, caso contrario retorna un texto fijo con el siguiente enunciado: Registro eliminado correctamente en el sistema.

Ejemplo: API_URL/api/clientes_eliminar

Body:
{
    "api_key": API_KEY,
    "clientesid":3
}

Esto retornará un mensaje de éxito

Registro eliminado correctamente en el sistema

Para más información revisa https://documenter.getpostman.com/view/11467225/U16dQoKs#intro

Instalación
Herramientas necesarias:

- Editor de Código (VS Code)
- Nodejs (v20.17.0)
- Android Studio (con SDK)

Desde tu editor preferido:
Abre una terminal y situate en donde prefieras clonar el repositorio.
# Comando para clonar el repositorio
git clone https://github.com/TheCris98/gestion-clientes-perseo.git

# Comando para instalar dependencias
cd gestion-clientes
npm install

Una vez instaladas las dependencias, puedes ejecutar el proyecto en la web, o revisar la plataforma de Android

Para la web:

Nota: Asegúrate de tener cualquier instancia de Google Chrome cerrada

# Comando para ejecutar en la web
npm run ejecutar

Esto ejecutará el proyecto de manera local y abrirá Google Chrome sin protocolos de seguridad, ya que por cuestiones de configuración en el servidor, los CORS no permiten hacen peticiones a la API, por lo cual una vez abierta esta instancia de Chrome, abre el proyecto en una nueva pestaña, en http://localhost:8100/clientes.

Para móvil:

# Comando para compilar y abrir el proyecto móvil
npm run build

Este comando ejecuta una serie de subtareas necesarias para dejar la plataforma de android lista, además de abrir Android Studio para visualizar todo le código en Kotlin.

Contacto
Este proyecto fue realizado por Cristian López, como parte de una prueba técnica para Perseo Software, en supervisión del Ing. Jaime.

Correo: crisjlopez1998@gmail.com




