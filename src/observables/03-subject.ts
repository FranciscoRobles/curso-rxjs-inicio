import { Observable, Observer, Subject} from 'rxjs';

const observer: Observer<number> = {
    next: value => console.log('next [obs]: ', value),
    error: error => console.warn('error [obs]: ', error),
    complete: () => console.info('Complete [obs]')
};

const interval$ = new Observable<number>(subs => {
    const intervalID = setInterval( 
        () => subs.next(Math.random()), 1000
    );

    return () => {
        clearInterval(intervalID)
        console.log('Intervalo Destruido en Observable')
    };
});
//Subscripción normal al 'observable'
//const subs1 = interval$.subscribe(rnd => console.log('subs1', rnd));
//const subs2 = interval$.subscribe(rnd => console.log('subs2', rnd));

/*Subject: Tipo especial de 'Observable'
1. Es casteo múltiple - Subscripciones sujetas al mismo observable para distribuir el mismo valor a todos.
2. Es un 'Observer' - Lo puedes mandar como un argumento del subscribe.
3. Maneja el next, error y complete
*/
const subject$ = new Subject<number>();
const subscriptionSubscriber = interval$.subscribe(subject$);

//El mismo valor se manda a ambos subscripciones en lugar de ser diferente para cada uno.
const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);

//Nos permite insertar datos al flujo del 'observable'.
//Hot Observable: Data producida fuera del 'Observable'; ex: Subject
//Cold Observable: Data producida dentro del 'Observable'
setTimeout(() => {
    subject$.next(10);
    //Completa el subject, pero no el del Observable 'interval'
    subject$.complete();
    //Con esto ya se ejecuta el return del Observable 'internal', lo cual limpia el interval
    subscriptionSubscriber.unsubscribe();
}, 3500)