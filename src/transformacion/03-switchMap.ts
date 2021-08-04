import { fromEvent, Observable } from "rxjs"
import { ajax } from "rxjs/ajax"
import { debounceTime, map, mergeAll, mergeMap, pluck, switchMap } from "rxjs/operators"
import { GithubUser } from "../interfaces/github-user.interface"
import { GithubUsersResponse } from "../interfaces/github-users.interface"

//Referencias
const body = document.querySelector('body')
const textInput = document.createElement('input')
const orderList = document.createElement('ol')
body.append( textInput, orderList)

//Helpers
const mostrarUsuarios = ( usuarios: GithubUser[]) => {
    console.log( usuarios )
    orderList.innerHTML = ''
    
    for(const usuario of usuarios){
        const li = document.createElement('li')
        const img = document.createElement('img')
        img.src = usuario.avatar_url

        const anchor = document.createElement('a')
        anchor.href = usuario.html_url
        anchor.text = 'ver página'
        anchor.target = '_blank'

        li.append(img)
        li.append( usuario.login + ' ')
        li.append(anchor)

        orderList.append(li)
    }
}

//Streams
//Se recomienda ponerle el tipado al inicio y final del 'observable' (Saber qué recibe y qué regresa)
const input$ = fromEvent<KeyboardEvent>( textInput, 'keyup')

/**
 * MergeAll: Operador que nos permite trabajar con 'observables' que regresan 'observables'.
 *  No se completará hasta que todos los 'observables hijos ' hayan terminado de emitir valores.
 */

//Se está volviendo muy complejo manerjar toda la cadena de 'Observables'
input$.pipe(
    debounceTime<KeyboardEvent>(500),
    pluck<KeyboardEvent, string>('target', 'value'),
    /**
     * Esta petición regresa un 'observable<unknown>'.
     * Debido a esto, normalmente sería mejor dejar el tipado abierto.
     */
    mergeMap<string, Observable<GithubUsersResponse>>( texto => ajax.getJSON(
        `https://api.github.com/search/users?q=${ texto }`
    )),
    /**
     * Sólo en esta ocasión especificaremos el tipado en todos los 'observables'.
     * Pero normalmente bastaría con el primer y último 'observable' para que saber qué entra y qué regresa.
     */
    pluck<GithubUsersResponse, GithubUser[]>('items')
)//.subscribe(mostrarUsuarios)

//Otro ejercicio - Aquí el mergeMap no funciona bien porque se subscribe a todas las veces
// que se presiena la tecla y ejecutará todo en lugar de esperar el último valor como el mergeAll
const url = 'https://httpbin.org/delay/1?arg='

input$.pipe(
    pluck('target', 'value'),
    mergeMap( texto => ajax.getJSON(url+texto))
)//.subscribe(console.log)

/**
 * SwitchMap: Operador de aplanamiento. Sólo mantiene un 'observable' interno activo y subscrito.
 *  Si se genera un nuevo 'observable' interno, entonces deja el anterior (complete) y 
 *  se subscribe al nuevo.
 * En cuestión de ajax, por cada nuevo 'observable' interno, cancela las peticiones del viejo.
 */
 input$.pipe(
    pluck('target', 'value'),
    switchMap( texto => ajax.getJSON(url+texto))
).subscribe(console.log)