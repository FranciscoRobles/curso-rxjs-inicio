import { from } from "rxjs"
import { distinctUntilKeyChanged } from  "rxjs/operators"
/**
 * DistinctUntilKeyChanged: Es un operador parecido a 'distinctUntilChanged' pero más acomodado a objetos
 *  ya que usa la propiedad especificada para relaizar la comparación entre el objeto anterior y el actual.
 */

 interface Personaje {
    nombre: string
}

const personajes: Personaje[] = [
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'Zero'
    },
    {
        nombre: 'Dr. Willy'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'Megaman'
    },
]

from(personajes).pipe(
    distinctUntilKeyChanged<Personaje>('nombre')
).subscribe(console.log)