import { Observer } from "rx";
import { Observable } from "rxjs";
// tslint:disable: no-console

import { from, fromEvent, of, Subscriber } from "rxjs";
import { reduce, map, scan } from "rxjs/operators";

const people: string[] = ["Micheal", "Jim", "Dwight"];

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
			console.log(++val, val);
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