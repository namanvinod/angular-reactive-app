import { Component, Input } from "@angular/core";
import { of, throwError, timer, Subject } from "rxjs";
import { startWith, switchMap, exhaustMap } from "rxjs/Operators";

@Component({
    selector: 'track-by',
    templateUrl: './track-by.component.html'
})
export class TrackByComponent {

    @Input()
    title;
     
    items = [
        { itemId: 1, name: 'Fan' },
        { itemId: 2, name: 'Table' },
        { itemId: 3, name: 'Chair' }
    ]


    add() {
        this.items.push({ itemId: 4, name: 'Book' })
    }
    
    remove() {
        this.items.pop()
    }

    update() {
        this.items.filter(f => f.itemId === 4).forEach(f => f.name = 'Updated')
    }

    refresh() {
        this.items = [
            { itemId: 0, name: 'Fan' },
            { itemId: 1, name: 'Table' },
            { itemId: 2, name: 'Chair' }
        ]
    }

    // index: index of ngFor. It will always start from 0.
    // item: current item being tracked or evaluated
    trackByFn(index, item) {
        // Both return would work
        // return index
        return item.itemId
    }
}