import { fromEvent, range } from 'rxjs';
import { map, mapTo, pluck } from 'rxjs/operators';
/**
 * MAP: Operador que nos permite transformar lo emitido por el 'observable' en algo que necesitemos.
 */

const obs$ = range(1,5);

/**
 * Pipe: Dirige los datos emitidos a los operadores que usaremos.
 * Enseguida se debe poner el subscribe para hacer la subscripción a los nuevos valores del operador.
 * El primer type de 'map' es lo que recibe y el segundo es lo que regresa.
 */
obs$.pipe(
    map<number, number>( value => value * 10)
).subscribe(console.log);

//Esta subscripción muestra 1 a 5 porque hace referencia al observable original
obs$.subscribe(console.log);
//Puedes crear otro observable de un observable para aplicar el pipey evitar la confusión escrita.
const obsTimes100$ = obs$.pipe(
    map(value => value*100)
)
obsTimes100$.subscribe(console.log);

//Ejemplo con fromEvent
const keyUp$ = fromEvent<KeyboardEvent>( document, 'keyup');
keyUp$.pipe(
    map<KeyboardEvent, string>(event => event.code)
).subscribe(code => console.log('map:', code))

/**
 * Pluck: Es un operador para extraer un valor/propiedad del 
 *      objeto recibido para que sea la nueva emisión del observable.
 * Con las comas, puedes accesar datos de objetos anidados.
 */
const keyUpPluck$ = keyUp$.pipe(
    pluck<KeyboardEvent, string>('target','baseURI')
);
keyUpPluck$.subscribe(baseURI => console.log('pluck:', baseURI));

/**
 * MapTo: Es un operador para transformar lo emitido por el 'observable' en una salida específica.
 */
 const keyUpMapTo$ = keyUp$.pipe(
    mapTo<KeyboardEvent, string>('Tecla presionada')
);
keyUpMapTo$.subscribe(value => console.log('mapTo:', value));