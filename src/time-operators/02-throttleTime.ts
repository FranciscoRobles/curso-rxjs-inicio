import { asyncScheduler, fromEvent } from "rxjs";
import { throttleTime, distinctUntilChanged, pluck } from "rxjs/operators";

/**
 * ThrottleTime: Operador de tiempo parecido a debounceTime. Emite el primer valor y luego
 *      ignora cualquier valor que se emita después que caiga dentro del tiempo especificado.
 * Este operador, a diferencia del 'debounce', emite el valor y luego ignora los siguientes.
 * Mientras que el 'debounce' emitirá hasta que pase el tiempo especificado.
 */

 const click$ = fromEvent<MouseEvent>(document, 'click')
 click$.pipe(
     throttleTime<MouseEvent>(3000)
 ).subscribe(console.log)
 
 //Ejemplo2
 const input = document.createElement('input')
 document.querySelector('body').append(input)
 
 const inputObs$ = fromEvent<KeyboardEvent>( input, 'keyup')
 inputObs$.pipe(
     //Se agrega el asyncScheduler y el arreglo con 'trailing' para obtener el último valor emitido
     // dentro del segundo especificado.
     throttleTime(1000, asyncScheduler, {
         //Con 'leading' como false, funcionaría muy parecido al debounce
         leading: true,
         trailing: true
     }),
     pluck<KeyboardEvent,string>('target', 'value'),
     distinctUntilChanged<string>()
 ).subscribe( console.log )