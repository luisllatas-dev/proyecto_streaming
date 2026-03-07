# 🚀 Astro Services

Aplicación web Full Stack para mostrar y gestionar servicios de streaming e IPTV. Los servicios se presentan en una cuadrícula de tarjetas dinámicas alimentadas desde una base de datos MongoDB.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 19 · Vite 7 · Tailwind CSS 4 |
| **Backend** | Node.js · Express 4 |
| **Base de Datos** | MongoDB (Mongoose 8) |
| **Contenedores** | Docker · Docker Compose |

## Estructura del Proyecto

```
Proyecto_Astro/
├── astro_services/          # Frontend
│   ├── src/
│   │   ├── components/      # ServiceCard, ServiceGrid, Header, Footer
│   │   ├── hooks/           # useServices (custom hook)
│   │   ├── services/        # api.js (capa de comunicación HTTP)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── Dockerfile
│   └── vite.config.js
│
├── astro_backend/           # Backend
│   ├── src/
│   │   ├── config/          # db.js (conexión a MongoDB)
│   │   ├── models/          # Service.js (esquema Mongoose)
│   │   ├── controllers/     # serviceController.js (lógica CRUD)
│   │   ├── routes/          # serviceRoutes.js (endpoints REST)
│   │   ├── server.js        # Punto de entrada
│   │   └── seed.js          # Script para datos de ejemplo
│   ├── .env.example
│   └── Dockerfile
│
└── docker-compose.yml       # Orquestación de servicios
```

## Esquema de Datos

Cada servicio almacenado en MongoDB tiene la siguiente estructura:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `imagen` | String | URL de la imagen del servicio |
| `titulo` | String | Nombre del plan o servicio (máx. 120 caracteres) |
| `precio` | Number | Valor numérico del servicio (mínimo 0) |
| `descuento` | Number | Porcentaje de descuento (0–100, default 0) |
| `descripcion` | String | Texto con los beneficios (máx. 500 caracteres) |

## Requisitos Previos

- [Node.js](https://nodejs.org/) v18 o superior
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) (o MongoDB local)
- [Git](https://git-scm.com/)
- (Opcional) [Docker](https://www.docker.com/) y Docker Compose

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/luisllatas-dev/proyecto_streaming.git
cd Proyecto_Astro
```

### 2. Configurar el Backend

```bash
cd astro_backend
npm install
```

Crea un archivo `.env` basándote en el ejemplo:

```bash
cp .env.example .env
```

Edita `.env` con tu URI de MongoDB:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/astroservicesdb
```

### 3. Configurar el Frontend

```bash
cd ../astro_services
npm install
```

## Uso

### Iniciar el Backend

```bash
cd astro_backend
npm run dev
```

El servidor estará disponible en `http://localhost:5000`.

### Poblar la Base de Datos

```bash
cd astro_backend
npm run seed
```

Esto insertará 6 servicios de ejemplo en la base de datos.

### Iniciar el Frontend

```bash
cd astro_services
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## API REST

Base URL: `http://localhost:5000/api`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/services` | Obtener todos los servicios |
| `GET` | `/services/:id` | Obtener un servicio por ID |
| `POST` | `/services` | Crear un nuevo servicio |
| `PUT` | `/services/:id` | Actualizar un servicio |
| `DELETE` | `/services/:id` | Eliminar un servicio |
| `GET` | `/health` | Verificar estado del servidor |

### Ejemplo: Crear un servicio

```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "imagen": "https://ejemplo.com/imagen.jpg",
    "titulo": "Nuevo Servicio",
    "precio": 4.99,
    "descuento": 10,
    "descripcion": "Descripción del nuevo servicio."
  }'
```

## Docker

Para levantar todo el proyecto con Docker Compose:

```bash
docker-compose up --build
```

Esto levantará tres contenedores:

- **astro_mongo** → MongoDB en el puerto `27017`
- **astro_backend** → API REST en el puerto `5000`
- **astro_frontend** → Aplicación web en el puerto `80`

## Autor

**Luis Llatas** — Estudiante de Gestión de Sistemas de Información

## Licencia

Este proyecto es open source.
