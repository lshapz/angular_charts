import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  propID = 'angularlines';
  title = 'Angular (D3) LinePlot';
  color = "#1A649F";
  yAxisLabel = 'Thing Measured';
  xAxisLabel = 'Date Of Thing';

  dateData = [
    {
      "date": "2017-06-01",
      "value": 120,
    },
    {
      "date": "2017-09-01",
      "value": 21,
    },
    {
      "date": "2017-04-01",
      "value": 193,
    },
    {
      "date": "2017-02-01",
      "value": 313,
    },
    {
      "date": "2017-01-01",
      "value": 340,
    },
    {
      "date": "2017-07-01",
      "value": 200,
    },
    {
      "date": "2017-08-01",
      "value": 100,
    }
  ];

  randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  changeDateData() {
    const newData = this.dateData.map(item => {
      item.value = this.randomNumber(50, 350);
      return item;
    });
    this.dateData = [...newData];
    console.log(this.dateData);
  }

  ngOnInit() {
    setInterval(() => {
      this.changeDateData();
    }, 5000);
  }

}
