
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RequestDashboardComponent } from './request-dashboard.component';
import { RequestService } from './service/request.service';
import { TrackByComponent } from './track-by.component';
import { HigherOrderMapComponent } from './higher-order-map.component';
import { UpperCasePipe } from './uppercase.pipe';
import { PriorityDirective } from './priority.directive';
import { ViewEncapsulationComponent } from './view-encap.component';
import { ViewEncapsulationChildComponent } from './view-encap-child.component';
import { ViewEncapsulationSiblingComponent } from './view-encap-sibling.component';
import { BgColorDirectiveAttr, BgColorDirectiveAttrVal, BgColorDirectiveCls, BgColorDirectiveEle, DirectiveDemoComponent, DirectivePropDemoComponent } from './directive-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestDashboardComponent,
    TrackByComponent,
    HigherOrderMapComponent,
    ViewEncapsulationComponent,
    ViewEncapsulationChildComponent,
    ViewEncapsulationSiblingComponent,
    DirectiveDemoComponent, 
    DirectivePropDemoComponent,
    
    UpperCasePipe,

    PriorityDirective,
    BgColorDirectiveAttr,
    BgColorDirectiveAttrVal,
    BgColorDirectiveEle,
    BgColorDirectiveCls
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
