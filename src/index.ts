import { fromEvent } from "rxjs"
import { ajax } from "rxjs/ajax"
import { debounceTime, map, mergeAll, pluck } from "rxjs/operators"

//Referencias
const body = document.querySelector('body')
const textInput = document.createElement('input')
const orderList = document.createElement('ol')
body.append( textInput, orderList)

//Streams
const input$ = fromEvent<KeyboardEvent>( textInput, 'keyup')

/**
 * MergeAll: Operador que nos permite trabajar con 'observables' que regresan 'observables'.
 *  No se completará hasta que todos los 'observables hijos ' hayan terminado de emitir valores.
 */

//Se está volviendo muy complejo manerjar toda la cadena de 'Observables'
input$.pipe(
    debounceTime(500),
    pluck('target', 'value'),
    //Esta petición regresa un 'observable'
    map( texto => ajax.getJSON(
        `https://api.github.com/search/users?q=${ texto }`
    )),
    //El mergeAll se subscribirá y emitirá los valores del map
    mergeAll(),
    pluck('items')
).subscribe( resp => {
        console.log(resp)
    }
)