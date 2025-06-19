# Galería Visual (Scorpion)

Una galería visual tipo Pinterest que permite buscar imágenes usando la API de Unsplash, guardar búsquedas recientes y disfrutar de un diseño responsive y moderno.

## Características
- Búsqueda de imágenes en Unsplash por palabra clave
- Historial de búsquedas recientes
- Diseño tipo masonry (Pinterest)
- Responsive y accesible
- Menú hamburguesa para móviles

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/GI-R0/scorpion.git
   cd scorpion
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
2. Abre tu navegador en [http://localhost:5173](http://localhost:5173) (o la URL que indique la terminal).
3. ¡Busca imágenes y explora!

## Configuración de la API de Unsplash

El proyecto ya incluye una clave de Unsplash para pruebas. Si necesitas cambiarla, edita el archivo:
- `components/fetchPics.js` → reemplaza el valor de `ACCESS_KEY` por tu propia clave de desarrollador de Unsplash.

Puedes obtener una clave gratis en: [Unsplash Developers](https://unsplash.com/developers)

