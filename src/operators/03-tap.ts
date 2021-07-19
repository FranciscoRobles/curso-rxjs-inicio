import { range } from "rxjs";
import { map, tap } from "rxjs/operators"; 

//Tap: Operador que nos permite disparar efectos secundarios o acciones cuando la información sea emitida.
//El tap es bueno para depurar ya que lo puedes agregar y no modifica las emisiones.
const numbers$ = range(1,5);
numbers$.pipe(
    //El tap no hace el 'return'
    tap<number>(value => console.log('tap', value)),
    map<number, number>(value => value * 10),
    tap<number>({
        next: value => console.log('tap with observer', value),
        //Este complete se ejecutará cuando termine todo el observable
        complete: () => console.log('Se terminó todo el observable')
    }),
    map<number, string>(value => (value * 2).toString())
).subscribe(value => console.log('after each emission with 2 maps', value));