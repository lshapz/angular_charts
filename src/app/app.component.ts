import { Component, OnInit } from '@angular/core';
const sunburstData = require('../assets/sunburstData.json');
const lineData = require('../assets/lineData.json');
const pieData = require('../assets/pieData.json');
const bubbleData = require('../assets/bubbleData.json');
const barData = require('../assets/barData.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  yAxisLabel = 'Thing Measured';
  xAxisLabelDate = 'Date of Thing';
  xAxisLabel = 'Quantity';
  falseVar = false;
  axisAngle = 45;

  barData = barData;
  barPropID = 'angularbar';
  barTitle = 'Bar Chart';
  barColor = '#20AC59';

  bubbleData = bubbleData;
  bubblePropID = 'angularbubble';
  bubbleTitle = 'Bubble Chart';
  bubbleColors = ["#4F1E71", "#7C388E", "#A93B8D", "#BA5288", "#F38595", "#EDB7A7", "#F06292", "#C2185B"];

  lineData = lineData;
  linePropID = 'angularlines';
  lineTitle = 'Line Plot';
  lineColor = "#20AC59";

  pieData = pieData;
  piePropID = 'angularpie';
  pieTitle = 'Pie Chart';
  pieColors = ["#643C30", "#8d4832", "#AC5033", "#D86E40", "#E29755", "#eaaf62", "#EFC26C", "#FBEA85", "#BCAAA4", "#6D4C41"];
  donutWidth = 250;

  sunburstData = sunburstData;
  sunburstPropID = "angularsunburst";
  sunburstTitle = 'Sunburst';




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
