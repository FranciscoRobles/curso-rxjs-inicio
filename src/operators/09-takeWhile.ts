import { fromEvent } from "rxjs";
import { map, takeWhile } from "rxjs/operators";

/**
 * TakeWhile: Operador que permite recibir emisiones mientras una condición se cumpla.
 * Tiene un parámetro 'inclusive' para que se emita el valor que rompe con la condición.
 */

 interface Coordenada {
    x: number,
    y: number
}

const observer = {
    next: value => console.log('next:', value),
    complete: () => console.log('Complete')
}

const click$ = fromEvent<MouseEvent>(document, 'click')
click$.pipe(
    map<MouseEvent, Coordenada>( ({x,y}) => ({x,y}) ),
    //true, para que emita el valor que rompe la condición.
    takeWhile<Coordenada>( ({y}) => y < 200 , true)
).subscribe(observer)