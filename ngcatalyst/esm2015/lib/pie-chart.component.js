/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
export class PieChartComponent {
    constructor() {
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
    /**
     * @return {?}
     */
    ngOnInit() {
        this.drawPieChart();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.drawPieChart();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.drawPieChart();
    }
    /**
     * @return {?}
     */
    drawPieChart() {
        if (this.total === 0 && this.data) {
            this.data.forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => { this.total += el['value']; }));
        }
        d3.selectAll(`.${this.propID}_tooltip`).remove();
        /** @type {?} */
        const selection_string = "#" + this.propID;
        if (document.querySelectorAll(selection_string + " svg")[0] != null) {
            document.querySelectorAll(selection_string + " svg")[0].remove();
        }
        /** @type {?} */
        let element;
        /** @type {?} */
        const selected = document.querySelectorAll(selection_string);
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
        const localThis = this;
        /** @type {?} */
        const margin = { top: 10, right: 0, bottom: 20, left: 0 };
        /** @type {?} */
        const width = element.clientWidth - margin.left - margin.right;
        /** @type {?} */
        const height = element.clientHeight - margin.top - margin.bottom;
        /** @type {?} */
        const radius = height > width ? width / 2 : height / 2;
        /** @type {?} */
        const svg = d3.select(selection_string)
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
        const tooltip = d3
            .select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);
        // create function that will be used to draw slices
        /** @type {?} */
        const pie = d3.pie()
            .value((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.value; }));
        // Declare an arc generator function
        /** @type {?} */
        const donut = this.donutWidth;
        /** @type {?} */
        const arc = d3.arc()
            .innerRadius(donut)
            .outerRadius(radius);
        // Select paths, use arc generator to draw
        /** @type {?} */
        const arcs = svg.selectAll("g.slice")
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
                let currentFill = this.attributes.fill.value;
                currentFill = hex2rgb(currentFill);
                // if (currentFill.includes('#')){
                // } else {
                //   currentFill = currentFill.slice(0, currentFill.length -2).slice(4).split(', ')
                // }
                /** @type {?} */
                const darker = currentFill.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => {
                    // tslint:disable-next-line: radix
                    return parseInt(item) * .75;
                }));
                return `rgb(${darker[0]}, ${darker[1]}, ${darker[2]})`;
            }));
            /** @type {?} */
            const percent = Math.round(d.data.value / localThis.total * 100);
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
                const label = dt.data ? dt.data.label : dt.label;
                return localThis.savedColors[label];
            }));
        }));
        /** @type {?} */
        const colors = this.colors;
        // add colors to each slice
        arcs.append("path")
            .attr("fill", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            /** @type {?} */
            const length = colors.length;
            /** @type {?} */
            let color;
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
            const legend = svg.selectAll(".legend")
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
                const length = colors.length;
                /** @type {?} */
                let color;
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
                const local = localThis;
                /** @type {?} */
                const currentLabel = d.label;
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
                        let currentFill = this.attributes.fill.value;
                        currentFill = hex2rgb(currentFill);
                        /** @type {?} */
                        const darker = currentFill.map((/**
                         * @param {?} item
                         * @return {?}
                         */
                        item => {
                            // tslint:disable-next-line: radix
                            return parseInt(item) * .75;
                        }));
                        return `rgb(${darker[0]}, ${darker[1]}, ${darker[2]})`;
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
                const local = localThis;
                /** @type {?} */
                const currentLabel = d.label;
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
    }
}
PieChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'eikos-pie-chart',
                template: `
  <h2>{{title}}</h2>
  <div style="height: 750px; width: 750px;" >
      <div [id]="propID" style="width:100%;height:100%"> </div>
  </div>
`
            }] }
];
/** @nocollapse */
PieChartComponent.ctorParameters = () => [];
PieChartComponent.propDecorators = {
    propID: [{ type: Input }],
    data: [{ type: Input }],
    title: [{ type: Input }],
    donutWidth: [{ type: Input }],
    colors: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nY2F0YWx5c3QvIiwic291cmNlcyI6WyJsaWIvcGllLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTJDLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBV3pCLE1BQU0sT0FBTyxpQkFBaUI7SUFXNUI7UUFUUyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBR2YsZUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVk7O1FBQzVCLFdBQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztRQUVqSSxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixVQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRU0sQ0FBQzs7Ozs7Ozs7OztJQVNqQixRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7WUFBQyxFQUFFLENBQUMsRUFBRSxHQUFFLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7U0FDeEQ7UUFF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O2dCQUMzQixRQUFRLEVBQUU7Ozs7O0NBS1g7YUFDQTs7Ozs7cUJBR0UsS0FBSzttQkFDTCxLQUFLO29CQUNMLEtBQUs7eUJBQ0wsS0FBSztxQkFDTCxLQUFLOzs7O0lBSk4sbUNBQXdCOztJQUN4QixpQ0FBZ0Q7O0lBQ2hELGtDQUE0Qjs7SUFDNUIsdUNBQXdCOztJQUN4QixtQ0FBaUk7O0lBRWpJLHdDQUFpQjs7SUFDakIsa0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlaWtvcy1waWUtY2hhcnQnLFxuICB0ZW1wbGF0ZTogYFxuICA8aDI+e3t0aXRsZX19PC9oMj5cbiAgPGRpdiBzdHlsZT1cImhlaWdodDogNzUwcHg7IHdpZHRoOiA3NTBweDtcIiA+XG4gICAgICA8ZGl2IFtpZF09XCJwcm9wSURcIiBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OjEwMCVcIj4gPC9kaXY+XG4gIDwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBQaWVDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKSBwcm9wSUQgPSAncGllJztcbiAgQElucHV0KCkgZGF0YTogW3tsYWJlbDogc3RyaW5nLCB2YWx1ZTogbnVtYmVyfV07XG4gIEBJbnB1dCgpIHRpdGxlOiAnUGllIENoYXJ0JztcbiAgQElucHV0KCkgZG9udXRXaWR0aCA9IDA7IC8vIGluIHBpeGVsc1xuICBASW5wdXQoKSBjb2xvcnMgPSBbXCIjMDgxQTRFXCIsIFwiIzA5MjM2OVwiLCBcIiMxQTY0OUZcIiwgXCIjMjQ4NUI0XCIsIFwiIzJEQThDOVwiLCBcIiM1REMxRDBcIiwgXCIjOUFENUNEXCIsIFwiI0Q1RTlDQlwiLCBcIiM2NEI1RjZcIiwgXCIjMDE1NzlCXCJdO1xuICAgIC8vIG5lZWQgMTAgaGV4IGNvbG9ycztcbiAgc2F2ZWRDb2xvcnMgPSB7fTtcbiAgdG90YWwgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLy8geW91IG1pZ2h0IG5lZWQgYSBtZXRob2QgbGlrZSB0aGlzIHRvIHJlZm9ybWF0IGdpdmVuIGRhdGEgd2l0aCB0aGUgYXBwcm9wcmlhdGUgZmllbGQgbmFtZXMsXG4gIC8vIGdldCBkYXRhTW9kZWwoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAoaXRlbSA9PiB7XG4gIC8vICAgICByZXR1cm4ge2xhYmVsOiBpdGVtLnNvbWV0aGluZywgdmFsdWU6IGl0ZW0uc29tZXRoaW5nRWxzZX07XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRyYXdQaWVDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuZHJhd1BpZUNoYXJ0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kcmF3UGllQ2hhcnQoKTtcbiAgfVxuXG4gIGRyYXdQaWVDaGFydCgpIHtcbiAgICBpZiAodGhpcy50b3RhbCA9PT0gMCAmJiB0aGlzLmRhdGEpIHtcbiAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKGVsID0+IHt0aGlzLnRvdGFsICs9IGVsWyd2YWx1ZSddOyB9KTtcbiAgICB9XG5cbiAgICBkMy5zZWxlY3RBbGwoYC4ke3RoaXMucHJvcElEfV90b29sdGlwYCkucmVtb3ZlKCk7XG4gICAgY29uc3Qgc2VsZWN0aW9uX3N0cmluZyA9IFwiI1wiICsgdGhpcy5wcm9wSUQ7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyArIFwiIHN2Z1wiKVswXSAhPSBudWxsKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdGlvbl9zdHJpbmcgKyBcIiBzdmdcIilbMF0ucmVtb3ZlKCk7XG4gICAgfVxuICAgIGxldCBlbGVtZW50OiBhbnk7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdGlvbl9zdHJpbmcpO1xuXG4gICAgaWYgKHNlbGVjdGVkWzBdID09IG51bGwpIHtcbiAgICAgIGVsZW1lbnQgPSB7Y2xpZW50V2lkdGg6IDUwMCwgY2xpZW50SGVpZ2h0OiA1MDB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50ID0gc2VsZWN0ZWRbMF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGV4MnJnYihoZXgpIHtcbiAgICAgIHJldHVybiBbPGFueT4nMHgnICsgaGV4WzFdICsgaGV4WzJdIHwgMCwgPGFueT4nMHgnICsgaGV4WzNdICsgaGV4WzRdIHwgMCwgPGFueT4nMHgnICsgaGV4WzVdICsgaGV4WzZdIHwgMF07XG4gICAgfVxuXG4gICAgY29uc3QgbG9jYWxUaGlzID0gdGhpcztcblxuICAgIGNvbnN0IG1hcmdpbiA9IHt0b3A6IDEwLCByaWdodDogMCwgYm90dG9tOiAyMCwgbGVmdDogMH0sXG4gICAgICB3aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCxcbiAgICAgIGhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICByYWRpdXMgPSBoZWlnaHQgPiB3aWR0aCA/ICB3aWR0aCAvIDIgOiBoZWlnaHQgLyAyO1xuXG4gICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KHNlbGVjdGlvbl9zdHJpbmcpXG4gICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAuZGF0YShbdGhpcy5kYXRhXSwgZnVuY3Rpb24oZCkge1xuICAgICAgICBpZiAoZCkge1xuICAgICAgICAgIHJldHVybiBkLmxhYmVsO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAvLyBzZXRzIHRoZSBjZW50ZXIgb2YgdGhlIHBpZWNoYXJ0IHRvIGNlbnRlciBvZiBjb250YWluZXJcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgd2lkdGggLyAyICsgXCIsXCIgKyBoZWlnaHQgLyAyICsgXCIpXCIpO1xuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnNGVtJylcbiAgICAgIC5hdHRyKCd5JywgMjApXG4gICAgICAuYXR0cigneCcsIC01MClcbiAgICAgIC50ZXh0KGxvY2FsVGhpcy50b3RhbCk7XG5cbiAgICAvLyBhZGQgdG9vbHRpcCBkaXYgdG8gdGhlIERPTVxuICAgIGNvbnN0IHRvb2x0aXAgPSBkM1xuICAgICAgLnNlbGVjdChcImJvZHlcIilcbiAgICAgIC5hcHBlbmQoXCJkaXZcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYGQzX3Zpc3VhbHNfdG9vbHRpcCAke3RoaXMucHJvcElEfV90b29sdGlwYClcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG5cbiAgICAvLyBjcmVhdGUgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIHVzZWQgdG8gZHJhdyBzbGljZXNcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgLnZhbHVlKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudmFsdWU7IH0pO1xuXG4gICAgLy8gRGVjbGFyZSBhbiBhcmMgZ2VuZXJhdG9yIGZ1bmN0aW9uXG4gICAgY29uc3QgZG9udXQgPSB0aGlzLmRvbnV0V2lkdGg7XG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgIC5pbm5lclJhZGl1cyhkb251dClcbiAgICAgIC5vdXRlclJhZGl1cyhyYWRpdXMpO1xuXG4gICAgLy8gU2VsZWN0IHBhdGhzLCB1c2UgYXJjIGdlbmVyYXRvciB0byBkcmF3XG4gICAgY29uc3QgYXJjcyA9IHN2Zy5zZWxlY3RBbGwoXCJnLnNsaWNlXCIpXG4gICAgICAuZGF0YShwaWUpXG4gICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic2xpY2VcIik7XG5cbiAgICAvLyBhZGQgdG9vbHRpcCBvbiBtb3VzZW92ZXIgb2Ygc2xpY2VcbiAgICBhcmNzLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgcGVyY2VudCBvZiB0b3RhbCBmb3IgdGhlIHNsaWNlXG4gICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCdwYXRoJykuXG4gICAgICAgIGF0dHIoJ2ZpbGwnLCBmdW5jdGlvbihkdCkge1xuXG4gICAgICAgICAgICBsZXQgY3VycmVudEZpbGwgPSB0aGlzLmF0dHJpYnV0ZXMuZmlsbC52YWx1ZTtcbiAgICAgICAgIGN1cnJlbnRGaWxsID0gaGV4MnJnYihjdXJyZW50RmlsbCk7XG4gICAgICAgIC8vIGlmIChjdXJyZW50RmlsbC5pbmNsdWRlcygnIycpKXtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICBjdXJyZW50RmlsbCA9IGN1cnJlbnRGaWxsLnNsaWNlKDAsIGN1cnJlbnRGaWxsLmxlbmd0aCAtMikuc2xpY2UoNCkuc3BsaXQoJywgJylcbiAgICAgICAgLy8gfVxuICAgICAgICBjb25zdCBkYXJrZXIgPSBjdXJyZW50RmlsbC5tYXAoaXRlbSA9PiB7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHJhZGl4XG4gICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGl0ZW0pICogLjc1O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGByZ2IoJHtkYXJrZXJbMF19LCAke2RhcmtlclsxXX0sICR7ZGFya2VyWzJdfSlgO1xuXG4gICAgICAgIH0pO1xuICAgICAgY29uc3QgcGVyY2VudCA9IE1hdGgucm91bmQoZC5kYXRhLnZhbHVlIC8gbG9jYWxUaGlzLnRvdGFsICogMTAwKTtcbiAgICAgIHRvb2x0aXAudHJhbnNpdGlvbigpXG4gICAgICAgIC5kdXJhdGlvbigxMDApXG4gICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSk7XG4gICAgICB0b29sdGlwXG4gICAgICAgIC5odG1sKFxuICAgICAgICAgIGQuZGF0YS5sYWJlbCArICc6ICcgKyAnPGI+JyArIGQuZGF0YS52YWx1ZSArICc8L2I+JyArICc8YnIvPicgKyAnPGI+JyArIHBlcmNlbnQgKyAnPC9iPicgKyAnJSBvZiB0b3RhbCdcbiAgICAgICAgKVxuICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIGQzLmV2ZW50LnBhZ2VYICsgXCJweFwiKVxuICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgZDMuZXZlbnQucGFnZVkgKyBcInB4XCIpO1xuXG4gICAgfSlcbiAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdG9vbHRpcC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oMzAwKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG5cbiAgICAgIGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ3BhdGgnKS5cbiAgICAgICAgYXR0cignZmlsbCcsIGZ1bmN0aW9uKGR0KSB7XG4gICAgICAgICAgY29uc3QgbGFiZWwgPSBkdC5kYXRhID8gZHQuZGF0YS5sYWJlbCA6IGR0LmxhYmVsO1xuICAgICAgICAgIHJldHVybiBsb2NhbFRoaXMuc2F2ZWRDb2xvcnNbbGFiZWxdO1xuXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBjb2xvcnMgPSB0aGlzLmNvbG9ycztcblxuICAgIC8vIGFkZCBjb2xvcnMgdG8gZWFjaCBzbGljZVxuICAgIGFyY3MuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgLmF0dHIoXCJmaWxsXCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGNvbG9ycy5sZW5ndGg7XG4gICAgICAgIGxldCBjb2xvcjtcbiAgICAgICAgaWYgKGxvY2FsVGhpcy5zYXZlZENvbG9yc1tkLmRhdGEubGFiZWxdKSB7XG4gICAgICAgICAgY29sb3IgPSBsb2NhbFRoaXMuc2F2ZWRDb2xvcnNbZC5kYXRhLmxhYmVsXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpID49IGxlbmd0aCA/IGNvbG9yID0gY29sb3JzW2kgLSBsZW5ndGhdIDogY29sb3IgPSBjb2xvcnNbaV07XG4gICAgICAgICAgbG9jYWxUaGlzLnNhdmVkQ29sb3JzW2QuZGF0YS5sYWJlbF0gPSBjb2xvcjtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xvcjtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImRcIiwgYXJjKTtcblxuXG4gICAgLy8gVGhpcyBpcyBidWlsdCBpbiBmb3Igc21hbGxlciB2aWV3cG9ydHNcbiAgICAvLyBpZiB0aGUgd2lkdGggaXMgbGVzcyB0aGFuIDgwMHB4IHRoZW4gdGhlIGxlZ2VuZCB3b24ndCBiZSBhZGRlZFxuICAgIC8vIHRvIHRoZSBTVkcgdGhlIHVzZXIgaXMgc3RpbGwgYWJsZSB0byBob3ZlciBvciBjbGljayBvbiB0aGUgcGllXG4gICAgLy8gc2VjaW9uIHRvIHNlZSB0aGUgbGFiZWwgYW5kIHZhbHVlIG9mIHRoZSBzZWN0aW9uXG4gICAgLy8gbGV0IGxvY2FsVGhpcyA9IHRoaXM7XG4gICAgaWYgKHdpZHRoID4gODAwKSB7XG4gICAgICBjb25zdCBsZWdlbmQgPSBzdmcuc2VsZWN0QWxsKFwiLmxlZ2VuZFwiKVxuICAgICAgICAuZGF0YSh0aGlzLmRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gZC5sYWJlbDtcbiAgICAgICAgfSlcbiAgICAgICAgLmVudGVyKClcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImxlZ2VuZFwiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkLCBpKSB7IHJldHVybiBcInRyYW5zbGF0ZSgzMCxcIiArIDI1ICogaSArIFwiKVwiOyB9KTtcblxuICAgICAgbGVnZW5kLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgLmF0dHIoXCJ4XCIsIHJhZGl1cyArIDIwKVxuICAgICAgICAuYXR0cihcInlcIiwgLXJhZGl1cyArIDIwKVxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIDIwKVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCAyMClcbiAgICAgICAgLmF0dHIoXCJmaWxsXCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBjb2xvcnMubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGNvbG9yO1xuICAgICAgICAgIGlmIChsb2NhbFRoaXMuc2F2ZWRDb2xvcnNbZC5sYWJlbF0pIHtcbiAgICAgICAgICAgIGNvbG9yID0gbG9jYWxUaGlzLnNhdmVkQ29sb3JzW2QubGFiZWxdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpID49IGxlbmd0aCA/IGNvbG9yID0gY29sb3JzW2kgLSBsZW5ndGhdIDogY29sb3IgPSBjb2xvcnNbaV07XG4gICAgICAgICAgICBsb2NhbFRoaXMuc2F2ZWRDb2xvcnNbZC5sYWJlbF0gPSBjb2xvcjtcblxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY29sb3I7XG5cbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoXCJkXCIsIGFyYyk7XG5cbiAgICAgIGxlZ2VuZC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgIC5hdHRyKFwieFwiLCByYWRpdXMgKyA0NSlcbiAgICAgICAgLmF0dHIoXCJ5XCIsIC1yYWRpdXMgKyAzMClcbiAgICAgICAgLmF0dHIoXCJkeVwiLCBcIi4zNWVtXCIpXG4gICAgICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIDE0KVxuICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcInN0YXJ0XCIpXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICByZXR1cm4gbG9jYWxUaGlzLmRhdGFbaV0ubGFiZWw7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgbGVnZW5kLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgY29uc3QgbG9jYWwgPSBsb2NhbFRoaXM7XG4gICAgICAgICAgY29uc3QgY3VycmVudExhYmVsID0gZC5sYWJlbDtcbiAgICAgICAgICBkMy5zZWxlY3RBbGwoJ2cuc2xpY2UgcGF0aCcpLmRhdGEoW2RdLCBmdW5jdGlvbihkdCkge1xuICAgICAgICAgICAgICByZXR1cm4gZHQuZGF0YSA/IGR0LmRhdGEubGFiZWwgOiBkdC5sYWJlbDtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hdHRyKCdmaWxsJywgZnVuY3Rpb24oZGYpIHtcbiAgICAgICAgICAgIGlmIChkZi5sYWJlbCA9PT0gY3VycmVudExhYmVsKSB7XG4gICAgICAgICAgICAgIGxldCBjdXJyZW50RmlsbCA9IHRoaXMuYXR0cmlidXRlcy5maWxsLnZhbHVlO1xuICAgICAgICAgICAgICAgY3VycmVudEZpbGwgPSBoZXgycmdiKGN1cnJlbnRGaWxsKTtcbiAgICAgICAgICAgICAgY29uc3QgZGFya2VyID0gY3VycmVudEZpbGwubWFwKGl0ZW0gPT4ge1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiByYWRpeFxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChpdGVtKSAqIC43NTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiBgcmdiKCR7ZGFya2VyWzBdfSwgJHtkYXJrZXJbMV19LCAke2RhcmtlclsyXX0pYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgbGVnZW5kLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICBjb25zdCBsb2NhbCA9IGxvY2FsVGhpcztcbiAgICAgICAgICBjb25zdCBjdXJyZW50TGFiZWwgPSBkLmxhYmVsO1xuICAgICAgICAgIGQzLnNlbGVjdEFsbCgnZy5zbGljZSBwYXRoJykuZGF0YShbZF0sIGZ1bmN0aW9uKGR0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBkdC5kYXRhID8gZHQuZGF0YS5sYWJlbCA6IGR0LmxhYmVsO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBmdW5jdGlvbihkZikge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsVGhpcy5zYXZlZENvbG9yc1tkZi5sYWJlbF07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19