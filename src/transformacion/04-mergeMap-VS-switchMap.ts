import { fromEvent, interval } from "rxjs";
import { mergeMap, switchMap } from "rxjs/operators";

/**
 * Diferencia entre mergeMap y switchMap:
 * Como se explico anteriormente, el 'mergeMap' se subscribe a todos los 'observables' internos.
 * Mientras que el switch sólo se subscribe al 'observable' interno más reciente y completa el viejo.
 */

const click$ = fromEvent(document, 'click')
const interval$ = interval(1000)

//MergeMap Example
click$.pipe(
    //Por cada click, habrá un nuevo 'observable' del interval que emitirá un número cada segundo.
    // Habrá múltiples 'intervals' emitiendo valores simultáneamente.
    mergeMap( () => interval$)
)//.subscribe(console.log)

//SwitchMap Example
click$.pipe(
    //Por cada click, se creará un nuevo 'observable' y se 'cerrará' el viejo para tener un sólo
    // interval emitiendo valores cada segundo.
    switchMap( () => interval$)
).subscribe(console.log)