import { fromEvent, interval, of } from "rxjs";
import { map, mergeMap, take, takeUntil } from "rxjs/operators";

/**
 * MergeMap: Operador de aplaneamiento (trabajar con 'observables' que regresan 'observables' y al final
 * regresan productos).
 *  No tiene límites de subscripciones internas y todas pueden estar activas simultáneamente.
 *  Todos los 'observables', incluido el padre, se deben completar para finalizarlo.
 */

const observer = {
    next: value => console.log('next:', value),
    complete: () => console.log('Complete') 
}

const letras$ = of('a', 'b', 'c')
letras$.pipe(
    mergeMap( letra => interval(1000).pipe(
        //Map recibe el producto del 'interval'
        map( i => letra + i),
        take(3)
    ))
)//.subscribe(observer)

//Otro ejemplo
const mouseDown$ = fromEvent( document, 'mousedown')
const mouseUp$ = fromEvent( document, 'mouseup')
const interval$ = interval()

mouseDown$.pipe(
    mergeMap( () => interval$.pipe(
        takeUntil(mouseUp$)
    ))
).subscribe(console.log)