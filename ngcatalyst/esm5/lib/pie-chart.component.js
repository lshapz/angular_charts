/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
var PieChartComponent = /** @class */ (function () {
    function PieChartComponent() {
        this.propID = 'pie';
        this.donutWidth = 0; // in pixels
        // in pixels
        this.colors = ["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB", "#64B5F6", "#01579B"];
        // need 10 hex colors;
        this.savedColors = {};
        this.total = 0;
    }
    // you might need a method like this to reformat given data with the appropriate field names,
    // get dataModel() {
    //   return this.data.map(item => {
    //     return {label: item.something, value: item.somethingElse};
    //   });
    // }
    // you might need a method like this to reformat given data with the appropriate field names,
    // get dataModel() {
    //   return this.data.map(item => {
    //     return {label: item.something, value: item.somethingElse};
    //   });
    // }
    /**
     * @return {?}
     */
    PieChartComponent.prototype.ngOnInit = 
    // you might need a method like this to reformat given data with the appropriate field names,
    // get dataModel() {
    //   return this.data.map(item => {
    //     return {label: item.something, value: item.somethingElse};
    //   });
    // }
    /**
     * @return {?}
     */
    function () {
        this.drawPieChart();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PieChartComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.drawPieChart();
    };
    /**
     * @return {?}
     */
    PieChartComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.drawPieChart();
    };
    /**
     * @return {?}
     */
    PieChartComponent.prototype.drawPieChart = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.total === 0 && this.data) {
            this.data.forEach((/**
             * @param {?} el
             * @return {?}
             */
            function (el) { _this.total += el['value']; }));
        }
        d3.selectAll("." + this.propID + "_tooltip").remove();
        /** @type {?} */
        var selection_string = "#" + this.propID;
        if (document.querySelectorAll(selection_string + " svg")[0] != null) {
            document.querySelectorAll(selection_string + " svg")[0].remove();
        }
        /** @type {?} */
        var element;
        /** @type {?} */
        var selected = document.querySelectorAll(selection_string);
        if (selected[0] == null) {
            element = { clientWidth: 500, clientHeight: 500 };
        }
        else {
            element = selected[0];
        }
        /**
         * @param {?} hex
         * @return {?}
         */
        function hex2rgb(hex) {
            return [(/** @type {?} */ ('0x')) + hex[1] + hex[2] | 0, (/** @type {?} */ ('0x')) + hex[3] + hex[4] | 0, (/** @type {?} */ ('0x')) + hex[5] + hex[6] | 0];
        }
        /** @type {?} */
        var localThis = this;
        /** @type {?} */
        var margin = { top: 10, right: 0, bottom: 20, left: 0 };
        /** @type {?} */
        var width = element.clientWidth - margin.left - margin.right;
        /** @type {?} */
        var height = element.clientHeight - margin.top - margin.bottom;
        /** @type {?} */
        var radius = height > width ? width / 2 : height / 2;
        /** @type {?} */
        var svg = d3.select(selection_string)
            .append("svg")
            .data([this.data], (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            if (d) {
                return d.label;
            }
        }))
            .attr("width", width)
            .attr("height", height)
            .append("g")
            // sets the center of the piechart to center of container
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        svg
            .append("text")
            .attr('font-size', '4em')
            .attr('y', 20)
            .attr('x', -50)
            .text(localThis.total);
        // add tooltip div to the DOM
        /** @type {?} */
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "d3_visuals_tooltip " + this.propID + "_tooltip")
            .style("opacity", 0);
        // create function that will be used to draw slices
        /** @type {?} */
        var pie = d3.pie()
            .value((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.value; }));
        // Declare an arc generator function
        /** @type {?} */
        var donut = this.donutWidth;
        /** @type {?} */
        var arc = d3.arc()
            .innerRadius(donut)
            .outerRadius(radius);
        // Select paths, use arc generator to draw
        /** @type {?} */
        var arcs = svg.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
        // add tooltip on mouseover of slice
        arcs.on("mouseover", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            // calculate the percent of total for the slice
            d3.select(this).selectAll('path').
                attr('fill', (/**
             * @param {?} dt
             * @return {?}
             */
            function (dt) {
                /** @type {?} */
                var currentFill = this.attributes.fill.value;
                currentFill = hex2rgb(currentFill);
                // if (currentFill.includes('#')){
                // } else {
                //   currentFill = currentFill.slice(0, currentFill.length -2).slice(4).split(', ')
                // }
                /** @type {?} */
                var darker = currentFill.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    // tslint:disable-next-line: radix
                    return parseInt(item) * .75;
                }));
                return "rgb(" + darker[0] + ", " + darker[1] + ", " + darker[2] + ")";
            }));
            /** @type {?} */
            var percent = Math.round(d.data.value / localThis.total * 100);
            tooltip.transition()
                .duration(100)
                .style("opacity", 1);
            tooltip
                .html(d.data.label + ': ' + '<b>' + d.data.value + '</b>' + '<br/>' + '<b>' + percent + '</b>' + '% of total')
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px");
        }))
            .on("mouseout", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            tooltip.transition()
                .duration(300)
                .style("opacity", 0);
            d3.select(this).selectAll('path').
                attr('fill', (/**
             * @param {?} dt
             * @return {?}
             */
            function (dt) {
                /** @type {?} */
                var label = dt.data ? dt.data.label : dt.label;
                return localThis.savedColors[label];
            }));
        }));
        /** @type {?} */
        var colors = this.colors;
        // add colors to each slice
        arcs.append("path")
            .attr("fill", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            /** @type {?} */
            var length = colors.length;
            /** @type {?} */
            var color;
            if (localThis.savedColors[d.data.label]) {
                color = localThis.savedColors[d.data.label];
            }
            else {
                i >= length ? color = colors[i - length] : color = colors[i];
                localThis.savedColors[d.data.label] = color;
            }
            return color;
        }))
            .attr("d", arc);
        // This is built in for smaller viewports
        // if the width is less than 800px then the legend won't be added
        // to the SVG the user is still able to hover or click on the pie
        // secion to see the label and value of the section
        // let localThis = this;
        if (width > 800) {
            /** @type {?} */
            var legend = svg.selectAll(".legend")
                .data(this.data, (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                return d.label;
            }))
                .enter()
                .append("g")
                .attr("class", "legend")
                .attr("transform", (/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            function (d, i) { return "translate(30," + 25 * i + ")"; }));
            legend.append("rect")
                .attr("x", radius + 20)
                .attr("y", -radius + 20)
                .attr("width", 20)
                .attr("height", 20)
                .attr("fill", (/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            function (d, i) {
                /** @type {?} */
                var length = colors.length;
                /** @type {?} */
                var color;
                if (localThis.savedColors[d.label]) {
                    color = localThis.savedColors[d.label];
                }
                else {
                    i >= length ? color = colors[i - length] : color = colors[i];
                    localThis.savedColors[d.label] = color;
                }
                return color;
            }))
                .attr("d", arc);
            legend.append("text")
                .attr("x", radius + 45)
                .attr("y", -radius + 30)
                .attr("dy", ".35em")
                .attr("font-size", 14)
                .style("text-anchor", "start")
                .text((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            function (d, i) {
                return localThis.data[i].label;
            }));
            legend.on('mouseover', (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                /** @type {?} */
                var local = localThis;
                /** @type {?} */
                var currentLabel = d.label;
                d3.selectAll('g.slice path').data([d], (/**
                 * @param {?} dt
                 * @return {?}
                 */
                function (dt) {
                    return dt.data ? dt.data.label : dt.label;
                }))
                    .attr('fill', (/**
                 * @param {?} df
                 * @return {?}
                 */
                function (df) {
                    if (df.label === currentLabel) {
                        /** @type {?} */
                        var currentFill = this.attributes.fill.value;
                        currentFill = hex2rgb(currentFill);
                        /** @type {?} */
                        var darker = currentFill.map((/**
                         * @param {?} item
                         * @return {?}
                         */
                        function (item) {
                            // tslint:disable-next-line: radix
                            return parseInt(item) * .75;
                        }));
                        return "rgb(" + darker[0] + ", " + darker[1] + ", " + darker[2] + ")";
                    }
                    else {
                        return;
                    }
                }));
            }));
            legend.on('mouseout', (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                /** @type {?} */
                var local = localThis;
                /** @type {?} */
                var currentLabel = d.label;
                d3.selectAll('g.slice path').data([d], (/**
                 * @param {?} dt
                 * @return {?}
                 */
                function (dt) {
                    return dt.data ? dt.data.label : dt.label;
                }))
                    .attr('fill', (/**
                 * @param {?} df
                 * @return {?}
                 */
                function (df) {
                    return localThis.savedColors[df.label];
                }));
            }));
        }
    };
    PieChartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'eikos-pie-chart',
                    template: "\n  <h2>{{title}}</h2>\n  <div style=\"height: 750px; width: 750px;\" >\n      <div [id]=\"propID\" style=\"width:100%;height:100%\"> </div>\n  </div>\n"
                }] }
    ];
    /** @nocollapse */
    PieChartComponent.ctorParameters = function () { return []; };
    PieChartComponent.propDecorators = {
        propID: [{ type: Input }],
        data: [{ type: Input }],
        title: [{ type: Input }],
        donutWidth: [{ type: Input }],
        colors: [{ type: Input }]
    };
    return PieChartComponent;
}());
export { PieChartComponent };
if (false) {
    /** @type {?} */
    PieChartComponent.prototype.propID;
    /** @type {?} */
    PieChartComponent.prototype.data;
    /** @type {?} */
    PieChartComponent.prototype.title;
    /** @type {?} */
    PieChartComponent.prototype.donutWidth;
    /** @type {?} */
    PieChartComponent.prototype.colors;
    /** @type {?} */
    PieChartComponent.prototype.savedColors;
    /** @type {?} */
    PieChartComponent.prototype.total;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nY2F0YWx5c3QvIiwic291cmNlcyI6WyJsaWIvcGllLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTJDLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXpCO0lBb0JFO1FBVFMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUdmLGVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFZOztRQUM1QixXQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQzs7UUFFakksZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsVUFBSyxHQUFHLENBQUMsQ0FBQztJQUVNLENBQUM7SUFFakIsNkZBQTZGO0lBQzdGLG9CQUFvQjtJQUNwQixtQ0FBbUM7SUFDbkMsaUVBQWlFO0lBQ2pFLFFBQVE7SUFDUixJQUFJOzs7Ozs7Ozs7O0lBRUosb0NBQVE7Ozs7Ozs7Ozs7SUFBUjtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUVELHVDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELDJDQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsd0NBQVk7OztJQUFaO1FBQUEsaUJBdU5DO1FBdE5DLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFD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ekMsQ0FBQyxFQUFDLENBQUM7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQzs7Z0JBaFFGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsMEpBS1g7aUJBQ0E7Ozs7O3lCQUdFLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzZCQUNMLEtBQUs7eUJBQ0wsS0FBSzs7SUFrUFIsd0JBQUM7Q0FBQSxBQWpRRCxJQWlRQztTQXhQWSxpQkFBaUI7OztJQUU1QixtQ0FBd0I7O0lBQ3hCLGlDQUFnRDs7SUFDaEQsa0NBQTRCOztJQUM1Qix1Q0FBd0I7O0lBQ3hCLG1DQUFpSTs7SUFFakksd0NBQWlCOztJQUNqQixrQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Vpa29zLXBpZS1jaGFydCcsXG4gIHRlbXBsYXRlOiBgXG4gIDxoMj57e3RpdGxlfX08L2gyPlxuICA8ZGl2IHN0eWxlPVwiaGVpZ2h0OiA3NTBweDsgd2lkdGg6IDc1MHB4O1wiID5cbiAgICAgIDxkaXYgW2lkXT1cInByb3BJRFwiIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwJVwiPiA8L2Rpdj5cbiAgPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFBpZUNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHByb3BJRCA9ICdwaWUnO1xuICBASW5wdXQoKSBkYXRhOiBbe2xhYmVsOiBzdHJpbmcsIHZhbHVlOiBudW1iZXJ9XTtcbiAgQElucHV0KCkgdGl0bGU6ICdQaWUgQ2hhcnQnO1xuICBASW5wdXQoKSBkb251dFdpZHRoID0gMDsgLy8gaW4gcGl4ZWxzXG4gIEBJbnB1dCgpIGNvbG9ycyA9IFtcIiMwODFBNEVcIiwgXCIjMDkyMzY5XCIsIFwiIzFBNjQ5RlwiLCBcIiMyNDg1QjRcIiwgXCIjMkRBOEM5XCIsIFwiIzVEQzFEMFwiLCBcIiM5QUQ1Q0RcIiwgXCIjRDVFOUNCXCIsIFwiIzY0QjVGNlwiLCBcIiMwMTU3OUJcIl07XG4gICAgLy8gbmVlZCAxMCBoZXggY29sb3JzO1xuICBzYXZlZENvbG9ycyA9IHt9O1xuICB0b3RhbCA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICAvLyB5b3UgbWlnaHQgbmVlZCBhIG1ldGhvZCBsaWtlIHRoaXMgdG8gcmVmb3JtYXQgZ2l2ZW4gZGF0YSB3aXRoIHRoZSBhcHByb3ByaWF0ZSBmaWVsZCBuYW1lcyxcbiAgLy8gZ2V0IGRhdGFNb2RlbCgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5kYXRhLm1hcChpdGVtID0+IHtcbiAgLy8gICAgIHJldHVybiB7bGFiZWw6IGl0ZW0uc29tZXRoaW5nLCB2YWx1ZTogaXRlbS5zb21ldGhpbmdFbHNlfTtcbiAgLy8gICB9KTtcbiAgLy8gfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZHJhd1BpZUNoYXJ0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5kcmF3UGllQ2hhcnQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRyYXdQaWVDaGFydCgpO1xuICB9XG5cbiAgZHJhd1BpZUNoYXJ0KCkge1xuICAgIGlmICh0aGlzLnRvdGFsID09PSAwICYmIHRoaXMuZGF0YSkge1xuICAgICAgdGhpcy5kYXRhLmZvckVhY2goZWwgPT4ge3RoaXMudG90YWwgKz0gZWxbJ3ZhbHVlJ107IH0pO1xuICAgIH1cblxuICAgIGQzLnNlbGVjdEFsbChgLiR7dGhpcy5wcm9wSUR9X3Rvb2x0aXBgKS5yZW1vdmUoKTtcbiAgICBjb25zdCBzZWxlY3Rpb25fc3RyaW5nID0gXCIjXCIgKyB0aGlzLnByb3BJRDtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rpb25fc3RyaW5nICsgXCIgc3ZnXCIpWzBdICE9IG51bGwpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyArIFwiIHN2Z1wiKVswXS5yZW1vdmUoKTtcbiAgICB9XG4gICAgbGV0IGVsZW1lbnQ6IGFueTtcbiAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyk7XG5cbiAgICBpZiAoc2VsZWN0ZWRbMF0gPT0gbnVsbCkge1xuICAgICAgZWxlbWVudCA9IHtjbGllbnRXaWR0aDogNTAwLCBjbGllbnRIZWlnaHQ6IDUwMH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQgPSBzZWxlY3RlZFswXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoZXgycmdiKGhleCkge1xuICAgICAgcmV0dXJuIFs8YW55PicweCcgKyBoZXhbMV0gKyBoZXhbMl0gfCAwLCA8YW55PicweCcgKyBoZXhbM10gKyBoZXhbNF0gfCAwLCA8YW55PicweCcgKyBoZXhbNV0gKyBoZXhbNl0gfCAwXTtcbiAgICB9XG5cbiAgICBjb25zdCBsb2NhbFRoaXMgPSB0aGlzO1xuXG4gICAgY29uc3QgbWFyZ2luID0ge3RvcDogMTAsIHJpZ2h0OiAwLCBib3R0b206IDIwLCBsZWZ0OiAwfSxcbiAgICAgIHdpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSxcbiAgICAgIHJhZGl1cyA9IGhlaWdodCA+IHdpZHRoID8gIHdpZHRoIC8gMiA6IGhlaWdodCAvIDI7XG5cbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3Qoc2VsZWN0aW9uX3N0cmluZylcbiAgICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAgIC5kYXRhKFt0aGlzLmRhdGFdLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGlmIChkKSB7XG4gICAgICAgICAgcmV0dXJuIGQubGFiZWw7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC8vIHNldHMgdGhlIGNlbnRlciBvZiB0aGUgcGllY2hhcnQgdG8gY2VudGVyIG9mIGNvbnRhaW5lclxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB3aWR0aCAvIDIgKyBcIixcIiArIGhlaWdodCAvIDIgKyBcIilcIik7XG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICc0ZW0nKVxuICAgICAgLmF0dHIoJ3knLCAyMClcbiAgICAgIC5hdHRyKCd4JywgLTUwKVxuICAgICAgLnRleHQobG9jYWxUaGlzLnRvdGFsKTtcblxuICAgIC8vIGFkZCB0b29sdGlwIGRpdiB0byB0aGUgRE9NXG4gICAgY29uc3QgdG9vbHRpcCA9IGQzXG4gICAgICAuc2VsZWN0KFwiYm9keVwiKVxuICAgICAgLmFwcGVuZChcImRpdlwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBgZDNfdmlzdWFsc190b29sdGlwICR7dGhpcy5wcm9wSUR9X3Rvb2x0aXBgKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcblxuICAgIC8vIGNyZWF0ZSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB0byBkcmF3IHNsaWNlc1xuICAgIGNvbnN0IHBpZSA9IGQzLnBpZSgpXG4gICAgICAudmFsdWUoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC52YWx1ZTsgfSk7XG5cbiAgICAvLyBEZWNsYXJlIGFuIGFyYyBnZW5lcmF0b3IgZnVuY3Rpb25cbiAgICBjb25zdCBkb251dCA9IHRoaXMuZG9udXRXaWR0aDtcbiAgICBjb25zdCBhcmMgPSBkMy5hcmMoKVxuICAgICAgLmlubmVyUmFkaXVzKGRvbnV0KVxuICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyk7XG5cbiAgICAvLyBTZWxlY3QgcGF0aHMsIHVzZSBhcmMgZ2VuZXJhdG9yIHRvIGRyYXdcbiAgICBjb25zdCBhcmNzID0gc3ZnLnNlbGVjdEFsbChcImcuc2xpY2VcIilcbiAgICAgIC5kYXRhKHBpZSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzbGljZVwiKTtcblxuICAgIC8vIGFkZCB0b29sdGlwIG9uIG1vdXNlb3ZlciBvZiBzbGljZVxuICAgIGFyY3Mub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgLy8gY2FsY3VsYXRlIHRoZSBwZXJjZW50IG9mIHRvdGFsIGZvciB0aGUgc2xpY2VcbiAgICAgIGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ3BhdGgnKS5cbiAgICAgICAgYXR0cignZmlsbCcsIGZ1bmN0aW9uKGR0KSB7XG5cbiAgICAgICAgICAgIGxldCBjdXJyZW50RmlsbCA9IHRoaXMuYXR0cmlidXRlcy5maWxsLnZhbHVlO1xuICAgICAgICAgY3VycmVudEZpbGwgPSBoZXgycmdiKGN1cnJlbnRGaWxsKTtcbiAgICAgICAgLy8gaWYgKGN1cnJlbnRGaWxsLmluY2x1ZGVzKCcjJykpe1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgIGN1cnJlbnRGaWxsID0gY3VycmVudEZpbGwuc2xpY2UoMCwgY3VycmVudEZpbGwubGVuZ3RoIC0yKS5zbGljZSg0KS5zcGxpdCgnLCAnKVxuICAgICAgICAvLyB9XG4gICAgICAgIGNvbnN0IGRhcmtlciA9IGN1cnJlbnRGaWxsLm1hcChpdGVtID0+IHtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogcmFkaXhcbiAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoaXRlbSkgKiAuNzU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYHJnYigke2RhcmtlclswXX0sICR7ZGFya2VyWzFdfSwgJHtkYXJrZXJbMl19KWA7XG5cbiAgICAgICAgfSk7XG4gICAgICBjb25zdCBwZXJjZW50ID0gTWF0aC5yb3VuZChkLmRhdGEudmFsdWUgLyBsb2NhbFRoaXMudG90YWwgKiAxMDApO1xuICAgICAgdG9vbHRpcC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKDEwMClcbiAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcbiAgICAgIHRvb2x0aXBcbiAgICAgICAgLmh0bWwoXG4gICAgICAgICAgZC5kYXRhLmxhYmVsICsgJzogJyArICc8Yj4nICsgZC5kYXRhLnZhbHVlICsgJzwvYj4nICsgJzxici8+JyArICc8Yj4nICsgcGVyY2VudCArICc8L2I+JyArICclIG9mIHRvdGFsJ1xuICAgICAgICApXG4gICAgICAgIC5zdHlsZShcImxlZnRcIiwgZDMuZXZlbnQucGFnZVggKyBcInB4XCIpXG4gICAgICAgIC5zdHlsZShcInRvcFwiLCBkMy5ldmVudC5wYWdlWSArIFwicHhcIik7XG5cbiAgICB9KVxuICAgICAgLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbigzMDApXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcblxuICAgICAgZDMuc2VsZWN0KHRoaXMpLnNlbGVjdEFsbCgncGF0aCcpLlxuICAgICAgICBhdHRyKCdmaWxsJywgZnVuY3Rpb24oZHQpIHtcbiAgICAgICAgICBjb25zdCBsYWJlbCA9IGR0LmRhdGEgPyBkdC5kYXRhLmxhYmVsIDogZHQubGFiZWw7XG4gICAgICAgICAgcmV0dXJuIGxvY2FsVGhpcy5zYXZlZENvbG9yc1tsYWJlbF07XG5cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IGNvbG9ycyA9IHRoaXMuY29sb3JzO1xuXG4gICAgLy8gYWRkIGNvbG9ycyB0byBlYWNoIHNsaWNlXG4gICAgYXJjcy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAuYXR0cihcImZpbGxcIiwgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gY29sb3JzLmxlbmd0aDtcbiAgICAgICAgbGV0IGNvbG9yO1xuICAgICAgICBpZiAobG9jYWxUaGlzLnNhdmVkQ29sb3JzW2QuZGF0YS5sYWJlbF0pIHtcbiAgICAgICAgICBjb2xvciA9IGxvY2FsVGhpcy5zYXZlZENvbG9yc1tkLmRhdGEubGFiZWxdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGkgPj0gbGVuZ3RoID8gY29sb3IgPSBjb2xvcnNbaSAtIGxlbmd0aF0gOiBjb2xvciA9IGNvbG9yc1tpXTtcbiAgICAgICAgICBsb2NhbFRoaXMuc2F2ZWRDb2xvcnNbZC5kYXRhLmxhYmVsXSA9IGNvbG9yO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiZFwiLCBhcmMpO1xuXG5cbiAgICAvLyBUaGlzIGlzIGJ1aWx0IGluIGZvciBzbWFsbGVyIHZpZXdwb3J0c1xuICAgIC8vIGlmIHRoZSB3aWR0aCBpcyBsZXNzIHRoYW4gODAwcHggdGhlbiB0aGUgbGVnZW5kIHdvbid0IGJlIGFkZGVkXG4gICAgLy8gdG8gdGhlIFNWRyB0aGUgdXNlciBpcyBzdGlsbCBhYmxlIHRvIGhvdmVyIG9yIGNsaWNrIG9uIHRoZSBwaWVcbiAgICAvLyBzZWNpb24gdG8gc2VlIHRoZSBsYWJlbCBhbmQgdmFsdWUgb2YgdGhlIHNlY3Rpb25cbiAgICAvLyBsZXQgbG9jYWxUaGlzID0gdGhpcztcbiAgICBpZiAod2lkdGggPiA4MDApIHtcbiAgICAgIGNvbnN0IGxlZ2VuZCA9IHN2Zy5zZWxlY3RBbGwoXCIubGVnZW5kXCIpXG4gICAgICAgIC5kYXRhKHRoaXMuZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkLmxhYmVsO1xuICAgICAgICB9KVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibGVnZW5kXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQsIGkpIHsgcmV0dXJuIFwidHJhbnNsYXRlKDMwLFwiICsgMjUgKiBpICsgXCIpXCI7IH0pO1xuXG4gICAgICBsZWdlbmQuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAuYXR0cihcInhcIiwgcmFkaXVzICsgMjApXG4gICAgICAgIC5hdHRyKFwieVwiLCAtcmFkaXVzICsgMjApXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgMjApXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDIwKVxuICAgICAgICAuYXR0cihcImZpbGxcIiwgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IGNvbG9ycy5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgY29sb3I7XG4gICAgICAgICAgaWYgKGxvY2FsVGhpcy5zYXZlZENvbG9yc1tkLmxhYmVsXSkge1xuICAgICAgICAgICAgY29sb3IgPSBsb2NhbFRoaXMuc2F2ZWRDb2xvcnNbZC5sYWJlbF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGkgPj0gbGVuZ3RoID8gY29sb3IgPSBjb2xvcnNbaSAtIGxlbmd0aF0gOiBjb2xvciA9IGNvbG9yc1tpXTtcbiAgICAgICAgICAgIGxvY2FsVGhpcy5zYXZlZENvbG9yc1tkLmxhYmVsXSA9IGNvbG9yO1xuXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjb2xvcjtcblxuICAgICAgICB9KVxuICAgICAgICAuYXR0cihcImRcIiwgYXJjKTtcblxuICAgICAgbGVnZW5kLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgLmF0dHIoXCJ4XCIsIHJhZGl1cyArIDQ1KVxuICAgICAgICAuYXR0cihcInlcIiwgLXJhZGl1cyArIDMwKVxuICAgICAgICAuYXR0cihcImR5XCIsIFwiLjM1ZW1cIilcbiAgICAgICAgLmF0dHIoXCJmb250LXNpemVcIiwgMTQpXG4gICAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwic3RhcnRcIilcbiAgICAgICAgLnRleHQoZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgIHJldHVybiBsb2NhbFRoaXMuZGF0YVtpXS5sYWJlbDtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBsZWdlbmQub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICBjb25zdCBsb2NhbCA9IGxvY2FsVGhpcztcbiAgICAgICAgICBjb25zdCBjdXJyZW50TGFiZWwgPSBkLmxhYmVsO1xuICAgICAgICAgIGQzLnNlbGVjdEFsbCgnZy5zbGljZSBwYXRoJykuZGF0YShbZF0sIGZ1bmN0aW9uKGR0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBkdC5kYXRhID8gZHQuZGF0YS5sYWJlbCA6IGR0LmxhYmVsO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBmdW5jdGlvbihkZikge1xuICAgICAgICAgICAgaWYgKGRmLmxhYmVsID09PSBjdXJyZW50TGFiZWwpIHtcbiAgICAgICAgICAgICAgbGV0IGN1cnJlbnRGaWxsID0gdGhpcy5hdHRyaWJ1dGVzLmZpbGwudmFsdWU7XG4gICAgICAgICAgICAgICBjdXJyZW50RmlsbCA9IGhleDJyZ2IoY3VycmVudEZpbGwpO1xuICAgICAgICAgICAgICBjb25zdCBkYXJrZXIgPSBjdXJyZW50RmlsbC5tYXAoaXRlbSA9PiB7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHJhZGl4XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGl0ZW0pICogLjc1O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGByZ2IoJHtkYXJrZXJbMF19LCAke2RhcmtlclsxXX0sICR7ZGFya2VyWzJdfSlgO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBsZWdlbmQub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIGNvbnN0IGxvY2FsID0gbG9jYWxUaGlzO1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRMYWJlbCA9IGQubGFiZWw7XG4gICAgICAgICAgZDMuc2VsZWN0QWxsKCdnLnNsaWNlIHBhdGgnKS5kYXRhKFtkXSwgZnVuY3Rpb24oZHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGR0LmRhdGEgPyBkdC5kYXRhLmxhYmVsIDogZHQubGFiZWw7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uKGRmKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxUaGlzLnNhdmVkQ29sb3JzW2RmLmxhYmVsXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=