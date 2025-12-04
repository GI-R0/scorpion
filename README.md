# 🎾 SportifyClub

> Una app para reservar pistas deportivas. Simple, rápida y funcional.

![Estado](https://img.shields.io/badge/estado-funcionando-brightgreen)
![Versión](https://img.shields.io/badge/versión-1.0.0-blue)

---

## ¿Qué es esto?

SportifyClub es una plataforma web donde puedes:

- **Ver pistas deportivas** disponibles (pádel, tenis, fútbol, etc.)
- **Reservar** la que te guste para jugar
- **Gestionar** tus reservas si eres usuario
- **Administrar** tus pistas si tienes un club deportivo

Es como Booking, pero para pistas deportivas. Nada más, nada menos.

---

## ¿Cómo lo uso?

### Opción 1: Solo quiero verlo funcionar

1. Clona el repo:

   ```bash
   git clone https://github.com/GI-R0/SPORTS.git
   cd SPORTS
   ```

2. Instala todo (backend):

   ```bash
   cd backend
   npm install
   ```

3. Crea un archivo `.env` en la carpeta `backend`:

   ```env
   PORT=4000
   MONGODB_URI=tu_mongodb_uri
   JWT_SECRET=cualquier_texto_secreto
   FRONTEND_URL=http://localhost:5173
   ```

4. Arranca el backend:

   ```bash
   npm run dev
   ```

5. En otra terminal, instala el frontend:

   ```bash
   cd frontend/sportifyclub-frontend
   npm install
   ```

6. Arranca el frontend:

   ```bash
   npm run dev
   ```

7. Abre tu navegador en `http://localhost:5173`

¡Listo! Ya debería estar funcionando.

---

## ¿Qué tecnologías usa?

**Frontend:**

- React (para la interfaz)
- Vite (para que cargue rápido)
- CSS vanilla (con variables para los colores del Barça 💙❤️)

**Backend:**

- Node.js + Express (el servidor)
- MongoDB (la base de datos)
- JWT (para el login)

**Extras:**

- Cloudinary (para subir imágenes de las pistas)
- Axios (para conectar frontend con backend)

---

## ¿Cómo está organizado?

```
sportifyclub/
├── backend/              # El servidor
│   ├── src/
│   │   ├── controllers/  # La lógica de negocio
│   │   ├── models/       # Los esquemas de datos
│   │   ├── routes/       # Las rutas de la API
│   │   └── app.js        # El archivo principal
│   └── package.json
│
└── frontend/             # La interfaz
    └── sportifyclub-frontend/
        ├── src/
        │   ├── pages/    # Las páginas (Home, Pistas, etc.)
        │   ├── components/ # Componentes reutilizables
        │   ├── styles/   # Los estilos CSS
        │   └── App.jsx   # El componente principal
        └── package.json
```

---

## Funcionalidades principales

### Para usuarios normales:

- ✅ Ver todas las pistas disponibles
- ✅ Buscar por nombre
- ✅ Filtrar por deporte
- ✅ Ver detalles de cada pista
- ✅ Hacer reservas
- ✅ Ver mis reservas
- ✅ Cancelar reservas

### Para dueños de clubes:

- ✅ Crear nuevas pistas
- ✅ Editar pistas existentes
- ✅ Eliminar pistas
- ✅ Ver estadísticas
- ✅ Gestionar reservas

### Para administradores:

- ✅ Todo lo anterior
- ✅ Gestionar usuarios
- ✅ Ver todas las pistas del sistema

---

## 🎨 Diseño

- **Azul Barça**: #004d98
- **Rojo Barça**: #a50044
- **Dorado**: #edbb00

Porque si vas a hacer algo, que al menos se vea bonito 😎

---

## 🔐 Seguridad

- Las contraseñas se guardan encriptadas (bcrypt)
- Usamos tokens JWT para el login
- Las rutas están protegidas según el rol del usuario
- CORS configurado para evitar accesos no autorizados

---

## ¿Problemas?

Si algo no funciona:

1. **El backend no arranca:**

   - Revisa que MongoDB esté corriendo
   - Verifica que el `.env` esté bien configurado

2. **El frontend no conecta con el backend:**

   - Asegúrate de que el backend esté en el puerto 4000
   - Revisa la configuración de CORS en `backend/src/app.js`

3. **No se ven las imágenes:**
   - Configura Cloudinary en el `.env`
   - O usa URLs de imágenes directas

---

## 📝 Variables de entorno necesarias

Crea un archivo `.env` en la carpeta `backend` con esto:

```env
# Puerto del servidor
PORT=4000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/sportifyclub
# O usa MongoDB Atlas: mongodb+srv://usuario:password@cluster.mongodb.net/sportifyclub

# JWT
JWT_SECRET=pon_aqui_cualquier_texto_secreto_largo

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:5173

# Cloudinary (opcional, para subir imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

---

## ¿Para qué sirve esto?

Este proyecto es ideal para:

- Aprender desarrollo Full Stack
- Ver cómo funciona una app MERN completa
- Entender autenticación con JWT
- Practicar React y Node.js
- Tener un portfolio decente

---

## 🤝 ¿Quieres contribuir?

Si encuentras un bug o quieres añadir algo:

1. Haz un fork
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit (`git commit -m 'Añadí algo cool'`)
4. Push (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de código abierto. Úsalo como quieras, pero sería cool que me des crédito 😊

---

## 👨‍💻 Autor

Hecho con ☕ y 💙 por un desarrollador que ama el deporte

---

## 🙏 Agradecimientos

- A todos los que probaron la app y reportaron bugs
- A Stack Overflow por salvarme la vida mil veces
- Al café, mi mejor amigo durante el desarrollo

---

**¿Dudas?** Abre un issue en GitHub o mándame un mensaje.

**¿Te gustó?** Dale una ⭐ al repo, me ayuda un montón.

---

_Última actualización: Diciembre 2024_
