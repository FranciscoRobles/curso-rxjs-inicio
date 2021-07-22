import { fromEvent } from "rxjs";
import { auditTime, map, tap } from "rxjs/operators";

/**
 * AuditTime: Operador de tiempo que emite el último valor del 'observable' en un tiempo especificado.
 *  A diferencia de 'sampleTime', este operador escucha la emisión y luego empieza a contar.
 *  Cuando se cumpla el tiempo especificado, entonces se emite el último valor.
 */

const click$ = fromEvent<MouseEvent>(document, 'click')
click$.pipe(
    map<MouseEvent, number>( ({ x }) => x ),
    //Este tap es para mostrar que toma el valor más reciente después de 2 segundos.
    tap<number>( value => console.log('tap', value)),
    auditTime(2000)
).subscribe(console.log)