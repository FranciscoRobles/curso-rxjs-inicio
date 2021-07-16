import { of, from } from "rxjs";

/**
 * of = Observable que toma argumentos y genera una secuencia.
 * from = Observable array, promise, iterable, observable y 
 *          genera una secuencia con los elementos internos.
 */

const observer = {
    next: value => console.log('next:', value),
    complete: () => console.log('Complete')
}

//Iterable: Emite los siguientes valores
const generator = function*() {
    yield 10;
    yield 20;
    yield 30;
    yield 40;
    yield 50;
}
const iterable = generator();

//Es una sola emisión porque es un sólo array (si quieres mostrar los 5, usa el operador spread '...')
const obsOf$ = of(...[1,2,3,4,5]);
const obsOf2$ = of('Francisco');

obsOf$.subscribe(observer);
obsOf2$.subscribe(observer);

//Son 5 emisiones porque son 5 elementos del array
const obsFrom$ = from([1,2,3,4,5]);
const obsFrom2$ = from('Francisco');
const obsFromFetch$ = from( fetch('https://api.github.com/users/klerith'))
const obsFromIter$ = from(iterable);

obsFrom$.subscribe(observer);
obsFrom2$.subscribe(observer);
//Fetch is a promise and we use the async to get the JSON with the data.
obsFromFetch$.subscribe( async(response) => {
    //We wait for the JSON response
    const data = await response.json()
    console.log(data)
});
obsFromIter$.subscribe(observer);