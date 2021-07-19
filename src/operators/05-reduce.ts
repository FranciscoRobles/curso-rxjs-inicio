import { interval } from "rxjs";
import { reduce, take, tap } from "rxjs/operators";

/**
 * Reduce: Operador como 'reduce' de JS. Aplica una función acumuladora a las emisiones del 'observable'
 * Puede recibir 2 parámetros: 
 *      1st parámetro: Función que recibe (Acc) es el valor acumulado, (Curr) es el valor de la emisión 
 *      actual y la definicón del método
 *      Último parámetro es el valor inicial del acumulador.
 * No habrá emisión en el subscribe hasta que se complete el 'observable'!!!
 */

 const observer = {
    next: value => console.log('next: ', value),
    complete: () => console.log('Complete')
}

interval(1000).pipe(
    //Take: Operador para especificar el número de emisiones a mandar
    take(3),
    tap (console.log),
    //Puedes definir el método del reduce en una sección aparte y mandarla a llamar
    reduce<number, number>((acc, value) => acc + value, 5)
).subscribe(observer);