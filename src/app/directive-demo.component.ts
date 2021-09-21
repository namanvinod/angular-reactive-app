import { Component, ContentChild, Directive, ElementRef, HostBinding, HostListener } from "@angular/core";
import { TrackByComponent } from "./track-by.component";

@Component({
    selector: 'directive-demo',
    template: `
        <div style="border: 3px solid black">
            <div bg-color-attr (click)="bg.changeColor('cyan'); bg1.changeColor('purple')">Yellow</div>
            <bg-color-ele>Green</bg-color-ele>
            <div bg-color-attr-val='blue'>Blue</div>
            <div bg-color-attr-val='eee'>Not Blue</div>
            <div bg-color-attr-val>Not Blue</div>
            <div class="red">Red</div>
            <div bg-color-attr #bg="bgc" (click)="bg.changeColor('gray')">Yellow, on click Gray</div>
            <div bg-color-attr #bg1="bgc" (click)="bg1.changeColor('purple')">Yellow, on click Purple</div>
        </div>
        `
})
export class DirectiveDemoComponent { }

@Component({
    selector: 'directive-prop-demo',
    template: `
            <div>Another Component</div>
        `,
    exportAs: 'ddc'
})
export class DirectivePropDemoComponent {
    test(message) {
        console.log(message);
    }
}

@Directive({
    selector: '[bg-color-attr]',
    exportAs: 'bgc',
    // host: ''
})
export class BgColorDirectiveAttr {
    constructor(private el: ElementRef) { }

    @HostBinding('style.border') border: string;

    @HostListener('mouseover') applyColor() {
        this.changeColor("yellow");
        this.border = '2px solid green';
    }

    @HostListener('mouseleave') removeColor() {
        this.changeColor(null);
        this.border = null;
    }

    changeColor(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}

@Directive({
    selector: 'bg-color-ele'
})
export class BgColorDirectiveEle {
    constructor(private el: ElementRef) { }
    @HostListener("mouseover") applyColor() {
        this.changeColor("green");
    }

    @HostListener("mouseleave") removeColor() {
        this.changeColor(null);
    }
    changeColor(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}

@Directive({
    selector: '.red'
})
export class BgColorDirectiveCls {
    constructor(private el: ElementRef) { }
    @HostListener("mouseover") applyColor() {
        this.changeColor("red");
    }

    @HostListener("mouseleave") removeColor() {
        this.changeColor(null);
    }
    changeColor(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}

@Directive({
    selector: '[bg-color-attr-val=blue]'
})
export class BgColorDirectiveAttrVal {
    constructor(private el: ElementRef) {
    }
    @HostListener("mouseover") applyColor() {
        this.changeColor("blue");
    }

    @HostListener("mouseleave") removeColor() {
        this.changeColor(null);
    }
    changeColor(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}