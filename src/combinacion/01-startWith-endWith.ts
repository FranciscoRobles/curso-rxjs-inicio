import { of } from "rxjs";
import { endWith, startWith } from "rxjs/operators";

/**
 * StartWith: Operador que nos permite hacer una emisión antes de que el 'observable'
 *  empiece con sus emisiones.
 * 
 * ------------------------------------------------------------------------------------
 * EndWith: Operador que nos permite hacer una emisión antes de que se complete el 'observable'
 * 
 */

const numeros$ = of(1,2,3).pipe(
    //El 'observable' emitirá a,b,c y luego empezará con los números especificados.
    startWith('a', 'b', 'c'),
    //El 'observable' emitirá x,y,z cuando termine de emitir los números.
    endWith('x', 'y', 'z')
)
numeros$.subscribe(console.log)