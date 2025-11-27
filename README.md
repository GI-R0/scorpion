# SportifyClub 🏆

## Descripción del Proyecto

SportifyClub es una plataforma web completa (Full Stack MERN) diseñada para la gestión y reserva de pistas deportivas. Su objetivo es conectar a clubes deportivos con usuarios aficionados, facilitando la administración de instalaciones y la reserva de espacios de manera intuitiva y eficiente.

### Propósito y Lógica de Negocio

El proyecto resuelve dos problemas principales:

1.  **Para los Clubes**: Ofrece un panel de administración (`/club-panel`) para gestionar sus pistas, ver estadísticas de ingresos y ocupación, y administrar reservas.
2.  **Para los Usuarios**: Proporciona una interfaz sencilla para buscar pistas por deporte, ver disponibilidad en tiempo real y realizar reservas instantáneas.

La lógica se basa en roles diferenciados (`admin`, `club`, `user`), asegurando que cada actor tenga acceso solo a las funcionalidades pertinentes.

---

## Arquitectura del Proyecto

El proyecto sigue una arquitectura **MERN** (MongoDB, Express, React, Node.js) modular y escalable.

### Backend (`/backend`)

Construido con Node.js y Express, siguiendo el patrón MVC (Modelo-Vista-Controlador).

- **Modelos (`/models`)**: Definición de esquemas de datos con Mongoose (`User`, `Pista`, `Reserva`).
- **Controladores (`/controllers`)**: Lógica de negocio pura. Separa la recepción de peticiones del procesamiento de datos.
- **Rutas (`/routes`)**: Definición de endpoints API RESTful.
- **Middlewares (`/middlewares`)**:
  - `auth.js`: Protección de rutas mediante JWT y verificación de roles.
  - `upload.js`: Gestión de subida de imágenes a Cloudinary.
- **Seed (`/seed`)**: Script para poblar la base de datos desde archivos CSV/Excel, simulando un entorno de producción inicial.

### Frontend (`/frontend`)

Construido con React y Vite, enfocado en la experiencia de usuario (UX/UI).

- **Páginas (`/pages`)**: Vistas principales (`Home`, `Login`, `GestionPistas`, etc.).
- **Componentes (`/components`)**: Elementos reutilizables (`Navbar`, `ReservaForm`, `CardPista`).
- **Contexto (`/context`)**: Gestión de estado global para la autenticación (`AuthContext`).
- **Hooks Personalizados (`/hooks`)**: Lógica reutilizable (`useAuth`).
- **Estilos**: Uso de **Tailwind CSS** para un diseño moderno, responsivo y mantenible, complementado con variables CSS para consistencia de marca.

---

## Características Destacadas

1.  **Gestión de Estado Avanzada**: Uso de `useReducer` y `useMemo` en el frontend para manejar lógica compleja de filtrado y formularios.
2.  **Importación Masiva**: Funcionalidad para importar pistas desde archivos Excel (`.xlsx`), procesada en el frontend y sincronizada con el backend.
3.  **Subida de Imágenes**: Integración con **Cloudinary** para almacenamiento de imágenes en la nube.
4.  **Seguridad**: Autenticación JWT, hasheo de contraseñas con Bcrypt y protección de rutas por roles.
5.  **Semilla de Datos**: Script de Node.js que lee archivos CSV para inicializar la base de datos con usuarios y pistas de prueba.

---

## Instalación y Despliegue

### Requisitos Previos

- Node.js (v14+)
- MongoDB (Local o Atlas)
- Cuenta de Cloudinary (para subida de imágenes)

### Configuración Local

1.  **Clonar el repositorio**
2.  **Backend**:
    ```bash
    cd backend
    npm install
    # Crear archivo .env con:
    # PORT=5000
    # MONGODB_URI=tu_uri_mongodb
    # JWT_SECRET=tu_secreto
    # CLOUDINARY_CLOUD_NAME=...
    # CLOUDINARY_API_KEY=...
    # CLOUDINARY_API_SECRET=...
    npm run dev
    ```
3.  **Frontend**:
    ```bash
    cd frontend/sportifyclub-frontend
    npm install
    npm run dev
    ```

### Semilla de Datos (Opcional)

Para cargar datos de prueba:

```bash
cd backend
npm run seed
```

---

## Tecnologías Utilizadas

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, Axios, XLSX.
- **Backend**: Node.js, Express, Mongoose, JWT, Bcrypt, Multer, Cloudinary, CSV-Parser.
- **Base de Datos**: MongoDB.

---

Hecho con 💚 por el equipo de desarrollo de SportifyClub.
