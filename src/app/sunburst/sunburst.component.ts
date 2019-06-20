import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-sunburst',
  template: `
  <h2>{{title}}</h2>
  <div style="height: 750px; width: 750px;" >
      <div [id]="propID" style="width:100%;height:100%"> </div>
  </div>
`
})
export class SunburstComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() propID = 'line';
  @Input() data: [{name: string, children: [{name: string, size: number}, {name: string, children: []}]}];
  @Input() title: string;

  constructor() { }

  // you might need a method like this to reformat given data with the appropriate field names,
  // get dataModel() {
  //   return this.data.map(item => {
  //     return {date: item.something, value: item.somethingElse};
  //   });
  // }

  ngOnInit() {
    this.drawSunburst();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.drawSunburst();
  }

  ngAfterViewInit() {
    this.drawSunburst();
  }

  drawSunburst() {
        // let localThis = this;
        d3.selectAll(`.${this.propID}_tooltip`).remove();
        const selection_string = "#" + this.propID;
        if (document.querySelectorAll(selection_string + " svg")[0] != null) {
          document.querySelectorAll(selection_string + " svg")[0].remove();
        }
        let element: any;
        const selected = document.querySelectorAll(selection_string);

        if (selected[0] == null) {
          element = [{clientWidth: 500, clientHeight: 500}];
        } else {
          element = selected[0];
        }

        const	width = element.clientWidth;
        let	height = element.clientHeight;

        // Account for panel heading height if it exists.
        if (this.title) {
          height -= 40;
        }

        if ( height === undefined || height === 0 ) {
          height = width / 4;
        }

        const radius = Math.min(width, height) / 2;
        const color = d3.scaleOrdinal(d3.schemePaired);

        const formatNumber = d3.format(",d");

        let x = d3.scaleLinear()
            .range([0, 2 * Math.PI]);

        let y = d3.scaleSqrt()
            .range([0, radius]);

        const partition = d3.partition();

        const arc = d3.arc()
            .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
            .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
            .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
            .outerRadius(function(d) { return Math.max(0, y(d.y1)); });


        const svg = d3.select(selection_string).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

        const tooltip = d3
            .select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);

        const root = d3.hierarchy(this.data[0]);
        root.sum(function(d) { return d.size; });
        const nodes = partition(root).descendants();

        svg.selectAll("path")
            .data(nodes)
          .enter().append("path")
            .attr("d", arc)
            .attr('class', 'segment')
            .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
            .on("click", function(d) {
              click(d);
            })
            .on("mouseover", function(d) {
              tooltip.transition()
                .duration(100)
                .style("opacity", 1);
              tooltip
                .html(
                   "Name: " + d.data.name + "<br/>" +  (d.data.size ? "Value: " + d.data.size : "")
                )
                .style("left", d3.event.pageX + 5 + "px")
                .style("top", d3.event.pageY - 28 + "px");
            })
            .on("mouseout", function(d) {
              tooltip.transition()
                .duration(300)
                .style("opacity", 0);
            })
          .append("title")
            .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });



        function click(d) {
          svg.transition()
              .duration(750)
              .tween("scale", function() {
                const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                    yd = d3.interpolate(y.domain(), [d.y0, 1]),
                    yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
                return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
              })
            .selectAll("path")
              .attrTween("d", function(d) { return function() { return arc(d); }; });
        }

        d3.select(self.frameElement).style("height", height + "px");

  }
}
