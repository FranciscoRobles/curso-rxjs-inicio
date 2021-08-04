import { fromEvent, interval } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";

/**
 * ExhaustMap: Operador de aplanamiento. Ignora cualquier nuevo 'observable' interno hasta que se 
 *  complete el anterior sin importar que reciba emisiones del 'observable' padre.
 */

const interval$ = interval(500).pipe(
    take(3)
)
const click$ = fromEvent(document, 'click')

click$.pipe(
    //Aquí se generará un 'interval' con cada click. Pero no emitirá valores hasta que el 'interval' activo
    // se complete. Ignorará cualquier otro click.
    exhaustMap( () => interval$)
).subscribe(console.log)