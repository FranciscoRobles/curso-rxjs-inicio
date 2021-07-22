import { fromEvent, interval } from "rxjs";
import { sample } from "rxjs/operators";

/**
 * Sample: Operador de tiempo que emite el último valor emitido por el primer 'observable' cuando se emite
 *  el valor del segundo 'observable'
 * En otras palabras, no se emitirá nada del primer 'observable' hasta que se emita algo del segundo.
 */

//Primer 'observable'
const interval$ = interval(1000)

//Segundo 'observable'
const click$ = fromEvent<MouseEvent>(document, 'click')

interval$.pipe(
    //Cuando se de click, se omitirá el último valor del 'interval$'
    sample(click$)
).subscribe(console.log)