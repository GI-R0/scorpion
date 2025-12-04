# ✅ Checklist de Despliegue - SportifyClub

Sigue estos pasos en orden para desplegar tu aplicación correctamente.

---

## 📋 Pre-requisitos

- [ ] Tienes el código funcionando localmente
- [ ] Has probado todas las funcionalidades principales
- [ ] Tienes una cuenta de GitHub
- [ ] El código está subido a un repositorio de GitHub

---

## 🗄️ Paso 1: Configurar MongoDB Atlas (Base de Datos)

- [ ] Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Crear un nuevo cluster (seleccionar plan **M0 Free**)
- [ ] Esperar a que el cluster se cree (2-5 minutos)
- [ ] Configurar acceso:
  - [ ] Ir a **Database Access** → Crear usuario con contraseña
  - [ ] Ir a **Network Access** → Agregar IP `0.0.0.0/0` (permitir desde cualquier lugar)
- [ ] Obtener cadena de conexión:
  - [ ] Click en **Connect** → **Connect your application**
  - [ ] Copiar la URI (ejemplo: `mongodb+srv://usuario:password@cluster.mongodb.net/`)
  - [ ] Guardar esta URI, la necesitarás después

---

## 🖼️ Paso 2: Configurar Cloudinary (Imágenes)

- [ ] Crear cuenta en [Cloudinary](https://cloudinary.com/)
- [ ] Ir al Dashboard
- [ ] Copiar y guardar:
  - [ ] **Cloud Name**
  - [ ] **API Key**
  - [ ] **API Secret**

---

## 🔧 Paso 3: Desplegar Backend (Render)

### Opción A: Render (Recomendado)

- [ ] Crear cuenta en [Render](https://render.com/)
- [ ] Click en **New +** → **Web Service**
- [ ] Conectar tu repositorio de GitHub
- [ ] Configurar el servicio:
  - [ ] **Name**: `sportifyclub-backend` (o el que prefieras)
  - [ ] **Region**: Seleccionar la más cercana
  - [ ] **Branch**: `main` (o tu rama principal)
  - [ ] **Root Directory**: `backend`
  - [ ] **Runtime**: `Node`
  - [ ] **Build Command**: `npm install`
  - [ ] **Start Command**: `npm start`
  - [ ] **Instance Type**: `Free`
- [ ] Agregar **Environment Variables** (click en "Advanced"):
  ```
  PORT=5000
  NODE_ENV=production
  MONGODB_URI=<tu-uri-de-mongodb-atlas>
  JWT_SECRET=<genera-una-cadena-aleatoria-segura>
  CLOUDINARY_CLOUD_NAME=<tu-cloud-name>
  CLOUDINARY_API_KEY=<tu-api-key>
  CLOUDINARY_API_SECRET=<tu-api-secret>
  FRONTEND_URL=*
  ```
- [ ] Click en **Create Web Service**
- [ ] Esperar a que el deploy termine (5-10 minutos)
- [ ] Copiar la URL de tu backend (ejemplo: `https://sportifyclub-backend.onrender.com`)

### Opción B: Railway

- [ ] Crear cuenta en [Railway](https://railway.app/)
- [ ] **New Project** → **Deploy from GitHub repo**
- [ ] Seleccionar tu repositorio
- [ ] Configurar:
  - [ ] **Root Directory**: `backend`
  - [ ] Agregar las mismas variables de entorno que en Render
- [ ] Deploy automático se iniciará

---

## 🎨 Paso 4: Desplegar Frontend (Vercel)

### Opción A: Vercel (Recomendado)

- [ ] Crear cuenta en [Vercel](https://vercel.com/)
- [ ] Click en **Add New** → **Project**
- [ ] Importar tu repositorio de GitHub
- [ ] Configurar el proyecto:
  - [ ] **Framework Preset**: `Vite`
  - [ ] **Root Directory**: `frontend/sportifyclub-frontend`
  - [ ] **Build Command**: `npm run build` (autodetectado)
  - [ ] **Output Directory**: `dist` (autodetectado)
- [ ] Agregar **Environment Variables**:
  ```
  VITE_API_URL=<url-de-tu-backend>/api
  ```
  Ejemplo: `https://sportifyclub-backend.onrender.com/api`
- [ ] Click en **Deploy**
- [ ] Esperar a que termine (2-5 minutos)
- [ ] Copiar la URL de tu frontend (ejemplo: `https://sportifyclub.vercel.app`)

### Opción B: Netlify

- [ ] Crear cuenta en [Netlify](https://www.netlify.com/)
- [ ] **Add new site** → **Import from Git**
- [ ] Configurar:
  - [ ] **Base directory**: `frontend/sportifyclub-frontend`
  - [ ] **Build command**: `npm run build`
  - [ ] **Publish directory**: `dist`
  - [ ] Agregar variable de entorno `VITE_API_URL`
- [ ] Deploy

---

## 🔗 Paso 5: Conectar Frontend y Backend

- [ ] Volver a la configuración de tu backend en Render
- [ ] Actualizar la variable `FRONTEND_URL` con la URL real de Vercel
  - Ejemplo: `https://sportifyclub.vercel.app`
- [ ] Guardar cambios (esto reiniciará el servicio)

---

## 🌱 Paso 6: Poblar la Base de Datos (Opcional)

Si quieres cargar datos de prueba:

- [ ] Conectarte a tu backend desplegado
- [ ] Opción 1: Ejecutar el script de seed localmente apuntando a MongoDB Atlas
  ```bash
  cd backend
  # Crear archivo .env con MONGODB_URI de Atlas
  npm run seed
  ```
- [ ] Opción 2: Usar la interfaz de administración de tu app para crear pistas manualmente

---

## ✅ Paso 7: Verificación Final

- [ ] Abrir la URL de tu frontend en el navegador
- [ ] Probar registro de usuario
- [ ] Probar login
- [ ] Probar búsqueda de pistas
- [ ] Probar creación de reserva
- [ ] Verificar que las imágenes se cargan correctamente
- [ ] Probar en móvil (responsive)

---

## 🐛 Troubleshooting Común

### Error: "Cannot connect to database"

- Verifica que la URI de MongoDB Atlas sea correcta
- Asegúrate de que la IP `0.0.0.0/0` esté en Network Access
- Verifica que el usuario de la BD tenga permisos

### Error: "CORS policy"

- Verifica que `FRONTEND_URL` en el backend tenga la URL correcta de Vercel
- Asegúrate de que no haya espacios ni barras finales

### Error: "404 on refresh"

- Verifica que el archivo `vercel.json` esté en la raíz del frontend
- En Netlify, crea un archivo `_redirects` con: `/* /index.html 200`

### Backend se duerme (Render Free Tier)

- El plan gratuito de Render pone el servicio en "sleep" después de 15 minutos de inactividad
- La primera petición después del sleep tardará ~30 segundos
- Considera usar un servicio de "ping" como [UptimeRobot](https://uptimerobot.com/) para mantenerlo activo

### Imágenes no se cargan

- Verifica las credenciales de Cloudinary
- Revisa los logs del backend para ver errores de subida

---

## 📊 Monitoreo

- [ ] Configurar alertas en Render/Railway para errores
- [ ] Revisar logs regularmente
- [ ] Monitorear uso de MongoDB Atlas (límite de 512MB en plan gratuito)

---

## 🎉 ¡Listo!

Tu aplicación SportifyClub está desplegada y funcionando en producción.

**URLs importantes:**

- Frontend: `_________________`
- Backend: `_________________`
- Base de datos: MongoDB Atlas

**Próximos pasos:**

- Compartir la URL con usuarios
- Configurar un dominio personalizado (opcional)
- Implementar analytics (Google Analytics, etc.)
- Configurar backups de la base de datos
