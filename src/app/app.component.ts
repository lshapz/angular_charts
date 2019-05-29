import { Component, OnInit } from '@angular/core';
const sunburstData = require('../assets/sunburstData.json');
const lineData = require('../assets/lineData.json');
const pieData = require('../assets/pieData.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  linePropID = 'angularlines';
  lineTitle = 'Angular (D3) LinePlot';
  color = "#1A649F";
  yAxisLabel = 'Thing Measured';
  xAxisLabel = 'Date Of Thing';
  donutWidth = 250;

  lineData = lineData;
  sunburstData = sunburstData;
  pieData = pieData;

  randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  changeDateData() {
    const newData = this.lineData.map(item => {
      item.value = this.randomNumber(50, 350);
      return item;
    });
    this.lineData = [...newData];
    console.log(this.lineData);
  }

  ngOnInit() {
    // setInterval(() => {
    //   this.changeDateData();
    // }, 5000);
  }

}
