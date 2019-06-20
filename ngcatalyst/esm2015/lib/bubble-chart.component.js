/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
import luxon from 'luxon';
export class BubbleChartComponent {
    constructor() {
        this.propID = 'bubble';
        this.title = 'Bubble Chart';
        this.isTime = false;
        this.isDate = false;
        this.themeColors = ["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"];
        // need 8 hex colors;
        this.yAxisLabel = 'Value';
        this.xAxisLabel = 'Date';
        this.dateFormat = '%Y-%m-%d';
        this.margin = { top: 20, right: 10, bottom: 30, left: 20 };
    }
    /**
     * @return {?}
     */
    get processedData() {
        /** @type {?} */
        const data = this.data;
        try {
            data.sort((/**
             * @param {?} x
             * @param {?} y
             * @return {?}
             */
            function (x, y) {
                return d3.descending(x.value, y.value);
            }));
        }
        catch (err) {
            console.error(err);
        }
        return data;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.drawBubbleChart(this.processedData);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.drawBubbleChart(this.processedData);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.drawBubbleChart(this.processedData);
    }
    /**
     * @param {?} d
     * @return {?}
     */
    xValue(d) {
        return d.x;
    }
    /**
     * @param {?} d
     * @return {?}
     */
    yValue(d) {
        return d.y;
    }
    /**
     * @param {?} d
     * @return {?}
     */
    zValue(d) {
        return d.value;
    }
    /**
     * @param {?} d
     * @return {?}
     */
    pretty_duration(d) {
        return luxon.duration.fromObject({ "seconds": d }).normalize().toObject(); // this.moment??
    }
    /**
     * @param {?} max_value_size
     * @param {?} cutoff
     * @param {?} min_pixels
     * @return {?}
     */
    get_min_bubble_size(max_value_size, cutoff, min_pixels) {
        return (max_value_size >= cutoff) ? min_pixels : max_value_size;
    }
    /**
     * @param {?} max_value_size
     * @param {?} min_bubble_size
     * @param {?} cutoff
     * @param {?} max_pixels
     * @return {?}
     */
    get_max_bubble_size(max_value_size, min_bubble_size, cutoff, max_pixels) {
        return (max_value_size >= cutoff) ? max_pixels : min_bubble_size * max_value_size + 25;
    }
    /**
     * @param {?} max_value_size
     * @return {?}
     */
    get_bubble_sizes(max_value_size) {
        /** @type {?} */
        const cutoff = 10;
        /** @type {?} */
        const min_pixels = 5;
        /** @type {?} */
        const max_pixels = 125;
        /** @type {?} */
        const min_bubble_size = (max_value_size < min_pixels) ? min_pixels : this.get_min_bubble_size(max_value_size, cutoff, min_pixels);
        return {
            'min': min_bubble_size,
            'max': this.get_max_bubble_size(max_value_size, min_bubble_size, cutoff, max_pixels)
        };
    }
    /**
     * @param {?} max_value_mins
     * @param {?=} min_zoom_mins
     * @return {?}
     */
    get_duration_zoom_range(max_value_mins, min_zoom_mins = 1) {
        return [1, max_value_mins / min_zoom_mins];
    }
    /**
     * @param {?} asrs
     * @param {?} xval
     * @param {?=} min_zoom_mins
     * @return {?}
     */
    get_x_zoom_range(asrs, xval, min_zoom_mins = 1) {
        return this.get_duration_zoom_range(d3.max(asrs, xval), min_zoom_mins);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    drawBubbleChart(data) {
        if (!data) {
            return;
        }
        /** @type {?} */
        const localThis = this;
        /** @type {?} */
        const selection_string = "#" + this.propID;
        /** @type {?} */
        const pretty_duration = this.pretty_duration;
        /** @type {?} */
        const xValue = this.xValue;
        /** @type {?} */
        const yValue = this.yValue;
        /** @type {?} */
        const zValue = this.zValue;
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
        const margin = this.margin;
        /** @type {?} */
        const elementWidth = element.clientWidth;
        /** @type {?} */
        const elementHeight = element.clientHeight;
        /** @type {?} */
        const ternaryWidth = elementWidth > 0 ? elementWidth : 400;
        /** @type {?} */
        const width = ternaryWidth - margin.left - margin.right;
        /** @type {?} */
        const ternaryHeight = elementHeight > 0 ? elementHeight : 400;
        /** @type {?} */
        let height = ternaryHeight - margin.top - margin.bottom;
        // retrieving globals
        /** @type {?} */
        const colors = this.themeColors;
        // Account for panel heading height if title exists.
        if (this.title) {
            height -= 40;
        }
        /** @type {?} */
        let svg;
        /** @type {?} */
        const containerId = "#" + this.propID;
        /** @type {?} */
        const containerIdSvg = containerId + " svg";
        /** @type {?} */
        const containerIdG = containerIdSvg + " g";
        d3.selectAll(`.${this.propID}_tooltip`).remove();
        if (document.querySelectorAll(selection_string + " svg")[0] != null) {
            document.querySelectorAll(selection_string + " svg")[0].remove();
        }
        /** @type {?} */
        const formatDate = d3.timeParse(this.dateFormat);
        /** @type {?} */
        let xScale;
        if (this.isDate) {
            xScale = d3.scaleTime().range([0, width]);
            data = data.map((/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                if (d.mapped) {
                    return d;
                }
                d.x = formatDate(d.x);
                d.mapped = true;
                return d;
            }));
        }
        else {
            xScale = d3.scaleLinear().range([0, width]);
        }
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
        if (this.isDate) {
            xAxis.tickFormat(d3.timeFormat(this.dateFormat));
        }
        else {
            xAxis.tickFormat((/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                return localThis.isTime ? pretty_duration(60 * d) : d;
            }));
        }
        /** @type {?} */
        const yScale = d3.scaleLinear()
            .range([height, 0]);
        /** @type {?} */
        const yMap = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return yScale(yValue(d));
        });
        /** @type {?} */
        const yAxis = d3.axisLeft()
            .scale(yScale)
            .tickSizeInner(-width)
            .ticks(4);
        /** @type {?} */
        const max_value_size = Math.sqrt(d3.max(data, (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return +d.value;
        })));
        /** @type {?} */
        const bubble_sizes = this.get_bubble_sizes(max_value_size);
        /** @type {?} */
        const min_bubble_size = bubble_sizes['min'];
        /** @type {?} */
        const max_bubble_size = bubble_sizes['max'];
        /** @type {?} */
        const zScale = d3.scaleLinear().domain([1, max_value_size]).range([
            min_bubble_size,
            max_bubble_size
        ]);
        /** @type {?} */
        const zMap = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return zScale(Math.sqrt(zValue(d))); });
        /** @type {?} */
        const cValue = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.value;
        });
        /** @type {?} */
        const valMin = d3.min(data, zValue);
        /** @type {?} */
        const valMax = d3.max(data, zValue);
        /** @type {?} */
        const color = d3.scaleQuantize().range(colors).domain([valMin, valMax]);
        /** @type {?} */
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);
        // Get min and max values for x and y axis
        /** @type {?} */
        let xMin = d3.min(data, xValue);
        /** @type {?} */
        let xMax = d3.max(data, xValue);
        /** @type {?} */
        const yMin = d3.min(data, yValue);
        /** @type {?} */
        const yMax = d3.max(data, yValue);
        // Determine padding for x-axis if it's dates.
        if (this.isDate) {
            /** @type {?} */
            const min = xScale(xMin);
            /** @type {?} */
            const max = xScale(xMax);
            xMin = xScale.invert(min - (min * .001));
            xMax = xScale.invert((max * .001) + max);
        }
        else {
            xMin = xMin - (xMin / 2);
            xMax = xMax + (xMax / 4);
        }
        // Subtract half the min value from min and add one fourth
        // of the max to the max so that the bubbles never go outside of the graph
        xScale.domain([xMin, xMax]);
        yScale.domain([yMin - yMin / 2, yMax + yMax / 4]);
        svg = d3.select(containerId)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
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
            .style("fill", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            const saveThisColor = color(cValue(d));
            return saveThisColor;
        }))
            .style("opacity", 0.75)
            .on("mouseover", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            console.log(tooltip);
            tooltip.transition()
                .duration(100)
                .style("opacity", 1);
            // tslint:disable-next-line:max-line-length
            tooltip.html('<b class="tooltip-header">' + d.label + '</b>' + "<br/><b>" + localThis.xAxisLabel + "</b> " + (localThis.isTime ? localThis.pretty_duration(60 * localThis.xValue(d)) : localThis.xValue(d)) + "<br/><b>" + localThis.yAxisLabel + ": </b>" + localThis.yValue(d)
                .toFixed(2) + "<br> <b>value:</b> " + localThis.zValue(d))
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            d3.select(tooltip[0])
                .transition()
                .duration(50)
                .style("opacity", 1);
        }))
            .on("mouseout", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            const tooltip = d3.select(`.${localThis.propID}_tooltip`);
            tooltip.transition().duration(300).style("opacity", 0);
            d3.select(tooltip[0])
                .transition()
                .duration(200)
                .style("opacity", 0);
        }));
    }
}
BubbleChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'eikos-bubble-chart',
                template: `
<h2>{{title}}</h2>
<div style="height: 750px; width: 750px;" >
    <div [id]="propID" style="width:100%;height:100%"> </div>
</div>
  `
            }] }
];
/** @nocollapse */
BubbleChartComponent.ctorParameters = () => [];
BubbleChartComponent.propDecorators = {
    propID: [{ type: Input }],
    data: [{ type: Input }],
    title: [{ type: Input }],
    isTime: [{ type: Input }],
    isDate: [{ type: Input }],
    themeColors: [{ type: Input }],
    yAxisLabel: [{ type: Input }],
    xAxisLabel: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    BubbleChartComponent.prototype.propID;
    /** @type {?} */
    BubbleChartComponent.prototype.data;
    /** @type {?} */
    BubbleChartComponent.prototype.title;
    /** @type {?} */
    BubbleChartComponent.prototype.isTime;
    /** @type {?} */
    BubbleChartComponent.prototype.isDate;
    /** @type {?} */
    BubbleChartComponent.prototype.themeColors;
    /** @type {?} */
    BubbleChartComponent.prototype.yAxisLabel;
    /** @type {?} */
    BubbleChartComponent.prototype.xAxisLabel;
    /** @type {?} */
    BubbleChartComponent.prototype.dateFormat;
    /** @type {?} */
    BubbleChartComponent.prototype.margin;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nY2F0YWx5c3QvIiwic291cmNlcyI6WyJsaWIvYnViYmxlLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTJDLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQVcxQixNQUFNLE9BQU8sb0JBQW9CO0lBYy9CO1FBWlMsV0FBTSxHQUFHLFFBQVEsQ0FBQztRQUVsQixVQUFLLEdBQUcsY0FBYyxDQUFDO1FBQ3ZCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsZ0JBQVcsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQzs7UUFFdkcsZUFBVSxHQUFHLE9BQU8sQ0FBQztRQUNyQixlQUFVLEdBQUcsTUFBTSxDQUFDO1FBQzdCLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFDeEIsV0FBTSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBRXRDLENBQUM7Ozs7SUFFakIsSUFBSSxhQUFhOztjQUNULElBQUksR0FBRyxJQUFJLENBQUMsSUFBSTtRQUN0QixJQUFJO1lBQ0osSUFBSSxDQUFDLElBQUk7Ozs7O1lBQUMsVUFBUyxDQUFDLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLENBQUMs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QUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsQixVQUFVLEVBQUU7aUJBQ1osUUFBUSxDQUFDLEdBQUcsQ0FBQztpQkFDYixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsRUFBQyxDQUFBO0lBQ04sQ0FBQzs7O1lBalRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7O0dBS1Q7YUFDRjs7Ozs7cUJBR0UsS0FBSzttQkFDTCxLQUFLO29CQUNMLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBRUwsS0FBSzt5QkFDTCxLQUFLOzs7O0lBUk4sc0NBQTJCOztJQUMzQixvQ0FBZ0Q7O0lBQ2hELHFDQUFnQzs7SUFDaEMsc0NBQXdCOztJQUN4QixzQ0FBd0I7O0lBQ3hCLDJDQUFnSDs7SUFFaEgsMENBQThCOztJQUM5QiwwQ0FBNkI7O0lBQzdCLDBDQUF3Qjs7SUFDeEIsc0NBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCBsdXhvbiBmcm9tICdsdXhvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Vpa29zLWJ1YmJsZS1jaGFydCcsXG4gIHRlbXBsYXRlOiBgXG48aDI+e3t0aXRsZX19PC9oMj5cbjxkaXYgc3R5bGU9XCJoZWlnaHQ6IDc1MHB4OyB3aWR0aDogNzUwcHg7XCIgPlxuICAgIDxkaXYgW2lkXT1cInByb3BJRFwiIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwJVwiPiA8L2Rpdj5cbjwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEJ1YmJsZUNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHByb3BJRCA9ICdidWJibGUnO1xuICBASW5wdXQoKSBkYXRhOiBbe2xhYmVsOiBzdHJpbmcsIHZhbHVlOiBudW1iZXJ9XTtcbiAgQElucHV0KCkgdGl0bGUgPSAnQnViYmxlIENoYXJ0JztcbiAgQElucHV0KCkgaXNUaW1lID0gZmFsc2U7XG4gIEBJbnB1dCgpIGlzRGF0ZSA9IGZhbHNlO1xuICBASW5wdXQoKSB0aGVtZUNvbG9ycyA9IFtcIiMwODFBNEVcIiwgXCIjMDkyMzY5XCIsIFwiIzFBNjQ5RlwiLCBcIiMyNDg1QjRcIiwgXCIjMkRBOEM5XCIsIFwiIzVEQzFEMFwiLCBcIiM5QUQ1Q0RcIiwgXCIjRDVFOUNCXCJdO1xuICAvLyBuZWVkIDggaGV4IGNvbG9ycztcbiAgQElucHV0KCkgeUF4aXNMYWJlbCA9ICdWYWx1ZSc7XG4gIEBJbnB1dCgpIHhBeGlzTGFiZWwgPSAnRGF0ZSc7XG4gIGRhdGVGb3JtYXQgPSAnJVktJW0tJWQnO1xuICBtYXJnaW4gPSB7IHRvcDogMjAsIHJpZ2h0OiAxMCwgYm90dG9tOiAzMCwgbGVmdDogMjAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGdldCBwcm9jZXNzZWREYXRhKCkge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgdHJ5IHtcbiAgICBkYXRhLnNvcnQoZnVuY3Rpb24oeCwgeSkge1xuICAgICAgcmV0dXJuIGQzLmRlc2NlbmRpbmcoeC52YWx1ZSwgeS52YWx1ZSk7XG4gICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kcmF3QnViYmxlQ2hhcnQodGhpcy5wcm9jZXNzZWREYXRhKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmRyYXdCdWJibGVDaGFydCh0aGlzLnByb2Nlc3NlZERhdGEpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZHJhd0J1YmJsZUNoYXJ0KHRoaXMucHJvY2Vzc2VkRGF0YSk7XG4gIH1cblxuICB4VmFsdWUoZCkge1xuICAgIHJldHVybiBkLng7XG4gIH1cbiAgeVZhbHVlKGQpIHtcbiAgICByZXR1cm4gZC55O1xuICB9XG4gIHpWYWx1ZShkKSB7XG4gICAgcmV0dXJuIGQudmFsdWU7XG4gIH1cblxuICBwcmV0dHlfZHVyYXRpb24oZCkge1xuICAgIHJldHVybiBsdXhvbi5kdXJhdGlvbi5mcm9tT2JqZWN0KHtcInNlY29uZHNcIjogZH0pLm5vcm1hbGl6ZSgpLnRvT2JqZWN0KCk7IC8vIHRoaXMubW9tZW50Pz9cbiAgfVxuXG4gIGdldF9taW5fYnViYmxlX3NpemUobWF4X3ZhbHVlX3NpemUsIGN1dG9mZiwgbWluX3BpeGVscykge1xuICAgIHJldHVybiAobWF4X3ZhbHVlX3NpemUgPj0gY3V0b2ZmKSA/IG1pbl9waXhlbHMgOiBtYXhfdmFsdWVfc2l6ZTtcbiAgfVxuXG4gIGdldF9tYXhfYnViYmxlX3NpemUobWF4X3ZhbHVlX3NpemUsIG1pbl9idWJibGVfc2l6ZSwgY3V0b2ZmLCBtYXhfcGl4ZWxzKSB7XG4gICAgcmV0dXJuIChtYXhfdmFsdWVfc2l6ZSA+PSBjdXRvZmYpID8gbWF4X3BpeGVscyA6IG1pbl9idWJibGVfc2l6ZSAqIG1heF92YWx1ZV9zaXplICsgMjU7XG4gIH1cblxuICBnZXRfYnViYmxlX3NpemVzKG1heF92YWx1ZV9zaXplKSB7XG4gICAgY29uc3QgY3V0b2ZmID0gMTAsXG4gICAgICBtaW5fcGl4ZWxzID0gNSxcbiAgICAgIG1heF9waXhlbHMgPSAxMjU7XG4gICAgY29uc3QgbWluX2J1YmJsZV9zaXplID0gKG1heF92YWx1ZV9zaXplIDwgbWluX3BpeGVscykgPyBtaW5fcGl4ZWxzIDogdGhpcy5nZXRfbWluX2J1YmJsZV9zaXplKG1heF92YWx1ZV9zaXplLCBjdXRvZmYsIG1pbl9waXhlbHMpO1xuICAgIHJldHVybiB7XG4gICAgICAnbWluJzogbWluX2J1YmJsZV9zaXplLFxuICAgICAgJ21heCc6IHRoaXMuZ2V0X21heF9idWJibGVfc2l6ZShtYXhfdmFsdWVfc2l6ZSwgbWluX2J1YmJsZV9zaXplLCBjdXRvZmYsIG1heF9waXhlbHMpXG4gICAgfTtcbiAgfVxuXG4gIGdldF9kdXJhdGlvbl96b29tX3JhbmdlKG1heF92YWx1ZV9taW5zLCBtaW5fem9vbV9taW5zID0gMSkge1xuICAgIHJldHVybiBbMSwgbWF4X3ZhbHVlX21pbnMgLyBtaW5fem9vbV9taW5zXVxuICB9XG5cbiAgZ2V0X3hfem9vbV9yYW5nZShhc3JzLCB4dmFsLCBtaW5fem9vbV9taW5zID0gMSkge1xuICAgIHJldHVybiB0aGlzLmdldF9kdXJhdGlvbl96b29tX3JhbmdlKGQzLm1heChhc3JzLCB4dmFsKSwgbWluX3pvb21fbWlucylcbiAgfVxuXG4gIGRyYXdCdWJibGVDaGFydChkYXRhKSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4gO1xuICAgIH1cbiAgICBjb25zdCBsb2NhbFRoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHNlbGVjdGlvbl9zdHJpbmcgPSBcIiNcIiArIHRoaXMucHJvcElEO1xuICAgIGNvbnN0IHByZXR0eV9kdXJhdGlvbiA9IHRoaXMucHJldHR5X2R1cmF0aW9uO1xuICAgIGNvbnN0IHhWYWx1ZSA9IHRoaXMueFZhbHVlO1xuICAgIGNvbnN0IHlWYWx1ZSA9IHRoaXMueVZhbHVlO1xuICAgIGNvbnN0IHpWYWx1ZSA9IHRoaXMuelZhbHVlO1xuICAgIGxldCBlbGVtZW50OiBhbnk7XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyk7XG5cbiAgICBpZiAoc2VsZWN0ZWRbMF0gPT0gbnVsbCkge1xuICAgICAgZWxlbWVudCA9IFt7Y2xpZW50V2lkdGg6IDUwMCwgY2xpZW50SGVpZ2h0OiA1MDB9XTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudCA9IHNlbGVjdGVkWzBdO1xuICAgIH1cblxuXG4gICAgY29uc3QgbWFyZ2luID0gdGhpcy5tYXJnaW47XG4gICAgY29uc3QgZWxlbWVudFdpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgdGVybmFyeVdpZHRoID0gZWxlbWVudFdpZHRoID4gMCA/IGVsZW1lbnRXaWR0aCA6IDQwMDtcbiAgICBjb25zdCB3aWR0aCA9IHRlcm5hcnlXaWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICAgIGNvbnN0IHRlcm5hcnlIZWlnaHQgPSBlbGVtZW50SGVpZ2h0ID4gMCA/IGVsZW1lbnRIZWlnaHQgOiA0MDA7XG4gICAgbGV0IGhlaWdodCA9IHRlcm5hcnlIZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcbiAgICAvLyByZXRyaWV2aW5nIGdsb2JhbHNcbiAgICBjb25zdCBjb2xvcnMgPSB0aGlzLnRoZW1lQ29sb3JzO1xuXG4gICAgLy8gQWNjb3VudCBmb3IgcGFuZWwgaGVhZGluZyBoZWlnaHQgaWYgdGl0bGUgZXhpc3RzLlxuICAgIGlmICh0aGlzLnRpdGxlKSB7XG4gICAgICBoZWlnaHQgLT0gNDA7XG4gICAgfVxuXG4gICAgbGV0IHN2ZztcbiAgICBjb25zdCBjb250YWluZXJJZCA9IFwiI1wiICsgdGhpcy5wcm9wSUQsXG4gICAgICBjb250YWluZXJJZFN2ZyA9IGNvbnRhaW5lcklkICsgXCIgc3ZnXCIsXG4gICAgICBjb250YWluZXJJZEcgPSBjb250YWluZXJJZFN2ZyArIFwiIGdcIjtcblxuICAgIGQzLnNlbGVjdEFsbChgLiR7dGhpcy5wcm9wSUR9X3Rvb2x0aXBgKS5yZW1vdmUoKTtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rpb25fc3RyaW5nICsgXCIgc3ZnXCIpWzBdICE9IG51bGwpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyArIFwiIHN2Z1wiKVswXS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBmb3JtYXREYXRlID0gZDMudGltZVBhcnNlKHRoaXMuZGF0ZUZvcm1hdCk7XG5cbiAgICBsZXQgeFNjYWxlO1xuXG4gICAgaWYgKHRoaXMuaXNEYXRlKSB7XG4gICAgICB4U2NhbGUgPSBkMy5zY2FsZVRpbWUoKS5yYW5nZShbMCwgd2lkdGhdKTtcbiAgICAgIGRhdGEgPSBkYXRhLm1hcChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoZC5tYXBwZWQpIHsgcmV0dXJuIGQ7IH1cbiAgICAgICAgZC54ID0gZm9ybWF0RGF0ZShkLngpO1xuICAgICAgICBkLm1hcHBlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBkO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHhTY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoWzAsIHdpZHRoXSk7XG4gICAgfVxuXG4gICAgY29uc3QgeE1hcCA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHhTY2FsZSh4VmFsdWUoZCkpO1xuICAgICAgfSxcbiAgICAgIHhBeGlzID0gZDMuYXhpc0JvdHRvbSgpXG4gICAgICAgIC5zY2FsZSh4U2NhbGUpXG4gICAgICAgIC50aWNrU2l6ZUlubmVyKC1oZWlnaHQpXG4gICAgICAgIC50aWNrcyg2KTtcblxuICAgICAgaWYgKHRoaXMuaXNEYXRlKSB7XG4gICAgICAgIHhBeGlzLnRpY2tGb3JtYXQoZDMudGltZUZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHhBeGlzLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBsb2NhbFRoaXMuaXNUaW1lID8gcHJldHR5X2R1cmF0aW9uKDYwICogZCkgOiBkO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLnJhbmdlKFtoZWlnaHQsIDBdKSxcbiAgICAgIHlNYXAgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB5U2NhbGUoeVZhbHVlKGQpKTtcbiAgICAgIH0sXG4gICAgICB5QXhpcyA9IGQzLmF4aXNMZWZ0KClcbiAgICAgICAgLnNjYWxlKHlTY2FsZSlcbiAgICAgICAgLnRpY2tTaXplSW5uZXIoLXdpZHRoKVxuICAgICAgICAudGlja3MoNCk7XG5cbiAgICBjb25zdCBtYXhfdmFsdWVfc2l6ZSA9IE1hdGguc3FydChkMy5tYXgoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuICtkLnZhbHVlO1xuICAgIH0pKTtcbiAgICBjb25zdCBidWJibGVfc2l6ZXMgPSB0aGlzLmdldF9idWJibGVfc2l6ZXMobWF4X3ZhbHVlX3NpemUpO1xuICAgIGNvbnN0IG1pbl9idWJibGVfc2l6ZSA9IGJ1YmJsZV9zaXplc1snbWluJ107XG4gICAgY29uc3QgbWF4X2J1YmJsZV9zaXplID0gYnViYmxlX3NpemVzWydtYXgnXTtcblxuICAgIGNvbnN0IHpTY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFsxLCBtYXhfdmFsdWVfc2l6ZV0pLnJhbmdlKFtcbiAgICAgIG1pbl9idWJibGVfc2l6ZSxcbiAgICAgIG1heF9idWJibGVfc2l6ZVxuICAgIF0pLFxuICAgICAgek1hcCA9IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHpTY2FsZShNYXRoLnNxcnQoelZhbHVlKGQpKSk7IH07XG5cbiAgICBjb25zdCBjVmFsdWUgPSBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgdmFsTWluID0gZDMubWluKGRhdGEsIHpWYWx1ZSk7XG4gICAgY29uc3QgdmFsTWF4ID0gZDMubWF4KGRhdGEsIHpWYWx1ZSk7XG5cblxuICAgIGNvbnN0IGNvbG9yID0gZDMuc2NhbGVRdWFudGl6ZSgpLnJhbmdlKGNvbG9ycykuZG9tYWluKFt2YWxNaW4sIHZhbE1heF0pO1xuXG4gICAgY29uc3QgdG9vbHRpcCA9IGQzLnNlbGVjdChcImJvZHlcIilcbiAgICAgIC5hcHBlbmQoXCJkaXZcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYGQzX3Zpc3VhbHNfdG9vbHRpcCAke3RoaXMucHJvcElEfV90b29sdGlwYClcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG5cbiAgICAvLyBHZXQgbWluIGFuZCBtYXggdmFsdWVzIGZvciB4IGFuZCB5IGF4aXNcbiAgICBsZXQgeE1pbiA9IGQzLm1pbihkYXRhLCB4VmFsdWUpO1xuICAgIGxldCB4TWF4ID0gZDMubWF4KGRhdGEsIHhWYWx1ZSk7XG4gICAgY29uc3QgeU1pbiA9IGQzLm1pbihkYXRhLCB5VmFsdWUpO1xuICAgIGNvbnN0IHlNYXggPSBkMy5tYXgoZGF0YSwgeVZhbHVlKTtcblxuICAgIC8vIERldGVybWluZSBwYWRkaW5nIGZvciB4LWF4aXMgaWYgaXQncyBkYXRlcy5cbiAgICBpZiAodGhpcy5pc0RhdGUpIHtcbiAgICAgIGNvbnN0IG1pbiA9IHhTY2FsZSh4TWluKTtcbiAgICAgIGNvbnN0IG1heCA9IHhTY2FsZSh4TWF4KTtcblxuICAgICAgeE1pbiA9IHhTY2FsZS5pbnZlcnQobWluIC0gKG1pbiAqIC4wMDEpKTtcbiAgICAgIHhNYXggPSB4U2NhbGUuaW52ZXJ0KChtYXggKiAuMDAxKSArIG1heCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHhNaW4gPSB4TWluIC0gKHhNaW4gLyAyKTtcbiAgICAgIHhNYXggPSB4TWF4ICsgKHhNYXggLyA0KTtcbiAgICB9XG5cblxuICAgIC8vIFN1YnRyYWN0IGhhbGYgdGhlIG1pbiB2YWx1ZSBmcm9tIG1pbiBhbmQgYWRkIG9uZSBmb3VydGhcbiAgICAvLyBvZiB0aGUgbWF4IHRvIHRoZSBtYXggc28gdGhhdCB0aGUgYnViYmxlcyBuZXZlciBnbyBvdXRzaWRlIG9mIHRoZSBncmFwaFxuICAgIHhTY2FsZS5kb21haW4oW3hNaW4sIHhNYXhdKTtcbiAgICB5U2NhbGUuZG9tYWluKFt5TWluIC0geU1pbi8yLCB5TWF4ICsgeU1heC80XSk7XG4gICAgc3ZnID0gZDMuc2VsZWN0KGNvbnRhaW5lcklkKVxuICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKVxuXG4gICAgc3ZnLmFwcGVuZChcInJlY3RcIilcbiAgICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpc1wiKVxuICAgICAgLmF0dHIoXCJpZFwiLCBcInRvcC14XCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiICsgaGVpZ2h0ICsgXCIpXCIpXG4gICAgICAuY2FsbCh4QXhpcylcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAgIC5hdHRyKFwieFwiLCB3aWR0aClcbiAgICAgIC5hdHRyKFwieVwiLCAtMTApXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcImVuZFwiKVxuICAgICAgLnRleHQodGhpcy54QXhpc0xhYmVsKTtcblxuICAgIHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpXG4gICAgICAuYXR0cihcImlkXCIsIFwidG9wLXlcIilcbiAgICAgIC5jYWxsKHlBeGlzKVxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYWJlbFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIDYpXG4gICAgICAuYXR0cihcImR5XCIsIFwiLjcxZW1cIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgICAudGV4dCh0aGlzLnlBeGlzTGFiZWwpO1xuXG4gIC8vIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMubW91c2VPdmVyQnViYmxlO1xuXG4gICAgc3ZnLnNlbGVjdEFsbChcIi5kb3RcIilcbiAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImRvdFwiKVxuICAgICAgLmF0dHIoXCJyXCIsIHpNYXApXG4gICAgICAuYXR0cihcImN4XCIsIHhNYXApXG4gICAgICAuYXR0cihcImN5XCIsIHlNYXApXG4gICAgICAuYXR0cihcInN0cm9rZVwiLCBcImdyYXlcIilcbiAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDEpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgY29uc3Qgc2F2ZVRoaXNDb2xvciA9IGNvbG9yKGNWYWx1ZShkKSk7XG4gICAgICAgIHJldHVybiBzYXZlVGhpc0NvbG9yO1xuICAgICAgfSlcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMC43NSlcbiAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRvb2x0aXApO1xuICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbigxMDApXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgdG9vbHRpcC5odG1sKCc8YiBjbGFzcz1cInRvb2x0aXAtaGVhZGVyXCI+JyArIGQubGFiZWwgKyAnPC9iPicgKyBcIjxici8+PGI+XCIgKyBsb2NhbFRoaXMueEF4aXNMYWJlbCArIFwiPC9iPiBcIiArIChsb2NhbFRoaXMuaXNUaW1lID8gbG9jYWxUaGlzLnByZXR0eV9kdXJhdGlvbig2MCAqIGxvY2FsVGhpcy54VmFsdWUoZCkpIDogIGxvY2FsVGhpcy54VmFsdWUoZCkpICsgXCI8YnIvPjxiPlwiICsgbG9jYWxUaGlzLnlBeGlzTGFiZWwgKyBcIjogPC9iPlwiICsgbG9jYWxUaGlzLnlWYWx1ZShkKVxuICAgICAgICAgIC50b0ZpeGVkKDIpICsgXCI8YnI+IDxiPnZhbHVlOjwvYj4gXCIgKyBsb2NhbFRoaXMuelZhbHVlKGQpKVxuICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGQzLmV2ZW50LnBhZ2VYICsgNSkgKyBcInB4XCIpXG4gICAgICAgICAgLnN0eWxlKFwidG9wXCIsIChkMy5ldmVudC5wYWdlWSAtIDI4KSArIFwicHhcIik7XG4gICAgICAgIGQzLnNlbGVjdCh0b29sdGlwWzBdKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oNTApXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcbiAgICAgIH0pXG4gICAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihkKXtcbiAgICAgICAgY29uc3QgdG9vbHRpcCA9IGQzLnNlbGVjdChgLiR7bG9jYWxUaGlzLnByb3BJRH1fdG9vbHRpcGApO1xuICAgICAgICAgIHRvb2x0aXAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDMwMCkuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICAgIGQzLnNlbGVjdCh0b29sdGlwWzBdKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICB9KVxuICB9XG5cblxufVxuIl19