import { fromEvent, of } from "rxjs"
import { ajax, AjaxResponse } from "rxjs/ajax"
import { catchError, exhaustMap, map, mergeMap, pluck, switchMap, tap } from "rxjs/operators"

//Helper
const peticionHttpLogin = userPass => {
    return ajax.post('https://reqres.in/api/login?delay=1', userPass)
        .pipe(
            pluck('response', 'token'),
            catchError( err => of('xxxx'))
        )
}

//Formulario
const form = document.createElement('form')
const inputEmail = document.createElement('input')
const inputPass = document.createElement('input')
const submitBtn = document.createElement('button')

//Configuraciones
inputEmail.type = 'email'
inputEmail.placeholder = 'Email'
inputEmail.value = 'eve.holt@reqres.in'

inputPass.type = 'password'
inputPass.placeholder = 'Password'
inputPass.value = 'cityslicka'

submitBtn.innerHTML = 'Ingresar'

form.append(inputEmail, inputPass, submitBtn)
document.querySelector('body').append(form)

//Streams
const submitForm$ = fromEvent<Event>(form, 'submit')
    .pipe(
        tap(evento => evento.preventDefault()),
        map(evento => ({
            email: evento.target[0].value,
            password: evento.target[1].value
        })),
        exhaustMap( peticionHttpLogin )
    )
submitForm$.subscribe(token => console.log(token))