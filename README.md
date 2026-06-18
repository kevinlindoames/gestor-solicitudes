# Gestor de Solicitudes

Aplicación web desarrollada como prueba técnica Front End para gestionar solicitudes internas de una organización.

Permite registrar, consultar, filtrar, ordenar, editar, actualizar prioridad y cerrar solicitudes mediante una interfaz responsive construida con Next.js, React, TypeScript y Tailwind CSS.

El proyecto incluye un backend REST desarrollado con Spring Boot y un despliegue completo en Railway.

---

## Despliegue

### Frontend

```txt
https://gestor-solicitudes-web-production.up.railway.app
```

### Backend

```txt
https://requests-api-production.up.railway.app
```

### Endpoint principal

```txt
https://requests-api-production.up.railway.app/api/v1/solicitudes
```

La aplicación fue desplegada en Railway con dos servicios independientes:

* `gestor-solicitudes-web`: Frontend Next.js.
* `requests-api`: Backend Spring Boot.

El frontend consume el backend mediante la variable:

```env
NEXT_PUBLIC_API_BASE_URL=https://requests-api-production.up.railway.app
```

---

## Tecnologías utilizadas

### Frontend

* Next.js 14.2.35
* React 18.3.1
* TypeScript strict
* App Router
* Tailwind CSS
* TanStack Query
* React Hook Form
* Zod
* Vitest
* React Testing Library
* Playwright
* Docker

### Backend

* Java 17
* Spring Boot 4
* Spring Web MVC
* Bean Validation
* Maven
* Docker

### DevOps / Deploy

* Docker
* Docker Compose
* Railway
* GitHub

---

## Funcionalidades implementadas

* Dashboard con resumen por estado.
* Bandeja de solicitudes.
* Búsqueda por ID, título, descripción, solicitante o categoría.
* Filtro por estado.
* Filtro por prioridad.
* Ordenamiento por fecha de creación, última actualización o prioridad.
* Vista responsive: tabla en desktop y cards en mobile.
* Detalle de solicitud.
* Creación de solicitudes.
* Edición de solicitudes.
* Validaciones de formulario con Zod.
* Cambio rápido de prioridad.
* Cierre lógico de solicitud.
* API REST con backend Spring Boot.
* Estado servidor con TanStack Query.
* Estados de carga, error, éxito y vacío.
* Skeleton UI para mejorar la percepción de carga.
* Cache de datos para evitar refetch innecesario.
* Pruebas unitarias, integración y end-to-end.
* Dockerfile para frontend.
* Dockerfile para backend.
* Docker Compose para levantar la solución completa.

---

## Estructura principal

```txt
gestor-solicitudes/
  backend/
    Dockerfile
    pom.xml
    src/
      main/
        java/
          com/
            kevinlindo/
              requestsapi/
                RequestsApiApplication.java
                config/
                request/
                  dto/
        resources/
          application.properties

  src/
    app/
      api/
        v1/
          solicitudes/
      solicitudes/
    features/
      requests/
        components/
        constants/
        hooks/
        schemas/
        services/
        types/
        utils/
    shared/
      components/
      utils/
    lib/
      api/
      query/
    mocks/

  e2e/
  tests/
  Dockerfile
  docker-compose.yml
```

---

## Requisitos

Para ejecutar el frontend localmente:

* Node.js 20+
* npm 10+

Para ejecutar con Docker:

* Docker
* Docker Compose

No es obligatorio tener Java ni Maven instalados localmente si se usa Docker, porque el backend se compila dentro del contenedor.

---

## Variables de entorno

### Frontend

Crear un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

En producción, Railway usa:

```env
NEXT_PUBLIC_API_BASE_URL=https://requests-api-production.up.railway.app
```

### Backend

El backend soporta puerto dinámico mediante:

```properties
server.port=${PORT:8080}
```

En local usa `8080`. En Railway puede usar la variable `PORT` provista por la plataforma.

---

## Instalación local

```bash
npm install
```

---

## Ejecutar frontend en desarrollo

```bash
npm run dev
```

Abrir:

```txt
http://localhost:3000
```

---

## Ejecutar backend con Docker

Desde la carpeta `backend`:

```bash
docker build -t requests-api .
docker run --rm -p 8080:8080 requests-api
```

Probar API:

```bash
curl.exe http://localhost:8080/api/v1/solicitudes
```

---

## Ejecutar solución completa con Docker Compose

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Servicios:

| Servicio | Puerto | Descripción          |
| -------- | -----: | -------------------- |
| frontend |   3000 | Aplicación Next.js   |
| backend  |   8080 | API REST Spring Boot |

Abrir frontend:

```txt
http://localhost:3000
```

Probar backend:

```bash
curl.exe http://localhost:8080/api/v1/solicitudes
```

Detener servicios:

```bash
docker compose down
```

---

## Build de producción

```bash
npm run build
```

---

## Ejecutar build local

```bash
npm run start
```

---

## Lint

```bash
npm run lint
```

---

## Testing

El proyecto incluye pruebas unitarias, pruebas de integración y pruebas end-to-end.

### Ejecutar pruebas unitarias e integración

```bash
npm run test:run
```

Resultado actual:

```txt
16 archivos de prueba
58 tests pasando
```

### Ejecutar pruebas end-to-end

```bash
npm run test:e2e
```

Resultado actual:

```txt
3 tests E2E pasando
```

---

## Cobertura funcional de testing

| Requisito                                         |   Estado |
| ------------------------------------------------- | -------: |
| Pruebas de renderizado de componentes principales | Cumplido |
| Pruebas de interacción de usuario en formularios  | Cumplido |
| Pruebas de filtros                                | Cumplido |
| Pruebas de acciones de listado                    | Cumplido |
| Pruebas de validación de campos obligatorios      | Cumplido |
| Pruebas de formatos o valores inválidos           | Cumplido |
| Pruebas de consumo de servicios o mocks de API    | Cumplido |
| Pruebas de estados de carga                       | Cumplido |
| Pruebas de estados de error                       | Cumplido |
| Pruebas de estados vacíos                         | Cumplido |
| Pruebas de estados de éxito                       | Cumplido |
| E2E de creación y consulta de solicitud           | Cumplido |
| E2E de edición de solicitud                       | Cumplido |

### Pruebas implementadas

* Utilidades de dominio.
* Badges de estado y prioridad.
* Resumen de dashboard.
* Tabla/listado.
* Filtros.
* Formulario y validaciones.
* Acciones rápidas del detalle.
* Store/API simulada.
* Servicio de consumo API con mock de `fetch`.
* Estados reutilizables: loading, error y empty.
* Flujo E2E de creación.
* Flujo E2E de edición.
* Flujo E2E de listado y apertura de detalle.

---

## Rutas principales

```txt
/                         Dashboard
/solicitudes              Bandeja de solicitudes
/solicitudes/nueva        Crear solicitud
/solicitudes/[id]         Detalle de solicitud
/solicitudes/[id]/editar  Editar solicitud
```

---

## API REST Spring Boot

El backend Spring Boot expone los siguientes endpoints:

```txt
GET    /api/v1/solicitudes
POST   /api/v1/solicitudes
GET    /api/v1/solicitudes/{id}
PUT    /api/v1/solicitudes/{id}
PATCH  /api/v1/solicitudes/{id}
DELETE /api/v1/solicitudes/{id}
```

### Descripción de endpoints

| Método | Endpoint                   | Descripción                             |
| ------ | -------------------------- | --------------------------------------- |
| GET    | `/api/v1/solicitudes`      | Lista todas las solicitudes             |
| POST   | `/api/v1/solicitudes`      | Crea una nueva solicitud                |
| GET    | `/api/v1/solicitudes/{id}` | Obtiene el detalle de una solicitud     |
| PUT    | `/api/v1/solicitudes/{id}` | Actualiza una solicitud                 |
| PATCH  | `/api/v1/solicitudes/{id}` | Actualiza la prioridad de una solicitud |
| DELETE | `/api/v1/solicitudes/{id}` | Realiza cierre lógico de una solicitud  |

### Contrato de datos

El backend utiliza enums tipados internamente, pero expone los valores en formato compatible con el frontend:

```json
{
  "priority": "high",
  "status": "pending"
}
```

Esto permite mantener un contrato REST estable sin acoplar el frontend a los nombres internos de los enums Java.

---

## Estados soportados

```txt
pending
in_review
approved
rejected
closed
```

Visualmente se muestran como:

* Pendiente
* En revisión
* Aprobada
* Rechazada
* Cerrada

---

## Prioridades soportadas

```txt
low
medium
high
critical
```

Visualmente se muestran como:

* Baja
* Media
* Alta
* Crítica

---

## Decisiones técnicas

### Next.js App Router

Se utilizó Next.js con App Router para organizar rutas, páginas y estructura de navegación.

La aplicación cuenta con rutas separadas para dashboard, bandeja, creación, detalle y edición de solicitudes.

### TypeScript strict

El proyecto usa TypeScript en modo estricto para mejorar mantenibilidad, seguridad de tipos y detección temprana de errores.

### Backend Spring Boot

Se agregó un backend REST con Spring Boot para cumplir el requisito de crear o consumir una API REST con un framework backend.

El backend se encuentra en la carpeta `backend` y expone endpoints para listar, crear, consultar, actualizar, cambiar prioridad y cerrar solicitudes.

### Contrato REST

Se definió un contrato JSON alineado entre frontend y backend.

Aunque Spring Boot usa enums tipados internamente, se serializan como strings en lowercase/snake_case para mantener compatibilidad con los tipos del frontend.

### TanStack Query

Se utilizó TanStack Query para manejar estado servidor, carga, error, caché, invalidación y actualización de datos después de mutaciones.

Además, se configuró un `QueryClient` centralizado con:

* `staleTime` para evitar refetch inmediato.
* `gcTime` para mantener datos recientes en memoria.
* `refetchOnWindowFocus: false` para evitar llamadas innecesarias.
* `retry: 1` para controlar reintentos.

### Skeleton UI

Se agregaron skeletons para mejorar la percepción de carga en pantallas principales.

Esto ayuda especialmente en despliegues cloud donde puede existir latencia de red o cold start.

### React Hook Form + Zod

Los formularios usan React Hook Form para rendimiento y manejo de estado, junto con Zod para validaciones declarativas y tipadas.

### Tailwind CSS

Se usó Tailwind CSS para construir una UI responsive, consistente y fácil de mantener sin depender de una librería visual cerrada.

### Componentes reutilizables

El proyecto incluye componentes compartidos reutilizables como:

* Button
* Card
* Badge
* Input
* Select
* Textarea
* Container
* PageHeader
* LoadingState
* ErrorState
* EmptyState
* Skeleton
* ToastProvider

### Accesibilidad y navegación

Las acciones principales usan navegación interna con `Link` de Next.js.

También se agregaron nombres accesibles en acciones como “Ver detalle de REQ-001” para mejorar la experiencia con tecnologías asistivas y facilitar pruebas E2E estables.

### Docker

Se agregaron Dockerfiles para frontend y backend.

Además, se configuró Docker Compose para levantar ambos servicios con un solo comando.

### CORS

El backend fue configurado para permitir el consumo desde el frontend local y desde el dominio público desplegado en Railway.

---

## Comandos principales

### Frontend local

```bash
npm run dev
```

### Backend local con Docker

```bash
cd backend
docker build -t requests-api .
docker run --rm -p 8080:8080 requests-api
```

### Solución completa

```bash
docker compose up --build
```

### Validación

```bash
npm run lint
npm run build
npm run test:run
npm run test:e2e
```

---

## Comandos de validación final

```bash
npm run lint
npm run build
npm run test:run
npm run test:e2e
docker compose up --build
```

Resultado esperado:

```txt
Lint sin errores
Build exitoso
16 archivos de prueba pasando
58 tests unitarios/integración pasando
3 tests E2E pasando
Frontend y backend levantados con Docker Compose
```

---

## Propuesta visual y responsive

La interfaz fue diseñada con una estructura simple y orientada a productividad:

* Dashboard inicial con métricas y últimas solicitudes.
* Bandeja con filtros y tabla responsive.
* Cards móviles para mejorar lectura en pantallas pequeñas.
* Badges visuales para estados y prioridades.
* Acciones rápidas para crear, editar, cambiar prioridad y cerrar solicitudes.
* Skeleton UI para mejorar la percepción de carga.
* Estados de error, vacío y éxito claramente diferenciados.

---

## Flujo principal de uso

```txt
Dashboard
  → Ver bandeja
  → Filtrar solicitudes
  → Abrir detalle
  → Editar solicitud
  → Cambiar prioridad
  → Cerrar solicitud
```

```txt
Dashboard
  → Nueva solicitud
  → Completar formulario
  → Crear solicitud
  → Ver detalle creado
```

---

## Autor

Kevin Lindo Ames
