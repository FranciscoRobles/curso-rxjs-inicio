import { from, interval } from "rxjs";
import { map, scan, take, tap } from "rxjs/operators";
import { isAccessor } from "typescript";

/**
 * Scan: Operador es igual a 'reduce' pero éste regresa el valor acumulado y no se espera a que terminen
 * las emisiones.
 */

const observer = {
    next: value => console.log('next: ', value),
    complete: () => console.log('Complete')
}

interval(1000).pipe(
    //Take: Operador para especificar el número de emisiones a mandar
    take(5),
    tap (console.log),
    //Puedes definir el método del reduce en una sección aparte y mandarla a llamar
    scan<number, number>((acc, value) => acc + value, 5)
).subscribe(observer);

//Redux - Manejar el estado global de la aplicación, con un objeto.
interface Usuario {
    id?: string,
    token?: string,
    edad?: number,
    autenticado?: boolean
}

const user: Usuario[] = [
    {   id: 'Pacs', token: null, edad: 25   },
    {   id: 'Ruds', token: 'Papaya', edad: 25   },
    {   id: 'Jimz', token: 'TomB', edad: 25   }
]

const states$ = from(user).pipe(
    scan<Usuario>((acc, value) => {
        return { ...acc, ...value}
    }, {autenticado:false})
)

const id$ = states$.pipe(
    map<Usuario, string>( state => state.id)
)

id$.subscribe(console.log)