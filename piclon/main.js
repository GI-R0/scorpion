

import './styles/style.css';
import { mostrarBusquedasRecientes } from './components/utils.js';
import { inicializarSearchBar } from './components/searchbar.js';

document.addEventListener('DOMContentLoaded', () => {
  
  inicializarSearchBar();
  mostrarBusquedasRecientes();
});

