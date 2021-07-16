import { range, from, fromEvent } from "rxjs";
import { map, filter } from "rxjs/operators";
/**
 * Filter: Operador que nos permite filtrar las emisiones de los valores del 'observable'
 * El 'filter' recibe un valor y/o index y usa una 'arrow function' que regresa un booleano
 */
range(1,10).pipe(
    filter<number>((value, index) => {
        console.log('index:', index)
        return value % 2 === 1
    })
).subscribe(console.log)

//Definimos el tipo de dato de la lista para que se vea mejor en el 'filter'
interface Personaje {
    tipo: string,
    nombre: string
}

const personajes: Personaje[] = [
    {
        tipo: 'heroe',
        nombre: 'Batman'
    },
    {
        tipo: 'heroe',
        nombre: 'Robin'
    },
    {
        tipo: 'villano',
        nombre: 'Joker'
    },
]

from(personajes).pipe(
    filter<Personaje>(personaje => personaje.tipo === 'villano')
).subscribe(console.log)

/**
 * Encadenamiento de operadores: Se pueden encadenar varios operadores, ya sea en el mismo pipe
 *      o en varios '.pipe()' seguidos.
 * Importa mucho el orden de los operadores!!!
 * Ya que el siguiente operador usará el valor que sale del primero.
 */
const keyUp$ = fromEvent<KeyboardEvent>(document, 'keyup')
    .pipe(
        map<KeyboardEvent, string>(event => event.code),
        filter<string>(code => code === 'Enter')
    ).subscribe(console.log)