export function mostrarImagenes(imagenes, contenedor) {
  if (!Array.isArray(imagenes) || !contenedor) return;

  contenedor.innerHTML = '';

  imagenes.forEach(img => {
    if (!img.urls || !img.user) return;

    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');

  
    const imgElem = document.createElement('img');
    imgElem.src = img.urls.small;
    imgElem.alt = img.alt_description || 'Imagen de Unsplash';
    imgElem.loading = 'lazy';

    
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

  
    const usuario = document.createElement('p');
    usuario.innerHTML = `<strong>${img.user.name}</strong>`;

  
    const descripcion = document.createElement('p');
    const texto = img.alt_description || 'Sin descripción';
    descripcion.textContent = texto.length > 80 ? texto.slice(0, 80) + '...' : texto;

    
    const likes = document.createElement('p');
    likes.innerHTML = `❤️ ${img.likes} Me gusta`;

    
    infoDiv.appendChild(usuario);
    infoDiv.appendChild(descripcion);
    infoDiv.appendChild(likes);

    
    tarjeta.appendChild(imgElem);
    tarjeta.appendChild(infoDiv);
    contenedor.appendChild(tarjeta);
  });
}
