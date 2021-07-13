import { Observable } from 'rxjs';

//Observable; es recomendable especificar el tipo de valor que fluye del observable
const obs$ = new Observable<string>( subscriber => {
    subscriber.next('Hola');
    subscriber.next('Mundo');

    subscriber.next('Hola');
    subscriber.next('Mundo');

    //Después del complete, no habrá más salidas de información aunque allá emisiones del observable.
    subscriber.complete();

    subscriber.next('Hola');
    subscriber.next('Mundo');
});

obs$.subscribe( console.log )





