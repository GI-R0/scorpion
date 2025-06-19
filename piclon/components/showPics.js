export function mostrarImagenes(imagenes, contenedor) {
  if (!Array.isArray(imagenes) || !contenedor) return;
  contenedor.innerHTML = '';
  imagenes.forEach(img => {
    if (!img.urls || !img.user) return;
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');
    const descripcion = img.alt_description || 'Sin descripción';
    const imgElem = document.createElement('img');
    imgElem.src = img.urls.small;
    imgElem.alt = descripcion;
    imgElem.loading = 'lazy';
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');
    const nombreUsuario = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = img.user.name;
    nombreUsuario.appendChild(strong);
    const descripcionParrafo = document.createElement('p');
    descripcionParrafo.textContent = descripcion.length > 100 ? descripcion.slice(0, 100) + '...' : descripcion;
    infoDiv.appendChild(nombreUsuario);
    infoDiv.appendChild(descripcionParrafo);
    tarjeta.appendChild(imgElem);
    tarjeta.appendChild(infoDiv);
    contenedor.appendChild(tarjeta);
  });
}
