# Gestor de Solicitudes

Aplicación web desarrollada como prueba técnica Front End para gestionar solicitudes internas de una organización.

Permite registrar, consultar, filtrar, ordenar, editar, actualizar prioridad y cerrar solicitudes mediante una interfaz responsive construida con Next.js, React, TypeScript y Tailwind CSS.

## Tecnologías utilizadas

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
* Docker

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
* API REST simulada con Route Handlers de Next.js.
* Estado servidor con TanStack Query.
* Estados de carga, error y vacío.
* Pruebas unitarias y de interacción.
* Dockerfile para ejecución reproducible.

## Estructura principal

```txt
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
```

## Requisitos

* Node.js 20+
* npm 10+
* Docker opcional

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Abrir:

```txt
http://localhost:3000
```

## Build de producción

```bash
npm run build
```

## Ejecutar build local

```bash
npm run start
```

## Lint

```bash
npm run lint
```

## Tests

```bash
npm run test:run
```

Resultado esperado:

```txt
12 archivos de prueba
41 tests pasando
```

## Docker

Construir imagen:

```bash
docker build -t gestor-solicitudes .
```

Ejecutar contenedor:

```bash
docker run --rm -p 3000:3000 gestor-solicitudes
```

Abrir:

```txt
http://localhost:3000
```

Si el puerto 3000 está ocupado:

```bash
docker run --rm -p 3001:3000 gestor-solicitudes
```

Abrir:

```txt
http://localhost:3001
```

## Rutas principales

```txt
/                         Dashboard
/solicitudes              Bandeja de solicitudes
/solicitudes/nueva        Crear solicitud
/solicitudes/[id]         Detalle de solicitud
/solicitudes/[id]/editar  Editar solicitud
```

## API REST simulada

```txt
GET    /api/v1/solicitudes
POST   /api/v1/solicitudes
GET    /api/v1/solicitudes/[id]
PUT    /api/v1/solicitudes/[id]
PATCH  /api/v1/solicitudes/[id]
DELETE /api/v1/solicitudes/[id]
```

## Decisiones técnicas

### Next.js App Router

Se utilizó Next.js con App Router para organizar rutas, páginas y API routes dentro de una misma base de código.

### TypeScript strict

El proyecto usa TypeScript en modo estricto para mejorar mantenibilidad, seguridad de tipos y detección temprana de errores.

### API simulada

La API fue implementada con Route Handlers de Next.js y un store en memoria. Esto permite simular un backend REST sin depender de servicios externos.

### TanStack Query

Se utilizó TanStack Query para manejar estado servidor, carga, error, caché, invalidación y actualización de datos después de mutaciones.

### React Hook Form + Zod

Los formularios usan React Hook Form para rendimiento y manejo de estado, junto con Zod para validaciones declarativas y tipadas.

### Tailwind CSS

Se usó Tailwind CSS para construir una UI responsive, consistente y fácil de mantener sin depender de una librería visual cerrada.

### Testing

Se agregaron pruebas para:

* Utilidades de dominio.
* Badges de estado y prioridad.
* Resumen de dashboard.
* Tabla/listado.
* Filtros.
* Formulario y validaciones.
* Acciones rápidas del detalle.
* Store/API simulada.

## Comandos de validación final

```bash
npm run lint
npm run build
npm run test:run
docker build -t gestor-solicitudes .
docker run --rm -p 3000:3000 gestor-solicitudes
```

## Autor

Kevin Lindo Ames
