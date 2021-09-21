import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'uppercase',
    pure: true
})
export class UpperCasePipe implements PipeTransform {
    transform(value: string, ...args: any[]) {
        if(args)
            console.log('Pipe Args', args)
        if(value && value.length > 0) {
            return value.toUpperCase()
        }
    }
}