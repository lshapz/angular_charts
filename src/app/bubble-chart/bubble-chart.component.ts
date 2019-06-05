import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import luxon from 'luxon';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() propID = 'bubble';
  @Input() data: [{label: string, value: number}];
  @Input() title: string;
  @Input() isTime = false;
  @Input() isDate = false;
  @Input() themeColors = ["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"];
  // need 8 hex colors;
  @Input() yAxisLabel = 'Value';
  @Input() xAxisLabel = 'Date';
  dateFormat = '%Y-%m-%d';
  margin = { top: 20, right: 10, bottom: 30, left: 20 };


  constructor() { }


  get processedData() {
    const data = this.data;
    try {
    data.sort(function(x, y) {
      return d3.descending(x.value, y.value);
    });
    } catch (err) {
      console.error(err);
    }
    return data;


  }

  ngOnInit() {
    this.drawBubbleChart(this.processedData);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.drawBubbleChart(this.processedData);
  }

  ngAfterViewInit() {
    this.drawBubbleChart(this.processedData);
  }


  xValue(d) {
    return d.x;
  }
  yValue(d) {
    return d.y;
  }
  zValue(d) {
    return d.value;
  }
  mouseOverBubble(d) {
    const tooltip = d3.select(`.${this.propID}_tooltip`);
    tooltip.transition()
      .duration(100)
      .style("opacity", 1);
    // tslint:disable-next-line:max-line-length
    tooltip.html('<b class="tooltip-header">' + d.label + '</b>' + "<br/><b>" + this.xAxisLabel + "</b> " + (/*this.isTime ? this.pretty_duration(60 * this.xValue(d)) : */ this.xValue(d)) + "<br/><b>" + this.yAxisLabel + ": </b>" + this.yValue(d)
      .toFixed(2) + "<br> <b>value:</b> " + this.zValue(d))
      .style("left", (d3.event.pageX + 5) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
    d3.select(tooltip[0])
      .transition()
      .duration(50)
      .style("opacity", 1);
  }

  mouseOutBubble(d) {
    const tooltip = d3.select(`.${this.propID}_tooltip`);
    tooltip.transition().duration(300).style("opacity", 0);
    d3.select(tooltip[0])
      .transition()
      .duration(200)
      .style("opacity", 0);
  }

  clickedOnBubble(d) {
    const click_cats = [d.category_1, d.category_2, d.category_3];
    if (click_cats.indexOf('NULL') < 0) {
      d3.select(".d3_visuals_tooltip").transition().style('opacity', 0);
    }
  }

  agentClickedOnBubble(d) {
    const tooltip = d3.select(".d3_visuals_tooltip");
    tooltip.transition()
        .style("opacity", 0);
  }

  pretty_duration(d) {
    return luxon.duration.fromObject({"seconds": d}).normalize().toObject(); // this.moment??
  }

  get_min_bubble_size(max_value_size, cutoff, min_pixels) {
    return (max_value_size >= cutoff) ? min_pixels : max_value_size;
  }

  get_max_bubble_size(max_value_size, min_bubble_size, cutoff, max_pixels) {
    return (max_value_size >= cutoff) ? max_pixels : min_bubble_size * max_value_size + 25;
  }

  get_bubble_sizes(max_value_size) {
    const cutoff = 10,
      min_pixels = 5,
      max_pixels = 125;
    const min_bubble_size = (max_value_size < min_pixels) ? min_pixels : this.get_min_bubble_size(max_value_size, cutoff, min_pixels);
    return {
      'min': min_bubble_size,
      'max': this.get_max_bubble_size(max_value_size, min_bubble_size, cutoff, max_pixels)
    };
  }

  get_duration_zoom_range(max_value_mins, min_zoom_mins = 1) {
    return [1, max_value_mins / min_zoom_mins]
  }

  get_x_zoom_range(asrs, xval, min_zoom_mins = 1) {
    return this.get_duration_zoom_range(d3.max(asrs, xval), min_zoom_mins)
  }

  drawBubbleChart(data) {
    if (!data) {
      return ;
    }
    const localThis = this;
    const selection_string = "#" + this.propID;
    const pretty_duration = this.pretty_duration;
    const xValue = this.xValue;
    const yValue = this.yValue;
    const zValue = this.zValue;
    let element: any;

    const selected = document.querySelectorAll(selection_string);

    if (selected[0] == null) {
      element = [{clientWidth: 500, clientHeight: 500}];
    } else {
      element = selected[0];
    }


    const margin = this.margin;
    const elementWidth = element.clientWidth;
    const elementHeight = element.clientHeight;
    const ternaryWidth = elementWidth > 0 ? elementWidth : 400;
    const width = ternaryWidth - margin.left - margin.right;
    const ternaryHeight = elementHeight > 0 ? elementHeight : 400;
    let height = ternaryHeight - margin.top - margin.bottom;
    // retrieving globals
    const colors = this.themeColors;

    // Account for panel heading height if title exists.
    if (this.title) {
      height -= 40;
    }

    let svg;
    const containerId = "#" + this.propID,
      containerIdSvg = containerId + " svg",
      containerIdG = containerIdSvg + " g";

    d3.selectAll(`.${this.propID}_tooltip`).remove();
    if (document.querySelectorAll(selection_string + " svg")[0] != null) {
      document.querySelectorAll(selection_string + " svg")[0].remove();
    }

    const formatDate = d3.timeParse(this.dateFormat);

    let xScale;

    if (this.isDate) {
      xScale = d3.scaleTime().range([0, width]);
      data = data.map(function (d) {
        if (d.mapped) { return d; }
        d.x = formatDate(d.x);
        d.mapped = true;
        return d;
      });
    } else {
      xScale = d3.scaleLinear().range([0, width]);
    }


    const xMap = function(d) {
        return xScale(xValue(d));
      },
      xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSizeInner(-height)
        .ticks(6);

      if (this.isDate) {
        xAxis.tickFormat(d3.timeFormat(this.dateFormat));
      } else {
        xAxis.tickFormat(function(d) {
          return localThis.isTime ? pretty_duration(60 * d) : d;
        });
      }

    const yScale = d3.scaleLinear()
        .range([height, 0]),
      yMap = function(d) {
        return yScale(yValue(d));
      },
      yAxis = d3.axisLeft()
        .scale(yScale)
        .tickSizeInner(-width)
        .ticks(4);

    const max_value_size = Math.sqrt(d3.max(data, function(d) {
      return +d.value;
    }));
    const bubble_sizes = this.get_bubble_sizes(max_value_size);
    const min_bubble_size = bubble_sizes['min'];
    const max_bubble_size = bubble_sizes['max'];

    const zScale = d3.scaleLinear().domain([1, max_value_size]).range([
      min_bubble_size,
      max_bubble_size
    ]),
      zMap = function(d) { return zScale(Math.sqrt(zValue(d))); };

    const cValue = function(d) {
      return d.value;
    }

    const valMin = d3.min(data, zValue);
    const valMax = d3.max(data, zValue);


    const color = d3.scaleQuantize().range(colors).domain([valMin, valMax]);

    const tooltip = d3.select("body")
      .append("div")
      .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
      .style("opacity", 0);

    // Get min and max values for x and y axis
    let xMin = d3.min(data, xValue);
    let xMax = d3.max(data, xValue);
    const yMin = d3.min(data, yValue);
    const yMax = d3.max(data, yValue);

    // Determine padding for x-axis if it's dates.
    if (this.isDate) {
      const min = xScale(xMin);
      const max = xScale(xMax);

      xMin = xScale.invert(min - (min * .001));
      xMax = xScale.invert((max * .001) + max);
    } else {
      xMin = xMin - (xMin / 2);
      xMax = xMax + (xMax / 4);
    }


    // Subtract half the min value from min and add one fourth
    // of the max to the max so that the bubbles never go outside of the graph
    xScale.domain([xMin, xMax]);
    yScale.domain([yMin - yMin/2, yMax + yMax/4]);
    svg = d3.select(containerId)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    svg.append("rect")
      .attr("fill-opacity", "0")
      .attr("width", width)
      .attr("height", height);

    svg.append("g")
      .attr("class", "x axis")
      .attr("id", "top-x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -10)
      .style("text-anchor", "end")
      .text(this.xAxisLabel);

    svg.append("g")
      .attr("class", "y axis")
      .attr("id", "top-y")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(this.yAxisLabel);

  // const mouseOver = this.mouseOverBubble;

  const click = this.clickedOnBubble;

    svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", zMap)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .style("fill", function(d) {
        const saveThisColor = color(cValue(d));
        return saveThisColor;
      })
      .style("opacity", 0.75)
      .on("mouseover", function(d) {
        console.log(tooltip);
        tooltip.transition()
          .duration(100)
          .style("opacity", 1);
        // tslint:disable-next-line:max-line-length
      tooltip.html('<b class="tooltip-header">' + d.label + '</b>' + "<br/><b>" + localThis.xAxisLabel + "</b> " + (localThis.isTime ? localThis.pretty_duration(60 * localThis.xValue(d)) :  localThis.xValue(d)) + "<br/><b>" + localThis.yAxisLabel + ": </b>" + localThis.yValue(d)
          .toFixed(2) + "<br> <b>value:</b> " + localThis.zValue(d))
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        d3.select(tooltip[0])
          .transition()
          .duration(50)
          .style("opacity", 1);
      })
      .on("mouseout", this.mouseOutBubble)
      .on("click", click);
  }


}
