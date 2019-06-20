import luxon from 'luxon';
import { Injectable, Component, NgModule, Input, defineInjectable } from '@angular/core';
import { selectAll, scaleBand, scaleLinear, axisBottom, axisLeft, select, max, event, descending, timeParse, scaleTime, timeFormat, min, scaleQuantize, format, extent, line, curveLinear, pie, arc, scaleSqrt, scaleOrdinal, schemePaired, partition, hierarchy, interpolate } from 'd3';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgcatalystService {
    constructor() { }
}
NgcatalystService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgcatalystService.ctorParameters = () => [];
/** @nocollapse */ NgcatalystService.ngInjectableDef = defineInjectable({ factory: function NgcatalystService_Factory() { return new NgcatalystService(); }, token: NgcatalystService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgcatalystComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
NgcatalystComponent.decorators = [
    { type: Component, args: [{
                selector: 'eikos-ngcatalyst',
                template: `
    <p>
      ngcatalyst works!
    </p>
  `
            }] }
];
/** @nocollapse */
NgcatalystComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BarChartComponent {
    constructor() {
        this.propID = 'barchart';
        this.color = '#2DA8C9';
        this.yAxisLabel = 'y';
        this.xAxisLabel = 'x';
        this.xAxisAngle = 45;
        this.yAxisAngle = 45;
        this.title = "Bar Chart";
    }
    /**
     * @return {?}
     */
    get dataModel() {
        return this.data.map((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            return { x: item.name, y: item.value };
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.drawBarPlot(this.dataModel, this.propID, this.yAxisLabel, this.xAxisLabel, this.mouseover_callback);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.drawBarPlot(this.dataModel, this.propID, this.yAxisLabel, this.xAxisLabel, this.mouseover_callback);
    }
    /**
     * @param {?} x
     * @return {?}
     */
    mouseover_callback(x) {
        return x;
    }
    /**
     * @param {?} data
     * @param {?} id
     * @param {?} yaxisvalue
     * @param {?} xaxisvalue
     * @param {?} mouseover_callback
     * @return {?}
     */
    drawBarPlot(data, id, yaxisvalue, xaxisvalue, mouseover_callback) {
        /** @type {?} */
        const localThis = this;
        selectAll(`.${this.propID}_tooltip`).remove();
        /** @type {?} */
        const selection_string = "#" + id;
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
        /** @type {?} */
        const margin = { top: 20, right: 30, bottom: 15, left: 40 };
        if (this.xAxisAngle > 0) {
            margin.bottom += (this.xAxisAngle / 2);
        }
        /** @type {?} */
        const width = element.clientWidth - margin.left - margin.right;
        /** @type {?} */
        const height = element.clientHeight - margin.top - margin.bottom;
        /** @type {?} */
        const x = scaleBand()
            .range([0, width])
            .paddingInner(.2)
            .paddingOuter(.2);
        /** @type {?} */
        const y = scaleLinear()
            .range([height - margin.bottom, 0]);
        /** @type {?} */
        const xAxis = axisBottom()
            .scale(x)
            .tickSizeOuter(0);
        /** @type {?} */
        const yAxis = axisLeft()
            .scale(y)
            .tickSizeInner(-width)
            .tickSizeOuter(0);
        /** @type {?} */
        const tooltip = select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);
        /** @type {?} */
        const chart = select(selection_string)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        if (data.length > 0) {
            y.domain([
                0,
                max(data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    return d.y;
                }))
            ]);
            x.domain(data.map((/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                return d.x;
            })));
        }
        chart
            .append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height - margin.bottom) + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width / 2 + margin.right)
            .attr("y", 30)
            .style("text-anchor", "middle")
            .text(xaxisvalue);
        /** @type {?} */
        const text = chart.selectAll("text");
        if (this.xAxisAngle > 0) {
            text
                .attr("transform", `rotate(${this.xAxisAngle}) translate(0, ${margin.top})`)
                .style("text-anchor", "middle");
            /** @type {?} */
            const dimensions = text.node().getBBox();
            if (this.xAxisAngle === 45) {
                text.attr("x", 15)
                    .attr("y", dimensions.height * 2);
            }
            if (this.xAxisAngle === 90) {
                text.attr("x", dimensions.width - 10)
                    .attr("y", 0);
            }
        }
        chart
            .append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(yaxisvalue);
        /**
         * @param {?} hex
         * @return {?}
         */
        function hex2rgb(hex) {
            return [(/** @type {?} */ ('0x')) + hex[1] + hex[2] | 0, (/** @type {?} */ ('0x')) + hex[3] + hex[4] | 0, (/** @type {?} */ ('0x')) + hex[5] + hex[6] | 0];
        }
        if (data.length > 0) {
            chart
                .selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                return x(d.x);
            }))
                .attr("y", (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                return y(d.y);
            }))
                .attr("height", (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                return height - y(d.y) - margin.bottom;
            }))
                .attr("width", x.bandwidth() - x.paddingInner())
                .style("fill", localThis.color)
                .on("mouseover", (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                /** @type {?} */
                const yval = mouseover_callback(d.y);
                tooltip
                    .transition()
                    .duration(100)
                    .style("opacity", 1);
                tooltip
                    .html(xaxisvalue +
                    ": <b>" +
                    d.x + "</b><br>" +
                    yaxisvalue +
                    ": <b>" +
                    yval + "</b>")
                    .style("left", event.pageX + 5 + "px")
                    .style("top", event.pageY - 28 + "px");
                select(this)
                    .transition()
                    .duration(50)
                    .style("fill", (/**
                 * @param {?} dt
                 * @return {?}
                 */
                function (dt) {
                    /** @type {?} */
                    let currentFill;
                    currentFill = hex2rgb(localThis.color);
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
            }))
                .on("mouseout", (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                select(this)
                    .transition()
                    .duration(100)
                    .style("fill", localThis.color);
                tooltip
                    .transition()
                    .duration(300)
                    .style("opacity", 0);
            }));
        }
    }
}
BarChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'eikos-bar-chart',
                template: `
  <h2>{{title}}</h2>
    <div style="height: 750px; width: 750px;" >
      <div [id]="propID" style="width:100%;height:100%">
      </div>
    </div>
  `
            }] }
];
/** @nocollapse */
BarChartComponent.ctorParameters = () => [];
BarChartComponent.propDecorators = {
    data: [{ type: Input }],
    propID: [{ type: Input }],
    color: [{ type: Input }],
    yAxisLabel: [{ type: Input }],
    xAxisLabel: [{ type: Input }],
    xAxisAngle: [{ type: Input }],
    yAxisAngle: [{ type: Input }],
    title: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BubbleChartComponent {
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
                return descending(x.value, y.value);
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
        return this.get_duration_zoom_range(max(asrs, xval), min_zoom_mins);
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
        selectAll(`.${this.propID}_tooltip`).remove();
        if (document.querySelectorAll(selection_string + " svg")[0] != null) {
            document.querySelectorAll(selection_string + " svg")[0].remove();
        }
        /** @type {?} */
        const formatDate = timeParse(this.dateFormat);
        /** @type {?} */
        let xScale;
        if (this.isDate) {
            xScale = scaleTime().range([0, width]);
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
            xScale = scaleLinear().range([0, width]);
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
        const xAxis = axisBottom()
            .scale(xScale)
            .tickSizeInner(-height)
            .ticks(6);
        if (this.isDate) {
            xAxis.tickFormat(timeFormat(this.dateFormat));
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
        const yScale = scaleLinear()
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
        const yAxis = axisLeft()
            .scale(yScale)
            .tickSizeInner(-width)
            .ticks(4);
        /** @type {?} */
        const max_value_size = Math.sqrt(max(data, (/**
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
        const zScale = scaleLinear().domain([1, max_value_size]).range([
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
        const valMin = min(data, zValue);
        /** @type {?} */
        const valMax = max(data, zValue);
        /** @type {?} */
        const color = scaleQuantize().range(colors).domain([valMin, valMax]);
        /** @type {?} */
        const tooltip = select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);
        // Get min and max values for x and y axis
        /** @type {?} */
        let xMin = min(data, xValue);
        /** @type {?} */
        let xMax = max(data, xValue);
        /** @type {?} */
        const yMin = min(data, yValue);
        /** @type {?} */
        const yMax = max(data, yValue);
        // Determine padding for x-axis if it's dates.
        if (this.isDate) {
            /** @type {?} */
            const min$$1 = xScale(xMin);
            /** @type {?} */
            const max$$1 = xScale(xMax);
            xMin = xScale.invert(min$$1 - (min$$1 * .001));
            xMax = xScale.invert((max$$1 * .001) + max$$1);
        }
        else {
            xMin = xMin - (xMin / 2);
            xMax = xMax + (xMax / 4);
        }
        // Subtract half the min value from min and add one fourth
        // of the max to the max so that the bubbles never go outside of the graph
        xScale.domain([xMin, xMax]);
        yScale.domain([yMin - yMin / 2, yMax + yMax / 4]);
        svg = select(containerId)
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
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
            select(tooltip[0])
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
            const tooltip = select(`.${localThis.propID}_tooltip`);
            tooltip.transition().duration(300).style("opacity", 0);
            select(tooltip[0])
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LinePlotComponent {
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
        selectAll(`.${this.propID}_tooltip`).remove();
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
        const parseDate = timeParse('%Y-%m-%d');
        /** @type {?} */
        const formatDate = timeFormat('%B %-d %Y');
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
        const detected_percent = max(data, (/**
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
        const xScale = scaleTime().range([0, width - margin.right]);
        /** @type {?} */
        const xMap = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return xScale(xValue(d));
        });
        /** @type {?} */
        const xAxis = axisBottom()
            .scale(xScale)
            .tickSizeInner(-height)
            .ticks(6);
        /** @type {?} */
        let format_attribute;
        if (detected_percent) {
            format_attribute = format("%");
        }
        else {
            format_attribute = format("");
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
        const yScale = scaleLinear().range([height, 0]);
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
        const yAxisScale = scaleLinear()
            .range([height - yScale(min(data)), 0]);
        xScale.domain(extent(data, xValue)).nice();
        yScale.domain(extent(data, yValue)).nice();
        // yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);
        /** @type {?} */
        const yAxis = axisLeft()
            .scale(yScale)
            // .tickValues([-200, -150, -100, -50, 0, 50, 100, 150, 200, 250, 300, 350])
            .tickSizeInner(-width)
            .tickFormat(format_attribute);
        /** @type {?} */
        const line$$1 = line()
            .x(xMap)
            .y(yMap)
            .curve(curveLinear);
        // debugger
        /** @type {?} */
        const svg = select(selection_string)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        /** @type {?} */
        const tooltip = select("body")
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
            .attr("d", line$$1)
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
                .style("left", event.pageX + 5 + "px")
                .style("top", event.pageY - 28 + "px");
            select(this)
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
            select(this)
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PieChartComponent {
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
        selectAll(`.${this.propID}_tooltip`).remove();
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
        const svg = select(selection_string)
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
        const tooltip = select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);
        // create function that will be used to draw slices
        /** @type {?} */
        const pie$$1 = pie()
            .value((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.value; }));
        // Declare an arc generator function
        /** @type {?} */
        const donut = this.donutWidth;
        /** @type {?} */
        const arc$$1 = arc()
            .innerRadius(donut)
            .outerRadius(radius);
        // Select paths, use arc generator to draw
        /** @type {?} */
        const arcs = svg.selectAll("g.slice")
            .data(pie$$1)
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
            select(this).selectAll('path').
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
                .style("left", event.pageX + "px")
                .style("top", event.pageY + "px");
        }))
            .on("mouseout", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            tooltip.transition()
                .duration(300)
                .style("opacity", 0);
            select(this).selectAll('path').
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
            .attr("d", arc$$1);
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
                .attr("d", arc$$1);
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
                const currentLabel = d.label;
                selectAll('g.slice path').data([d], (/**
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
                const currentLabel = d.label;
                selectAll('g.slice path').data([d], (/**
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PunchCardComponent {
    constructor() {
        this.propID = 'punch';
        this.axisColors = ["#e5b1a5", "#ff2b2b"];
        this.axisLabel = 'Date';
        this.colors = ["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB", "#64B5F6", "#01579B"];
        // tslint:disable-next-line:max-line-length
        this.labelsX = ["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.drawPunchCard();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.drawPunchCard();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.drawPunchCard();
    }
    /**
     * @param {?} day
     * @return {?}
     */
    getDay(day) {
        /** @type {?} */
        const days = [
            { name: 'Mon', value: 2, description: 'Monday' },
            { name: 'Tue', value: 3, description: 'Tuesday' },
            { name: 'Wed', value: 4, description: 'Wednesday' },
            { name: 'Thu', value: 5, description: 'Thursday' },
            { name: 'Fri', value: 6, description: 'Friday' },
            { name: 'Sat', value: 7, description: 'Saturday' },
            { name: 'Sun', value: 1, description: 'Sunday' }
        ];
        /** @type {?} */
        const result = days.filter((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            return d.name === day;
        }));
        return result[0].value;
    }
    /**
     * @param {?} day
     * @return {?}
     */
    getDayName(day) {
        /** @type {?} */
        const days = [
            { name: 'Mon', value: "1", description: 'Monday' },
            { name: 'Tue', value: "2", description: 'Tuesday' },
            { name: 'Wed', value: "3", description: 'Wednesday' },
            { name: 'Thu', value: "4", description: 'Thursday' },
            { name: 'Fri', value: "5", description: 'Friday' },
            { name: 'Sat', value: "6", description: 'Saturday' },
            { name: 'Sun', value: "0", description: 'Sunday' }
        ];
        /** @type {?} */
        const result = days.filter((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            return d.value === day;
        }));
        return result[0].name;
    }
    /**
     * @return {?}
     */
    drawPunchCard() {
        if (this.data === undefined) {
            return;
        }
        // try {
        //   if (this.data.length === 0) { return; }
        // } catch (e) {
        //   return;
        // }
        /** @type {?} */
        const localThis = this;
        // This was needed for the Incident Set Modal Test to pass.
        /** @type {?} */
        const elementName = "#" + this.propID;
        if (document.querySelectorAll(elementName + " svg")[0] != null) {
            document.querySelectorAll(elementName + " svg")[0].remove();
        }
        /** @type {?} */
        let data = JSON.parse(JSON.stringify(this.data));
        // deep copy
        /** @type {?} */
        const margin = { top: 40, right: 75, bottom: 40, left: 15 };
        /** @type {?} */
        const padding = 3;
        /** @type {?} */
        const xLabelHeight = 30;
        /** @type {?} */
        const yLabelWidth = 30;
        /** @type {?} */
        const borderWidth = 1;
        // const width = 500;
        // const height = 181;
        /** @type {?} */
        let element;
        /** @type {?} */
        const selected = document.querySelectorAll(elementName);
        if (selected[0] == null) {
            element = [{ clientWidth: 1000, clientHeight: 500 }];
        }
        else {
            element = selected[0];
        }
        /** @type {?} */
        const width = element.clientWidth - margin.left - margin.right - yLabelWidth;
        /** @type {?} */
        const height = element.clientHeight / 24 * 7 +
            2 * xLabelHeight - margin.top - margin.bottom;
        //   if (this..changeHeight !== undefined ) {
        //       this..changeHeight(height + margin.top + margin.bottom + 2 * xLabelHeight);
        //  }
        /** @type {?} */
        const chart = select(elementName)
            .append("svg")
            .attr("width", "100%")
            .attr("data-height", "0.5678")
            .attr("viewBox", `0 0 ${width / 2.1} ${height * 2}`)
            .attr("preserveAspectRatio", "xMaxYMax meet")
            // .attr("width", width + margin.left + margin.right + 2 * yLabelWidth)
            // .attr("height", height + margin.top + margin.bottom + 2 * xLabelHeight)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // array of all values in the data, for min maxing and length calculations
        /** @type {?} */
        const allValues = Array.prototype.concat.apply([], data.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.hour_volumes;
        })));
        // finds longest array in data
        /** @type {?} */
        const maxWidth = max(data.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.hour_volumes.length;
        })));
        // maximum radius for bubble.
        /** @type {?} */
        const maxR = min([
            (width - yLabelWidth) / maxWidth,
            (height - xLabelHeight) / data.length
        ]) / 2;
        // sort data and translate into human-readable
        data.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
            parseInt(a["day_of_week"]) > parseInt(b["day_of_week"]);
        }));
        data.push(data.shift());
        if (data[0]["day_of_week"].length === 1) {
            data = data.map((/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                d["day_of_week"] = localThis.getDayName(d["day_of_week"]);
                return d;
            }));
        }
        // create labels
        /** @type {?} */
        const labelsX = this.labelsX;
        // calc total volumes per day, for sumsY label
        /** @type {?} */
        const sumsY = [];
        for (let i = 0; i < data.length; i++) {
            /** @type {?} */
            const sum = data[i]["hour_volumes"].reduce((/**
             * @param {?} acc
             * @param {?} val
             * @return {?}
             */
            function (acc, val) {
                return acc + val;
            }), 0);
            sumsY.push(sum);
        }
        // calc total volumes per hour, for sumsX label
        /** @type {?} */
        const sumsX = [];
        for (let i = 0; i < data[0]["hour_volumes"].length; i++) {
            /** @type {?} */
            const sum = data.reduce((/**
             * @param {?} acc
             * @param {?} val
             * @return {?}
             */
            function (acc, val) {
                return acc + val["hour_volumes"][i];
            }), 0);
            sumsX.push(sum);
        }
        // this essentially scales radius values according to the maxR
        /** @type {?} */
        const sizeScale = (/**
         * @param {?} d
         * @param {?} dataset
         * @return {?}
         */
        function (d, dataset) {
            if (d === 0) {
                return 0;
            }
            /** @type {?} */
            const f = scaleSqrt()
                .domain([min(dataset), max(dataset)])
                .rangeRound([2, maxR - padding]);
            return f(d);
        });
        /** @type {?} */
        const colorScale = (/**
         * @param {?} d
         * @param {?} dataset
         * @return {?}
         */
        function (d, dataset) {
            /** @type {?} */
            const f = scaleLinear()
                .domain([min(dataset), max(dataset)])
                .range([localThis.colors[7], localThis.colors[0]]);
            return f(d);
        });
        /** @type {?} */
        const colorScaleAxes = (/**
         * @param {?} d
         * @param {?} dataset
         * @return {?}
         */
        function (d, dataset) {
            /** @type {?} */
            const f = scaleLinear()
                .domain([min(dataset), max(dataset)])
                .range(localThis.axisColors);
            return f(d);
        });
        // yAxis Border
        chart
            .append("rect")
            .attr("x", yLabelWidth)
            .attr("y", xLabelHeight + 2 * maxR)
            .attr("width", 2 * maxR)
            .attr("height", height - xLabelHeight)
            .attr("stroke-width", 2)
            .attr("stroke", "grey")
            .attr("fill", "transparent")
            .attr("shape-rendering", "crispEdges")
            .attr("class", "punch-border");
        // xAxis Border
        chart
            .append("rect")
            .attr("x", yLabelWidth + 2 * maxR)
            .attr("y", xLabelHeight)
            .attr("width", maxR * 24 * 2)
            .attr("height", 2 * maxR)
            .attr("stroke-width", 2)
            .attr("stroke", "grey")
            .attr("fill", "transparent")
            .attr("shape-rendering", "crispEdges")
            .attr("class", "punch-border, foo-bar");
        // creates rows according to data labels
        /** @type {?} */
        const rows = chart.selectAll(".row").data(data, (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.day_of_week;
        }))
            .enter()
            .append("g")
            .attr("class", "row")
            .attr("transform", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return ("translate(" +
                (yLabelWidth + 2 * maxR) +
                "," +
                (maxR * i * 2 + 3 * maxR + xLabelHeight) +
                ")");
        }));
        // creating the elements that will hold and represent our data
        rows.selectAll("circle")
            .data((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.hour_volumes;
        }))
            .enter()
            .append("circle")
            .attr("cy", 0)
            .style("fill", "transparent")
            .text((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d;
        }))
            .attr("r", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return sizeScale(d, allValues);
        }))
            .attr("cx", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return i * maxR * 2 + maxR;
        }))
            .attr("shape-rendering", "auto")
            .style("fill", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return colorScale(d, allValues);
        }));
        // adds labels
        /** @type {?} */
        const dotLabels = rows.selectAll(".dot-label").data((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.hour_volumes.map((/**
             * @param {?} v
             * @param {?} idx
             * @return {?}
             */
            function (v, idx) {
                return [v, d.day_of_week, idx];
            }));
        }))
            .enter()
            .append("g")
            .attr("class", "dot-label")
            .on("mouseover", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            const selection = select(this);
            if (d[0] > 0) {
                selection.style("cursor", "pointer");
            }
            selection
                .select("circle")
                .transition()
                .duration(100)
                .style("opacity", 1);
            selection
                .select("text")
                .transition()
                .duration(100)
                .style("opacity", 1);
        }))
            .on("mouseout", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            const selection = select(this);
            selection.style("cursor", "default");
            selection
                .select("circle")
                .transition()
                .style("opacity", 0);
            selection
                .select("text")
                .transition()
                .style("opacity", 0);
        }));
        // .on("click", function(d, i) {
        //   if (localThis.onClick !== undefined) {
        //     if (d[0] > 0) {
        //       localThis.onClick("point", localThis.getDay(d[1]), i);
        //     }
        //   }
        // });
        dotLabels
            .append("circle")
            .attr("r", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return maxR;
        }))
            .attr("cx", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return maxR;
        }))
            .attr("cy", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return maxR;
        }))
            .style("fill", localThis.colors[0])
            .style("opacity", 0);
        dotLabels
            .append("text")
            .style("text-anchor", "middle")
            .style("fill", "#ffffff")
            .style("opacity", 0)
            .style('font-size', 8);
        dotLabels.exit().remove();
        // centers and resizes the text so it doesn't exceed its rect
        dotLabels
            .attr("transform", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return "translate(" + i * maxR * 2 + "," + -maxR + ")";
        }))
            .select("text")
            .text((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d[0];
        }))
            .attr("y", maxR + 4)
            .attr("x", maxR);
        // ensures the colored rect on the label is the width and height of the circle diameter (maxR * 2)
        dotLabels
            .select("rect")
            .attr("width", maxR * 2)
            .attr("height", maxR * 2);
        // creates labels for the x axis (hour)
        chart.selectAll(".xLabel")
            .data(labelsX)
            // styling for the labels
            .enter()
            .append("text")
            .attr("y", xLabelHeight)
            .attr("transform", "translate(0,-6)")
            .attr("class", "xLabel")
            .style("text-anchor", "middle")
            .style("fill-opacity", 0)
            .text((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d;
        }))
            .attr("x", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return maxR * i * 2 + 3 * maxR + yLabelWidth;
        }))
            .style("fill-opacity", 1);
        // creates labels for the y axis (day of week)
        /** @type {?} */
        const yLabels = chart.selectAll(".yLabel")
            .data(data, (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.day_of_week;
        }))
            // y label creation
            .enter()
            .append("text")
            .text((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.day_of_week;
        }))
            .attr("x", yLabelWidth)
            .attr("class", "yLabel")
            .style("text-anchor", "end")
            .style("fill-opacity", 0)
            .attr("y", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return maxR * i * 2 + 3 * maxR + xLabelHeight;
        }))
            .attr("transform", "translate(-6," + maxR / 2.5 + ")")
            .style("fill-opacity", 1);
        // append sums to rows
        chart.selectAll(".sums-y")
            .data(sumsY)
            .enter()
            .append("circle")
            .text((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d;
        }))
            .attr("cy", 0)
            .attr("class", "sums-y")
            .style("fill", "#ffffff")
            .style("fill-opacity", 0)
            .attr("cy", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return maxR * i * 2 + 3 * maxR + xLabelHeight;
        }))
            .attr("r", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return sizeScale(d, sumsY);
        }))
            .attr("cx", yLabelWidth + maxR)
            .attr("shape-rendering", "auto")
            .style("fill", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return colorScaleAxes(d, sumsY);
        }))
            .style("fill-opacity", 1)
            .style("stroke", "#9e9999")
            .style("stroke-width", 1);
        /** @type {?} */
        const sumsYValues = chart.selectAll(".sums-y-value").data(sumsY)
            // //adds mouseover transition
            .enter()
            .append("g")
            .attr("class", "sums-y-value")
            .on("mouseover", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            const selection = select(this);
            if (d > 0) {
                selection.style("cursor", "pointer");
            }
            selection
                .select("circle")
                .transition()
                .duration(0)
                .style("opacity", 1);
            selection
                .select("text")
                .transition()
                .duration(0)
                .style("opacity", 1);
        }))
            .on("mouseout", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            const selection = select(this);
            selection.style("cursor", "default");
            selection
                .select("circle")
                .transition()
                .style("opacity", 0);
            selection
                .select("text")
                .transition()
                .style("opacity", 0);
        }));
        // .on("click", function(d, i) {
        //   if (d > 0) {
        //     if (localThis !== undefined) {
        //       localThis.onClick(
        //         "day",
        //         localThis.getDay(yLabels[0][i].textContent),
        //         -1
        //       );
        //     }
        //     // window.location.href = redirect_url + yLabels[0][i].textContent + '/-1';
        //   }
        // });
        // creates the needed svg and text elements to make the labels actually readable
        sumsYValues
            .append("circle")
            .attr("r", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return maxR;
        }))
            .attr("cx", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return maxR;
        }))
            .attr("cy", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return maxR;
        }))
            .style("fill", this.axisColors[1])
            .style("opacity", 0);
        sumsYValues
            .append("text")
            .style("text-anchor", "middle")
            .style("fill", "#ffffff")
            .style("opacity", 0)
            .style('font-size', 8);
        sumsYValues.exit().remove();
        // centers and resizes the text so it doesn't exceed its rect
        sumsYValues
            .attr("transform", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return ("translate(" +
                yLabelWidth +
                "," +
                (xLabelHeight + 2 * maxR + 2 * maxR * i) +
                ")");
        }))
            .select("text")
            .text((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d;
        }))
            .attr("y", maxR + 4)
            .attr("x", maxR);
        // ensures the colored rect on the label is the width and height of the circle diameter (maxR * 2)
        sumsYValues
            .select("rect")
            .attr("width", maxR * 2)
            .attr("height", maxR * 2);
        // create top label for y
        // chart
        //   .append("text")
        //   .attr("x", yLabelWidth)
        //   .attr("y", height + maxR * 2)
        //   .append("tspan")
        //   .attr("class", "sum-label-y")
        //   .style("text-anchor", "start")
        //   .text("Total/")
        //   .append("tspan")
        //   .attr("dy", 15)
        //   .attr("x", yLabelWidth)
        //   .text("Day")
        //   .attr("class", "sum-label-y")
        //   .style("text-anchor", "start");
        // x axis sums
        /** @type {?} */
        const sumsXAxis = chart.selectAll(".sums-x").data(sumsX);
        // styling for the labels
        sumsXAxis
            .enter()
            .append("circle")
            .text((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d;
        }))
            .attr("cy", 0)
            .attr("class", "sums-x")
            .style("fill", "#ffffff")
            .style("fill-opacity", 0)
            .attr("cy", xLabelHeight + maxR)
            .attr("r", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return sizeScale(d, sumsX);
        }))
            .attr("cx", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return yLabelWidth + 3 * maxR + maxR * i * 2;
        }))
            .attr("shape-rendering", "auto")
            .style("fill", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return colorScaleAxes(d, sumsX);
        }))
            .style("fill-opacity", 1)
            .style("stroke", "#9e9999")
            .style("stroke-width", 1);
        /** @type {?} */
        const sumsXValues = chart.selectAll(".sums-x-value").data(sumsX)
            // //adds mouseover transition
            .enter()
            .append("g")
            .attr("class", "sums-x-value")
            .on("mouseover", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            const selection = select(this);
            if (d > 0) {
                selection.style("cursor", "pointer");
            }
            selection
                .select("circle")
                .transition()
                .duration(100)
                .style("opacity", 1);
            selection
                .select("text")
                .transition()
                .duration(100)
                .style("opacity", 1);
        }))
            .on("mouseout", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            const selection = select(this);
            selection.style("cursor", "default");
            selection
                .select("circle")
                .transition()
                .style("opacity", 0);
            selection
                .select("text")
                .transition()
                .style("opacity", 0);
        }));
        // .on("click", function(d, i) {
        //   if (d > 0) {
        //     localThis.onClick("hour", 0, i);
        //   }
        // });
        // creates the needed svg and text elements to make the labels actually readable
        sumsXValues
            .append("circle")
            .attr("r", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return maxR;
        }))
            .attr("cx", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return maxR;
        }))
            .attr("cy", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return maxR;
        }))
            .style("fill", this.axisColors[1])
            .style("opacity", 0);
        sumsXValues
            .append("text")
            .style("text-anchor", "middle")
            .style("fill", "#ffffff")
            .style("opacity", 0)
            .style('font-size', 8);
        sumsXValues.exit().remove();
        // centers and resizes the text so it doesn't exceed its rect
        sumsXValues
            .attr("transform", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return ("translate(" +
                (yLabelWidth + 2 * maxR * i + 2 * maxR) +
                ", " +
                xLabelHeight +
                ")");
        }))
            .select("text")
            .text((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d;
        }))
            .attr("y", maxR + 4)
            .attr("x", maxR);
        // ensures the colored rect on the label is the width and height of the circle diameter (maxR * 2)
        sumsXValues
            .select("rect")
            .attr("width", maxR * 2)
            .attr("height", maxR * 2);
        // create left label for sumsX
        // chart
        //   .append("text")
        //   .attr("x", width + 2 * maxR + 7)
        //   .attr("y", xLabelHeight + maxR / 2)
        //   .append("tspan")
        //   .attr("class", "sum-label-y")
        //   .style("text-anchor", "start")
        //   .text("Total/")
        //   .append("tspan")
        //   .attr("dy", 15)
        //   .attr("x", width + 2 * maxR + 7)
        //   .text("Hr")
        //   .attr("class", "sum-label-y")
        //   .style("text-anchor", "start");
        // draw in-chart light axes separating squares
        chart.selectAll(".vert")
            .data(labelsX)
            .enter()
            .append("line")
            .attr("class", "vert")
            .attr("stroke", "#888")
            .attr("stroke-width", 1)
            .style("shape-rendering", "crispEdges")
            .style("stroke-opacity", 0)
            .attr("x1", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return maxR * i * 2 + yLabelWidth + 2 * maxR;
        }))
            .attr("x2", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return maxR * i * 2 + yLabelWidth + 2 * maxR;
        }))
            .attr("y1", xLabelHeight + borderWidth / 2)
            .attr("y2", height + 2 * maxR)
            .style("stroke-opacity", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return i ? 0.5 : 0;
        }));
        chart.selectAll(".horiz")
            .data(data, (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.day_of_week;
        }))
            .enter()
            .append("line")
            .attr("class", "horiz")
            .attr("x1", yLabelWidth + borderWidth / 2)
            .attr("stroke", "#888")
            .attr("stroke-width", 1)
            .style("shape-rendering", "crispEdges")
            .style("stroke-opacity", 0)
            .attr("x2", (maxR * 25 * 2) + yLabelWidth)
            .attr("y1", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return i * maxR * 2 + xLabelHeight + 2 * maxR;
        }))
            .attr("y2", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return i * maxR * 2 + xLabelHeight + 2 * maxR;
        }))
            .style("stroke-opacity", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return i ? 0.5 : 0;
        }));
        // outer Border Bottom
        chart
            .append("line")
            .attr("x1", yLabelWidth + borderWidth / 2)
            .attr("y1", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return (i * maxR * 2 + 2 * maxR) + height;
        }))
            .attr("x2", maxR * 25 * 2 + yLabelWidth)
            .attr("y2", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return (i * maxR * 2 + 2 * maxR) + height;
        }))
            .attr("stroke-width", 2)
            .attr("shape-rendering", "crispEdges")
            .attr("stroke", "grey")
            .attr('class', 'punch-border');
        // outer border right
        chart
            .append("line")
            .attr("x1", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return (maxR * 25 * 2) + yLabelWidth; //+ width;
        }))
            .attr("x2", (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return (maxR * 25 * 2) + yLabelWidth; //+ width;
        }))
            .attr("y1", xLabelHeight + borderWidth / 2)
            .attr("y2", height + 2 * maxR)
            .attr("stroke-width", 2)
            .style("shape-rendering", "crispEdges")
            .attr("stroke", "grey")
            .attr('class', 'punch-border');
        // Emit ready event.
    }
}
PunchCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'eikos-punch-card',
                template: `
  <h2>{{title}}</h2>
  <div style="height: 750px; width: 1500px; margin-left: 3%" >
      <div [id]="propID" style="width:100%;height:100%"> </div>
  </div>
`,
                styles: [`
    .punch-border {
      stroke: grey
    }
  `]
            }] }
];
/** @nocollapse */
PunchCardComponent.ctorParameters = () => [];
PunchCardComponent.propDecorators = {
    propID: [{ type: Input }],
    data: [{ type: Input }],
    title: [{ type: Input }],
    axisColors: [{ type: Input }],
    axisLabel: [{ type: Input }],
    colors: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SunburstComponent {
    constructor() {
        this.propID = 'line';
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
        this.drawSunburst();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.drawSunburst();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.drawSunburst();
    }
    /**
     * @return {?}
     */
    drawSunburst() {
        // let localThis = this;
        selectAll(`.${this.propID}_tooltip`).remove();
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
            element = [{ clientWidth: 500, clientHeight: 500 }];
        }
        else {
            element = selected[0];
        }
        /** @type {?} */
        const width = element.clientWidth;
        /** @type {?} */
        let height = element.clientHeight;
        // Account for panel heading height if it exists.
        if (this.title) {
            height -= 40;
        }
        if (height === undefined || height === 0) {
            height = width / 4;
        }
        /** @type {?} */
        const radius = Math.min(width, height) / 2;
        /** @type {?} */
        const color = scaleOrdinal(schemePaired);
        /** @type {?} */
        const formatNumber = format(",d");
        /** @type {?} */
        let x = scaleLinear()
            .range([0, 2 * Math.PI]);
        /** @type {?} */
        let y = scaleSqrt()
            .range([0, radius]);
        /** @type {?} */
        const partition$$1 = partition();
        /** @type {?} */
        const arc$$1 = arc()
            .startAngle((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); }))
            .endAngle((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); }))
            .innerRadius((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return Math.max(0, y(d.y0)); }))
            .outerRadius((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return Math.max(0, y(d.y1)); }));
        /** @type {?} */
        const svg = select(selection_string).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");
        /** @type {?} */
        const tooltip = select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);
        /** @type {?} */
        const root = hierarchy(this.data[0]);
        root.sum((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.size; }));
        /** @type {?} */
        const nodes = partition$$1(root).descendants();
        svg.selectAll("path")
            .data(nodes)
            .enter().append("path")
            .attr("d", arc$$1)
            .attr('class', 'segment')
            .style("fill", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return color((d.children ? d : d.parent).data.name); }))
            .on("click", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            click(d);
        }))
            .on("mouseover", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            tooltip.transition()
                .duration(100)
                .style("opacity", 1);
            tooltip
                .html("Name: " + d.data.name + "<br/>" + (d.data.size ? "Value: " + d.data.size : ""))
                .style("left", event.pageX + 5 + "px")
                .style("top", event.pageY - 28 + "px");
        }))
            .on("mouseout", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            tooltip.transition()
                .duration(300)
                .style("opacity", 0);
        }))
            .append("title")
            .text((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.data.name + "\n" + formatNumber(d.value); }));
        /**
         * @param {?} d
         * @return {?}
         */
        function click(d) {
            svg.transition()
                .duration(750)
                .tween("scale", (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                const xd = interpolate(x.domain(), [d.x0, d.x1]);
                /** @type {?} */
                const yd = interpolate(y.domain(), [d.y0, 1]);
                /** @type {?} */
                const yr = interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); });
            }))
                .selectAll("path")
                .attrTween("d", (/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return (/**
             * @return {?}
             */
            function () { return arc$$1(d); }); }));
        }
        select(self.frameElement).style("height", height + "px");
    }
}
SunburstComponent.decorators = [
    { type: Component, args: [{
                selector: 'eikos-sunburst',
                template: `
  <h2>{{title}}</h2>
  <div style="height: 750px; width: 750px;" >
      <div [id]="propID" style="width:100%;height:100%"> </div>
  </div>
`
            }] }
];
/** @nocollapse */
SunburstComponent.ctorParameters = () => [];
SunburstComponent.propDecorators = {
    propID: [{ type: Input }],
    data: [{ type: Input }],
    title: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgcatalystModule {
}
NgcatalystModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgcatalystComponent,
                    BarChartComponent, BubbleChartComponent, LinePlotComponent, PieChartComponent, PunchCardComponent, SunburstComponent],
                imports: [],
                exports: [NgcatalystComponent,
                    BarChartComponent, BubbleChartComponent, LinePlotComponent, PieChartComponent, PunchCardComponent, SunburstComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgcatalystService, NgcatalystComponent, NgcatalystModule, BarChartComponent, BubbleChartComponent, LinePlotComponent, PieChartComponent, PunchCardComponent, SunburstComponent };

//# sourceMappingURL=ngcatalyst.js.map