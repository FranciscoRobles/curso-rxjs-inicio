import { of } from "rxjs";
import { ajax, AjaxError } from "rxjs/ajax";
import { catchError } from "rxjs/operators";

/**
 * getJSON: Operador que procesa la respuesta de la petición Ajax.
 */

const url = 'https://httpbin.org/delsay/1'
const manejaError = (resp: AjaxError ) => {
    console.warn('error:', resp.message )
    return of({
        ok: false,
        usuarios: []
    })
}

/*
Manejo de errores:

const obs$ = ajax.getJSON( url ).pipe(
    catchError(manejaError)
)
const obs2$ = ajax( url ).pipe(
    catchError(manejaError)
)
*/

const obs$ = ajax.getJSON( url )
const obs2$ = ajax( url )

obs$.pipe(
    //Si usamos el 'catchError', se manje el error y la subscripción se ejecuta y se completa.
    catchError( manejaError )
).subscribe({
    next: value => console.log('next:', value),
    error: err => console.warn('error en subs:', err),
    complete: () => console.log('complete')
})
//obs2$.subscribe(data => console.log('ajax:', data))