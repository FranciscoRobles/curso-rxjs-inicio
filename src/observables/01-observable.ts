import { Observable, Observer } from 'rxjs';

//Observable; es recomendable especificar el tipo de valor que fluye del observable
const obs$ = new Observable<string>( subscriber => {
    subscriber.next('Hola');
    subscriber.next('Mundo');

    subscriber.next('Hola');
    subscriber.next('Mundo');

    //Error forzado
    //const a = undefined;
    //a.nombre = 'Fernando';

    //Después del complete, no habrá más salidas de información aunque allá emisiones del observable.
    subscriber.complete();

    subscriber.next('Hola');
    subscriber.next('Mundo');
});

/*Subscribe:
Puedes mandarle 3 argumentos: 
    1. Response (procesar el next del subscriber).
    2. Error (el error de procesar el next).
    3. Complete (lo que se ejecuta cuando el observable se completa).
*/
obs$.subscribe(
    valor => console.log('next: ', valor),
    error => console.warn('error: ', error),
    () => console.info('Completado')
);

/*Observer:
Es otra forma de mandar los 3 argumentos de subscribe.
Puedes mandar el observer a un subscrive para que lo ejecute automáticamente
*/
const observer: Observer<string> = {
    next: value => console.log('Observer siguiente [next]: ', value),
    error: error => console.warn('Observer error [obs]: ', error),
    complete: () => console.info('Observer Completado')
};

obs$.subscribe(observer);