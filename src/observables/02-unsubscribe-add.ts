import { Observable, Observer} from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('next [obs]: ', value),
    error: error => console.warn('error [obs]: ', error),
    complete: () => console.info('Complete [obs]')
};

const interval$ = new Observable<number>( subscriber => {
    var x = 1;
    //Se crea la referencia para detener el interval y evitar memory leaks.
    //El unsubscribe no detiene el proceso del interval, sólo se detiene de escucharlo.
    const interval = setInterval( () => {
        subscriber.next(x);
        console.log(x);
        x++;
    }, 1000);

    //Cuando se ejecuta complete, se llamará el código en el return del observable.
    //Es decir, se borrará el Interval.
    setTimeout(() => {
        subscriber.complete();
    }, 2500);

    //Return del interval para borrarlo y evitar memory leaks.
    return () => {
        clearInterval(interval);
        console.log('Interval eliminado');
    }
});

//Subscripción: Una variable que va a ejecutar y observar el observable hasta que se llame el unsubscribe.
const subscription1 = interval$.subscribe(observer);
const subscription2 = interval$.subscribe(observer);
const subscription3 = interval$.subscribe(observer);

//Encadenar subscripciones para un Unsubscribe en cadena.
//Con esto, se ejecuta el complete del primero y después se cerrarán los demás encadenados.
subscription1.add(subscription2).add(subscription3);

//Timer para cancelar la subscripción
setTimeout(() => {
    //Unsubscribe no es lo mismo que el complete.
    subscription1.unsubscribe();
    console.log('Completado timeout');
}, 6000)