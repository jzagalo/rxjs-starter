import { Observer } from "rx";
import { interval, Observable, pipe, timer } from "rxjs";
// tslint:disable: no-console

import { from, fromEvent, of, Subscriber } from "rxjs";
import { reduce, map, pluck, tap, filter, skip, take, timeInterval, 
			delay, debounceTime, buffer, bufferCount, bufferWhen } from "rxjs/operators";
const R = require('ramda');

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

const timeObjs$ = of([ 1, 2,3, 4, 5])
					.pipe(
						tap(x => console.log(`Emitted: ${x}`)),
						delay(200),						
					).subscribe(x => console.log(`Recieved: ${x}`));


const label = document.getElementById('tell');
const clickStream$ = fromEvent(label, 'click')
						.pipe(
							debounceTime(1000),
						).subscribe((c: any) => console.log(`Clicked at position ${c.clientX} and ${c.clientY}`))
					

let testData = [
	'github.com/Reactive-Extensions/RxJS',
	'github.com/ReactiveX/RxJS',
	'xgrommx.github.io/rx-book',
	'reactivex.io',
	'egghead.io/technologies/rx',
	'rxmarbles.com',
	'https://www.manning.com/books/rxjs-in-action'
];

const searchBox = document.getElementById('search');
const results = document.getElementById('results');

function clearResults(container: any){
	while(container.childElementCount > 0){
		container.innerHTML = "";
	}
}

function appendResults(result: any, container: any){
	let li = document.createElement('li');
	let text = document.createTextNode(result);
	li.appendChild(text);
	container.appendChild(li);
}

/* let timeoutId: any = null;
searchBox.addEventListener('keyup', function (event: any) {
	clearTimeout(timeoutId);
	timeoutId = setTimeout(function (query) {
		console.log('querying...');
		let searchResults = [];
		if(query && query.length > 0) {
			clearResults(results);
			for(let result of testData) {
				if(result.startsWith(query)) {
					searchResults.push(result);
				}
			}
		}
		for(let result of searchResults) {
			appendResults(result, results);
		}
	
	}, 1000, event.target.value);
}); 
   */
const notEmpty = (input: string) => !!input && input.trim().length > 0;

const sendRequest = function(arr: Array<string>, query: string){
	return arr.filter((item:any) => {
		return query.length > 0 &&
		item.startsWith(query);
	})
}

const searchBar$ = fromEvent(searchBox, 'keyup')
				.pipe(
					debounceTime(1000),
					pluck('target', 'value'),
					filter(notEmpty),
					tap(query => console.log(`Query for ${query}...`)),
					map(query => sendRequest(testData, query))
				).subscribe(result => {
					results.innerHTML = "";
					if(result.length === 0){
						clearResults(results);
					} else{						
						appendResults(result, results)
					}
				});

const BufferTimer$ = timer(0, 50)
					.pipe(
						buffer(timer(500)),												
					).subscribe(val => console.log(`Data in buffer: [${val}]`))

const amountTextBox = document.getElementById('amount');
const warningMessage = document.getElementById('amount-warning');

const buffercount$ = fromEvent(amountTextBox, 'keyup')
							.pipe(
								bufferCount(5),
								map((events: any) => events[0].target.value),
								map(val => parseInt(val, 10)),
								filter(val => !Number.isNaN(val)),
							).subscribe(amount => {
								console.log(`Amount: ${amount}`)
								warningMessage.setAttribute('style', 'display: inline');
							})

const field = document.getElementById('form-field');
const showHistoryButton = document.getElementById('show-history');
const historyPanel = document.getElementById('history');

const showHistory$ = fromEvent(showHistoryButton, 'click');

// Buffer When
const mainObser$ = fromEvent(field, 'keyup').pipe(
						  debounceTime(200),
						  pluck('target', 'value'),
						  filter(R.compose(R.not, R.isEmpty)),
						  bufferWhen(() => showHistory$),
						).subscribe(history => {
							let contents = "";
							if(history.length > 0){
								for(let item of history){
									contents += '<li>' + item + '</li>';
								}
								historyPanel.innerHTML = contents;
							}
						});





