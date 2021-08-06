import { concat, interval } from "rxjs";
import { take } from "rxjs/operators";

/**
 * Concat (Función): Función que recibe 'observables' o un arreglo y crea un nuevo 'observable'
 *  Ejecuta el primer 'observable', y no se pasará al siguiente hasta que se complete.
 */

const interval$ = interval(1000)
concat(
    //Cuando se complete el interval de 3 valores, iniciará el siguiente
    interval$.pipe(take(3)),
    interval$.pipe(take(2)),
    [1,2,3,4]
).subscribe(console.log)