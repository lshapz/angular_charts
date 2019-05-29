import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LinePlotComponent } from './line-plot/line-plot.component';
import { SunburstComponent } from './sunburst/sunburst.component';

@NgModule({
  declarations: [
    AppComponent,
    LinePlotComponent,
    SunburstComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
