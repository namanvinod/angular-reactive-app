import { Component } from "@angular/core";
import { Subject, timer, of } from "rxjs";
import { startWith, switchMap, exhaustMap, mapTo } from "rxjs/Operators";

@Component({
    selector: 'higher-order-map',
    templateUrl: './higher-order-map.component.html'
})
export class HigherOrderMapComponent {
    counter = 0;
    dataSub = new Subject();

    dataSwitchMap$ = this.dataSub.asObservable()
        .pipe(
            startWith(-1),
            // input: value emitted by first onservable, dataSub
            // __: vaue emitted by second observable, timer(2000)
            switchMap(
                // second onservable
                _ => timer(2000),
                (input: number, __) => {
                    console.log('Inside Get Data: Switch Map', input);
                    return ++input;
                })
        )

    dataExhaustMap$ = this.dataSub.asObservable()
        .pipe(
            startWith(-1),
            // input: value emitted by first onservable, dataSub
            // __: vaue emitted by second observable, timer(2000)
            exhaustMap(
                // second onservable
                _ => timer(2000),
                (input: number, __) => {
                    console.log('Inside Get Data: Exhaust Map', input);
                    return ++input;
                })
        )

    dataMapTo$ = this.dataSub.pipe(
        mapTo(true)
    )

    dataImperitive = 0;

    getData(): void {
        this.dataSub.next(this.counter);
        var sub = timer(100).subscribe(
            s => {
                this.dataImperitive = ++this.counter
            }
        )
    }
}
