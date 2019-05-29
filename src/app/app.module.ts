import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LinePlotComponent } from './line-plot/line-plot.component';
import { SunburstComponent } from './sunburst/sunburst.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LinePlotComponent,
    SunburstComponent,
    PieChartComponent,
    BubbleChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
