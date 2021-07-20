import { of } from "rxjs";
import { take, tap } from "rxjs/operators";
/**
 * Take: Operador para limitar la cantidad de emisiones que un 'observable' puede hacer sin importar
 * si el observable hace más emisiones. El 'take' lo completa.
 */

const numeros$ = of(1,2,3,4,5)
numeros$.pipe(
    tap(console.log),
    take(3)
).subscribe({
    next: value => console.log('next:', value),
    complete: () => console.log('Complete')
})