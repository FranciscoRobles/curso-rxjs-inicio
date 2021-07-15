import { asyncScheduler, range } from "rxjs";

//RANGE: Creates an 'observable' that emits a sequence of numbers within the specified range.
//the first value is the starting point. The second is the count of emissions.
const obs$ = range(-5,10);
//Async Range
const obsAsync$ = range(-5,10, asyncScheduler);

obs$.subscribe(console.log);

console.log("Start Async");
obsAsync$.subscribe(console.log);
console.log("Finish Async");
