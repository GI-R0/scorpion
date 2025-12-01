# Guía de Despliegue 🚀

Esta guía explica cómo desplegar SportifyClub en servicios gratuitos populares: **Render** (para Backend y BD) y **Vercel** (para Frontend).

## 1. Base de Datos (MongoDB Atlas)

1.  Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Crea un cluster gratuito (M0).
3.  En "Network Access", permite acceso desde cualquier IP (`0.0.0.0/0`).
4.  Obtén tu cadena de conexión (URI): `mongodb+srv://<usuario>:<password>@cluster...`

## 2. Backend (Render)

1.  Sube tu código a GitHub.
2.  Crea una cuenta en [Render](https://render.com/).
3.  Crea un "New Web Service".
4.  Conecta tu repositorio de GitHub.
5.  Configuración:
    - **Root Directory**: `backend`
    - **Build Command**: `npm install`
    - **Start Command**: `node src/app.js`
6.  **Environment Variables** (Añade estas variables):
    - `MONGODB_URI`: (Tu URI de Atlas)
    - `JWT_SECRET`: (Un secreto seguro)
    - `CLOUDINARY_CLOUD_NAME`: (Tus credenciales)
    - `CLOUDINARY_API_KEY`: (Tus credenciales)
    - `CLOUDINARY_API_SECRET`: (Tus credenciales)
    - `FRONTEND_URL`: (La URL que te dará Vercel, puedes poner `*` temporalmente)

## 3. Frontend (Vercel)

1.  Crea una cuenta en [Vercel](https://vercel.com/).
2.  Importa tu proyecto desde GitHub.
3.  Configuración:
    - **Root Directory**: `frontend/sportifyclub-frontend`
    - **Framework Preset**: Vite
4.  **Environment Variables**:
    - `VITE_API_URL`: (La URL de tu backend en Render, ej: `https://sportify-backend.onrender.com/api`)
5.  Despliega.

## 4. Finalización

1.  Vuelve a Render y actualiza la variable `FRONTEND_URL` con la URL real de tu frontend en Vercel para configurar correctamente CORS.
2.  ¡Listo! Tu aplicación está online.
