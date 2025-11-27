const ACCESS_KEY = 'cfzDr_24QkWcoep2hVT8TrBAVK_BRBOcOOHI8sYrezw';

async function fetchUnsplash(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=30&client_id=${ACCESS_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('No se pudo conectar con Unsplash. Código: ' + response.status);
  }
  const data = await response.json();
  return data.results;
}

export async function pedirImagenes(busqueda) {
  try {
    const resultados = await fetchUnsplash(busqueda);

    if (resultados?.length > 0) {
      return resultados;
    } else {
      const fallback = await fetchUnsplash('gatos');
      if (fallback.length > 0) {
        alert('No se encontraron imágenes para tu búsqueda. Mostramos imágenes de gatos.');
        return fallback;
      } else {
        alert('No hay imágenes disponibles en este momento.');
        return [];
      }
    }
  } catch (error) {
    console.error('Error al conectar con Unsplash:', error);
    alert('Hubo un problema al buscar imágenes. Intenta más tarde.');
    return [];
  }
}
