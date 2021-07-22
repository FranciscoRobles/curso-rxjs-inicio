import { fromEvent } from "rxjs";
import { map, sampleTime } from "rxjs/operators";

/**
 * SampleTime: Operador de tiempo que nos permite obtrener el último valor emitido dentro
 *  de un intervalo de tiempo
 */

const click$ = fromEvent<MouseEvent>(document, 'click')
click$.pipe(
    sampleTime<MouseEvent>(2000),
    map<MouseEvent, {x,y}>( ({ x, y}) => ({ x, y}))
).subscribe(console.log)