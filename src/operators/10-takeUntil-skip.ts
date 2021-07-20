import { fromEvent, interval } from "rxjs";
import { skip, takeUntil, tap } from "rxjs/operators";
/**
 * TakeUntil: Operador que recibe como argumento un 'observable'. Deja pasar emisiones hasta que 
 * recibe la primera emisión del 'observable' que tiene por argumento.
 * ----------------------------------------------------------------------------------------------------
 * Skip: Operador que me permite omitir/saltar cierta cantidad de emisiones iniciales.
 */

 const observer = {
    next: value => console.log('next:', value),
    complete: () => console.log('Complete')
}

const button = document.createElement('button')
button.innerHTML = 'Detener Timer'
document.querySelector('body').append( button )

const obsCounter$ = interval(1000)
const clickButton$ = fromEvent<MouseEvent>(button, 'click').pipe(
    //Omitirá los primeros 2 clicks; se emitirán a partir del 3rd click
    tap( () => console.log('tap antes de skip')),
    skip(2),
    tap( () => console.log('tap después de skip')),
)

obsCounter$.pipe(
    //El counter se completará cuando se detecte el click del button.
    takeUntil(clickButton$)
).subscribe(observer)