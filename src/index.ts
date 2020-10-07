import { Observable } from "rx";
// tslint:disable: no-console

import { from, of } from "rxjs";
import { reduce } from "rxjs/operators";

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
//const receipt = new Receipt(calc.observable);
