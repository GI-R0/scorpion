import { pedirImagenes } from './fetchPics.js';
import { mostrarImagenes } from './showPics.js';
import { guardarBusqueda, mostrarBusquedasRecientes } from './utils.js';

export function inicializarSearchBar() {
  const formulario = document.querySelector('#formularioBusqueda');
  const input = document.querySelector('#inputBusqueda');
  const contenedor = document.querySelector('#contenedorImagenes');
  const logo = document.querySelector('#logo');
  const menu = document.querySelector('#hamburger');
  const links = document.querySelector('#navLinks');

  if (!formulario || !input || !contenedor) {
    if (!formulario) console.error('No se encontró el formulario de búsqueda (#formularioBusqueda) en el DOM.');
    if (!input) console.error('No se encontró el input de búsqueda (#inputBusqueda) en el DOM.');
    if (!contenedor) console.error('No se encontró el contenedor de imágenes (#contenedorImagenes) en el DOM.');
    return;
  }

  
  mostrarBusquedasRecientes();

  
  const busquedaInicial = localStorage.getItem('busquedaInicial');
  if (busquedaInicial) {
    input.value = busquedaInicial;
    pedirImagenes(busquedaInicial)
      .then(data => {
        if (!data || data.length === 0) {
          contenedor.innerHTML = '<p class="mensaje-error">No se encontraron imágenes iniciales.</p>';
        } else {
          mostrarImagenes(data, contenedor);
        }
      })
      .catch(error => {
        console.error('Error al cargar imágenes iniciales:', error);
        contenedor.innerHTML = '<p class="mensaje-error">Ocurrió un error al cargar imágenes iniciales.</p>';
      });
  }

  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const texto = input.value.trim();

    if (!texto || texto.length < 2) {
      alert('Por favor, introduce una palabra válida.');
      return;
    }

    try {
      const imagenes = await pedirImagenes(texto);
      if (!imagenes || imagenes.length === 0) {
        contenedor.innerHTML = '<p class="mensaje-error">No se encontraron imágenes.</p>';
        return;
      }
      mostrarImagenes(imagenes, contenedor);
      localStorage.setItem('busquedaInicial', texto);
      guardarBusqueda(texto);
      mostrarBusquedasRecientes();
      input.value = '';
      if (links) links.classList.remove('activo');
    } catch (error) {
      console.error('Error al buscar imágenes:', error);
      contenedor.innerHTML = '<p class="mensaje-error">Ocurrió un error al buscar imágenes.</p>';
    }
  });

  if (logo) {
    logo.addEventListener('click', () => {
      const busqueda = localStorage.getItem('busquedaInicial');
      if (busqueda) {
        input.value = busqueda;
        pedirImagenes(busqueda)
          .then(data => {
            if (!data || data.length === 0) {
              contenedor.innerHTML = '<p class="mensaje-error">No se encontraron imágenes para la búsqueda inicial.</p>';
            } else {
              mostrarImagenes(data, contenedor);
            }
          })
          .catch(error => {
            console.error('Error al cargar imágenes desde el logo:', error);
            contenedor.innerHTML = '<p class="mensaje-error">Ocurrió un error al cargar imágenes desde el logo.</p>';
          });
      }
    });
  }

  if (menu) {
    menu.addEventListener('click', () => {
      if (links) links.classList.toggle('activo');
    });
  }
}
