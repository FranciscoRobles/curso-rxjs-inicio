import { of } from "rxjs";
import { startWith } from "rxjs/operators";

/**
 * StartWith: Operador que nos permite hacer una emisión antes de que el 'observable'
 *  empiece con sus emisiones.
 */

const numeros$ = of(1,2,3).pipe(
    //El 'observable' emitirá el 0 y luego empezará con los números especificados.
    startWith('0')
)
numeros$.subscribe(console.log)