import { forkJoin, interval, of } from "rxjs";
import { delay, take } from "rxjs/operators";

/**
 * ForkJoin (Función): Función que recibe 'observables' finitos (NO FUNCIONA SI LOS 'OBSERVABLES' SON
 *  INFINITOS). Cuando se completan todos los 'observables', se emitirán como un arreglo con los últimos
 *  valores de cada uno.
 * ---------------------------------------------------------------------------------------------------
 * Parece estar deprecado si no se usa el ejemplo de arreglos de 'observables', osea {}
 */

const numeros$ = of(1,2,3,4)
const interval$ = interval(1000).pipe(take(3))
const letras$ = of('a', 'b', 'c').pipe(delay(3500))

//Ejemplo del arreglo
forkJoin(
    numeros$,
    interval$,
    letras$
).subscribe(console.log)

//Ejemplo de cada valor
forkJoin(
    numeros$,
    interval$,
    letras$
).subscribe( response => {
    console.log('numeros: ', response[0])
    console.log('interval: ', response[1])
    console.log('letras: ', response[2])
})

//Ejemplo de pares de valores donde el 'observable' es la llave
forkJoin({
    numeros$,
    interval$,
    letras$
}).subscribe( console.log )

//Ejemplo con nombre de llaves diferentes
forkJoin({
    num: numeros$,
    int: interval$,
    let: letras$
}).subscribe( console.log )