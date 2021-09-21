import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[priorityParser]'
})
export class PriorityDirective {
    constructor(private el: ElementRef) {
    }

    @HostListener('blur') onBlur() {
        let priority: number = this.el.nativeElement.value

        if (priority < 0) {
            this.el.nativeElement.value = 0
            return
        }
        if (priority > 10) {
            this.el.nativeElement.value = 10
            return
        }
    }
}