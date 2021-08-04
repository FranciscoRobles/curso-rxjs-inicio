import { fromEvent, interval } from "rxjs";
import { concatMap, switchMap, take } from "rxjs/operators";

/**
 * ConcatMap: Operador de aplanamiento. Se usa para concatenar los 'observables'.
 *  Cuando se crea un nuevo 'observable' interno, se espera a que termine el viejo para después 
 *  subscribirse al nuevo.
 * Pone cada nuevo 'observable' en una Queue donde esperan a que termine en anterior.
 * Esto ayuda a ejecutar varios 'observables' de manera secuencial.
 */

const interval$ = interval(500).pipe(
    take(3)
)
const click$ = fromEvent(document, 'click')

click$.pipe(
    //Aquí se subscribirá al nuevo 'interval' cada vez que haya un click
    switchMap( () => interval$)
)//.subscribe(console.log)

click$.pipe(
    //Aquí se generará un 'interval' con cada click y empezarán a emitir valores cuando
    // se complete el intreval anterior.
    concatMap( () => interval$)
).subscribe(console.log)