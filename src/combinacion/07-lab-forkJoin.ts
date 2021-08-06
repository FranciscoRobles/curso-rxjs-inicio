import { forkJoin, of } from "rxjs"
import { ajax } from "rxjs/ajax"
import { catchError } from "rxjs/operators"

/**
 * Caso de uso más común de ForkJoin:
 * Realizar peticiones Ajax de manera simultánea
 */

const GITHUB_API_URL = 'https://api.github.com/users'
const GITHUB_USER =  'klerith'

forkJoin({
    //Regresará las 3 peticiones de manera simultánea cuando se completen.
    usuario: ajax.getJSON(
        `${GITHUB_API_URL}/${GITHUB_USER}`
    ),
    repos: ajax.getJSON(
        `${GITHUB_API_URL}/${GITHUB_USER}/repo123123s`
    ).pipe(
        //Aquí atrapará el error y podrá mandar los datos de los demás. No entrará al de abajo al catch
        //  de abajo a no ser que falle la primera o tercera petición.
        catchError( error => of([]))
    ),
    gists: ajax.getJSON(
        `${GITHUB_API_URL}/${GITHUB_USER}/gists`
    )
}).pipe(
    //Se agrega el catchError por si ocurre algo en las peticiones ajax. Ninguna regresará datos.
    catchError( error => of(error.message))
).subscribe(console.log)