import { fromEvent, Observable } from "rxjs"
import { ajax } from "rxjs/ajax"
import { debounceTime, map, mergeAll, pluck } from "rxjs/operators"
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
    map<string, Observable<GithubUsersResponse>>( texto => ajax.getJSON(
        `https://api.github.com/search/users?q=${ texto }`
    )),
    //El mergeAll se subscribirá y emitirá los valores del map
    mergeAll<GithubUsersResponse>(),
    /**
     * Sólo en esta ocasión especificaremos el tipado en todos los 'observables'.
     * Pero normalmente bastaría con el primer y último 'observable' para que saber qué entra y qué regresa.
     */
    pluck<GithubUsersResponse, GithubUser[]>('items')
).subscribe(mostrarUsuarios)