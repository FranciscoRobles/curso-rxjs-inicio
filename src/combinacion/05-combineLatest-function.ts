import { combineLatest, fromEvent } from "rxjs";
import { pluck } from "rxjs/operators";

/**
 * CombineLatest (Función): Función que nos permite mandar 'observables' como argumento y regresar un
 *  'observable' que emite todos los valores "combinados" y de manera simultáneamente.
 * Emitirá valores hasta que cada 'observable' haya emitido al menos un valor.
 * Tomará el último (latest) valor de los 'observables' y lo emitirá como un arreglo.
 * No se completará hasta que todos los 'observables' se completen.
 * -----------------------------------------------------------------------------------------------------
 * Parece estar deprecado, aunque el curso lo pone como válido todavía.
 */

 const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup')
 const click$ = fromEvent<MouseEvent>(document, 'click')
 
 //Se emitirá como un arreglo cuando se de un click y un keyup.
 combineLatest(
     keyup$.pipe( pluck('type')),
     click$.pipe( pluck('type'))
 )//.subscribe(console.log)

 //Otro ejemplo

 const input1 = document.createElement('input')
 const input2 = document.createElement('input')

 input1.placeholder = 'email@gmail.com'
 input2.placeholder = '***************'
 input2.type = 'password'

 document.querySelector('body').append(input1, input2)

 //Helper
 const getInputStream = (elemento: HTMLElement) => 
     fromEvent<KeyboardEvent>(elemento, 'keyup')
        .pipe(
            pluck<KeyboardEvent, string>('target', 'value')
        )

 combineLatest(
     //Se emitirán los valores más recientes cuando se escriban mínimo una vez en cada input
     getInputStream( input1 ),
     getInputStream( input2 )
 ).subscribe(console.log)