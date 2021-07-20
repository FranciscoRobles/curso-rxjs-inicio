import { fromEvent } from "rxjs";
import { first } from "rxjs/operators";

/**
 * First: Operador que completa el 'observable' cuando emite el primer valor 
 * o cuando se cumpla por primera vez una condición especifica.
 * No emitirá valores hasta que se cumpla dicha condición.
 */

const observer = {
    next: value => console.log('next:', value),
    complete: () => console.log('Complete')
}

const click$ = fromEvent<MouseEvent>( document, 'click')
click$.pipe(
    //Aquí se complete con el primer valor emitido.
    //first()
    //Aquí se tiene la condición para cuando se recibe el primer clientY es mayor a 150
    first<MouseEvent, boolean>( clickData => clickData.clientY >= 150)
).subscribe(observer)