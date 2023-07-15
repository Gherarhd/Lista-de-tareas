"use strict";

//variables

const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//Event listeners
eventListener();

function eventListener() {
  //cuando el usuario agrega un nuevo tweet

  formulario.addEventListener("submit", agregarTweet);

  //cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    console.log("tweets");
    crearHTML();
  });
}

//funciones
function agregarTweet(e) {
  e.preventDefault();

  //textarea donde el usuario escribe

  const tweet = document.querySelector("#tweet").value;

  //validacion
  if (tweet === "") {
    mostrarError("Mensaje vacio");
    return; //evita que se ejecute mas lineas de codigos
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  //agregar al arreglo de tweet
  tweets = [...tweets, tweetObj];
  console.log(tweets);

  //crear el html
  crearHTML();

  //reiniciar el formulario
  formulario.reset();
}

//Mostrar mensaje de error
let mensajeMostrado = false; // el mensaje no se repite si das click varias veces al boton
function mostrarError(error) {
  if (!mensajeMostrado) {
    const mensajeError = document.createElement("P");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");

    //insertar mensaje de error
    const contenido = document.querySelector("#contenido");

    contenido.appendChild(mensajeError);

    //elimina la alerta despues de 3 segundos
    setTimeout(() => {
      mensajeError.remove();
      mensajeMostrado = false;
    }, 3000);

    mensajeMostrado = true;
  }
}

//muestra un listado de los tweet

function crearHTML() {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //agregar un boton de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.textContent = "X";

      //añadir la funcion de eliminar.
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      //crear html
      const li = document.createElement("li");

      //añadir el texto
      li.innerText = tweet.tweet;
      li.classList.add("border");
      //añadir boton
      li.appendChild(btnEliminar);

      //insertar en el html
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

//agrega los tweet al local storage

function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//elimina el tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHTML();
}

//limpiar html

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
