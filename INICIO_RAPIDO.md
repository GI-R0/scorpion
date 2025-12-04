# 🚀 Cómo Ejecutar SportifyClub Localmente

## Método Rápido (2 Terminales)

### Terminal 1 - Backend

```powershell
cd backend
npm run dev
```

### Terminal 2 - Frontend

```powershell
cd frontend\sportifyclub-frontend
npm run dev
```

---

## URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000

---

## ⚠️ Antes de Ejecutar

### 1. Crear archivo .env en backend

Copia el archivo de ejemplo:

```powershell
cd backend
copy .env.example .env
```

Luego edita `backend\.env` y configura:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/sportifyclub
JWT_SECRET=mi_secreto_super_seguro_12345
FRONTEND_URL=http://localhost:5173
```

### 2. Instalar Dependencias (solo la primera vez)

**Backend:**

```powershell
cd backend
npm install
```

**Frontend:**

```powershell
cd frontend\sportifyclub-frontend
npm install
```

---

## 🎯 Pasos Completos

1. **Abre PowerShell** en la carpeta del proyecto
2. **Abre 2 terminales** (o pestañas)
3. **Terminal 1**:
   ```powershell
   cd backend
   npm run dev
   ```
4. **Terminal 2**:
   ```powershell
   cd frontend\sportifyclub-frontend
   npm run dev
   ```
5. **Abre el navegador** en http://localhost:5173

---

## 🛑 Para Detener

Presiona `Ctrl + C` en cada terminal.

---

## 📝 Notas

- El backend debe estar corriendo ANTES que el frontend
- Si cambias código, se recarga automáticamente
- Revisa los logs en cada terminal si hay errores
