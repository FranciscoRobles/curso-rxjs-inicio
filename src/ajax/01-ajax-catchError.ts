import { of } from 'rxjs'
import { ajax, AjaxError } from 'rxjs/ajax'
import { catchError, map, pluck } from 'rxjs/operators'

const url = 'https://api.github.com/users?per_page=5'

const manageError = (response: Response) => {
    if(!response.ok){
        throw new Error( response.statusText )
    }
    return response
}

const atrapaError =  (err:AjaxError) => {
    console.warn('error en:', err.message)
    return of([])
}

/*
const fetchPromise = fetch( url )
fetchPromise
    .then( manageError )
    .then( resp => resp.json())
    .then( data => console.log('data:', data) )
    .catch( err => console.warn('error en usuarios', err)
*/

//Haremos la misma petición, pero usando 'ajax' de rxjs
ajax( url ).pipe(
    //De esta forma, podemos accesar a los datos del response de la petición y ahorrarnos el 
    //  código de arriba
    pluck('response'),
    /**
     * CatchError: Operador que sirve para atrapar cualquier error emitido por el 'observable'.
     *  Puede regresar el mensaje de error o un nuevo 'observable'.
     * Definimos nuestro AjaxError en la parte de arriba.
     */
    catchError(atrapaError)
).subscribe( users => console.log('usuarios:', users) )