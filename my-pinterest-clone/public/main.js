require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const accessKey = process.env.API_KEY; // Cargar la clave de API desde el archivo .env

// Selección de elementos del DOM
const input = document.getElementById('search');
const button = document.getElementById('btnBuscar');
const galeria = document.getElementById('galeria');

/**
 * @function fetchImages
 * @description Realiza una solicitud a la API de Unsplash para buscar imágenes.
 * @param {string} query - La consulta de búsqueda.
 * @returns {Promise<Array>} - Una lista de imágenes.
 */
const fetchImages = async (query) => {
  try {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`);
    if (!res.ok) {
      throw new Error(`Error al obtener imágenes: ${res.statusText}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error en la solicitud: ${error.message}`);
    return [];
  }
};

/**
 * @function displayImages
 * @description Muestra las imágenes en el contenedor de la galería.
 * @param {Array} images - Lista de imágenes a mostrar.
 */
const displayImages = (images) => {
  galeria.innerHTML = ''; // Limpiar la galería
  if (images.length === 0) {
    galeria.innerHTML = '<p>No se encontraron imágenes. Intenta con otra búsqueda.</p>';
    return;
  }
  images.forEach((foto) => {
    const img = document.createElement('img');
    img.src = foto.urls.small;
    img.alt = foto.alt_description || 'Imagen';
    galeria.appendChild(img);
  });
};

// Evento para manejar la búsqueda
button.addEventListener('click', async () => {
  const palabra = input.value.trim();
  if (!palabra) {
    alert('Por favor, ingresa un término de búsqueda.');
    return;
  }

  galeria.innerHTML = '<p>Buscando imágenes...</p>';
  const images = await fetchImages(palabra);
  displayImages(images);
  input.value = ''; // Limpiar el campo de búsqueda
});

/**
 * @function resetGallery
 * @description Restablece la galería a un estado inicial con imágenes predeterminadas.
 */
const resetGallery = async () => {
  galeria.innerHTML = '<p>Cargando imágenes iniciales...</p>';
  const images = await fetchImages('paisajes'); // Consulta predeterminada
  displayImages(images);
};

// Cargar imágenes iniciales al cargar la página
document.addEventListener('DOMContentLoaded', resetGallery);

