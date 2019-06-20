/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
var LinePlotComponent = /** @class */ (function () {
    function LinePlotComponent() {
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
    // you might need a method like this to reformat given data with the appropriate field names,
    // get dataModel() {
    //   return this.data.map(item => {
    //     return {date: item.something, value: item.somethingElse};
    //   });
    // }
    /**
     * @return {?}
     */
    LinePlotComponent.prototype.ngOnInit = 
    // you might need a method like this to reformat given data with the appropriate field names,
    // get dataModel() {
    //   return this.data.map(item => {
    //     return {date: item.something, value: item.somethingElse};
    //   });
    // }
    /**
     * @return {?}
     */
    function () {
        this.drawLinePlot(this.data, "#" + this.propID, this.color);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    LinePlotComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.drawLinePlot(this.data, "#" + this.propID, this.color);
    };
    /**
     * @return {?}
     */
    LinePlotComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.drawLinePlot(this.data, "#" + this.propID, this.color);
    };
    /**
     * @param {?} dataArray
     * @param {?} selection_string
     * @param {?} color
     * @return {?}
     */
    LinePlotComponent.prototype.drawLinePlot = /**
     * @param {?} dataArray
     * @param {?} selection_string
     * @param {?} color
     * @return {?}
     */
    function (dataArray, selection_string, color) {
        /** @type {?} */
        var localThis = this;
        d3.selectAll("." + this.propID + "_tooltip").remove();
        if (document.querySelectorAll(selection_string + " svg")[0] != null) {
            document.querySelectorAll(selection_string + " svg")[0].remove();
        }
        // make copy of the original data so we do not mutate it
        /** @type {?} */
        var data = [];
        dataArray.forEach((/**
         * @param {?} el
         * @return {?}
         */
        function (el) { return data.push(Object.assign({}, el)); }));
        /** @type {?} */
        var parseDate = d3.timeParse('%Y-%m-%d');
        /** @type {?} */
        var formatDate = d3.timeFormat('%B %-d %Y');
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
        var detected_percent = d3.max(data, (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.value;
        })) <= 1
            ? true
            : false;
        /** @type {?} */
        var element;
        /** @type {?} */
        var selected = document.querySelectorAll(selection_string);
        if (selected[0] == null) {
            element = [{ clientWidth: 500, clientHeight: 500 }];
        }
        else {
            element = selected[0];
        }
        /** @type {?} */
        var margin = { top: 20, right: 30, bottom: 45, left: 40 };
        /** @type {?} */
        var width = element.clientWidth - margin.left - margin.right;
        /** @type {?} */
        var height = element.clientHeight - margin.top - margin.bottom;
        // Account for panel heading height if the title exists.
        if (this.title) {
            height -= 40;
        }
        /** @type {?} */
        var xValue = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.date;
        });
        /** @type {?} */
        var xScale = d3.scaleTime().range([0, width - margin.right]);
        /** @type {?} */
        var xMap = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return xScale(xValue(d));
        });
        /** @type {?} */
        var xAxis = d3.axisBottom()
            .scale(xScale)
            .tickSizeInner(-height)
            .ticks(6);
        /** @type {?} */
        var format_attribute;
        if (detected_percent) {
            format_attribute = d3.format("%");
        }
        else {
            format_attribute = d3.format("");
        }
        /** @type {?} */
        var yValue = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.value;
        });
        /** @type {?} */
        var yScale = d3.scaleLinear().range([height, 0]);
        /** @type {?} */
        var yMap = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            console.log("y scale is " + yScale(yValue(d)));
            console.log(d);
            return yScale(yValue(d));
        });
        /** @type {?} */
        var yAxisScale = d3.scaleLinear()
            .range([height - yScale(d3.min(data)), 0]);
        xScale.domain(d3.extent(data, xValue)).nice();
        yScale.domain(d3.extent(data, yValue)).nice();
        // yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);
        /** @type {?} */
        var yAxis = d3.axisLeft()
            .scale(yScale)
            // .tickValues([-200, -150, -100, -50, 0, 50, 100, 150, 200, 250, 300, 350])
            .tickSizeInner(-width)
            .tickFormat(format_attribute);
        /** @type {?} */
        var line = d3.line()
            .x(xMap)
            .y(yMap)
            .curve(d3.curveLinear);
        // debugger
        /** @type {?} */
        var svg = d3
            .select(selection_string)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        /** @type {?} */
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "d3_visuals_tooltip " + this.propID + "_tooltip")
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
        var clip_id = "clip-" + this.propID;
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
    };
    LinePlotComponent.decorators = [
        { type: Component, args: [{
                    selector: 'eikos-line-plot',
                    template: "\n  <h2>{{title}}</h2>\n  <div style=\"height: 750px; width: 750px;\" >\n      <div [id]=\"propID\" style=\"width:100%;height:100%\"> </div>\n  </div>\n"
                }] }
    ];
    /** @nocollapse */
    LinePlotComponent.ctorParameters = function () { return []; };
    LinePlotComponent.propDecorators = {
        propID: [{ type: Input }],
        data: [{ type: Input }],
        title: [{ type: Input }],
        color: [{ type: Input }],
        yAxisLabel: [{ type: Input }],
        xAxisLabel: [{ type: Input }]
    };
    return LinePlotComponent;
}());
export { LinePlotComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1wbG90LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nY2F0YWx5c3QvIiwic291cmNlcyI6WyJsaWIvbGluZS1wbG90LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTJDLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXpCO0lBa0JFO1FBUFMsV0FBTSxHQUFHLE1BQU0sQ0FBQztRQUdoQixVQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2YsZUFBVSxHQUFHLE9BQU8sQ0FBQztRQUNyQixlQUFVLEdBQUcsTUFBTSxDQUFDO0lBRWIsQ0FBQztJQUVqQiw2RkFBNkY7SUFDN0Ysb0JBQW9CO0lBQ3BCLG1DQUFtQztJQUNuQyxnRUFBZ0U7SUFDaEUsUUFBUTtJQUNSLElBQUk7Ozs7Ozs7Ozs7SUFFSixvQ0FBUTs7Ozs7Ozs7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7OztJQUVELHVDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7SUFFRCwyQ0FBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7Ozs7SUFFRCx3Q0FBWTs7Ozs7O0lBQVosVUFBYSxTQUFTLEVBQUUsZ0JBQWdC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O2FBQ2xCLE1BQU07Ozs7UUFBQyxVQUFTLENBQUM7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsRUFBQzthQUNELE1BQU0sRUFBRSxDQUFDO0lBRWQsQ0FBQzs7Z0JBeFFGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsMEpBS1g7aUJBQ0E7Ozs7O3lCQUdFLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLOztJQTBQUix3QkFBQztDQUFBLEFBMVFELElBMFFDO1NBalFZLGlCQUFpQjs7O0lBRTVCLG1DQUF5Qjs7SUFDekIsaUNBQStDOztJQUMvQyxrQ0FBNEI7O0lBQzVCLGtDQUF3Qjs7SUFDeEIsdUNBQThCOztJQUM5Qix1Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlaWtvcy1saW5lLXBsb3QnLFxuICB0ZW1wbGF0ZTogYFxuICA8aDI+e3t0aXRsZX19PC9oMj5cbiAgPGRpdiBzdHlsZT1cImhlaWdodDogNzUwcHg7IHdpZHRoOiA3NTBweDtcIiA+XG4gICAgICA8ZGl2IFtpZF09XCJwcm9wSURcIiBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OjEwMCVcIj4gPC9kaXY+XG4gIDwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBMaW5lUGxvdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKSBwcm9wSUQgPSAnbGluZSc7XG4gIEBJbnB1dCgpIGRhdGE6IFt7ZGF0ZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyfV07XG4gIEBJbnB1dCgpIHRpdGxlOiBcIkxpbmUgUGxvdFwiO1xuICBASW5wdXQoKSBjb2xvciA9IFwiIzAwMFwiO1xuICBASW5wdXQoKSB5QXhpc0xhYmVsID0gJ1ZhbHVlJztcbiAgQElucHV0KCkgeEF4aXNMYWJlbCA9ICdEYXRlJztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8vIHlvdSBtaWdodCBuZWVkIGEgbWV0aG9kIGxpa2UgdGhpcyB0byByZWZvcm1hdCBnaXZlbiBkYXRhIHdpdGggdGhlIGFwcHJvcHJpYXRlIGZpZWxkIG5hbWVzLFxuICAvLyBnZXQgZGF0YU1vZGVsKCkge1xuICAvLyAgIHJldHVybiB0aGlzLmRhdGEubWFwKGl0ZW0gPT4ge1xuICAvLyAgICAgcmV0dXJuIHtkYXRlOiBpdGVtLnNvbWV0aGluZywgdmFsdWU6IGl0ZW0uc29tZXRoaW5nRWxzZX07XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRyYXdMaW5lUGxvdCh0aGlzLmRhdGEsIFwiI1wiICsgdGhpcy5wcm9wSUQsIHRoaXMuY29sb3IpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuZHJhd0xpbmVQbG90KHRoaXMuZGF0YSwgXCIjXCIgKyB0aGlzLnByb3BJRCwgdGhpcy5jb2xvcik7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kcmF3TGluZVBsb3QodGhpcy5kYXRhLCBcIiNcIiArIHRoaXMucHJvcElELCB0aGlzLmNvbG9yKTtcbiAgfVxuXG4gIGRyYXdMaW5lUGxvdChkYXRhQXJyYXksIHNlbGVjdGlvbl9zdHJpbmcsIGNvbG9yKSB7XG4gICAgY29uc3QgbG9jYWxUaGlzID0gdGhpcztcblxuICAgIGQzLnNlbGVjdEFsbChgLiR7dGhpcy5wcm9wSUR9X3Rvb2x0aXBgKS5yZW1vdmUoKTtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rpb25fc3RyaW5nICsgXCIgc3ZnXCIpWzBdICE9IG51bGwpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyArIFwiIHN2Z1wiKVswXS5yZW1vdmUoKTtcbiAgICB9XG4gICAgLy8gbWFrZSBjb3B5IG9mIHRoZSBvcmlnaW5hbCBkYXRhIHNvIHdlIGRvIG5vdCBtdXRhdGUgaXRcbiAgICBjb25zdCBkYXRhID0gW107XG4gICAgZGF0YUFycmF5LmZvckVhY2goZWwgPT4gZGF0YS5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGVsKSkpO1xuXG4gICAgY29uc3QgcGFyc2VEYXRlID0gZDMudGltZVBhcnNlKCclWS0lbS0lZCcpO1xuICAgIGNvbnN0IGZvcm1hdERhdGUgPSBkMy50aW1lRm9ybWF0KCclQiAlLWQgJVknKTtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtdGltZS1mb3JtYXQgdG8gY2hhbmdlIGhvdyB0aGlzIGlzIGZvcm1hdHRlZCAtIGxlYXZlIHRoZSBwYXJzZURhdGUgYmVjYXVzZSB0aGF0J3MgZm9yIHNvcnRpbmcgdGhlIGRhdGFcblxuICAgIGlmICh0eXBlb2YgZGF0YVswXS5kYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgZC5kYXRlID0gcGFyc2VEYXRlKGQuZGF0ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBkYXRhLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIGEuZGF0ZSAtIGIuZGF0ZTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGRldGVjdGVkX3BlcmNlbnQgPVxuICAgICAgZDMubWF4KGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQudmFsdWU7XG4gICAgICB9KSA8PSAxXG4gICAgICAgID8gdHJ1ZVxuICAgICAgICA6IGZhbHNlO1xuICAgIGxldCBlbGVtZW50OiBhbnk7XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyk7XG5cbiAgICBpZiAoc2VsZWN0ZWRbMF0gPT0gbnVsbCkge1xuICAgICAgZWxlbWVudCA9IFt7Y2xpZW50V2lkdGg6IDUwMCwgY2xpZW50SGVpZ2h0OiA1MDB9XTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudCA9IHNlbGVjdGVkWzBdO1xuICAgIH1cblxuICAgIGNvbnN0IG1hcmdpbiA9IHsgdG9wOiAyMCwgcmlnaHQ6IDMwLCBib3R0b206IDQ1LCBsZWZ0OiA0MCB9LFxuICAgICAgd2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG4gICAgbGV0IGhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgICAvLyBBY2NvdW50IGZvciBwYW5lbCBoZWFkaW5nIGhlaWdodCBpZiB0aGUgdGl0bGUgZXhpc3RzLlxuICAgIGlmICh0aGlzLnRpdGxlKSB7XG4gICAgICBoZWlnaHQgLT0gNDA7XG4gICAgfVxuXG4gICAgY29uc3QgeFZhbHVlID0gZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5kYXRlO1xuICAgICAgfSxcbiAgICAgIHhTY2FsZSA9IGQzLnNjYWxlVGltZSgpLnJhbmdlKFswLCB3aWR0aCAtIG1hcmdpbi5yaWdodF0pLFxuICAgICAgeE1hcCA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHhTY2FsZSh4VmFsdWUoZCkpO1xuICAgICAgfSxcbiAgICAgIHhBeGlzID0gZDMuYXhpc0JvdHRvbSgpXG4gICAgICAgIC5zY2FsZSh4U2NhbGUpXG4gICAgICAgIC50aWNrU2l6ZUlubmVyKC1oZWlnaHQpXG4gICAgICAgIC50aWNrcyg2KTtcbiAgICBsZXQgZm9ybWF0X2F0dHJpYnV0ZTtcbiAgICBpZiAoZGV0ZWN0ZWRfcGVyY2VudCkge1xuICAgICAgZm9ybWF0X2F0dHJpYnV0ZSA9IGQzLmZvcm1hdChcIiVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1hdF9hdHRyaWJ1dGUgPSBkMy5mb3JtYXQoXCJcIik7XG4gICAgfVxuXG4gICAgY29uc3QgeVZhbHVlID0gZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICAgIH0sXG4gICAgICB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFtoZWlnaHQsIDBdKSxcbiAgICAgIHlNYXAgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwieSBzY2FsZSBpcyBcIiArIHlTY2FsZSh5VmFsdWUoZCkpKTtcbiAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgIHJldHVybiB5U2NhbGUoeVZhbHVlKGQpKTtcbiAgICAgIH0sXG4gICAgICB5QXhpc1NjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgLnJhbmdlKFtoZWlnaHQgLSB5U2NhbGUoZDMubWluKGRhdGEpKSwgMF0pO1xuXG5cbiAgICB4U2NhbGUuZG9tYWluKGQzLmV4dGVudChkYXRhLCB4VmFsdWUpKS5uaWNlKCk7XG4gICAgeVNjYWxlLmRvbWFpbihkMy5leHRlbnQoZGF0YSwgeVZhbHVlKSkubmljZSgpO1xuXG4gICAgLy8geVNjYWxlLmRvbWFpbihbZDMubWluKGRhdGEsIHlWYWx1ZSksIGQzLm1heChkYXRhLCB5VmFsdWUpXSk7XG5cbiAgICBjb25zdCB5QXhpcyA9IGQzLmF4aXNMZWZ0KClcbiAgICAgIC5zY2FsZSh5U2NhbGUpXG4gICAgICAvLyAudGlja1ZhbHVlcyhbLTIwMCwgLTE1MCwgLTEwMCwgLTUwLCAwLCA1MCwgMTAwLCAxNTAsIDIwMCwgMjUwLCAzMDAsIDM1MF0pXG4gICAgICAudGlja1NpemVJbm5lcigtd2lkdGgpXG4gICAgICAudGlja0Zvcm1hdChmb3JtYXRfYXR0cmlidXRlKTtcblxuICAgIGNvbnN0IGxpbmUgPSBkMy5saW5lKClcbiAgICAgIC54KHhNYXApXG4gICAgICAueSh5TWFwKVxuICAgICAgLmN1cnZlKGQzLmN1cnZlTGluZWFyKTtcblxuICAgIC8vIGRlYnVnZ2VyXG5cbiAgICBjb25zdCBzdmcgPSBkM1xuICAgICAgLnNlbGVjdChzZWxlY3Rpb25fc3RyaW5nKVxuICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAgIGNvbnN0IHRvb2x0aXAgPSBkM1xuICAgICAgLnNlbGVjdChcImJvZHlcIilcbiAgICAgIC5hcHBlbmQoXCJkaXZcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYGQzX3Zpc3VhbHNfdG9vbHRpcCAke3RoaXMucHJvcElEfV90b29sdGlwYClcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG5cbiAgICBzdmcuc3R5bGUoXCJmaWxsXCIsIFwidHJhbnNwYXJlbnRcIik7XG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpcyB4YXhpcyBheGlzLWxpbmUtcGxvdDFcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoZWlnaHQgKyBcIilcIilcbiAgICAgIC5zdHlsZSgnZmlsbCcsICdibGFjaycpXG4gICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxNHB4XCIpXG4gICAgICAuY2FsbCh4QXhpcylcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcInhcIiwgKHdpZHRoIC8gMikpXG4gICAgICAuYXR0cihcInlcIiwgMjUpXG4gICAgICAuYXR0cihcImR5XCIsIFwiLjcxZW1cIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBcIjE2cHhcIilcbiAgICAgIC50ZXh0KHRoaXMueEF4aXNMYWJlbCk7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzIGF4aXMtbGluZS1wbG90XCIpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIFwiYmxhY2tcIilcbiAgICAgIC5jYWxsKHlBeGlzKVxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKC05MClcIilcbiAgICAgIC5hdHRyKFwieVwiLCAtbWFyZ2luLmxlZnQpXG4gICAgICAuYXR0cihcImR5XCIsIFwiLjcxZW1cIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBcIjE2cHhcIilcbiAgICAgIC50ZXh0KHRoaXMueUF4aXNMYWJlbCk7XG5cbiAgICBjb25zdCBjbGlwX2lkID0gXCJjbGlwLVwiICsgdGhpcy5wcm9wSUQ7XG5cbiAgICAvLyBzdmdcbiAgICAvLyAgIC5hcHBlbmQoXCJjbGlwUGF0aFwiKVxuICAgIC8vICAgLmF0dHIoXCJpZFwiLCBjbGlwX2lkKVxuICAgIC8vICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAvLyAgIC5hdHRyKFwieFwiLCAwKVxuICAgIC8vICAgLmF0dHIoXCJ5XCIsIDApXG4gICAgLy8gICAuYXR0cihcIndpZHRoXCIsIHdpZHRoID4gMCA/IHdpZHRoIDogMClcbiAgICAvLyAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCA+IDAgPyBoZWlnaHQgOiAwKTtcblxuICAgIC8vIHN2Z1xuICAgIC8vICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAvLyAgIC5hdHRyKFwiY2xhc3NcIiwgXCJwYW5lXCIpXG4gICAgLy8gICAuYXR0cihcIndpZHRoXCIsIGVsZW1lbnQuY2xpZW50V2lkdGgpXG4gICAgLy8gICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgLy8gICAuYXR0cihcImNsaXAtcGF0aFwiLCBcInVybCgjXCIgKyBjbGlwX2lkICsgXCIpXCIpO1xuXG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgLmRhdHVtKGRhdGEpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwibGluZSBsaW5lcGxvdGxpbmVcIilcbiAgICAgIC5hdHRyKFwiZFwiLCBsaW5lKVxuICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMylcbiAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIHRoaXMuY29sb3IpO1xuICAgICAgLy8gLmF0dHIoXCJzdHJva2VcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgIC8vICAgcmV0dXJuIChkLnZhbHVlID4gNTApID8gJ2dyZWVuJyA6ICdyZWQnO1xuICAgICAgLy8gfSk7XG5cbiAgICBzdmdcbiAgICAgIC5zZWxlY3RBbGwoXCIuZG90XCIpXG4gICAgICAuZGF0YShkYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJkb3RcIilcbiAgICAgIC5hdHRyKFwiclwiLCA1KVxuICAgICAgLmF0dHIoXCJjeFwiLCB4TWFwKVxuICAgICAgLmF0dHIoXCJjeVwiLCB5TWFwKVxuICAgICAgLmF0dHIoXCJjbGlwLXBhdGhcIiwgXCJ1cmwoI1wiICsgY2xpcF9pZCArIFwiKVwiKVxuICAgICAgLmF0dHIoXCJmaWxsXCIsIFwiYmxhY2tcIilcbiAgICAgIC5hdHRyKFwib3BhY2l0eVwiLCAwKVxuICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdG9vbHRpcFxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oMTAwKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSk7XG4gICAgICAgIHRvb2x0aXBcbiAgICAgICAgICAuaHRtbChcbiAgICAgICAgICAgIFwiRGF0ZTogXCIgKyBmb3JtYXREYXRlKGQuZGF0ZSkgK1xuICAgICAgICAgICAgICBcIjxicj5cIiArXG4gICAgICAgICAgICAgIGxvY2FsVGhpcy55QXhpc0xhYmVsICtcbiAgICAgICAgICAgICAgXCI6IFwiICtcbiAgICAgICAgICAgICAgZm9ybWF0X2F0dHJpYnV0ZSh5VmFsdWUoZCkpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgZDMuZXZlbnQucGFnZVggKyA1ICsgXCJweFwiKVxuICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBkMy5ldmVudC5wYWdlWSAtIDI4ICsgXCJweFwiKTtcbiAgICAgICAgZDNcbiAgICAgICAgICAuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbig1MClcbiAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIFwiYmxhY2tcIilcbiAgICAgICAgICAuYXR0cihcIm9wYWNpdHlcIiwgMSk7XG5cbiAgICAgIH0pXG4gICAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHRvb2x0aXBcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmR1cmF0aW9uKDMwMClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICBkM1xuICAgICAgICAgIC5zZWxlY3QodGhpcylcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwKVxuICAgICAgICAgIC5hdHRyKFwib3BhY2l0eVwiLCAwKTtcbiAgICAgIH0pO1xuXG4gICAgc3ZnXG4gICAgICAuc2VsZWN0QWxsKFwiLnRpY2tcIilcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZCA9PT0gMDtcbiAgICAgIH0pXG4gICAgICAucmVtb3ZlKCk7XG5cbiAgfVxuXG59XG4iXX0=