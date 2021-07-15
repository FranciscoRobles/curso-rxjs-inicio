import { of } from 'rxjs'

//OF: Converts arguments to an observable sequence.
//Puede recibir todos varios tipos de elementos, pero es recomendable usar un sólo tipo y especificarlo '<>'
const obs$ = of<any>([1,2], {a:1, b:2}, function(){}, true, Promise.resolve(true));

console.log('Inicio del Obs$');
//Los 'observables' pueden síncronos o asíncronos.
obs$.subscribe( 
    next => console.log('next', next),
    null,
    () => console.log('Terminamos la secuencia')
);
console.log('Fin del Obs$');