/*

Simulador de eventos para La Griglia Del Tonchi


*/


// VARIABLES GLOBALES

let arrayClientes = []

let arrayVinos = []

let arrayEventos = []

let arrayCarnes = []

let arrayMenus = []

let arrayDatosDelEvento = []

let presupuestoTotal = 0

let presupuestoPorPersona = 0

let coincidencia = false

let eventosGuardadosEnLS = JSON.parse(localStorage.getItem("eventos")) || []

// CLASES

class Cliente{

	constructor(nombre, apellido, email, cantidadDePersonas){
		this.nombre = nombre
		this.apellido = apellido
		this.email = email
		this.cantidadDePersonas = cantidadDePersonas
	}
}

class Vino{

	constructor(nombre, anio, tipo, bodega, precioPorBotella, id){

		this.nombre = nombre
		this.anio = anio
		this.tipo = tipo
		this.bodega = bodega
		this.precioPorBotella = precioPorBotella
		this.id = id
	}
}

class Evento{

	constructor(nombre, vestimenta, precio){

		this.nombre = nombre
		this.vestimenta = vestimenta
		this.precio = precio //Es un porcentaje añadido
	}
}

class Carne{

	constructor(nombre, tipo, precioPorKg){

		this.nombre = nombre
		this.tipo = tipo
		this.precioPorKg = precioPorKg
	}
}

class Menu{

	constructor(nombre, precioPorPersona, plato1a, plato1b, plato2a, plato2b, plato3a, plato3b, postre, id){

		this.nombre = nombre
		this.precioPorPersona = precioPorPersona
		this.plato1a = plato1a
		this.plato1b = plato1b
		this.plato2a = plato2a         // Creador de Menus
		this.plato2b = plato2b
		this.plato3a = plato3a
		this.plato3b = plato3b
		this.postre = postre //true o false
		this.id = id
	}

	llevarPostre(){

		this.postre = true
		this.precioPorPesona = this.precioPorPesona * 1.05 // 5% mas por persona
	}
}
 

// Pusheo mis datos

arrayVinos.push(new Vino("El Enemigo", "2019", "Malbec", "Bodega Aleanna", 15, 0))
arrayVinos.push(new Vino("Catena", "2019", "Malbec", "Bodega Catena Zapata", 13, 1))
arrayVinos.push(new Vino("Potrero", "2018", "Malbec", "Bodega Gualtallary", 12, 2))

arrayEventos.push(new Evento("Casamiento", "Formal", 1.20))
arrayEventos.push(new Evento("Evento Formal", "Formal", 1.10))
arrayEventos.push(new Evento("Evento Informal", "Informal", 1))

arrayCarnes.push(new Carne("Vacio", "Vaca", 12))
arrayCarnes.push(new Carne("Entraña", "Vaca", 18))
arrayCarnes.push(new Carne("Mollejas", "Vaca", 24))
arrayCarnes.push(new Carne("Matambre", "Cerdo", 9))
arrayCarnes.push(new Carne("Chorizo", "Cerdo", 8))
arrayCarnes.push(new Carne("Morcilla", "Carne", 8))
arrayCarnes.push(new Carne("Picanha", "Carne", 16))
arrayCarnes.push(new Carne("Costillar", "Carne", 12))
arrayCarnes.push(new Carne("Punta de Espalda", "Carne", 16))
arrayCarnes.push(new Carne("Chinchulines", "Carne", 13))
arrayCarnes.push(new Carne("Cordero", "Cabra", 18))

arrayMenus.push(new Menu("Cuyano", 35, arrayCarnes[4], arrayCarnes[1], arrayCarnes[9], arrayCarnes[5], arrayCarnes[8], arrayCarnes[7], false, 0))
arrayMenus.push(new Menu("Patagonia", 45, arrayCarnes[2], arrayCarnes[9], arrayCarnes[3], arrayCarnes[4], arrayCarnes[6], arrayCarnes[10], false, 1))
arrayMenus.push(new Menu("Argentina", 40, arrayCarnes[1], arrayCarnes[9], arrayCarnes[3], arrayCarnes[6], arrayCarnes[0], arrayCarnes[5], false, 2))
arrayMenus.push(new Menu("Premium", 55, arrayCarnes[1], arrayCarnes[2], arrayCarnes[6], arrayCarnes[10], arrayCarnes[0], arrayCarnes[7], false, 3))

console.log(arrayMenus)
console.log(arrayCarnes)
console.log(arrayEventos)
console.log(arrayVinos)

// Api Email Validation

let emailJero = "jerogarcia@hotmail.com"

let myHeaders = new Headers();
myHeaders.append("apikey", "kYcjvABzCInvttZdWKaYwGER8YxAlHEM");

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

// FUNCIONES

async function validarEmail(email){

	let emailValido = "" 

	const response = await fetch(`https://api.apilayer.com/email_verification/check?email=${email}`, requestOptions)

	const result = await response.json()

	if(result.mx_found){

 			emailValido = true

 			Toastify({
 				text: "Email Verificado",
 				duration: 5000,
 				close: true,
 				style: {
				    background: "linear-gradient(to right, #DCE35B, #45B649)",
				},		
 			}).showToast()
 		
 		}else{

 			emailValido = false

 			Toastify({
 				text: "Email no valido",
 				duration: 5000,
 				close: true,
 				style: {
				    background: "linear-gradient(to right, #ED213A, #93291E)",
				},			
 			}).showToast()

 		}

  	console.log(emailValido)

}  


function agregarQuitarClaseOcultar(parte1, parte2){

	parte1.classList.add('animate__fadeOut')

	parte1.classList.add('animate__faster')

	parte1.classList.remove('animate__fadeIn')

	parte1.classList.remove('animate__delay-1s')

	setTimeout(() => {

		parte1.classList.add('ocultar')

		parte2.classList.add('animate__fadeIn')

		parte2.classList.add('animate__delay-1s')

		parte2.classList.remove('ocultar')

		parte2.classList.remove('animate__fadeOut')

		parte2.classList.remove('animate__faster')
	
	}, 200)

}

function eleccionTipoDeEvento(i){

	let eventoElegido = arrayEventos[i]

	// Agrego evento a datosDelEvento

	arrayDatosDelEvento.push(eventoElegido)

	// Agregar la clase ocultar a Segunda parte y sacarsela a Tercera parte

	agregarQuitarClaseOcultar(segundaParte, terceraParte)
}

function eleccionMenu(id){

	let menuElegido = arrayMenus.find( (el) => el.nombre === id)

	arrayDatosDelEvento.push(menuElegido)

	agregarQuitarClaseOcultar(terceraParte, cuartaParte)
}

function eleccionVino(id){

	let vinoElegido = arrayVinos.find( (el) => el.nombre === id)

	arrayDatosDelEvento.push(vinoElegido)

	agregarQuitarClaseOcultar(quintaPartePlus, presupuesto)
}

function calcularPresupuesto(){

	// Traigo todos los elementos que me sirven para la operacion matematica

	let cp = arrayDatosDelEvento.find( (el) => el.cantidadDePersonas)
	let ev = arrayDatosDelEvento.find( (el) => el.precio)
	let m = arrayDatosDelEvento.find( (el) => el.precioPorPersona)
	let v = 0

	// Verifico que si el vino esta incluido o no
	// Traigo el precio por botella para agregarlo al presupuesto

	if(respuestaVino === "Si, incluiremos una botella cada 4 personas"){

		v = arrayDatosDelEvento.find( (el) => el.precioPorBotella)

		v = v.precioPorBotella
	}
	
	// Calculo de presupuestos

	presupuestoTotal = (m.precioPorPersona * cp.cantidadDePersonas) * ev.precio + v * (cp.cantidadDePersonas / 4)

	presupuestoPorPersona = presupuestoTotal  / cp.cantidadDePersonas

	// Detectar si hay un evento con este mail
	// Si existe, no pushear array datosDelEvento

	if(!coincidencia){

		// Agregar datos del evento a local storage

		eventosGuardadosEnLS.push(arrayDatosDelEvento)

		localStorage.setItem("eventos", JSON.stringify(eventosGuardadosEnLS))

	}

}

function busquedaEmail(){

	let emails = []

	for(const eventoGuardado of eventosGuardadosEnLS){

		let em = eventoGuardado.find( (el) => el.email)

		emails.push(em.email)
	
	}

	return emails

}

function compararEmail(email){

	let emailsTotales = busquedaEmail()

	for(let i = 0;i < emailsTotales.length;i++){

		// 1)Buscar el mail y los datos del evento que contiene ese mail

		if(email === emailsTotales[i]){

			let emailEncontrada = emailsTotales[i]

			for(const eventoGuardado of eventosGuardadosEnLS){

				let datosDelEmail = eventoGuardado.find( (el) => el.email === emailEncontrada)

				if(datosDelEmail !== undefined){
					
					let datosDelCliente = datosDelEmail

					let datosDelEvento = eventosGuardadosEnLS.find( (el) => el.includes(datosDelCliente))

					// 2)Agregar esos datos a ArrayDatosDelEvento

					arrayDatosDelEvento = datosDelEvento
				
				}
	
			}
	
			coincidencia = true
		
		}
	}

}


// INICIO 

// Primera parte: Pedir datos

// 1) Capturar los datos con de los inptus
//      a) asignar cantidad de personas a una variable
	//  b) Crear con la clase Cliente al cliente (Lo dejo para el final)
// 
// 3) Detectar el cambio del boton submit
//      a) sacar clase ocultar a Segunda Parte y agregar clase ocultar a Primera Parte
//      b) limpiar los inputs

// 1)Capturar los datos con de los inptus

const formularioDelEvento = document.getElementById("formularioDelEvento")

const inputNombre = document.getElementById("nombre")

const inputApellido = document.getElementById("apellido")

const inputEmail = document.getElementById("email")

const inputCantidadDePersonas = document.getElementById("cantidadDePersonas")   // Estas const Variables Globales, pasarlas despues

const primeraParte = document.getElementById("primeraParte")

const segundaParte = document.getElementById("segundaParte")

const terceraParte = document.getElementById("terceraParte")

// Eventos

formularioDelEvento.addEventListener("submit", (event) => {	

	event.preventDefault()

	const nombre = inputNombre.value
	const apellido = inputApellido.value
	const email = inputEmail.value
	const cantidadDePersonas = inputCantidadDePersonas.value

	//Validar si el email existe

	validarEmail(email)

	// Comparo si se busco presupuesto con el mismo email

	compararEmail(email)

	//Si se encuentra un email, salto directamente a presupuesto con los datos guardados del localStorage

	if(coincidencia === true){

		// Agregar quitar clase ocultar a Primera parte y Presupuesto

		Swal.fire({
				icon: 'warning',
  				title: 'Email ya en uso',
  				text: 'Hay un evento ya asignado a esta email. Si quieres editarlo, has click en el boton modificar una vez visible el presupuesto',
  				background: 'rgba(33, 37, 41, 1)',
  				color: 'white',
  				confirmButtonColor: 'rgba(26, 133, 18, 1)',
  				showClass: {
  					popup:'animate__animated animate__fadeInUp'
  				},
  				hideClass: {
				    popup: 'animate__animated animate__fadeOutUp'
				}
			})

		agregarQuitarClaseOcultar(primeraParte, presupuesto)

		arrayDatosDelEvento.length < 4 ? respuestaVino = "No" : respuestaVino = "Si, incluiremos una botella cada 4 personas" 

		arrayDatosDelEvento[2].postre ? respuestaPostre = "Si" : respuestaPostre  = "No"

	}else{

		//Agrego al cliente a la lista de clientes y a DatosDelEvento

		let cliente = new Cliente(nombre, apellido, email, cantidadDePersonas)

		arrayClientes.push(cliente)

		arrayDatosDelEvento.push(cliente)

		//Chequear si cantidad de personas es superior a 10 y menor a 400

		if(cantidadDePersonas >= 10 && cantidadDePersonas <= 400){

			// limpiar inputs

			inputNombre.value = ""
			inputApellido.value = ""
			inputEmail.value = ""
			inputCantidadDePersonas.value = ""

			// Agregar la clase ocultar a Primera parte y sacarsela a Segunda parte

			agregarQuitarClaseOcultar(primeraParte, segundaParte)

		}else{

			Swal.fire({
				icon: 'error',
  				title: 'Cantidad de personas no disponible',
  				text: 'El minimo de personas es 10  y el maximo es 400',
  				background: 'rgba(33, 37, 41, 1)',
  				confirmButtonColor: 'rgba(26, 133, 18, 1)',
  				color: 'white',
  				showClass: {
  					popup:'animate__animated animate__fadeInUp'
  				},
  				hideClass: {
				    popup: 'animate__animated animate__fadeOutUp'
				}
			})
		}

	}
	
})

// Segunda parte: Elegir tipo de evento

// 		1)Detectar click en alguna de las 3 cards
//		2)Detectar que card fue elegida y agregarla a DatosDelEvento
//		3)Una vez elegida una de las tres, agregar o ocultar segunda parte y tercera parte


const cardCasamiento = document.getElementById("cardCasamiento")

const cardEventoFormal = document.getElementById("cardEventoFormal")   // Estas const Variables Globales, pasarlas despues

const cardEventoInformal = document.getElementById("cardEventoInformal")

// Eventos

cardCasamiento.addEventListener("click", function() {

	eleccionTipoDeEvento(0)
})

cardEventoFormal.addEventListener("click", function() {

	eleccionTipoDeEvento(1)
})

cardEventoInformal.addEventListener("click", function() {

	eleccionTipoDeEvento(2)
})


// Tercera Parte: Elegir el Menu

//		1)Crear Menus desde JavaScript automaticamente
//		2)Detectar eleccion del menu y agregar a DatosDelEvento
//		3)Agregar/Quitar clase ocultar

const contenedorMenus = document.getElementById("contenedorMenus")

for(menus of arrayMenus){

	let contenedorDatosMenu = document.createElement("div")

	contenedorDatosMenu.Id = menus.nombre

	contenedorDatosMenu.className = "cartas mb-2 bg-dark text-white mx-5 p-3"

	contenedorDatosMenu.innerHTML = `	<h4 class="p-1 fw-bold fs-1 text-center"> ${menus.nombre}</h4>
						    			<ul class="list-group">
						    				<li class="list-group-item d-flex justify-content-between align-items-start bg-dark text-white border-0 border-bottom border-2">
						    					<div class="ms-2 me-auto">
										      		<div class="fw-bold fst-italic fs-5">
										      			Primer Plato:
										      		</div>
										      		<p class="fs-6">Empezamos con <strong class="fs-5 p-1"> ${menus.plato1a.nombre}</strong> y <strong class="fs-5 p-1"> ${menus.plato1b.nombre}</strong></p>
										    	</div>
				  							</li>
						    				<li class="list-group-item d-flex justify-content-between align-items-start bg-dark text-white border-0 border-bottom border-2">
						    					<div class="ms-2 me-auto">
										      	<div class="fw-bold fst-italic fs-5">
										      		Segundo Plato:
										      	</div>
										      		<p class="fs-6">A seguir con <strong class="fs-5 p-1"> ${menus.plato2a.nombre}</strong> y <strong class="fs-5 p-1"> ${menus.plato2b.nombre}</strong></p>
										    	</div>
										    </li>
						    				<li class="list-group-item d-flex justify-content-between align-items-start bg-dark text-white border-0">
						    					<div class="ms-2 me-auto">
										      	<div class="fw-bold fst-italic fs-5">
										      		Tercer Plato:
										      	</div>
										      		<p class="fs-6">Por último tenemos <strong class="fs-5 p-1"> ${menus.plato3a.nombre}</strong> y <strong class="fs-5 p-1"> ${menus.plato3b.nombre}</strong></p>
										    	</div>
										    </li>
						    			</ul>`

	contenedorMenus.appendChild(contenedorDatosMenu)

	contenedorDatosMenu.addEventListener("click", () => {

		eleccionMenu(contenedorDatosMenu.Id)

	})

}

// Cuarta Parte: Incluir el postre

//	1)Detectar Botones Si y No
//	2)Añadir evento a cada uno
//	3)Caso SI: 1) llamar al metodo llevarPostre() dentro del MenuElegido dentro del arrayDatosDelEvento	
//	5)Agregar quitar clase ocultar


const postreSi = document.getElementById("postreSi")
const postreNo = document.getElementById("postreNo")
let respuestaPostre = ""

postreNo.addEventListener("click", () => {

	agregarQuitarClaseOcultar(cuartaParte, quintaParte)

	respuestaPostre = "No"
})

postreSi.addEventListener("click", () => {

	let postre = arrayDatosDelEvento.find( (el) => el.postre === false)

	postre.llevarPostre()

	respuestaPostre = "Si"

	agregarQuitarClaseOcultar(cuartaParte, quintaParte)
})

// Quinta Parte: Incluir Vino

// 1)Detectar Botones Si y No
// 2)Añadir Evento a cada uno
// 3)Caso SI: 1)Pasar a la seccion quintaParte-vino 
// 4)Agregar quitar clase ocultar


const vinoSi = document.getElementById("vinoSi")
const vinoNo = document.getElementById("vinoNo")
let respuestaVino = ""

vinoNo.addEventListener("click", () => {

	agregarQuitarClaseOcultar(quintaParte, presupuesto)

	respuestaVino = "No"
})

vinoSi.addEventListener("click", () => {

	agregarQuitarClaseOcultar(quintaParte, quintaPartePlus)

	respuestaVino = "Si, incluiremos una botella cada 4 personas"
})

// Quinta Parte Plus: Eleccion del Vino


const contenedorVinos = document.getElementById('contenedorVinos')

for(vinos of arrayVinos){

	let contenedorDatosVino = document.createElement("div")

	contenedorDatosVino.Id = vinos.nombre

	contenedorDatosVino.ClassName = "col-10"

	contenedorDatosVino.innerHTML = `<div class="cartas mb-2 bg-dark text-white mx-5 p-4">
		    							<h4 class="p-1 fw-bold fs-3 text-center">${vinos.nombre}</h4>
		    							<ul class="list-group">
		    								<li class="list-group-item fs-5 text-center bg-dark text-white border-0 border-bottom border-2">${vinos.tipo}</li>
		    								<li class="list-group-item fs-5 text-center bg-dark text-white border-0 border-bottom border-2">${vinos.anio}</li>
		    								<li class="list-group-item fs-5 text-center bg-dark text-white border-0">${vinos.bodega}</li>
		    							</ul>
		    						</div>`

	contenedorVinos.appendChild(contenedorDatosVino)
	
	contenedorDatosVino.addEventListener("click", () => {

		eleccionVino(contenedorDatosVino.Id)

	})    						
}

// Presupuesto

// 1)Crear div con los DatosDelEvento
// 2)Mostrar presupuesto por persona y presupuesto del evento

const contenedorCalcularPresupuesto = document.getElementById("calcularPresupuesto")

document.getElementById("botonCalcularPresupuesto").addEventListener("click", () => {

	console.log(arrayDatosDelEvento)

	Swal.fire({
		icon: 'success',
		background: 'rgba(33, 37, 41, 1)',
		color: 'white',
  		title: 'Hemos calculado tu presupuesto',
 		text: 'Te enviaremos toda la información por mail',
  		confirmButtonText: 'Ver presupuesto',
  		confirmButtonColor: 'rgba(26, 133, 18, 1)',
  		footer: 'Gracias por participar en nuestro simulador',
  		showClass: {
  			popup:'animate__animated animate__fadeInUp'
  		},
  		hideClass: {
			popup: 'animate__animated animate__fadeOutUp'
		}

	}).then((result) => {

		calcularPresupuesto()

		botonCalcularPresupuesto.classList.add("ocultar")

		contenedorCalcularPresupuesto.classList.add('flex-row')

		contenedorCalcularPresupuesto.classList.remove('flex-column')

		let cp = arrayDatosDelEvento.find( (el) => el.cantidadDePersonas)
		let ev = arrayDatosDelEvento.find( (el) => el.precio)
		let m = arrayDatosDelEvento.find( (el) => el.precioPorPersona)
		let v = arrayDatosDelEvento.find( (el) => el.precioPorBotella)

		let contenedorDatosPresupuesto = document.createElement("div")

		contenedorDatosPresupuesto.id = "datosPresupuesto"

		contenedorDatosPresupuesto.className = "d-flex flex-row align-items-center justify-content-between w-100 animate__fadeIn animate__animated"

		contenedorDatosPresupuesto.innerHTML = `<div class="d-flex flex-column align-items-start justify-content-around px-4 w-50">
									    				<h5 class="p-1 fw-bold fs-2">Su evento:</h5>
									    				<ul class="list-group w-100">
									    					<li class="list-group-item fs-5 bg-dark text-white border-0 border-bottom border-2 fw-bold">${cp.cantidadDePersonas} personas</li>
									    					<li class="list-group-item fs-5 bg-dark text-white border-0 border-bottom border-2 fw-bold">${ev.nombre}</li>
									    					<li class="list-group-item fs-5 bg-dark text-white border-0 border-bottom border-2 fw-bold">Menu ${m.nombre}</li>
									    					<li class="list-group-item fs-5 bg-dark text-white border-0 border-bottom border-2 fw-bold">Postre: ${respuestaPostre}</li>
									    					<li class="list-group-item fs-5 bg-dark text-white border-0 fw-bold">Vino: ${respuestaVino}</li>
									    				</ul>
									    			</div>
									    			<div class="align-self-end px-4 w-50">
									    				<ul class="list-group">
									    					<li class="list-group-item fs-5 bg-dark text-white border-0 border-bottom border-2">Total por Persona = ${Math.round(presupuestoPorPersona)} €</li>
									    					<li class="list-group-item fs-5 bg-dark text-white border-0">Total Evento = ${Math.round(presupuestoTotal)} €</li>
									    				</ul>
									    			</div>`

			
		// Hago visible boton modificar

		let contenedorBotonModificar = document.getElementById("contenedorBotonModificar")

		contenedorBotonModificar.classList.remove('ocultar')
		
		document.getElementById("botonModificar").addEventListener("click", () => {

			// Acciones del boton modificar

			Swal.fire({
				icon: 'warning',
			  	title: 'Modificará su evento',
			  	text: 'Los datos del evento actual no se guardarán, deberá comenzar desde cero',
			  	showDenyButton: true,
			  	background: 'rgba(33, 37, 41, 1)',
			  	color: 'white',
	        	confirmButtonColor: 'rgba(26, 133, 18, 1)',
			  	confirmButtonText: 'Si, modificar',
			  	denyButtonText: 'Cancelar y conservar datos',
			  	showClass: {
  					popup:'animate__animated animate__fadeInUp'
  				},
  				hideClass: {
				    popup: 'animate__animated animate__fadeOutUp'
				}

			}).then((result) => {

							if(result.isConfirmed){

								agregarQuitarClaseOcultar(presupuesto, primeraParte)

								// Buscar el evento que contenga el email del evento a modificar
								// Eliminar el evento a modificar dentro el local storage y hacer que ingrese todos los datos nuevamente

								const eventoAModificar = eventosGuardadosEnLS.find( (el) => el[0].email === arrayDatosDelEvento[0].email)

								const indiceEventoAModificar = eventosGuardadosEnLS.indexOf(eventoAModificar)

								eventosGuardadosEnLS.splice(indiceEventoAModificar, 1)

								localStorage.clear()

								arrayDatosDelEvento = []

								localStorage.setItem("eventos", JSON.stringify(eventosGuardadosEnLS))

								coincidencia = false

								// Vuelvo a añadir boton Calcular Presupuesto

								botonCalcularPresupuesto.classList.remove("ocultar")

								contenedorBotonModificar.classList.add("ocultar")

								contenedorCalcularPresupuesto.classList.add('flex-column')

								contenedorCalcularPresupuesto.classList.remove('flex-row')

								document.getElementById("datosPresupuesto").remove()
							}
						})
			
		})

		contenedorCalcularPresupuesto.appendChild(contenedorDatosPresupuesto)

	})

})

AOS.init();

	


