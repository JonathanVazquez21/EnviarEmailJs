// Variables
const btnEnviar = document.querySelector("#enviar");
const formulario = document.querySelector("#enviar-mail");

//Variables para campos del formulario

const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje ");

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Eventos
eventListeners();
function eventListeners() {
  // Cuando la app inicia
  document.addEventListener("DOMContentLoaded", iniciarApp);
  // Campos del formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  // Enviar Email simulacion
  formulario.addEventListener('submit', enviarEmail);
}

//Funciones

function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add('cursor-not-allowed','opacity-50');
}

// Valida el formulario
function validarFormulario(e) {
  // e.target.value sirve para detectar lo que el usuario escribe en los input
  // e.target.value.length Sirve para contar los caractares
  if (e.target.value.length) {
    //Elimina los errores despues de pasar la validacion
    const error = document.querySelector("p.error");
    if(error){
        error.remove();
    }
    
    // console.log("si hay algo");
    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    //  console.log('NO hay nada');
    // e.target.style.borderBottomColor = 'red'; agregar borde color rojo
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");

    mostrarError("Todos los mensajes son obligatorios");
  }
  //Validando el campo de email

  if (e.target.type === "email") {

    //   const resultado = e.target.value.indexOf('@');
    //Evaluar que se cumpla la expresion regular con .test
    if (er.test(e.target.value)) {
      // console.log('Email valido');
      const error = document.querySelector("p.error");
    if(error){
        error.remove();
    }
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500");
      mostrarError("Email no válido");
    }
  }
  // Habilitar el boton de enviar si todo es correcto
  if(er.test(email.value) && asunto.value !=='' && mensaje.value !== ''){
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-500",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );
  //Verificamos si hay una clase con el nombre error
  const errores = document.querySelectorAll(".error");

  //Mostrar un solo mensaje de error
  if (errores.length === 0) {
    //Le enviamos el mensaje de error al formulario que esta en html
    formulario.appendChild(mensajeError);
  }
}

function enviarEmail(e){
    e.preventDefault();
     
    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Despues de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout(() => {
        spinner.style.display = 'none';

        // Mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','font-bold','uppercase');

        //Insertarlo en el Dom 
        formulario.insertBefore(parrafo,spinner);
        setTimeout(() => {
            parrafo.remove(); //Eliminar el mensaje
            resetearFormulario();
        },5000);
    }, 3000);
}

// Funcion que resetea el formulario
function resetearFormulario(){
   formulario.reset();
   iniciarApp();
}