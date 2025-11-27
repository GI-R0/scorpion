export function guardarBusqueda(termino) {
  if (!termino) return;
  let historial = JSON.parse(localStorage.getItem('historial')) || [];
  
  historial = historial.filter(item => item !== termino);
  historial.unshift(termino);
  
  if (historial.length > 10) historial = historial.slice(0, 10);
  localStorage.setItem('historial', JSON.stringify(historial));
}

export function mostrarBusquedasRecientes() {
  const contenedorBtn = document.getElementById('busquedasRecientes');
  if (!contenedorBtn) return;
  const historialGuardado = JSON.parse(localStorage.getItem('historial')) || [];

  if (!contenedorBtn) return; 

  contenedorBtn.innerHTML = '';

  historialGuardado.forEach(termino => {
    const boton = document.createElement('button');
    boton.textContent = termino;
    boton.classList.add('botonReciente');

    boton.addEventListener('click', async () => {
      try {
        const { pedirImagenes } = await import('./fetchPics.js');
        const { mostrarImagenes } = await import('./showPics.js');
        const inputBusqueda = document.querySelector('#inputBusqueda');
        const contenedor = document.querySelector('#contenedorImagenes');
        if (!inputBusqueda || !contenedor) return;
        inputBusqueda.value = termino;
        const resultados = await pedirImagenes(termino);
        mostrarImagenes(resultados, contenedor);
        inputBusqueda.value = '';
      } catch (error) {
        console.error('Error al buscar desde el historial:', error);
      }
    });

    contenedorBtn.appendChild(boton);
  });
}
