# 🚀 Guía de Despliegue - SportifyClub

Esta guía te ayudará a desplegar SportifyClub en producción usando servicios cloud **100% gratuitos**.

---

## 📚 Documentación Adicional

- **[CHECKLIST_DESPLIEGUE.md](./CHECKLIST_DESPLIEGUE.md)**: Checklist paso a paso detallado (¡empieza aquí!)
- **[README.md](./README.md)**: Documentación general del proyecto

---

## 🎯 Arquitectura de Despliegue

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   Vercel/       │ ───▶ │  Render/Railway  │ ───▶ │  MongoDB Atlas  │
│   Netlify       │      │   (Backend API)  │      │  (Base de Datos)│
│  (Frontend)     │      └──────────────────┘      └─────────────────┘
└─────────────────┘              │
                                 ▼
                        ┌─────────────────┐
                        │   Cloudinary    │
                        │   (Imágenes)    │
                        └─────────────────┘
```

---

## 🛠️ Servicios Recomendados

### Backend

- **🥇 Render** (Recomendado): Fácil de usar, auto-deploy desde GitHub
- **🥈 Railway**: Más rápido, pero con límites más estrictos
- **🥉 Fly.io**: Más técnico, pero muy potente

### Frontend

- **🥇 Vercel** (Recomendado): Optimizado para React/Vite
- **🥈 Netlify**: Excelente alternativa, muy similar
- **🥉 Cloudflare Pages**: Rápido y con CDN global

### Base de Datos

- **MongoDB Atlas** (M0 Free): 512MB de almacenamiento

### Almacenamiento de Imágenes

- **Cloudinary**: 25GB de almacenamiento gratuito

---

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener:

- ✅ Código funcionando localmente
- ✅ Cuenta de GitHub con el código subido
- ✅ Node.js instalado (para pruebas locales)
- ✅ Git configurado

---

## 🚀 Guía Rápida (5 Pasos)

### 1️⃣ MongoDB Atlas (Base de Datos)

1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear cluster gratuito (M0)
3. Configurar acceso de red: `0.0.0.0/0`
4. Crear usuario de base de datos
5. Obtener URI de conexión

**URI ejemplo**: `mongodb+srv://usuario:password@cluster.mongodb.net/sportifyclub`

---

### 2️⃣ Cloudinary (Imágenes)

1. Crear cuenta en [Cloudinary](https://cloudinary.com/)
2. Ir al Dashboard
3. Copiar: **Cloud Name**, **API Key**, **API Secret**

---

### 3️⃣ Render (Backend)

1. Crear cuenta en [Render](https://render.com/)
2. **New Web Service** → Conectar repositorio GitHub
3. Configuración:

   - **Name**: `sportifyclub-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Variables de Entorno** (Environment):

   ```bash
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=<tu-uri-mongodb-atlas>
   JWT_SECRET=<cadena-aleatoria-segura-minimo-32-caracteres>
   CLOUDINARY_CLOUD_NAME=<tu-cloud-name>
   CLOUDINARY_API_KEY=<tu-api-key>
   CLOUDINARY_API_SECRET=<tu-api-secret>
   FRONTEND_URL=*
   ```

5. Click **Create Web Service**
6. **Copiar la URL** del backend (ej: `https://sportifyclub-backend.onrender.com`)

---

### 4️⃣ Vercel (Frontend)

1. Crear cuenta en [Vercel](https://vercel.com/)
2. **Add New Project** → Import from GitHub
3. Configuración:

   - **Framework Preset**: Vite
   - **Root Directory**: `frontend/sportifyclub-frontend`
   - **Build Command**: `npm run build` (auto)
   - **Output Directory**: `dist` (auto)

4. **Environment Variables**:

   ```bash
   VITE_API_URL=https://sportifyclub-backend.onrender.com/api
   ```

   ⚠️ Reemplaza con tu URL real del backend

5. Click **Deploy**
6. **Copiar la URL** del frontend (ej: `https://sportifyclub.vercel.app`)

---

### 5️⃣ Conectar Frontend ↔ Backend

1. Volver a **Render** → Tu servicio backend
2. **Environment** → Editar `FRONTEND_URL`
3. Cambiar de `*` a tu URL de Vercel: `https://sportifyclub.vercel.app`
4. Guardar (el servicio se reiniciará automáticamente)

---

## ✅ Verificación

Visita tu URL de frontend y prueba:

- ✅ Registro de usuario
- ✅ Login
- ✅ Búsqueda de pistas
- ✅ Creación de reserva
- ✅ Subida de imágenes (si eres admin)

---

## 🐛 Problemas Comunes

### Backend no conecta a MongoDB

**Solución**:

- Verifica que la URI sea correcta (sin espacios)
- Asegúrate de que `0.0.0.0/0` esté en Network Access de Atlas
- Verifica que el usuario de BD tenga permisos de lectura/escritura

### Error CORS en el frontend

**Solución**:

- Verifica que `FRONTEND_URL` en Render tenga la URL correcta de Vercel
- No incluyas barra final: ❌ `https://app.vercel.app/` ✅ `https://app.vercel.app`

### 404 al recargar página en Vercel

**Solución**:

- Verifica que `vercel.json` esté en `frontend/sportifyclub-frontend/`
- El archivo debe tener la configuración de rewrites

### Backend se "duerme" (Render Free)

**Problema**: El plan gratuito de Render pone el servicio en sleep después de 15 min de inactividad.

**Solución**:

- Primera petición tardará ~30 segundos en despertar
- Opcional: Usar [UptimeRobot](https://uptimerobot.com/) para hacer ping cada 5 minutos

### Imágenes no se suben

**Solución**:

- Verifica las credenciales de Cloudinary en las variables de entorno
- Revisa los logs del backend en Render para ver el error específico

---

## 📊 Límites del Plan Gratuito

| Servicio          | Límite          | Notas                                |
| ----------------- | --------------- | ------------------------------------ |
| **Render**        | 750 horas/mes   | Suficiente para 1 servicio 24/7      |
| **Vercel**        | 100GB bandwidth | Muy generoso para proyectos pequeños |
| **MongoDB Atlas** | 512MB storage   | ~100k documentos aprox.              |
| **Cloudinary**    | 25GB storage    | Miles de imágenes                    |

---

## 🔐 Seguridad

- ✅ Nunca subas archivos `.env` a GitHub
- ✅ Usa secretos JWT de al menos 32 caracteres aleatorios
- ✅ Cambia las credenciales por defecto
- ✅ Revisa los logs regularmente

---

## 📈 Próximos Pasos

Una vez desplegado:

1. **Dominio personalizado**: Configura un dominio en Vercel (gratis)
2. **Analytics**: Agrega Google Analytics o Vercel Analytics
3. **Monitoring**: Configura alertas en Render
4. **Backups**: Configura backups automáticos en MongoDB Atlas
5. **CI/CD**: Ya está configurado automáticamente con GitHub

---

## 🆘 Ayuda

Si tienes problemas:

1. Revisa los **logs** en Render (pestaña "Logs")
2. Revisa la **consola del navegador** para errores del frontend
3. Usa el **[CHECKLIST_DESPLIEGUE.md](./CHECKLIST_DESPLIEGUE.md)** paso a paso
4. Verifica que todas las variables de entorno estén correctas

---

## 🎉 ¡Éxito!

Una vez completado, tu aplicación estará disponible 24/7 en internet, completamente gratis.

**Comparte tu URL y disfruta de SportifyClub en producción** 🏆
