// Variables / Constantes
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
  // Agregar nuevo tweet
  formulario.addEventListener('submit', agregarTweets);

  // Documento listo
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    crearHTML();
  });
}

// Functions
function agregarTweets(e) {
  e.preventDefault();

  // Tweets
  const tweet = document.querySelector('#tweet').value;
  console.log(tweet);

  // Validación
  if (tweet === '') {
    mostrarError('Debe escribir algo para poder subir contenido');
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  // Crear lista de tweets
  tweets = [...tweets, tweetObj];

  crearHTML();

  // Resetear el textarea
  formulario.reset();
}

// Mostrar error
function mostrarError(err) {
  const mensajeDeError = document.createElement('p');
  mensajeDeError.textContent = err;
  mensajeDeError.classList.add('error');

  // // Insertar en el HTML
  const contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeDeError);

  // Eliminar alerta de error
  setTimeout(() => {
    mensajeDeError.remove();
  }, 2000);
}

// Crear HTML
function crearHTML() {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const botonEliminar = document.createElement('a');
      botonEliminar.classList.add('borrar-tweet');
      botonEliminar.innerText = 'X';

      botonEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      // Crear HTML
      const li = document.createElement('li');
      // Añadir texto
      li.innerHTML = tweet.tweet;

      // Boton eliminar
      li.appendChild(botonEliminar);

      // Agregar al HTML
      listaTweets.appendChild(li);
    });
  }
  sincronizarStorage();
}
// Sincronizar LocalStorage
function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Funcion para borrar los tweets a traves del boton X
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHTML();
}

// Funcion para limpiar la lista de tweets del HTML
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
