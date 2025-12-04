# 🚀 Script para ejecutar SportifyClub en desarrollo local
# Este script inicia el backend y el frontend simultáneamente

Write-Host "🏆 Iniciando SportifyClub..." -ForegroundColor Green
Write-Host ""

# Verificar si existe .env en backend
if (-not (Test-Path ".\backend\.env")) {
    Write-Host "⚠️  No se encontró el archivo .env en backend" -ForegroundColor Yellow
    Write-Host "📝 Creando .env desde .env.example..." -ForegroundColor Cyan
    
    if (Test-Path ".\backend\.env.example") {
        Copy-Item ".\backend\.env.example" ".\backend\.env"
        Write-Host "✅ Archivo .env creado. Por favor, edita backend\.env con tus credenciales reales." -ForegroundColor Green
        Write-Host ""
        Write-Host "Necesitas configurar:" -ForegroundColor Yellow
        Write-Host "  - MONGODB_URI (si usas MongoDB local o Atlas)" -ForegroundColor White
        Write-Host "  - CLOUDINARY_* (si vas a subir imágenes)" -ForegroundColor White
        Write-Host ""
        Read-Host "Presiona Enter cuando hayas configurado el archivo .env"
    } else {
        Write-Host "❌ No se encontró .env.example. Crea manualmente backend\.env" -ForegroundColor Red
        exit 1
    }
}

Write-Host "🔧 Instalando dependencias si es necesario..." -ForegroundColor Cyan
Write-Host ""

# Instalar dependencias del backend si no existen
if (-not (Test-Path ".\backend\node_modules")) {
    Write-Host "📦 Instalando dependencias del backend..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
}

# Instalar dependencias del frontend si no existen
if (-not (Test-Path ".\frontend\sportifyclub-frontend\node_modules")) {
    Write-Host "📦 Instalando dependencias del frontend..." -ForegroundColor Yellow
    Set-Location frontend\sportifyclub-frontend
    npm install
    Set-Location ..\..
}

Write-Host ""
Write-Host "✅ Dependencias listas" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Iniciando servicios..." -ForegroundColor Cyan
Write-Host ""
Write-Host "  📡 Backend:  http://localhost:4000" -ForegroundColor Magenta
Write-Host "  🎨 Frontend: http://localhost:5173" -ForegroundColor Magenta
Write-Host ""
Write-Host "💡 Presiona Ctrl+C para detener ambos servicios" -ForegroundColor Yellow
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""

# Iniciar backend en una nueva ventana de PowerShell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🔧 BACKEND - SportifyClub' -ForegroundColor Green; npm run dev"

# Esperar 3 segundos para que el backend inicie
Start-Sleep -Seconds 3

# Iniciar frontend en una nueva ventana de PowerShell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend\sportifyclub-frontend'; Write-Host '🎨 FRONTEND - SportifyClub' -ForegroundColor Cyan; npm run dev"

Write-Host "✅ Servicios iniciados en ventanas separadas" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Abre tu navegador en: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Para detener los servicios, cierra las ventanas de PowerShell o presiona Ctrl+C en cada una." -ForegroundColor Yellow
