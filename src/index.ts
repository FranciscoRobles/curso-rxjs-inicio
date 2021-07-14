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

    //Return del interval para borrarlo y evitar memopry leaks.
    return () => {
        clearInterval(interval);
        console.log('Interval eliminado');
    }
});

//Subscripción: Una variable que va a ejecutar y observar el observable hasta que se llame el unsubscribe.
const subscription1 = interval$.subscribe();
const subscription2 = interval$.subscribe();
const subscription3 = interval$.subscribe();

//Timer para cancelar la subscripción
setTimeout(() => {
    subscription1.unsubscribe();
    subscription2.unsubscribe();
    subscription3.unsubscribe();
    console.log('Completado timeout');
}, 3000)