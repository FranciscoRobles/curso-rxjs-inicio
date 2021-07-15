import { asyncScheduler } from "rxjs";

/*AsyncScheduler: Nos permite realizar las funciones del setTimeout y setInterval. Es una subscripción.
El primer argumento es la función que quiero ejecutar con el async.
El segundo es el 'delay' que es el tiempo a esperar antes de ejecutar la función especificada.
Y el tercero es el 'estado' que es algún argumento/dato que necesite la función a ejecutar. Sólo puedes
    mandar un argumento.
*/
//SetTimeout functionality
const saludar = () => console.log('Hola Mundo');
const saludar2 = nombre => console.log(`Hola ${nombre}`);
asyncScheduler.schedule(saludar, 2000);
asyncScheduler.schedule(saludar2, 2000, 'Paco');

/*SetInterval functionality
Aquí no puedes mandar una "arrow function" como arriba. Tiene que ser una función normal
Aquí, el 'state' es el estado inicial de dónde iniciará la función a ejecutar
*/
const subsciption = asyncScheduler.schedule(function(state){
    console.log('state', state);
    //Está es la razón por la que no se usa "arrow function".
    //Accedemos al this.state, lo modificamos y le ponemos el "nuevo delay" para que se vuelva a ejecutar.
    this.schedule( state + 1, 1000);
}, 3000, 0)

/*
Para parar la subscripción, usamos el unsubscribe para que deje de ejecutarse.
setTimeout( () => {
    subsciption.unsubscribe();
}, 6000);

O, puedes usar otro async con "arrow function" para ejecutar el unsubscribe
*/
asyncScheduler.schedule( () => subsciption.unsubscribe(), 6000);