import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    templateUrl: './view-encap.component.html',
    selector: 'view-encap',
    styleUrls: ['./view-encap.component.css'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class ViewEncapsulationComponent {
    
}