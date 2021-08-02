import { ajax } from "rxjs/ajax";

const url = 'https://httpbin.org/delay/1'

//Una forma para mandar GET,POST,PUT & DELETE
ajax.put( url, {
    id: 1,
    nombre: 'Francisco Robles'
}, {
    'mi-token': 'ABCD'
}).subscribe( console.log )

//Otra forma de mandar los request de arriba
ajax({
    url: url,
    method: 'POST',
    headers: {
        'mi-token':'ABCD'
    },
    body: {
        id: 1,
        nombre: 'Francisco'
    }
}).subscribe( console.log )