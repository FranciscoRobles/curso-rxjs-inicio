import { fromEvent } from 'rxjs'

/*
Eventos del DOM
*/

/*fromEvent: Creates an 'Observable' that emits events of a specific type 
coming from the given event target.
It's always good to specify the type of the event so you can get access 
to properties and methods of that specific event.
*/
const obs1$ = fromEvent<MouseEvent>(document, 'click');
const obs2$ = fromEvent<KeyboardEvent>(document, 'keyup');

const observer = {
    next: value => console.log('next, ', value)
};

//Because you already specified the type of event, you can directly access the properties x and y.
obs1$.subscribe( ({x, y}) => {
    console.log(x, y)
});
obs2$.subscribe( evento => {
    console.log(evento.key);
});