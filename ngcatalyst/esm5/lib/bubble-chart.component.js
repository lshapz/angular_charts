/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
import luxon from 'luxon';
var BubbleChartComponent = /** @class */ (function () {
    function BubbleChartComponent() {
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
    Object.defineProperty(BubbleChartComponent.prototype, "processedData", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var data = this.data;
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BubbleChartComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.drawBubbleChart(this.processedData);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    BubbleChartComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.drawBubbleChart(this.processedData);
    };
    /**
     * @return {?}
     */
    BubbleChartComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.drawBubbleChart(this.processedData);
    };
    /**
     * @param {?} d
     * @return {?}
     */
    BubbleChartComponent.prototype.xValue = /**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        return d.x;
    };
    /**
     * @param {?} d
     * @return {?}
     */
    BubbleChartComponent.prototype.yValue = /**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        return d.y;
    };
    /**
     * @param {?} d
     * @return {?}
     */
    BubbleChartComponent.prototype.zValue = /**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        return d.value;
    };
    /**
     * @param {?} d
     * @return {?}
     */
    BubbleChartComponent.prototype.pretty_duration = /**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        return luxon.duration.fromObject({ "seconds": d }).normalize().toObject(); // this.moment??
    };
    /**
     * @param {?} max_value_size
     * @param {?} cutoff
     * @param {?} min_pixels
     * @return {?}
     */
    BubbleChartComponent.prototype.get_min_bubble_size = /**
     * @param {?} max_value_size
     * @param {?} cutoff
     * @param {?} min_pixels
     * @return {?}
     */
    function (max_value_size, cutoff, min_pixels) {
        return (max_value_size >= cutoff) ? min_pixels : max_value_size;
    };
    /**
     * @param {?} max_value_size
     * @param {?} min_bubble_size
     * @param {?} cutoff
     * @param {?} max_pixels
     * @return {?}
     */
    BubbleChartComponent.prototype.get_max_bubble_size = /**
     * @param {?} max_value_size
     * @param {?} min_bubble_size
     * @param {?} cutoff
     * @param {?} max_pixels
     * @return {?}
     */
    function (max_value_size, min_bubble_size, cutoff, max_pixels) {
        return (max_value_size >= cutoff) ? max_pixels : min_bubble_size * max_value_size + 25;
    };
    /**
     * @param {?} max_value_size
     * @return {?}
     */
    BubbleChartComponent.prototype.get_bubble_sizes = /**
     * @param {?} max_value_size
     * @return {?}
     */
    function (max_value_size) {
        /** @type {?} */
        var cutoff = 10;
        /** @type {?} */
        var min_pixels = 5;
        /** @type {?} */
        var max_pixels = 125;
        /** @type {?} */
        var min_bubble_size = (max_value_size < min_pixels) ? min_pixels : this.get_min_bubble_size(max_value_size, cutoff, min_pixels);
        return {
            'min': min_bubble_size,
            'max': this.get_max_bubble_size(max_value_size, min_bubble_size, cutoff, max_pixels)
        };
    };
    /**
     * @param {?} max_value_mins
     * @param {?=} min_zoom_mins
     * @return {?}
     */
    BubbleChartComponent.prototype.get_duration_zoom_range = /**
     * @param {?} max_value_mins
     * @param {?=} min_zoom_mins
     * @return {?}
     */
    function (max_value_mins, min_zoom_mins) {
        if (min_zoom_mins === void 0) { min_zoom_mins = 1; }
        return [1, max_value_mins / min_zoom_mins];
    };
    /**
     * @param {?} asrs
     * @param {?} xval
     * @param {?=} min_zoom_mins
     * @return {?}
     */
    BubbleChartComponent.prototype.get_x_zoom_range = /**
     * @param {?} asrs
     * @param {?} xval
     * @param {?=} min_zoom_mins
     * @return {?}
     */
    function (asrs, xval, min_zoom_mins) {
        if (min_zoom_mins === void 0) { min_zoom_mins = 1; }
        return this.get_duration_zoom_range(d3.max(asrs, xval), min_zoom_mins);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    BubbleChartComponent.prototype.drawBubbleChart = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (!data) {
            return;
        }
        /** @type {?} */
        var localThis = this;
        /** @type {?} */
        var selection_string = "#" + this.propID;
        /** @type {?} */
        var pretty_duration = this.pretty_duration;
        /** @type {?} */
        var xValue = this.xValue;
        /** @type {?} */
        var yValue = this.yValue;
        /** @type {?} */
        var zValue = this.zValue;
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
        var margin = this.margin;
        /** @type {?} */
        var elementWidth = element.clientWidth;
        /** @type {?} */
        var elementHeight = element.clientHeight;
        /** @type {?} */
        var ternaryWidth = elementWidth > 0 ? elementWidth : 400;
        /** @type {?} */
        var width = ternaryWidth - margin.left - margin.right;
        /** @type {?} */
        var ternaryHeight = elementHeight > 0 ? elementHeight : 400;
        /** @type {?} */
        var height = ternaryHeight - margin.top - margin.bottom;
        // retrieving globals
        /** @type {?} */
        var colors = this.themeColors;
        // Account for panel heading height if title exists.
        if (this.title) {
            height -= 40;
        }
        /** @type {?} */
        var svg;
        /** @type {?} */
        var containerId = "#" + this.propID;
        /** @type {?} */
        var containerIdSvg = containerId + " svg";
        /** @type {?} */
        var containerIdG = containerIdSvg + " g";
        d3.selectAll("." + this.propID + "_tooltip").remove();
        if (document.querySelectorAll(selection_string + " svg")[0] != null) {
            document.querySelectorAll(selection_string + " svg")[0].remove();
        }
        /** @type {?} */
        var formatDate = d3.timeParse(this.dateFormat);
        /** @type {?} */
        var xScale;
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
        var yScale = d3.scaleLinear()
            .range([height, 0]);
        /** @type {?} */
        var yMap = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return yScale(yValue(d));
        });
        /** @type {?} */
        var yAxis = d3.axisLeft()
            .scale(yScale)
            .tickSizeInner(-width)
            .ticks(4);
        /** @type {?} */
        var max_value_size = Math.sqrt(d3.max(data, (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return +d.value;
        })));
        /** @type {?} */
        var bubble_sizes = this.get_bubble_sizes(max_value_size);
        /** @type {?} */
        var min_bubble_size = bubble_sizes['min'];
        /** @type {?} */
        var max_bubble_size = bubble_sizes['max'];
        /** @type {?} */
        var zScale = d3.scaleLinear().domain([1, max_value_size]).range([
            min_bubble_size,
            max_bubble_size
        ]);
        /** @type {?} */
        var zMap = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return zScale(Math.sqrt(zValue(d))); });
        /** @type {?} */
        var cValue = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.value;
        });
        /** @type {?} */
        var valMin = d3.min(data, zValue);
        /** @type {?} */
        var valMax = d3.max(data, zValue);
        /** @type {?} */
        var color = d3.scaleQuantize().range(colors).domain([valMin, valMax]);
        /** @type {?} */
        var tooltip = d3.select("body")
            .append("div")
            .attr("class", "d3_visuals_tooltip " + this.propID + "_tooltip")
            .style("opacity", 0);
        // Get min and max values for x and y axis
        /** @type {?} */
        var xMin = d3.min(data, xValue);
        /** @type {?} */
        var xMax = d3.max(data, xValue);
        /** @type {?} */
        var yMin = d3.min(data, yValue);
        /** @type {?} */
        var yMax = d3.max(data, yValue);
        // Determine padding for x-axis if it's dates.
        if (this.isDate) {
            /** @type {?} */
            var min = xScale(xMin);
            /** @type {?} */
            var max = xScale(xMax);
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
            var saveThisColor = color(cValue(d));
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
            var tooltip = d3.select("." + localThis.propID + "_tooltip");
            tooltip.transition().duration(300).style("opacity", 0);
            d3.select(tooltip[0])
                .transition()
                .duration(200)
                .style("opacity", 0);
        }));
    };
    BubbleChartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'eikos-bubble-chart',
                    template: "\n<h2>{{title}}</h2>\n<div style=\"height: 750px; width: 750px;\" >\n    <div [id]=\"propID\" style=\"width:100%;height:100%\"> </div>\n</div>\n  "
                }] }
    ];
    /** @nocollapse */
    BubbleChartComponent.ctorParameters = function () { return []; };
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
    return BubbleChartComponent;
}());
export { BubbleChartComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nY2F0YWx5c3QvIiwic291cmNlcyI6WyJsaWIvYnViYmxlLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTJDLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUxQjtJQXVCRTtRQVpTLFdBQU0sR0FBRyxRQUFRLENBQUM7UUFFbEIsVUFBSyxHQUFHLGNBQWMsQ0FBQztRQUN2QixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGdCQUFXLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7O1FBRXZHLGVBQVUsR0FBRyxPQUFPLENBQUM7UUFDckIsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUM3QixlQUFVLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLFdBQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUV0QyxDQUFDO0lBRWpCLHNCQUFJLCtDQUFhOzs7O1FBQWpCOztnQkFDUSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUk7WUFDdEIsSUFBSTtnQkFDSixJQUFJLENBQUMsSUFBSTs7Ozs7Z0JBQUMsVUFBUyxDQUFDLEVBQUUsQ0FBQztvQkFDckIsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLEVBQUMsQ0FBQzthQUNGO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7Ozs7SUFFRCx1Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVELDBDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsOENBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFRCxxQ0FBTTs7OztJQUFOLFVBQU8sQ0FBQztRQUNOLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUM7Ozs7O0lBQ0QscUNBQU07Ozs7SUFBTixVQUFPLENBQUM7UUFDTixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDYixDQUFDOzs7OztJQUNELHFDQUFNOzs7O0lBQU4sVUFBTyxDQUFDO1FBQ04sT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRUQsOENBQWU7Ozs7SUFBZixVQUFnQixDQUFDO1FBQ2YsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsZ0JBQWdCO0lBQzNGLENBQUM7Ozs7Ozs7SUFFRCxrREFBbUI7Ozs7OztJQUFuQixVQUFvQixjQUFjLEVBQUUsTUFBTSxFQUFFLFVBQVU7UUFDcEQsT0FBTyxDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUM7SUFDbEUsQ0FBQzs7Ozs7Ozs7SUFFRCxrREFBbUI7Ozs7Ozs7SUFBbkIsVUFBb0IsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsVUFBVTtRQUNyRSxPQUFPLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGVBQWUsR0FBRyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQ3pGLENBQUM7Ozs7O0lBRUQsK0NBQWdCOzs7O0lBQWhCLFVBQWlCLGNBQWM7O1lBQ3ZCLE1BQU0sR0FBRyxFQUFFOztZQUNmLFVBQVUsR0FBRyxDQUFDOztZQUNkLFVBQVUsR0FBRyxHQUFHOztZQUNaLGVBQWUsR0FBRyxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUM7UUFDakksT0FBTztZQUNMLEtBQUssRUFBRSxlQUFlO1lBQ3RCLEtBQUssRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDO1NBQ3JGLENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFRCxzREFBdUI7Ozs7O0lBQXZCLFVBQXdCLGNBQWMsRUFBRSxhQUFpQjtRQUFqQiw4QkFBQSxFQUFBLGlCQUFpQjtRQUN2RCxPQUFPLENBQUMsQ0FBQyxFQUFFLGNBQWMsR0FBRyxhQUFhLENBQUMsQ0FBQTtJQUM1QyxDQUFDOzs7Ozs7O0lBRUQsK0NBQWdCOzs7Ozs7SUFBaEIsVUFBaUIsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFpQjtRQUFqQiw4QkFBQSxFQUFBLGlCQUFpQjtRQUM1QyxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUN4RSxDQUFDOzs7OztJQUVELDhDQUFlOzs7O0lBQWYsVUFBZ0IsSUFBSTtRQUNsQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBUTtTQUNUOztZQUNLLFNBQVMsR0FBRyxJQUFJOztZQUNoQixnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU07O1lBQ3BDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZTs7WUFDdEMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNOztZQUNwQixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU07O1lBQ3BCLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTTs7WUFDdEIsT0FBWTs7WUFFVixRQUFRLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO1FBRTVELElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUN2QixPQUFPLEdBQUcsQ0FBQyxFQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNMLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkI7O1lBR0ssTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNOztZQUNwQixZQUFZLEdBQUcsT0FBTyxDQUFDLFdBQVc7O1lBQ2xDLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWTs7WUFDcEMsWUFBWSxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRzs7WUFDcEQsS0FBSyxHQUFHLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLOztZQUNqRCxhQUFhLEdBQUcsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHOztZQUN6RCxNQUFNLEdBQUcsYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU07OztZQUVqRCxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVc7UUFFL0Isb0RBQW9EO1FBQ3BELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLE1BQU0sSUFBSSxFQUFFLENBQUM7U0FDZDs7WUFFRyxHQUFHOztZQUNELFdBQVcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU07O1lBQ25DLGNBQWMsR0FBRyxXQUFXLEdBQUcsTUFBTTs7WUFDckMsWUFBWSxHQUFHLGNBQWMsR0FBRyxJQUFJO1FBRXRDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBSSxJQUFJLENBQUMsTUFBTSxhQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqRCxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDbkUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2xFOztZQUVLLFVBQVUsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7O1lBRTVDLE1BQU07UUFFVixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRzs7OztZQUFDLFVBQVUsQ0FBQztnQkFDekIsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO29CQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUFFO2dCQUMzQixDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNoQixPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsRUFBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLE1BQU0sR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDN0M7O1lBRUssSUFBSTs7OztRQUFHLFVBQVMsQ0FBQztZQUNuQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUE7O1lBQ0QsS0FBSyxHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUU7YUFDcEIsS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUNiLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQzthQUN0QixLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRVgsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQ2xEO2FBQU07WUFDTCxLQUFLLENBQUMsVUFBVTs7OztZQUFDLFVBQVMsQ0FBQztnQkFDekIsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsQ0FBQyxFQUFDLENBQUM7U0FDSjs7WUFFRyxNQUFNLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRTthQUMxQixLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1lBQ3JCLElBQUk7Ozs7UUFBRyxVQUFTLENBQUM7WUFDZixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUE7O1lBQ0QsS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUU7YUFDbEIsS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUNiLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQzthQUNyQixLQUFLLENBQUMsQ0FBQyxDQUFDOztZQUVQLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSTs7OztRQUFFLFVBQVMsQ0FBQztZQUN0RCxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsQixDQUFDLEVBQUMsQ0FBQzs7WUFDRyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQzs7WUFDcEQsZUFBZSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7O1lBQ3JDLGVBQWUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDOztZQUVyQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNoRSxlQUFlO1lBQ2YsZUFBZTtTQUNoQixDQUFDOztZQUNBLElBQUk7Ozs7UUFBRyxVQUFTLENBQUMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7O1lBRXZELE1BQU07Ozs7UUFBRyxVQUFTLENBQUM7WUFDdkIsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQTs7WUFFSyxNQUFNLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDOztZQUM3QixNQUFNLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDOztZQUc3QixLQUFLLEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7O1lBRWpFLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2IsSUFBSSxDQUFDLE9BQU8sRUFBRSx3QkFBc0IsSUFBSSxDQUFDLE1BQU0sYUFBVSxDQUFDO2FBQzFELEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDOzs7WUFHbEIsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7WUFDM0IsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7WUFDekIsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7WUFDM0IsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztRQUVqQyw4Q0FBOEM7UUFDOUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOztnQkFDVCxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzs7Z0JBQ2xCLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRXhCLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQzFDO2FBQU07WUFDTCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDMUI7UUFHRCwwREFBMEQ7UUFDMUQsMEVBQTBFO1FBQzFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksR0FBQyxDQUFDLEVBQUUsSUFBSSxHQUFHLElBQUksR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQzthQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2IsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2pELElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNuRCxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLFdBQVcsRUFBRSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQTtRQUV6RSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNmLElBQUksQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDO2FBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO2FBQ3BCLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFMUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWixJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQzthQUN2QixJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQzthQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLGNBQWMsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDO2FBQ2hELElBQUksQ0FBQyxLQUFLLENBQUM7YUFDWCxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2QsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7YUFDdEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7YUFDaEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNkLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDO2FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWixJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQzthQUN2QixJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQzthQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ1gsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNkLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQ3RCLElBQUksQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDO2FBQ2hDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQ1osSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7YUFDbkIsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUM7YUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUzQiwwQ0FBMEM7UUFFeEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7YUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNWLEtBQUssRUFBRTthQUNQLE1BQU0sQ0FBQyxRQUFRLENBQUM7YUFDaEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7YUFDcEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7YUFDZixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQzthQUNoQixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQzthQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQzthQUN0QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQzthQUN2QixLQUFLLENBQUMsTUFBTTs7OztRQUFFLFVBQVMsQ0FBQzs7Z0JBQ2pCLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sYUFBYSxDQUFDO1FBQ3ZCLENBQUMsRUFBQzthQUNELEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO2FBQ3RCLEVBQUUsQ0FBQyxXQUFXOzs7O1FBQUUsVUFBUyxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckIsT0FBTyxDQUFDLFVBQVUsRUFBRTtpQkFDakIsUUFBUSxDQUFDLEdBQUcsQ0FBQztpQkFDYixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLDJDQUEyQztZQUM3QyxPQUFPLENBQUMsSUFBSSxDQUFDLDRCQUE0QixHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxHQUFHLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxHQUFHLFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztpQkFDNVEsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLHFCQUFxQixHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3pELEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQzFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUM5QyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbEIsVUFBVSxFQUFFO2lCQUNaLFFBQVEsQ0FBQyxFQUFFLENBQUM7aUJBQ1osS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QixDQUFDLEVBQUM7YUFDRCxFQUFFLENBQUMsVUFBVTs7OztRQUFFLFVBQVMsQ0FBQzs7Z0JBQ2xCLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQUksU0FBUyxDQUFDLE1BQU0sYUFBVSxDQUFDO1lBQ3ZELE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbEIsVUFBVSxFQUFFO2lCQUNaLFFBQVEsQ0FBQyxHQUFHLENBQUM7aUJBQ2IsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQixDQUFDLEVBQUMsQ0FBQTtJQUNOLENBQUM7O2dCQWpURixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLG9KQUtUO2lCQUNGOzs7Ozt5QkFHRSxLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7OEJBQ0wsS0FBSzs2QkFFTCxLQUFLOzZCQUNMLEtBQUs7O0lBaVNSLDJCQUFDO0NBQUEsQUFwVEQsSUFvVEM7U0EzU1ksb0JBQW9COzs7SUFFL0Isc0NBQTJCOztJQUMzQixvQ0FBZ0Q7O0lBQ2hELHFDQUFnQzs7SUFDaEMsc0NBQXdCOztJQUN4QixzQ0FBd0I7O0lBQ3hCLDJDQUFnSDs7SUFFaEgsMENBQThCOztJQUM5QiwwQ0FBNkI7O0lBQzdCLDBDQUF3Qjs7SUFDeEIsc0NBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCBsdXhvbiBmcm9tICdsdXhvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Vpa29zLWJ1YmJsZS1jaGFydCcsXG4gIHRlbXBsYXRlOiBgXG48aDI+e3t0aXRsZX19PC9oMj5cbjxkaXYgc3R5bGU9XCJoZWlnaHQ6IDc1MHB4OyB3aWR0aDogNzUwcHg7XCIgPlxuICAgIDxkaXYgW2lkXT1cInByb3BJRFwiIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwJVwiPiA8L2Rpdj5cbjwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEJ1YmJsZUNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHByb3BJRCA9ICdidWJibGUnO1xuICBASW5wdXQoKSBkYXRhOiBbe2xhYmVsOiBzdHJpbmcsIHZhbHVlOiBudW1iZXJ9XTtcbiAgQElucHV0KCkgdGl0bGUgPSAnQnViYmxlIENoYXJ0JztcbiAgQElucHV0KCkgaXNUaW1lID0gZmFsc2U7XG4gIEBJbnB1dCgpIGlzRGF0ZSA9IGZhbHNlO1xuICBASW5wdXQoKSB0aGVtZUNvbG9ycyA9IFtcIiMwODFBNEVcIiwgXCIjMDkyMzY5XCIsIFwiIzFBNjQ5RlwiLCBcIiMyNDg1QjRcIiwgXCIjMkRBOEM5XCIsIFwiIzVEQzFEMFwiLCBcIiM5QUQ1Q0RcIiwgXCIjRDVFOUNCXCJdO1xuICAvLyBuZWVkIDggaGV4IGNvbG9ycztcbiAgQElucHV0KCkgeUF4aXNMYWJlbCA9ICdWYWx1ZSc7XG4gIEBJbnB1dCgpIHhBeGlzTGFiZWwgPSAnRGF0ZSc7XG4gIGRhdGVGb3JtYXQgPSAnJVktJW0tJWQnO1xuICBtYXJnaW4gPSB7IHRvcDogMjAsIHJpZ2h0OiAxMCwgYm90dG9tOiAzMCwgbGVmdDogMjAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGdldCBwcm9jZXNzZWREYXRhKCkge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgdHJ5IHtcbiAgICBkYXRhLnNvcnQoZnVuY3Rpb24oeCwgeSkge1xuICAgICAgcmV0dXJuIGQzLmRlc2NlbmRpbmcoeC52YWx1ZSwgeS52YWx1ZSk7XG4gICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kcmF3QnViYmxlQ2hhcnQodGhpcy5wcm9jZXNzZWREYXRhKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmRyYXdCdWJibGVDaGFydCh0aGlzLnByb2Nlc3NlZERhdGEpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZHJhd0J1YmJsZUNoYXJ0KHRoaXMucHJvY2Vzc2VkRGF0YSk7XG4gIH1cblxuICB4VmFsdWUoZCkge1xuICAgIHJldHVybiBkLng7XG4gIH1cbiAgeVZhbHVlKGQpIHtcbiAgICByZXR1cm4gZC55O1xuICB9XG4gIHpWYWx1ZShkKSB7XG4gICAgcmV0dXJuIGQudmFsdWU7XG4gIH1cblxuICBwcmV0dHlfZHVyYXRpb24oZCkge1xuICAgIHJldHVybiBsdXhvbi5kdXJhdGlvbi5mcm9tT2JqZWN0KHtcInNlY29uZHNcIjogZH0pLm5vcm1hbGl6ZSgpLnRvT2JqZWN0KCk7IC8vIHRoaXMubW9tZW50Pz9cbiAgfVxuXG4gIGdldF9taW5fYnViYmxlX3NpemUobWF4X3ZhbHVlX3NpemUsIGN1dG9mZiwgbWluX3BpeGVscykge1xuICAgIHJldHVybiAobWF4X3ZhbHVlX3NpemUgPj0gY3V0b2ZmKSA/IG1pbl9waXhlbHMgOiBtYXhfdmFsdWVfc2l6ZTtcbiAgfVxuXG4gIGdldF9tYXhfYnViYmxlX3NpemUobWF4X3ZhbHVlX3NpemUsIG1pbl9idWJibGVfc2l6ZSwgY3V0b2ZmLCBtYXhfcGl4ZWxzKSB7XG4gICAgcmV0dXJuIChtYXhfdmFsdWVfc2l6ZSA+PSBjdXRvZmYpID8gbWF4X3BpeGVscyA6IG1pbl9idWJibGVfc2l6ZSAqIG1heF92YWx1ZV9zaXplICsgMjU7XG4gIH1cblxuICBnZXRfYnViYmxlX3NpemVzKG1heF92YWx1ZV9zaXplKSB7XG4gICAgY29uc3QgY3V0b2ZmID0gMTAsXG4gICAgICBtaW5fcGl4ZWxzID0gNSxcbiAgICAgIG1heF9waXhlbHMgPSAxMjU7XG4gICAgY29uc3QgbWluX2J1YmJsZV9zaXplID0gKG1heF92YWx1ZV9zaXplIDwgbWluX3BpeGVscykgPyBtaW5fcGl4ZWxzIDogdGhpcy5nZXRfbWluX2J1YmJsZV9zaXplKG1heF92YWx1ZV9zaXplLCBjdXRvZmYsIG1pbl9waXhlbHMpO1xuICAgIHJldHVybiB7XG4gICAgICAnbWluJzogbWluX2J1YmJsZV9zaXplLFxuICAgICAgJ21heCc6IHRoaXMuZ2V0X21heF9idWJibGVfc2l6ZShtYXhfdmFsdWVfc2l6ZSwgbWluX2J1YmJsZV9zaXplLCBjdXRvZmYsIG1heF9waXhlbHMpXG4gICAgfTtcbiAgfVxuXG4gIGdldF9kdXJhdGlvbl96b29tX3JhbmdlKG1heF92YWx1ZV9taW5zLCBtaW5fem9vbV9taW5zID0gMSkge1xuICAgIHJldHVybiBbMSwgbWF4X3ZhbHVlX21pbnMgLyBtaW5fem9vbV9taW5zXVxuICB9XG5cbiAgZ2V0X3hfem9vbV9yYW5nZShhc3JzLCB4dmFsLCBtaW5fem9vbV9taW5zID0gMSkge1xuICAgIHJldHVybiB0aGlzLmdldF9kdXJhdGlvbl96b29tX3JhbmdlKGQzLm1heChhc3JzLCB4dmFsKSwgbWluX3pvb21fbWlucylcbiAgfVxuXG4gIGRyYXdCdWJibGVDaGFydChkYXRhKSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4gO1xuICAgIH1cbiAgICBjb25zdCBsb2NhbFRoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHNlbGVjdGlvbl9zdHJpbmcgPSBcIiNcIiArIHRoaXMucHJvcElEO1xuICAgIGNvbnN0IHByZXR0eV9kdXJhdGlvbiA9IHRoaXMucHJldHR5X2R1cmF0aW9uO1xuICAgIGNvbnN0IHhWYWx1ZSA9IHRoaXMueFZhbHVlO1xuICAgIGNvbnN0IHlWYWx1ZSA9IHRoaXMueVZhbHVlO1xuICAgIGNvbnN0IHpWYWx1ZSA9IHRoaXMuelZhbHVlO1xuICAgIGxldCBlbGVtZW50OiBhbnk7XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyk7XG5cbiAgICBpZiAoc2VsZWN0ZWRbMF0gPT0gbnVsbCkge1xuICAgICAgZWxlbWVudCA9IFt7Y2xpZW50V2lkdGg6IDUwMCwgY2xpZW50SGVpZ2h0OiA1MDB9XTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudCA9IHNlbGVjdGVkWzBdO1xuICAgIH1cblxuXG4gICAgY29uc3QgbWFyZ2luID0gdGhpcy5tYXJnaW47XG4gICAgY29uc3QgZWxlbWVudFdpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgdGVybmFyeVdpZHRoID0gZWxlbWVudFdpZHRoID4gMCA/IGVsZW1lbnRXaWR0aCA6IDQwMDtcbiAgICBjb25zdCB3aWR0aCA9IHRlcm5hcnlXaWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICAgIGNvbnN0IHRlcm5hcnlIZWlnaHQgPSBlbGVtZW50SGVpZ2h0ID4gMCA/IGVsZW1lbnRIZWlnaHQgOiA0MDA7XG4gICAgbGV0IGhlaWdodCA9IHRlcm5hcnlIZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcbiAgICAvLyByZXRyaWV2aW5nIGdsb2JhbHNcbiAgICBjb25zdCBjb2xvcnMgPSB0aGlzLnRoZW1lQ29sb3JzO1xuXG4gICAgLy8gQWNjb3VudCBmb3IgcGFuZWwgaGVhZGluZyBoZWlnaHQgaWYgdGl0bGUgZXhpc3RzLlxuICAgIGlmICh0aGlzLnRpdGxlKSB7XG4gICAgICBoZWlnaHQgLT0gNDA7XG4gICAgfVxuXG4gICAgbGV0IHN2ZztcbiAgICBjb25zdCBjb250YWluZXJJZCA9IFwiI1wiICsgdGhpcy5wcm9wSUQsXG4gICAgICBjb250YWluZXJJZFN2ZyA9IGNvbnRhaW5lcklkICsgXCIgc3ZnXCIsXG4gICAgICBjb250YWluZXJJZEcgPSBjb250YWluZXJJZFN2ZyArIFwiIGdcIjtcblxuICAgIGQzLnNlbGVjdEFsbChgLiR7dGhpcy5wcm9wSUR9X3Rvb2x0aXBgKS5yZW1vdmUoKTtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rpb25fc3RyaW5nICsgXCIgc3ZnXCIpWzBdICE9IG51bGwpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyArIFwiIHN2Z1wiKVswXS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBmb3JtYXREYXRlID0gZDMudGltZVBhcnNlKHRoaXMuZGF0ZUZvcm1hdCk7XG5cbiAgICBsZXQgeFNjYWxlO1xuXG4gICAgaWYgKHRoaXMuaXNEYXRlKSB7XG4gICAgICB4U2NhbGUgPSBkMy5zY2FsZVRpbWUoKS5yYW5nZShbMCwgd2lkdGhdKTtcbiAgICAgIGRhdGEgPSBkYXRhLm1hcChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoZC5tYXBwZWQpIHsgcmV0dXJuIGQ7IH1cbiAgICAgICAgZC54ID0gZm9ybWF0RGF0ZShkLngpO1xuICAgICAgICBkLm1hcHBlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBkO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHhTY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoWzAsIHdpZHRoXSk7XG4gICAgfVxuXG4gICAgY29uc3QgeE1hcCA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHhTY2FsZSh4VmFsdWUoZCkpO1xuICAgICAgfSxcbiAgICAgIHhBeGlzID0gZDMuYXhpc0JvdHRvbSgpXG4gICAgICAgIC5zY2FsZSh4U2NhbGUpXG4gICAgICAgIC50aWNrU2l6ZUlubmVyKC1oZWlnaHQpXG4gICAgICAgIC50aWNrcyg2KTtcblxuICAgICAgaWYgKHRoaXMuaXNEYXRlKSB7XG4gICAgICAgIHhBeGlzLnRpY2tGb3JtYXQoZDMudGltZUZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHhBeGlzLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBsb2NhbFRoaXMuaXNUaW1lID8gcHJldHR5X2R1cmF0aW9uKDYwICogZCkgOiBkO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLnJhbmdlKFtoZWlnaHQsIDBdKSxcbiAgICAgIHlNYXAgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB5U2NhbGUoeVZhbHVlKGQpKTtcbiAgICAgIH0sXG4gICAgICB5QXhpcyA9IGQzLmF4aXNMZWZ0KClcbiAgICAgICAgLnNjYWxlKHlTY2FsZSlcbiAgICAgICAgLnRpY2tTaXplSW5uZXIoLXdpZHRoKVxuICAgICAgICAudGlja3MoNCk7XG5cbiAgICBjb25zdCBtYXhfdmFsdWVfc2l6ZSA9IE1hdGguc3FydChkMy5tYXgoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuICtkLnZhbHVlO1xuICAgIH0pKTtcbiAgICBjb25zdCBidWJibGVfc2l6ZXMgPSB0aGlzLmdldF9idWJibGVfc2l6ZXMobWF4X3ZhbHVlX3NpemUpO1xuICAgIGNvbnN0IG1pbl9idWJibGVfc2l6ZSA9IGJ1YmJsZV9zaXplc1snbWluJ107XG4gICAgY29uc3QgbWF4X2J1YmJsZV9zaXplID0gYnViYmxlX3NpemVzWydtYXgnXTtcblxuICAgIGNvbnN0IHpTY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFsxLCBtYXhfdmFsdWVfc2l6ZV0pLnJhbmdlKFtcbiAgICAgIG1pbl9idWJibGVfc2l6ZSxcbiAgICAgIG1heF9idWJibGVfc2l6ZVxuICAgIF0pLFxuICAgICAgek1hcCA9IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHpTY2FsZShNYXRoLnNxcnQoelZhbHVlKGQpKSk7IH07XG5cbiAgICBjb25zdCBjVmFsdWUgPSBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgdmFsTWluID0gZDMubWluKGRhdGEsIHpWYWx1ZSk7XG4gICAgY29uc3QgdmFsTWF4ID0gZDMubWF4KGRhdGEsIHpWYWx1ZSk7XG5cblxuICAgIGNvbnN0IGNvbG9yID0gZDMuc2NhbGVRdWFudGl6ZSgpLnJhbmdlKGNvbG9ycykuZG9tYWluKFt2YWxNaW4sIHZhbE1heF0pO1xuXG4gICAgY29uc3QgdG9vbHRpcCA9IGQzLnNlbGVjdChcImJvZHlcIilcbiAgICAgIC5hcHBlbmQoXCJkaXZcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYGQzX3Zpc3VhbHNfdG9vbHRpcCAke3RoaXMucHJvcElEfV90b29sdGlwYClcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG5cbiAgICAvLyBHZXQgbWluIGFuZCBtYXggdmFsdWVzIGZvciB4IGFuZCB5IGF4aXNcbiAgICBsZXQgeE1pbiA9IGQzLm1pbihkYXRhLCB4VmFsdWUpO1xuICAgIGxldCB4TWF4ID0gZDMubWF4KGRhdGEsIHhWYWx1ZSk7XG4gICAgY29uc3QgeU1pbiA9IGQzLm1pbihkYXRhLCB5VmFsdWUpO1xuICAgIGNvbnN0IHlNYXggPSBkMy5tYXgoZGF0YSwgeVZhbHVlKTtcblxuICAgIC8vIERldGVybWluZSBwYWRkaW5nIGZvciB4LWF4aXMgaWYgaXQncyBkYXRlcy5cbiAgICBpZiAodGhpcy5pc0RhdGUpIHtcbiAgICAgIGNvbnN0IG1pbiA9IHhTY2FsZSh4TWluKTtcbiAgICAgIGNvbnN0IG1heCA9IHhTY2FsZSh4TWF4KTtcblxuICAgICAgeE1pbiA9IHhTY2FsZS5pbnZlcnQobWluIC0gKG1pbiAqIC4wMDEpKTtcbiAgICAgIHhNYXggPSB4U2NhbGUuaW52ZXJ0KChtYXggKiAuMDAxKSArIG1heCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHhNaW4gPSB4TWluIC0gKHhNaW4gLyAyKTtcbiAgICAgIHhNYXggPSB4TWF4ICsgKHhNYXggLyA0KTtcbiAgICB9XG5cblxuICAgIC8vIFN1YnRyYWN0IGhhbGYgdGhlIG1pbiB2YWx1ZSBmcm9tIG1pbiBhbmQgYWRkIG9uZSBmb3VydGhcbiAgICAvLyBvZiB0aGUgbWF4IHRvIHRoZSBtYXggc28gdGhhdCB0aGUgYnViYmxlcyBuZXZlciBnbyBvdXRzaWRlIG9mIHRoZSBncmFwaFxuICAgIHhTY2FsZS5kb21haW4oW3hNaW4sIHhNYXhdKTtcbiAgICB5U2NhbGUuZG9tYWluKFt5TWluIC0geU1pbi8yLCB5TWF4ICsgeU1heC80XSk7XG4gICAgc3ZnID0gZDMuc2VsZWN0KGNvbnRhaW5lcklkKVxuICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKVxuXG4gICAgc3ZnLmFwcGVuZChcInJlY3RcIilcbiAgICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpc1wiKVxuICAgICAgLmF0dHIoXCJpZFwiLCBcInRvcC14XCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiICsgaGVpZ2h0ICsgXCIpXCIpXG4gICAgICAuY2FsbCh4QXhpcylcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAgIC5hdHRyKFwieFwiLCB3aWR0aClcbiAgICAgIC5hdHRyKFwieVwiLCAtMTApXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcImVuZFwiKVxuICAgICAgLnRleHQodGhpcy54QXhpc0xhYmVsKTtcblxuICAgIHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpXG4gICAgICAuYXR0cihcImlkXCIsIFwidG9wLXlcIilcbiAgICAgIC5jYWxsKHlBeGlzKVxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYWJlbFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIDYpXG4gICAgICAuYXR0cihcImR5XCIsIFwiLjcxZW1cIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgICAudGV4dCh0aGlzLnlBeGlzTGFiZWwpO1xuXG4gIC8vIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMubW91c2VPdmVyQnViYmxlO1xuXG4gICAgc3ZnLnNlbGVjdEFsbChcIi5kb3RcIilcbiAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImRvdFwiKVxuICAgICAgLmF0dHIoXCJyXCIsIHpNYXApXG4gICAgICAuYXR0cihcImN4XCIsIHhNYXApXG4gICAgICAuYXR0cihcImN5XCIsIHlNYXApXG4gICAgICAuYXR0cihcInN0cm9rZVwiLCBcImdyYXlcIilcbiAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDEpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgY29uc3Qgc2F2ZVRoaXNDb2xvciA9IGNvbG9yKGNWYWx1ZShkKSk7XG4gICAgICAgIHJldHVybiBzYXZlVGhpc0NvbG9yO1xuICAgICAgfSlcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMC43NSlcbiAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRvb2x0aXApO1xuICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbigxMDApXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgdG9vbHRpcC5odG1sKCc8YiBjbGFzcz1cInRvb2x0aXAtaGVhZGVyXCI+JyArIGQubGFiZWwgKyAnPC9iPicgKyBcIjxici8+PGI+XCIgKyBsb2NhbFRoaXMueEF4aXNMYWJlbCArIFwiPC9iPiBcIiArIChsb2NhbFRoaXMuaXNUaW1lID8gbG9jYWxUaGlzLnByZXR0eV9kdXJhdGlvbig2MCAqIGxvY2FsVGhpcy54VmFsdWUoZCkpIDogIGxvY2FsVGhpcy54VmFsdWUoZCkpICsgXCI8YnIvPjxiPlwiICsgbG9jYWxUaGlzLnlBeGlzTGFiZWwgKyBcIjogPC9iPlwiICsgbG9jYWxUaGlzLnlWYWx1ZShkKVxuICAgICAgICAgIC50b0ZpeGVkKDIpICsgXCI8YnI+IDxiPnZhbHVlOjwvYj4gXCIgKyBsb2NhbFRoaXMuelZhbHVlKGQpKVxuICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGQzLmV2ZW50LnBhZ2VYICsgNSkgKyBcInB4XCIpXG4gICAgICAgICAgLnN0eWxlKFwidG9wXCIsIChkMy5ldmVudC5wYWdlWSAtIDI4KSArIFwicHhcIik7XG4gICAgICAgIGQzLnNlbGVjdCh0b29sdGlwWzBdKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oNTApXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcbiAgICAgIH0pXG4gICAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihkKXtcbiAgICAgICAgY29uc3QgdG9vbHRpcCA9IGQzLnNlbGVjdChgLiR7bG9jYWxUaGlzLnByb3BJRH1fdG9vbHRpcGApO1xuICAgICAgICAgIHRvb2x0aXAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDMwMCkuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICAgIGQzLnNlbGVjdCh0b29sdGlwWzBdKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICB9KVxuICB9XG5cblxufVxuIl19