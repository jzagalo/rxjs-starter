import { Observer } from "rx";
import { interval, Observable } from "rxjs";
// tslint:disable: no-console

import { from, fromEvent, of, Subscriber } from "rxjs";
import { reduce, map, pluck, tap, filter, skip, take, timeInterval } from "rxjs/operators";

/* const people: string[] = ["Micheal", "Jim", "Dwight"];

class Calculator {
	static observerStatic(itemA: number, itemB: number){
		let obs = from([itemA, itemB]);
		const sum$ = obs.pipe(reduce((acc: number, item: number) => acc + item))
		return sum$;
	}
}

class Receipt {
	constructor(observable$: any){
		observable$.subscribe((value: any) => console.log(`total receipt: ${value}`));
	}
}

const pizza = 6.00;
const beer = 5.00;

const calc = Calculator.observerStatic(pizza, beer);
const reciever = new Receipt(calc);

const link = document.getElementById("google");
const clickStream = fromEvent(link, "click")
					.pipe(
						map((event: any) => { event.preventDefault; 
							return event.currentTarget.getAttribute("href")})
					).subscribe(result => console.log(result));
				

const observable = new Observable((subscriber: any) => {
	subscriber.next(1);
	subscriber.next(2);
	subscriber.next(3);

	setTimeout(() => {
		subscriber.next(4);
		subscriber.complete();
	}, 1000);
});

observable.subscribe(console.log);

const progressBar$ = new Observable((observer) => {
	const OFFSET = 3000;
	const SPEED = 100;

	let val = 0;
	function progress(){
		if(++val <= 100){		
			observer.next(val);
			setTimeout(progress, SPEED);
		} else {
			observer.complete();
		}		
	}

	setTimeout(progress, OFFSET);
});

const label = document.getElementById('tell');

progressBar$.subscribe(
	val => label.textContent = (Number.isInteger(val) ? val + "%" : val.toString()),
	error => console.log(error.message),
	() => label.textContent = "Complete"
)

const computerFuturesValue = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(42);
	}, 5000)
});

const promise$ = from(computerFuturesValue)
					.subscribe(
						val => console.log(val),
						err => console.log(`${err}`),
						() => console.log(" All done") 
					);*/
const rxdo$ = from([
	'The quick brown fox',
	'jumps over the lazy dogs'
]). pipe(
	map(str => str.split(' ')),
	tap(arr => console.log(arr.length)),

).subscribe(console.log)

const isNumericalKeyCode = (code: number) => code >= 48 && code <= 57;
const input = document.getElementById("input");
const inputObs$ = fromEvent(input, 'keyup')
					.pipe(
						pluck('keyCode'),
						filter(isNumericalKeyCode),
					).subscribe(code => console.log(`User typed: ${String.fromCharCode(code)}`))

const newRandomNumber = () => Math.floor(Math.random() * 100);

const Money = function(currency: string, val: number){
	return {
		value: function(){
			return val;
		},
		currency: function(){
			return currency;
		},
		toString: function(){
			return `${currency} ${val}`;
		},
	}
};

const currencyObs$ = interval(2000)					
					.pipe(
						timeInterval(),
						skip(1),
						take(10),
						tap(int => console.log(`Checking every ${int.interval} milliseconds`)),
						map(num => Money("USD", newRandomNumber()),
					));

currencyObs$.subscribe(
	(price: any) => document.getElementById('price').textContent = price
);












