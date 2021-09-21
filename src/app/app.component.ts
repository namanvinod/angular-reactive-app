
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-reactive-app'
  selectedDemo = '';

  dirDemo = 'Directive Demo';
  
  onDemoChange(event: any): void {
    // TEST COMMENT
    this.selectedDemo = event.target.value;
  }
}
