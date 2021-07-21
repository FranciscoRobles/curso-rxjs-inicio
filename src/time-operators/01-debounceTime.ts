import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, pluck } from "rxjs/operators";

/**
 * DebounceTime: Operador que trabaja con intérvalos de tiempo para ayudarnos a contar
 *  cuántas milésimas han pasado desde la última emisión.
 *  Si pasa de la cantidad especificada, entonces emitirá el valor.
 * 
 * Nos ayuda a restringir la cantidad de emisiones que el 'observable' emite ya que sólo emitirá la última
 * emisión cuando termine de contar la cantidad de segundos específica.
 */

const click$ = fromEvent<MouseEvent>(document, 'click')
click$.pipe(
    //Sólo emitirá un click cuando termine de contar 3 segundos. Si hago más clicks 
    //en menos de 3 segundos, entonces reinicia el conteo y no emite nada hasta las 3 segundos
    debounceTime<MouseEvent>(3000)
).subscribe(console.log)

//Ejemplo2
const input = document.createElement('input')
document.querySelector('body').append(input)

const inputObs$ = fromEvent<KeyboardEvent>( input, 'keyup')
inputObs$.pipe(
    debounceTime(1000),
    pluck<KeyboardEvent,string>('target', 'value'),
    distinctUntilChanged<string>()
).subscribe( console.log )