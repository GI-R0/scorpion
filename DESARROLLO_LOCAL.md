# 🚀 Guía Rápida de Desarrollo Local

Esta guía te ayudará a ejecutar SportifyClub en tu máquina local.

---

## 📋 Requisitos Previos

- ✅ Node.js instalado (v14 o superior)
- ✅ MongoDB instalado localmente O cuenta de MongoDB Atlas
- ✅ (Opcional) Cuenta de Cloudinary para subida de imágenes

---

## 🏃 Inicio Rápido

### Opción 1: Script Automático (Recomendado) 🚀

Ejecuta el script que inicia todo automáticamente:

```powershell
.\start-dev.ps1
```

Este script:

- ✅ Verifica y crea el archivo `.env` si no existe
- ✅ Instala dependencias automáticamente
- ✅ Inicia backend y frontend en ventanas separadas
- ✅ Abre automáticamente en el navegador

**URLs:**

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

---

### Opción 2: Manual (Paso a Paso)

#### 1️⃣ Configurar Backend

```powershell
# Ir a la carpeta del backend
cd backend

# Crear archivo .env (si no existe)
copy .env.example .env

# Editar .env con tus credenciales
notepad .env

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El backend estará corriendo en: **http://localhost:4000**

#### 2️⃣ Configurar Frontend (en otra terminal)

```powershell
# Ir a la carpeta del frontend
cd frontend\sportifyclub-frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará corriendo en: **http://localhost:5173**

---

## ⚙️ Configuración del archivo .env

Edita `backend/.env` con tus valores:

```bash
# MongoDB Local
MONGODB_URI=mongodb://localhost:27017/sportifyclub

# O MongoDB Atlas (si prefieres usar la nube)
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/sportifyclub

# JWT Secret (cualquier cadena aleatoria)
JWT_SECRET=mi_secreto_super_seguro_12345

# Cloudinary (opcional, solo si vas a subir imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:5173
```

---

## 🌱 Poblar la Base de Datos (Opcional)

Si quieres datos de prueba:

```powershell
cd backend
npm run seed
```

Esto creará:

- ✅ Usuarios de ejemplo
- ✅ Pistas deportivas
- ✅ Reservas de ejemplo

---

## 🐛 Problemas Comunes

### Error: "Cannot connect to MongoDB"

**Solución 1 - MongoDB Local:**

```powershell
# Verificar que MongoDB esté corriendo
mongod --version

# Iniciar MongoDB (si no está corriendo)
mongod
```

**Solución 2 - Usar MongoDB Atlas:**

1. Crear cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear cluster gratuito
3. Obtener URI de conexión
4. Actualizar `MONGODB_URI` en `.env`

### Error: "Port 4000 already in use"

```powershell
# Cambiar el puerto en backend/.env
PORT=5000
```

### Error: "Port 5173 already in use"

```powershell
# Vite asignará automáticamente otro puerto (5174, 5175, etc.)
```

### Frontend no conecta con Backend

Verifica que:

- ✅ El backend esté corriendo en `http://localhost:4000`
- ✅ El proxy en `vite.config.js` apunte al puerto correcto
- ✅ CORS esté configurado correctamente en el backend

---

## 📊 Comandos Útiles

### Backend

```powershell
npm run dev      # Modo desarrollo (con auto-reload)
npm start        # Modo producción
npm run seed     # Poblar base de datos
```

### Frontend

```powershell
npm run dev      # Modo desarrollo
npm run build    # Compilar para producción
npm run preview  # Vista previa de producción
npm run lint     # Verificar código
```

---

## 🔧 Estructura de Puertos

| Servicio     | Puerto | URL                       |
| ------------ | ------ | ------------------------- |
| **Backend**  | 4000   | http://localhost:4000     |
| **Frontend** | 5173   | http://localhost:5173     |
| **MongoDB**  | 27017  | mongodb://localhost:27017 |

---

## 🎯 Flujo de Trabajo Recomendado

1. **Inicia el script**: `.\start-dev.ps1`
2. **Abre el navegador**: http://localhost:5173
3. **Desarrolla**: Los cambios se recargan automáticamente
4. **Detén los servicios**: Cierra las ventanas de PowerShell o presiona `Ctrl+C`

---

## 🆘 Ayuda Adicional

- **Logs del Backend**: Revisa la ventana de PowerShell del backend
- **Logs del Frontend**: Revisa la consola del navegador (F12)
- **Reiniciar**: Cierra las ventanas y ejecuta `.\start-dev.ps1` de nuevo

---

## 🎉 ¡Todo Listo!

Ahora puedes desarrollar SportifyClub localmente. Los cambios se reflejarán automáticamente en el navegador.

**¡Feliz desarrollo!** 🚀
