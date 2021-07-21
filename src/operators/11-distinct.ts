import { from, of, pipe } from "rxjs";
import { distinct } from "rxjs/operators";

/**
 * Distinct: Operador nos deja pasar valores que no hayan sido emitidos antes.
 * En otras palabras, la primera vez de cada valor.
 */

const numeros$ = of<number|string>(1,'1',1,3,3,2,2,4,4,5,3,1)
numeros$.pipe(
    //Distinct use '===' para la comparación, por lo que un 1 y un '1' son distintos
    distinct<number|string, number|string>()
).subscribe(console.log)

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
    /**
     * Por el '===', los objetos son diferentes aunque sus propiedades sean las mismas.
     * Por esa razón se imprimen todos los personajes, incluyendo los repetidos
     * distinct()
     * 
     * Ahora, si agregamos una función como parámetro donde especificamos que cheque y compare el valor,
     * entonces ahora sí omitirá los valores repetidos
     */
    distinct( personaje => personaje.nombre )
).subscribe(console.log)