import { from, of } from "rxjs";
import { distinct, distinctUntilChanged, tap } from "rxjs/operators";

/**
 * Distinct: Operador nos deja pasar valores que no hayan sido emitidos antes.
 * En otras palabras, la primera vez de cada valor.
 * 
 * DistinctUntilChanged: Operador que emite valores siempre y cuendo no se repita el mismo valor
 * de manera seguida
 */

const numeros$ = of<number|string>(1,'1',1,3,3,2,2,4,4,5,3,1)
numeros$.pipe(
    //Distinct y DistinctUntilChanged usa '===' para la comparación, por lo que un 1 y un '1' son distintos
    distinct<number|string, number|string>()
).subscribe(console.log)

numeros$.pipe(
    tap(() => console.log('distinctUntilChanged')),
    distinctUntilChanged<number|string>()
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

from(personajes).pipe(
    tap(() => console.log('distinctUntilChanged')),
    //Para este operador para diferenciar entre objetos, pide 2 argumentos (el anterior y el actual)
    //  para realizar la comparación correspondiente.
    distinctUntilChanged<Personaje>( (pAnterior, pActual) => pAnterior.nombre === pActual.nombre)
).subscribe(console.log)