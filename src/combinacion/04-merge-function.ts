import { fromEvent, merge } from "rxjs";
import { pluck } from "rxjs/operators";

/**
 * Merge (Función): Función que recibe 1 o más 'observables' y regresa un producto de ambos 
 *  'observables' combinados simultáneamente.
 *  Emitirá los valores conforme cada 'observable' los mande.
 * No se completa hasta que todos los 'observables' se terminen.
 */

const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup')
const click$ = fromEvent<MouseEvent>(document, 'click')

//En caso de que emitan valor al mismo tiempo, se tomará en cuenta el orden en el que están abajo.
merge(
    keyup$.pipe( pluck('type')),
    click$.pipe( pluck('type'))
).subscribe(console.log)