import { interval, timer } from "rxjs";

const observer = {
    next: value => console.log('next: ', value),
    complete: () => console.log('Complete')
}

//Interval: Creates an 'observable' that emits sequential numbers every specified interval of time.
//It always starts in number '0', is async and it will never stop unless complete or unsubscribe.
const obsInterval$ = interval(1000);
obsInterval$.subscribe(observer);

/*
Timer: Creates an 'observable that starts emitting after a 'dueTime' and emits ever increasing
numbers after each period of time thereafter.
It always starts in number '0', is async and the delay time can be specified as Date or number.
You can add a second parameter which will work as the interval (emit number every specied interval of time).
*/
//const obsTimer$ = timer(2000);
const obsTimer$ = timer(2000, 1000);

//Puedes programar el timer con Date
const hoyEn5 = new Date(); //Ahora
hoyEn5.setSeconds(hoyEn5.getSeconds() + 5);
const obsTimerDate$ = timer(hoyEn5);

obsTimer$.subscribe(observer);
obsTimerDate$.subscribe(observer);