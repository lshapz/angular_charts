/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
export class LinePlotComponent {
    constructor() {
        this.propID = 'line';
        this.color = "#000";
        this.yAxisLabel = 'Value';
        this.xAxisLabel = 'Date';
    }
    // you might need a method like this to reformat given data with the appropriate field names,
    // get dataModel() {
    //   return this.data.map(item => {
    //     return {date: item.something, value: item.somethingElse};
    //   });
    // }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.drawLinePlot(this.data, "#" + this.propID, this.color);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.drawLinePlot(this.data, "#" + this.propID, this.color);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.drawLinePlot(this.data, "#" + this.propID, this.color);
    }
    /**
     * @param {?} dataArray
     * @param {?} selection_string
     * @param {?} color
     * @return {?}
     */
    drawLinePlot(dataArray, selection_string, color) {
        /** @type {?} */
        const localThis = this;
        d3.selectAll(`.${this.propID}_tooltip`).remove();
        if (document.querySelectorAll(selection_string + " svg")[0] != null) {
            document.querySelectorAll(selection_string + " svg")[0].remove();
        }
        // make copy of the original data so we do not mutate it
        /** @type {?} */
        const data = [];
        dataArray.forEach((/**
         * @param {?} el
         * @return {?}
         */
        el => data.push(Object.assign({}, el))));
        /** @type {?} */
        const parseDate = d3.timeParse('%Y-%m-%d');
        /** @type {?} */
        const formatDate = d3.timeFormat('%B %-d %Y');
        // https://github.com/d3/d3-time-format to change how this is formatted - leave the parseDate because that's for sorting the data
        if (typeof data[0].date === 'string') {
            data.forEach((/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                d.date = parseDate(d.date);
            }));
        }
        data.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
            return a.date - b.date;
        }));
        /** @type {?} */
        const detected_percent = d3.max(data, (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.value;
        })) <= 1
            ? true
            : false;
        /** @type {?} */
        let element;
        /** @type {?} */
        const selected = document.querySelectorAll(selection_string);
        if (selected[0] == null) {
            element = [{ clientWidth: 500, clientHeight: 500 }];
        }
        else {
            element = selected[0];
        }
        /** @type {?} */
        const margin = { top: 20, right: 30, bottom: 45, left: 40 };
        /** @type {?} */
        const width = element.clientWidth - margin.left - margin.right;
        /** @type {?} */
        let height = element.clientHeight - margin.top - margin.bottom;
        // Account for panel heading height if the title exists.
        if (this.title) {
            height -= 40;
        }
        /** @type {?} */
        const xValue = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.date;
        });
        /** @type {?} */
        const xScale = d3.scaleTime().range([0, width - margin.right]);
        /** @type {?} */
        const xMap = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return xScale(xValue(d));
        });
        /** @type {?} */
        const xAxis = d3.axisBottom()
            .scale(xScale)
            .tickSizeInner(-height)
            .ticks(6);
        /** @type {?} */
        let format_attribute;
        if (detected_percent) {
            format_attribute = d3.format("%");
        }
        else {
            format_attribute = d3.format("");
        }
        /** @type {?} */
        const yValue = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.value;
        });
        /** @type {?} */
        const yScale = d3.scaleLinear().range([height, 0]);
        /** @type {?} */
        const yMap = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            console.log("y scale is " + yScale(yValue(d)));
            console.log(d);
            return yScale(yValue(d));
        });
        /** @type {?} */
        const yAxisScale = d3.scaleLinear()
            .range([height - yScale(d3.min(data)), 0]);
        xScale.domain(d3.extent(data, xValue)).nice();
        yScale.domain(d3.extent(data, yValue)).nice();
        // yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);
        /** @type {?} */
        const yAxis = d3.axisLeft()
            .scale(yScale)
            // .tickValues([-200, -150, -100, -50, 0, 50, 100, 150, 200, 250, 300, 350])
            .tickSizeInner(-width)
            .tickFormat(format_attribute);
        /** @type {?} */
        const line = d3.line()
            .x(xMap)
            .y(yMap)
            .curve(d3.curveLinear);
        // debugger
        /** @type {?} */
        const svg = d3
            .select(selection_string)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        /** @type {?} */
        const tooltip = d3
            .select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);
        svg.style("fill", "transparent");
        svg
            .append("g")
            .attr("class", "x axis xaxis axis-line-plot1")
            .attr("transform", "translate(0," + height + ")")
            .style('fill', 'black')
            .style("font-size", "14px")
            .call(xAxis)
            .append("text")
            .attr("x", (width / 2))
            .attr("y", 25)
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .attr("font-size", "16px")
            .text(this.xAxisLabel);
        svg
            .append("g")
            .attr("class", "y axis axis-line-plot")
            .style("fill", "black")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .attr("font-size", "16px")
            .text(this.yAxisLabel);
        /** @type {?} */
        const clip_id = "clip-" + this.propID;
        // svg
        //   .append("clipPath")
        //   .attr("id", clip_id)
        //   .append("rect")
        //   .attr("x", 0)
        //   .attr("y", 0)
        //   .attr("width", width > 0 ? width : 0)
        //   .attr("height", height > 0 ? height : 0);
        // svg
        //   .append("rect")
        //   .attr("class", "pane")
        //   .attr("width", element.clientWidth)
        //   .attr("height", height)
        //   .attr("clip-path", "url(#" + clip_id + ")");
        svg
            .append("path")
            .datum(data)
            .attr("class", "line lineplotline")
            .attr("d", line)
            .attr("stroke-width", 3)
            .attr("stroke", this.color);
        // .attr("stroke", function (d) {
        //   return (d.value > 50) ? 'green' : 'red';
        // });
        svg
            .selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("r", 5)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .attr("clip-path", "url(#" + clip_id + ")")
            .attr("fill", "black")
            .attr("opacity", 0)
            .on("mouseover", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            tooltip
                .transition()
                .duration(100)
                .style("opacity", 1);
            tooltip
                .html("Date: " + formatDate(d.date) +
                "<br>" +
                localThis.yAxisLabel +
                ": " +
                format_attribute(yValue(d)))
                .style("left", d3.event.pageX + 5 + "px")
                .style("top", d3.event.pageY - 28 + "px");
            d3
                .select(this)
                .transition()
                .duration(50)
                .style("fill", "black")
                .attr("opacity", 1);
        }))
            .on("mouseout", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            tooltip
                .transition()
                .duration(300)
                .style("opacity", 0);
            d3
                .select(this)
                .transition()
                .duration(50)
                .attr("opacity", 0);
        }));
        svg
            .selectAll(".tick")
            .filter((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d === 0;
        }))
            .remove();
    }
}
LinePlotComponent.decorators = [
    { type: Component, args: [{
                selector: 'eikos-line-plot',
                template: `
  <h2>{{title}}</h2>
  <div style="height: 750px; width: 750px;" >
      <div [id]="propID" style="width:100%;height:100%"> </div>
  </div>
`
            }] }
];
/** @nocollapse */
LinePlotComponent.ctorParameters = () => [];
LinePlotComponent.propDecorators = {
    propID: [{ type: Input }],
    data: [{ type: Input }],
    title: [{ type: Input }],
    color: [{ type: Input }],
    yAxisLabel: [{ type: Input }],
    xAxisLabel: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    LinePlotComponent.prototype.propID;
    /** @type {?} */
    LinePlotComponent.prototype.data;
    /** @type {?} */
    LinePlotComponent.prototype.title;
    /** @type {?} */
    LinePlotComponent.prototype.color;
    /** @type {?} */
    LinePlotComponent.prototype.yAxisLabel;
    /** @type {?} */
    LinePlotComponent.prototype.xAxisLabel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1wbG90LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nY2F0YWx5c3QvIiwic291cmNlcyI6WyJsaWIvbGluZS1wbG90LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTJDLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBV3pCLE1BQU0sT0FBTyxpQkFBaUI7SUFTNUI7UUFQUyxXQUFNLEdBQUcsTUFBTSxDQUFDO1FBR2hCLFVBQUssR0FBRyxNQUFNLENBQUM7UUFDZixlQUFVLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLGVBQVUsR0FBRyxNQUFNLENBQUM7SUFFYixDQUFDOzs7Ozs7Ozs7O0lBU2pCLFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7Ozs7SUFFRCxZQUFZLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLEtBQUs7O2NBQ3ZDLFNBQVMsR0FBRyxJQUFJO1FBRXRCLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxVQUFVLENBQUMsQ0FBQyxNQUFN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QXhRRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7OztDQUtYO2FBQ0E7Ozs7O3FCQUdFLEtBQUs7bUJBQ0wsS0FBSztvQkFDTCxLQUFLO29CQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzs7O0lBTE4sbUNBQXlCOztJQUN6QixpQ0FBK0M7O0lBQy9DLGtDQUE0Qjs7SUFDNUIsa0NBQXdCOztJQUN4Qix1Q0FBOEI7O0lBQzlCLHVDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Vpa29zLWxpbmUtcGxvdCcsXG4gIHRlbXBsYXRlOiBgXG4gIDxoMj57e3RpdGxlfX08L2gyPlxuICA8ZGl2IHN0eWxlPVwiaGVpZ2h0OiA3NTBweDsgd2lkdGg6IDc1MHB4O1wiID5cbiAgICAgIDxkaXYgW2lkXT1cInByb3BJRFwiIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwJVwiPiA8L2Rpdj5cbiAgPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIExpbmVQbG90Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHByb3BJRCA9ICdsaW5lJztcbiAgQElucHV0KCkgZGF0YTogW3tkYXRlOiBzdHJpbmcsIHZhbHVlOiBudW1iZXJ9XTtcbiAgQElucHV0KCkgdGl0bGU6IFwiTGluZSBQbG90XCI7XG4gIEBJbnB1dCgpIGNvbG9yID0gXCIjMDAwXCI7XG4gIEBJbnB1dCgpIHlBeGlzTGFiZWwgPSAnVmFsdWUnO1xuICBASW5wdXQoKSB4QXhpc0xhYmVsID0gJ0RhdGUnO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLy8geW91IG1pZ2h0IG5lZWQgYSBtZXRob2QgbGlrZSB0aGlzIHRvIHJlZm9ybWF0IGdpdmVuIGRhdGEgd2l0aCB0aGUgYXBwcm9wcmlhdGUgZmllbGQgbmFtZXMsXG4gIC8vIGdldCBkYXRhTW9kZWwoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAoaXRlbSA9PiB7XG4gIC8vICAgICByZXR1cm4ge2RhdGU6IGl0ZW0uc29tZXRoaW5nLCB2YWx1ZTogaXRlbS5zb21ldGhpbmdFbHNlfTtcbiAgLy8gICB9KTtcbiAgLy8gfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZHJhd0xpbmVQbG90KHRoaXMuZGF0YSwgXCIjXCIgKyB0aGlzLnByb3BJRCwgdGhpcy5jb2xvcik7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5kcmF3TGluZVBsb3QodGhpcy5kYXRhLCBcIiNcIiArIHRoaXMucHJvcElELCB0aGlzLmNvbG9yKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRyYXdMaW5lUGxvdCh0aGlzLmRhdGEsIFwiI1wiICsgdGhpcy5wcm9wSUQsIHRoaXMuY29sb3IpO1xuICB9XG5cbiAgZHJhd0xpbmVQbG90KGRhdGFBcnJheSwgc2VsZWN0aW9uX3N0cmluZywgY29sb3IpIHtcbiAgICBjb25zdCBsb2NhbFRoaXMgPSB0aGlzO1xuXG4gICAgZDMuc2VsZWN0QWxsKGAuJHt0aGlzLnByb3BJRH1fdG9vbHRpcGApLnJlbW92ZSgpO1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdGlvbl9zdHJpbmcgKyBcIiBzdmdcIilbMF0gIT0gbnVsbCkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rpb25fc3RyaW5nICsgXCIgc3ZnXCIpWzBdLnJlbW92ZSgpO1xuICAgIH1cbiAgICAvLyBtYWtlIGNvcHkgb2YgdGhlIG9yaWdpbmFsIGRhdGEgc28gd2UgZG8gbm90IG11dGF0ZSBpdFxuICAgIGNvbnN0IGRhdGEgPSBbXTtcbiAgICBkYXRhQXJyYXkuZm9yRWFjaChlbCA9PiBkYXRhLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZWwpKSk7XG5cbiAgICBjb25zdCBwYXJzZURhdGUgPSBkMy50aW1lUGFyc2UoJyVZLSVtLSVkJyk7XG4gICAgY29uc3QgZm9ybWF0RGF0ZSA9IGQzLnRpbWVGb3JtYXQoJyVCICUtZCAlWScpO1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy10aW1lLWZvcm1hdCB0byBjaGFuZ2UgaG93IHRoaXMgaXMgZm9ybWF0dGVkIC0gbGVhdmUgdGhlIHBhcnNlRGF0ZSBiZWNhdXNlIHRoYXQncyBmb3Igc29ydGluZyB0aGUgZGF0YVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhWzBdLmRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICBkLmRhdGUgPSBwYXJzZURhdGUoZC5kYXRlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGRhdGEuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gYS5kYXRlIC0gYi5kYXRlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZGV0ZWN0ZWRfcGVyY2VudCA9XG4gICAgICBkMy5tYXgoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICAgIH0pIDw9IDFcbiAgICAgICAgPyB0cnVlXG4gICAgICAgIDogZmFsc2U7XG4gICAgbGV0IGVsZW1lbnQ6IGFueTtcblxuICAgIGNvbnN0IHNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rpb25fc3RyaW5nKTtcblxuICAgIGlmIChzZWxlY3RlZFswXSA9PSBudWxsKSB7XG4gICAgICBlbGVtZW50ID0gW3tjbGllbnRXaWR0aDogNTAwLCBjbGllbnRIZWlnaHQ6IDUwMH1dO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50ID0gc2VsZWN0ZWRbMF07XG4gICAgfVxuXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwLCByaWdodDogMzAsIGJvdHRvbTogNDUsIGxlZnQ6IDQwIH0sXG4gICAgICB3aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgICBsZXQgaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxuICAgIC8vIEFjY291bnQgZm9yIHBhbmVsIGhlYWRpbmcgaGVpZ2h0IGlmIHRoZSB0aXRsZSBleGlzdHMuXG4gICAgaWYgKHRoaXMudGl0bGUpIHtcbiAgICAgIGhlaWdodCAtPSA0MDtcbiAgICB9XG5cbiAgICBjb25zdCB4VmFsdWUgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkLmRhdGU7XG4gICAgICB9LFxuICAgICAgeFNjYWxlID0gZDMuc2NhbGVUaW1lKCkucmFuZ2UoWzAsIHdpZHRoIC0gbWFyZ2luLnJpZ2h0XSksXG4gICAgICB4TWFwID0gZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geFNjYWxlKHhWYWx1ZShkKSk7XG4gICAgICB9LFxuICAgICAgeEF4aXMgPSBkMy5heGlzQm90dG9tKClcbiAgICAgICAgLnNjYWxlKHhTY2FsZSlcbiAgICAgICAgLnRpY2tTaXplSW5uZXIoLWhlaWdodClcbiAgICAgICAgLnRpY2tzKDYpO1xuICAgIGxldCBmb3JtYXRfYXR0cmlidXRlO1xuICAgIGlmIChkZXRlY3RlZF9wZXJjZW50KSB7XG4gICAgICBmb3JtYXRfYXR0cmlidXRlID0gZDMuZm9ybWF0KFwiJVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybWF0X2F0dHJpYnV0ZSA9IGQzLmZvcm1hdChcIlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCB5VmFsdWUgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoW2hlaWdodCwgMF0pLFxuICAgICAgeU1hcCA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ5IHNjYWxlIGlzIFwiICsgeVNjYWxlKHlWYWx1ZShkKSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgcmV0dXJuIHlTY2FsZSh5VmFsdWUoZCkpO1xuICAgICAgfSxcbiAgICAgIHlBeGlzU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAucmFuZ2UoW2hlaWdodCAtIHlTY2FsZShkMy5taW4oZGF0YSkpLCAwXSk7XG5cblxuICAgIHhTY2FsZS5kb21haW4oZDMuZXh0ZW50KGRhdGEsIHhWYWx1ZSkpLm5pY2UoKTtcbiAgICB5U2NhbGUuZG9tYWluKGQzLmV4dGVudChkYXRhLCB5VmFsdWUpKS5uaWNlKCk7XG5cbiAgICAvLyB5U2NhbGUuZG9tYWluKFtkMy5taW4oZGF0YSwgeVZhbHVlKSwgZDMubWF4KGRhdGEsIHlWYWx1ZSldKTtcblxuICAgIGNvbnN0IHlBeGlzID0gZDMuYXhpc0xlZnQoKVxuICAgICAgLnNjYWxlKHlTY2FsZSlcbiAgICAgIC8vIC50aWNrVmFsdWVzKFstMjAwLCAtMTUwLCAtMTAwLCAtNTAsIDAsIDUwLCAxMDAsIDE1MCwgMjAwLCAyNTAsIDMwMCwgMzUwXSlcbiAgICAgIC50aWNrU2l6ZUlubmVyKC13aWR0aClcbiAgICAgIC50aWNrRm9ybWF0KGZvcm1hdF9hdHRyaWJ1dGUpO1xuXG4gICAgY29uc3QgbGluZSA9IGQzLmxpbmUoKVxuICAgICAgLngoeE1hcClcbiAgICAgIC55KHlNYXApXG4gICAgICAuY3VydmUoZDMuY3VydmVMaW5lYXIpO1xuXG4gICAgLy8gZGVidWdnZXJcblxuICAgIGNvbnN0IHN2ZyA9IGQzXG4gICAgICAuc2VsZWN0KHNlbGVjdGlvbl9zdHJpbmcpXG4gICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsXCIgKyBtYXJnaW4udG9wICsgXCIpXCIpO1xuXG4gICAgY29uc3QgdG9vbHRpcCA9IGQzXG4gICAgICAuc2VsZWN0KFwiYm9keVwiKVxuICAgICAgLmFwcGVuZChcImRpdlwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBgZDNfdmlzdWFsc190b29sdGlwICR7dGhpcy5wcm9wSUR9X3Rvb2x0aXBgKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcblxuICAgIHN2Zy5zdHlsZShcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKTtcbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzIHhheGlzIGF4aXMtbGluZS1wbG90MVwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArIGhlaWdodCArIFwiKVwiKVxuICAgICAgLnN0eWxlKCdmaWxsJywgJ2JsYWNrJylcbiAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjE0cHhcIilcbiAgICAgIC5jYWxsKHhBeGlzKVxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwieFwiLCAod2lkdGggLyAyKSlcbiAgICAgIC5hdHRyKFwieVwiLCAyNSlcbiAgICAgIC5hdHRyKFwiZHlcIiwgXCIuNzFlbVwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiMTZweFwiKVxuICAgICAgLnRleHQodGhpcy54QXhpc0xhYmVsKTtcblxuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXMgYXhpcy1saW5lLXBsb3RcIilcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgXCJibGFja1wiKVxuICAgICAgLmNhbGwoeUF4aXMpXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIC1tYXJnaW4ubGVmdClcbiAgICAgIC5hdHRyKFwiZHlcIiwgXCIuNzFlbVwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJlbmRcIilcbiAgICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiMTZweFwiKVxuICAgICAgLnRleHQodGhpcy55QXhpc0xhYmVsKTtcblxuICAgIGNvbnN0IGNsaXBfaWQgPSBcImNsaXAtXCIgKyB0aGlzLnByb3BJRDtcblxuICAgIC8vIHN2Z1xuICAgIC8vICAgLmFwcGVuZChcImNsaXBQYXRoXCIpXG4gICAgLy8gICAuYXR0cihcImlkXCIsIGNsaXBfaWQpXG4gICAgLy8gICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC8vICAgLmF0dHIoXCJ4XCIsIDApXG4gICAgLy8gICAuYXR0cihcInlcIiwgMClcbiAgICAvLyAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGggPiAwID8gd2lkdGggOiAwKVxuICAgIC8vICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ID4gMCA/IGhlaWdodCA6IDApO1xuXG4gICAgLy8gc3ZnXG4gICAgLy8gICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC8vICAgLmF0dHIoXCJjbGFzc1wiLCBcInBhbmVcIilcbiAgICAvLyAgIC5hdHRyKFwid2lkdGhcIiwgZWxlbWVudC5jbGllbnRXaWR0aClcbiAgICAvLyAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAvLyAgIC5hdHRyKFwiY2xpcC1wYXRoXCIsIFwidXJsKCNcIiArIGNsaXBfaWQgKyBcIilcIik7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAuZGF0dW0oZGF0YSlcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsaW5lIGxpbmVwbG90bGluZVwiKVxuICAgICAgLmF0dHIoXCJkXCIsIGxpbmUpXG4gICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAzKVxuICAgICAgLmF0dHIoXCJzdHJva2VcIiwgdGhpcy5jb2xvcik7XG4gICAgICAvLyAuYXR0cihcInN0cm9rZVwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgLy8gICByZXR1cm4gKGQudmFsdWUgPiA1MCkgPyAnZ3JlZW4nIDogJ3JlZCc7XG4gICAgICAvLyB9KTtcblxuICAgIHN2Z1xuICAgICAgLnNlbGVjdEFsbChcIi5kb3RcIilcbiAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImRvdFwiKVxuICAgICAgLmF0dHIoXCJyXCIsIDUpXG4gICAgICAuYXR0cihcImN4XCIsIHhNYXApXG4gICAgICAuYXR0cihcImN5XCIsIHlNYXApXG4gICAgICAuYXR0cihcImNsaXAtcGF0aFwiLCBcInVybCgjXCIgKyBjbGlwX2lkICsgXCIpXCIpXG4gICAgICAuYXR0cihcImZpbGxcIiwgXCJibGFja1wiKVxuICAgICAgLmF0dHIoXCJvcGFjaXR5XCIsIDApXG4gICAgICAub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICB0b29sdGlwXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbigxMDApXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcbiAgICAgICAgdG9vbHRpcFxuICAgICAgICAgIC5odG1sKFxuICAgICAgICAgICAgXCJEYXRlOiBcIiArIGZvcm1hdERhdGUoZC5kYXRlKSArXG4gICAgICAgICAgICAgIFwiPGJyPlwiICtcbiAgICAgICAgICAgICAgbG9jYWxUaGlzLnlBeGlzTGFiZWwgK1xuICAgICAgICAgICAgICBcIjogXCIgK1xuICAgICAgICAgICAgICBmb3JtYXRfYXR0cmlidXRlKHlWYWx1ZShkKSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBkMy5ldmVudC5wYWdlWCArIDUgKyBcInB4XCIpXG4gICAgICAgICAgLnN0eWxlKFwidG9wXCIsIGQzLmV2ZW50LnBhZ2VZIC0gMjggKyBcInB4XCIpO1xuICAgICAgICBkM1xuICAgICAgICAgIC5zZWxlY3QodGhpcylcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwKVxuICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCJibGFja1wiKVxuICAgICAgICAgIC5hdHRyKFwib3BhY2l0eVwiLCAxKTtcblxuICAgICAgfSlcbiAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdG9vbHRpcFxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oMzAwKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICAgIGQzXG4gICAgICAgICAgLnNlbGVjdCh0aGlzKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oNTApXG4gICAgICAgICAgLmF0dHIoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgfSk7XG5cbiAgICBzdmdcbiAgICAgIC5zZWxlY3RBbGwoXCIudGlja1wiKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkID09PSAwO1xuICAgICAgfSlcbiAgICAgIC5yZW1vdmUoKTtcblxuICB9XG5cbn1cbiJdfQ==