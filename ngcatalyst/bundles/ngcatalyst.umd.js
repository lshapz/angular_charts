(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('luxon'), require('@angular/core'), require('d3')) :
    typeof define === 'function' && define.amd ? define('ngcatalyst', ['exports', 'luxon', '@angular/core', 'd3'], factory) :
    (factory((global.ngcatalyst = {}),global.luxon,global.ng.core,global.d3));
}(this, (function (exports,luxon,i0,d3) { 'use strict';

    luxon = luxon && luxon.hasOwnProperty('default') ? luxon['default'] : luxon;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgcatalystService = /** @class */ (function () {
        function NgcatalystService() {
        }
        NgcatalystService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NgcatalystService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgcatalystService.ngInjectableDef = i0.defineInjectable({ factory: function NgcatalystService_Factory() { return new NgcatalystService(); }, token: NgcatalystService, providedIn: "root" });
        return NgcatalystService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgcatalystComponent = /** @class */ (function () {
        function NgcatalystComponent() {
        }
        /**
         * @return {?}
         */
        NgcatalystComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        NgcatalystComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'eikos-ngcatalyst',
                        template: "\n    <p>\n      ngcatalyst works!\n    </p>\n  "
                    }] }
        ];
        /** @nocollapse */
        NgcatalystComponent.ctorParameters = function () { return []; };
        return NgcatalystComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BarChartComponent = /** @class */ (function () {
        function BarChartComponent() {
            this.propID = 'barchart';
            this.color = '#2DA8C9';
            this.yAxisLabel = 'y';
            this.xAxisLabel = 'x';
            this.xAxisAngle = 45;
            this.yAxisAngle = 45;
            this.title = "Bar Chart";
        }
        Object.defineProperty(BarChartComponent.prototype, "dataModel", {
            get: /**
             * @return {?}
             */ function () {
                return this.data.map(( /**
                 * @param {?} item
                 * @return {?}
                 */function (item) {
                    return { x: item.name, y: item.value };
                }));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        BarChartComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.drawBarPlot(this.dataModel, this.propID, this.yAxisLabel, this.xAxisLabel, this.mouseover_callback);
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        BarChartComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                this.drawBarPlot(this.dataModel, this.propID, this.yAxisLabel, this.xAxisLabel, this.mouseover_callback);
            };
        /**
         * @param {?} x
         * @return {?}
         */
        BarChartComponent.prototype.mouseover_callback = /**
         * @param {?} x
         * @return {?}
         */
            function (x) {
                return x;
            };
        /**
         * @param {?} data
         * @param {?} id
         * @param {?} yaxisvalue
         * @param {?} xaxisvalue
         * @param {?} mouseover_callback
         * @return {?}
         */
        BarChartComponent.prototype.drawBarPlot = /**
         * @param {?} data
         * @param {?} id
         * @param {?} yaxisvalue
         * @param {?} xaxisvalue
         * @param {?} mouseover_callback
         * @return {?}
         */
            function (data, id, yaxisvalue, xaxisvalue, mouseover_callback) {
                /** @type {?} */
                var localThis = this;
                d3.selectAll("." + this.propID + "_tooltip").remove();
                /** @type {?} */
                var selection_string = "#" + id;
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
                /** @type {?} */
                var margin = { top: 20, right: 30, bottom: 15, left: 40 };
                if (this.xAxisAngle > 0) {
                    margin.bottom += (this.xAxisAngle / 2);
                }
                /** @type {?} */
                var width = element.clientWidth - margin.left - margin.right;
                /** @type {?} */
                var height = element.clientHeight - margin.top - margin.bottom;
                /** @type {?} */
                var x = d3.scaleBand()
                    .range([0, width])
                    .paddingInner(.2)
                    .paddingOuter(.2);
                /** @type {?} */
                var y = d3.scaleLinear()
                    .range([height - margin.bottom, 0]);
                /** @type {?} */
                var xAxis = d3.axisBottom()
                    .scale(x)
                    .tickSizeOuter(0);
                /** @type {?} */
                var yAxis = d3.axisLeft()
                    .scale(y)
                    .tickSizeInner(-width)
                    .tickSizeOuter(0);
                /** @type {?} */
                var tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "d3_visuals_tooltip " + this.propID + "_tooltip")
                    .style("opacity", 0);
                /** @type {?} */
                var chart = d3.select(selection_string)
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                if (data.length > 0) {
                    y.domain([
                        0,
                        d3.max(data, ( /**
                         * @param {?} d
                         * @return {?}
                         */function (d) {
                            return d.y;
                        }))
                    ]);
                    x.domain(data.map(( /**
                     * @param {?} d
                     * @return {?}
                     */function (d) {
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
                var text = chart.selectAll("text");
                if (this.xAxisAngle > 0) {
                    text
                        .attr("transform", "rotate(" + this.xAxisAngle + ") translate(0, " + margin.top + ")")
                        .style("text-anchor", "middle");
                    /** @type {?} */
                    var dimensions = text.node().getBBox();
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
                    return [( /** @type {?} */('0x')) + hex[1] + hex[2] | 0, ( /** @type {?} */('0x')) + hex[3] + hex[4] | 0, ( /** @type {?} */('0x')) + hex[5] + hex[6] | 0];
                }
                if (data.length > 0) {
                    chart
                        .selectAll(".bar")
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr("class", "bar")
                        .attr("x", ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                        return x(d.x);
                    }))
                        .attr("y", ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                        return y(d.y);
                    }))
                        .attr("height", ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                        return height - y(d.y) - margin.bottom;
                    }))
                        .attr("width", x.bandwidth() - x.paddingInner())
                        .style("fill", localThis.color)
                        .on("mouseover", ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                        /** @type {?} */
                        var yval = mouseover_callback(d.y);
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
                            .style("left", d3.event.pageX + 5 + "px")
                            .style("top", d3.event.pageY - 28 + "px");
                        d3.select(this)
                            .transition()
                            .duration(50)
                            .style("fill", ( /**
                     * @param {?} dt
                     * @return {?}
                     */function (dt) {
                            /** @type {?} */
                            var currentFill;
                            currentFill = hex2rgb(localThis.color);
                            // if (currentFill.includes('#')){
                            // } else {
                            //   currentFill = currentFill.slice(0, currentFill.length -2).slice(4).split(', ')
                            // }
                            /** @type {?} */
                            var darker = currentFill.map(( /**
                             * @param {?} item
                             * @return {?}
                             */function (item) {
                                // tslint:disable-next-line: radix
                                return parseInt(item) * .75;
                            }));
                            return "rgb(" + darker[0] + ", " + darker[1] + ", " + darker[2] + ")";
                        }));
                    }))
                        .on("mouseout", ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                        d3.select(this)
                            .transition()
                            .duration(100)
                            .style("fill", localThis.color);
                        tooltip
                            .transition()
                            .duration(300)
                            .style("opacity", 0);
                    }));
                }
            };
        BarChartComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'eikos-bar-chart',
                        template: "\n  <h2>{{title}}</h2>\n    <div style=\"height: 750px; width: 750px;\" >\n      <div [id]=\"propID\" style=\"width:100%;height:100%\">\n      </div>\n    </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        BarChartComponent.ctorParameters = function () { return []; };
        BarChartComponent.propDecorators = {
            data: [{ type: i0.Input }],
            propID: [{ type: i0.Input }],
            color: [{ type: i0.Input }],
            yAxisLabel: [{ type: i0.Input }],
            xAxisLabel: [{ type: i0.Input }],
            xAxisAngle: [{ type: i0.Input }],
            yAxisAngle: [{ type: i0.Input }],
            title: [{ type: i0.Input }]
        };
        return BarChartComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
             */ function () {
                /** @type {?} */
                var data = this.data;
                try {
                    data.sort(( /**
                     * @param {?} x
                     * @param {?} y
                     * @return {?}
                     */function (x, y) {
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
                if (min_zoom_mins === void 0) {
                    min_zoom_mins = 1;
                }
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
                if (min_zoom_mins === void 0) {
                    min_zoom_mins = 1;
                }
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
                    data = data.map(( /**
                     * @param {?} d
                     * @return {?}
                     */function (d) {
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
                var xMap = ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
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
                    xAxis.tickFormat(( /**
                     * @param {?} d
                     * @return {?}
                     */function (d) {
                        return localThis.isTime ? pretty_duration(60 * d) : d;
                    }));
                }
                /** @type {?} */
                var yScale = d3.scaleLinear()
                    .range([height, 0]);
                /** @type {?} */
                var yMap = ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                    return yScale(yValue(d));
                });
                /** @type {?} */
                var yAxis = d3.axisLeft()
                    .scale(yScale)
                    .tickSizeInner(-width)
                    .ticks(4);
                /** @type {?} */
                var max_value_size = Math.sqrt(d3.max(data, ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
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
                var zMap = ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) { return zScale(Math.sqrt(zValue(d))); });
                /** @type {?} */
                var cValue = ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
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
                    .style("fill", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    /** @type {?} */
                    var saveThisColor = color(cValue(d));
                    return saveThisColor;
                }))
                    .style("opacity", 0.75)
                    .on("mouseover", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
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
                    .on("mouseout", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
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
            { type: i0.Component, args: [{
                        selector: 'eikos-bubble-chart',
                        template: "\n<h2>{{title}}</h2>\n<div style=\"height: 750px; width: 750px;\" >\n    <div [id]=\"propID\" style=\"width:100%;height:100%\"> </div>\n</div>\n  "
                    }] }
        ];
        /** @nocollapse */
        BubbleChartComponent.ctorParameters = function () { return []; };
        BubbleChartComponent.propDecorators = {
            propID: [{ type: i0.Input }],
            data: [{ type: i0.Input }],
            title: [{ type: i0.Input }],
            isTime: [{ type: i0.Input }],
            isDate: [{ type: i0.Input }],
            themeColors: [{ type: i0.Input }],
            yAxisLabel: [{ type: i0.Input }],
            xAxisLabel: [{ type: i0.Input }]
        };
        return BubbleChartComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
                dataArray.forEach(( /**
                 * @param {?} el
                 * @return {?}
                 */function (el) { return data.push(Object.assign({}, el)); }));
                /** @type {?} */
                var parseDate = d3.timeParse('%Y-%m-%d');
                /** @type {?} */
                var formatDate = d3.timeFormat('%B %-d %Y');
                // https://github.com/d3/d3-time-format to change how this is formatted - leave the parseDate because that's for sorting the data
                if (typeof data[0].date === 'string') {
                    data.forEach(( /**
                     * @param {?} d
                     * @return {?}
                     */function (d) {
                        d.date = parseDate(d.date);
                    }));
                }
                data.sort(( /**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */function (a, b) {
                    return a.date - b.date;
                }));
                /** @type {?} */
                var detected_percent = d3.max(data, ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
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
                var xValue = ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                    return d.date;
                });
                /** @type {?} */
                var xScale = d3.scaleTime().range([0, width - margin.right]);
                /** @type {?} */
                var xMap = ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
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
                var yValue = ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                    return d.value;
                });
                /** @type {?} */
                var yScale = d3.scaleLinear().range([height, 0]);
                /** @type {?} */
                var yMap = ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
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
                var svg = d3.select(selection_string)
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                /** @type {?} */
                var tooltip = d3.select("body")
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
                    .on("mouseover", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
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
                    d3.select(this)
                        .transition()
                        .duration(50)
                        .style("fill", "black")
                        .attr("opacity", 1);
                }))
                    .on("mouseout", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    tooltip
                        .transition()
                        .duration(300)
                        .style("opacity", 0);
                    d3.select(this)
                        .transition()
                        .duration(50)
                        .attr("opacity", 0);
                }));
                svg
                    .selectAll(".tick")
                    .filter(( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return d === 0;
                }))
                    .remove();
            };
        LinePlotComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'eikos-line-plot',
                        template: "\n  <h2>{{title}}</h2>\n  <div style=\"height: 750px; width: 750px;\" >\n      <div [id]=\"propID\" style=\"width:100%;height:100%\"> </div>\n  </div>\n"
                    }] }
        ];
        /** @nocollapse */
        LinePlotComponent.ctorParameters = function () { return []; };
        LinePlotComponent.propDecorators = {
            propID: [{ type: i0.Input }],
            data: [{ type: i0.Input }],
            title: [{ type: i0.Input }],
            color: [{ type: i0.Input }],
            yAxisLabel: [{ type: i0.Input }],
            xAxisLabel: [{ type: i0.Input }]
        };
        return LinePlotComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
                    this.data.forEach(( /**
                     * @param {?} el
                     * @return {?}
                     */function (el) { _this.total += el['value']; }));
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
                    return [( /** @type {?} */('0x')) + hex[1] + hex[2] | 0, ( /** @type {?} */('0x')) + hex[3] + hex[4] | 0, ( /** @type {?} */('0x')) + hex[5] + hex[6] | 0];
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
                    .data([this.data], ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
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
                var tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "d3_visuals_tooltip " + this.propID + "_tooltip")
                    .style("opacity", 0);
                // create function that will be used to draw slices
                /** @type {?} */
                var pie = d3.pie()
                    .value(( /**
             * @param {?} d
             * @return {?}
             */function (d) { return d.value; }));
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
                arcs.on("mouseover", ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                    // calculate the percent of total for the slice
                    d3.select(this).selectAll('path').
                        attr('fill', ( /**
                 * @param {?} dt
                 * @return {?}
                 */function (dt) {
                        /** @type {?} */
                        var currentFill = this.attributes.fill.value;
                        currentFill = hex2rgb(currentFill);
                        // if (currentFill.includes('#')){
                        // } else {
                        //   currentFill = currentFill.slice(0, currentFill.length -2).slice(4).split(', ')
                        // }
                        /** @type {?} */
                        var darker = currentFill.map(( /**
                         * @param {?} item
                         * @return {?}
                         */function (item) {
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
                    .on("mouseout", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    d3.select(this).selectAll('path').
                        attr('fill', ( /**
                 * @param {?} dt
                 * @return {?}
                 */function (dt) {
                        /** @type {?} */
                        var label = dt.data ? dt.data.label : dt.label;
                        return localThis.savedColors[label];
                    }));
                }));
                /** @type {?} */
                var colors = this.colors;
                // add colors to each slice
                arcs.append("path")
                    .attr("fill", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
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
                        .data(this.data, ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                        return d.label;
                    }))
                        .enter()
                        .append("g")
                        .attr("class", "legend")
                        .attr("transform", ( /**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */function (d, i) { return "translate(30," + 25 * i + ")"; }));
                    legend.append("rect")
                        .attr("x", radius + 20)
                        .attr("y", -radius + 20)
                        .attr("width", 20)
                        .attr("height", 20)
                        .attr("fill", ( /**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */function (d, i) {
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
                        .text(( /**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */function (d, i) {
                        return localThis.data[i].label;
                    }));
                    legend.on('mouseover', ( /**
                     * @param {?} d
                     * @return {?}
                     */function (d) {
                        /** @type {?} */
                        var currentLabel = d.label;
                        d3.selectAll('g.slice path').data([d], ( /**
                         * @param {?} dt
                         * @return {?}
                         */function (dt) {
                            return dt.data ? dt.data.label : dt.label;
                        }))
                            .attr('fill', ( /**
                     * @param {?} df
                     * @return {?}
                     */function (df) {
                            if (df.label === currentLabel) {
                                /** @type {?} */
                                var currentFill = this.attributes.fill.value;
                                currentFill = hex2rgb(currentFill);
                                /** @type {?} */
                                var darker = currentFill.map(( /**
                                 * @param {?} item
                                 * @return {?}
                                 */function (item) {
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
                    legend.on('mouseout', ( /**
                     * @param {?} d
                     * @return {?}
                     */function (d) {
                        /** @type {?} */
                        var currentLabel = d.label;
                        d3.selectAll('g.slice path').data([d], ( /**
                         * @param {?} dt
                         * @return {?}
                         */function (dt) {
                            return dt.data ? dt.data.label : dt.label;
                        }))
                            .attr('fill', ( /**
                     * @param {?} df
                     * @return {?}
                     */function (df) {
                            return localThis.savedColors[df.label];
                        }));
                    }));
                }
            };
        PieChartComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'eikos-pie-chart',
                        template: "\n  <h2>{{title}}</h2>\n  <div style=\"height: 750px; width: 750px;\" >\n      <div [id]=\"propID\" style=\"width:100%;height:100%\"> </div>\n  </div>\n"
                    }] }
        ];
        /** @nocollapse */
        PieChartComponent.ctorParameters = function () { return []; };
        PieChartComponent.propDecorators = {
            propID: [{ type: i0.Input }],
            data: [{ type: i0.Input }],
            title: [{ type: i0.Input }],
            donutWidth: [{ type: i0.Input }],
            colors: [{ type: i0.Input }]
        };
        return PieChartComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PunchCardComponent = /** @class */ (function () {
        function PunchCardComponent() {
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
        PunchCardComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.drawPunchCard();
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        PunchCardComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                this.drawPunchCard();
            };
        /**
         * @return {?}
         */
        PunchCardComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.drawPunchCard();
            };
        /**
         * @param {?} day
         * @return {?}
         */
        PunchCardComponent.prototype.getDay = /**
         * @param {?} day
         * @return {?}
         */
            function (day) {
                /** @type {?} */
                var days = [
                    { name: 'Mon', value: 2, description: 'Monday' },
                    { name: 'Tue', value: 3, description: 'Tuesday' },
                    { name: 'Wed', value: 4, description: 'Wednesday' },
                    { name: 'Thu', value: 5, description: 'Thursday' },
                    { name: 'Fri', value: 6, description: 'Friday' },
                    { name: 'Sat', value: 7, description: 'Saturday' },
                    { name: 'Sun', value: 1, description: 'Sunday' }
                ];
                /** @type {?} */
                var result = days.filter(( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                    return d.name === day;
                }));
                return result[0].value;
            };
        /**
         * @param {?} day
         * @return {?}
         */
        PunchCardComponent.prototype.getDayName = /**
         * @param {?} day
         * @return {?}
         */
            function (day) {
                /** @type {?} */
                var days = [
                    { name: 'Mon', value: "1", description: 'Monday' },
                    { name: 'Tue', value: "2", description: 'Tuesday' },
                    { name: 'Wed', value: "3", description: 'Wednesday' },
                    { name: 'Thu', value: "4", description: 'Thursday' },
                    { name: 'Fri', value: "5", description: 'Friday' },
                    { name: 'Sat', value: "6", description: 'Saturday' },
                    { name: 'Sun', value: "0", description: 'Sunday' }
                ];
                /** @type {?} */
                var result = days.filter(( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                    return d.value === day;
                }));
                return result[0].name;
            };
        /**
         * @return {?}
         */
        PunchCardComponent.prototype.drawPunchCard = /**
         * @return {?}
         */
            function () {
                if (this.data === undefined) {
                    return;
                }
                // try {
                //   if (this.data.length === 0) { return; }
                // } catch (e) {
                //   return;
                // }
                /** @type {?} */
                var localThis = this;
                // This was needed for the Incident Set Modal Test to pass.
                /** @type {?} */
                var elementName = "#" + this.propID;
                if (document.querySelectorAll(elementName + " svg")[0] != null) {
                    document.querySelectorAll(elementName + " svg")[0].remove();
                }
                /** @type {?} */
                var data = JSON.parse(JSON.stringify(this.data));
                // deep copy
                /** @type {?} */
                var margin = { top: 40, right: 75, bottom: 40, left: 15 };
                /** @type {?} */
                var padding = 3;
                /** @type {?} */
                var xLabelHeight = 30;
                /** @type {?} */
                var yLabelWidth = 30;
                /** @type {?} */
                var borderWidth = 1;
                // const width = 500;
                // const height = 181;
                /** @type {?} */
                var element;
                /** @type {?} */
                var selected = document.querySelectorAll(elementName);
                if (selected[0] == null) {
                    element = [{ clientWidth: 1000, clientHeight: 500 }];
                }
                else {
                    element = selected[0];
                }
                /** @type {?} */
                var width = element.clientWidth - margin.left - margin.right - yLabelWidth;
                /** @type {?} */
                var height = element.clientHeight / 24 * 7 +
                    2 * xLabelHeight - margin.top - margin.bottom;
                //   if (this..changeHeight !== undefined ) {
                //       this..changeHeight(height + margin.top + margin.bottom + 2 * xLabelHeight);
                //  }
                /** @type {?} */
                var chart = d3.select(elementName)
                    .append("svg")
                    .attr("width", "100%")
                    .attr("data-height", "0.5678")
                    .attr("viewBox", "0 0 " + width / 2.1 + " " + height * 2)
                    .attr("preserveAspectRatio", "xMaxYMax meet")
                    // .attr("width", width + margin.left + margin.right + 2 * yLabelWidth)
                    // .attr("height", height + margin.top + margin.bottom + 2 * xLabelHeight)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                // array of all values in the data, for min maxing and length calculations
                /** @type {?} */
                var allValues = Array.prototype.concat.apply([], data.map(( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                    return d.hour_volumes;
                })));
                // finds longest array in data
                /** @type {?} */
                var maxWidth = d3.max(data.map(( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                    return d.hour_volumes.length;
                })));
                // maximum radius for bubble.
                /** @type {?} */
                var maxR = d3.min([
                    (width - yLabelWidth) / maxWidth,
                    (height - xLabelHeight) / data.length
                ]) / 2;
                // sort data and translate into human-readable
                data.sort(( /**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */function (a, b) {
                    parseInt(a["day_of_week"]) > parseInt(b["day_of_week"]);
                }));
                data.push(data.shift());
                if (data[0]["day_of_week"].length === 1) {
                    data = data.map(( /**
                     * @param {?} d
                     * @return {?}
                     */function (d) {
                        d["day_of_week"] = localThis.getDayName(d["day_of_week"]);
                        return d;
                    }));
                }
                // create labels
                /** @type {?} */
                var labelsX = this.labelsX;
                // calc total volumes per day, for sumsY label
                /** @type {?} */
                var sumsY = [];
                for (var i = 0; i < data.length; i++) {
                    /** @type {?} */
                    var sum = data[i]["hour_volumes"].reduce(( /**
                     * @param {?} acc
                     * @param {?} val
                     * @return {?}
                     */function (acc, val) {
                        return acc + val;
                    }), 0);
                    sumsY.push(sum);
                }
                // calc total volumes per hour, for sumsX label
                /** @type {?} */
                var sumsX = [];
                var _loop_1 = function (i) {
                    /** @type {?} */
                    var sum = data.reduce(( /**
                     * @param {?} acc
                     * @param {?} val
                     * @return {?}
                     */function (acc, val) {
                        return acc + val["hour_volumes"][i];
                    }), 0);
                    sumsX.push(sum);
                };
                for (var i = 0; i < data[0]["hour_volumes"].length; i++) {
                    _loop_1(i);
                }
                // this essentially scales radius values according to the maxR
                /** @type {?} */
                var sizeScale = ( /**
                 * @param {?} d
                 * @param {?} dataset
                 * @return {?}
                 */function (d, dataset) {
                    if (d === 0) {
                        return 0;
                    }
                    /** @type {?} */
                    var f = d3.scaleSqrt()
                        .domain([d3.min(dataset), d3.max(dataset)])
                        .rangeRound([2, maxR - padding]);
                    return f(d);
                });
                /** @type {?} */
                var colorScale = ( /**
                 * @param {?} d
                 * @param {?} dataset
                 * @return {?}
                 */function (d, dataset) {
                    /** @type {?} */
                    var f = d3.scaleLinear()
                        .domain([d3.min(dataset), d3.max(dataset)])
                        .range([localThis.colors[7], localThis.colors[0]]);
                    return f(d);
                });
                /** @type {?} */
                var colorScaleAxes = ( /**
                 * @param {?} d
                 * @param {?} dataset
                 * @return {?}
                 */function (d, dataset) {
                    /** @type {?} */
                    var f = d3.scaleLinear()
                        .domain([d3.min(dataset), d3.max(dataset)])
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
                var rows = chart.selectAll(".row").data(data, ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                    return d.day_of_week;
                }))
                    .enter()
                    .append("g")
                    .attr("class", "row")
                    .attr("transform", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return ("translate(" +
                        (yLabelWidth + 2 * maxR) +
                        "," +
                        (maxR * i * 2 + 3 * maxR + xLabelHeight) +
                        ")");
                }));
                // creating the elements that will hold and represent our data
                rows.selectAll("circle")
                    .data(( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return d.hour_volumes;
                }))
                    .enter()
                    .append("circle")
                    .attr("cy", 0)
                    .style("fill", "transparent")
                    .text(( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return d;
                }))
                    .attr("r", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return sizeScale(d, allValues);
                }))
                    .attr("cx", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return i * maxR * 2 + maxR;
                }))
                    .attr("shape-rendering", "auto")
                    .style("fill", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return colorScale(d, allValues);
                }));
                // adds labels
                /** @type {?} */
                var dotLabels = rows.selectAll(".dot-label").data(( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                    return d.hour_volumes.map(( /**
                     * @param {?} v
                     * @param {?} idx
                     * @return {?}
                     */function (v, idx) {
                        return [v, d.day_of_week, idx];
                    }));
                }))
                    .enter()
                    .append("g")
                    .attr("class", "dot-label")
                    .on("mouseover", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    /** @type {?} */
                    var selection = d3.select(this);
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
                    .on("mouseout", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    /** @type {?} */
                    var selection = d3.select(this);
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
                    .attr("r", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return maxR;
                }))
                    .attr("cx", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return maxR;
                }))
                    .attr("cy", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
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
                    .attr("transform", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return "translate(" + i * maxR * 2 + "," + -maxR + ")";
                }))
                    .select("text")
                    .text(( /**
             * @param {?} d
             * @return {?}
             */function (d) {
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
                    .text(( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return d;
                }))
                    .attr("x", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return maxR * i * 2 + 3 * maxR + yLabelWidth;
                }))
                    .style("fill-opacity", 1);
                // creates labels for the y axis (day of week)
                /** @type {?} */
                var yLabels = chart.selectAll(".yLabel")
                    .data(data, ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return d.day_of_week;
                }))
                    // y label creation
                    .enter()
                    .append("text")
                    .text(( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return d.day_of_week;
                }))
                    .attr("x", yLabelWidth)
                    .attr("class", "yLabel")
                    .style("text-anchor", "end")
                    .style("fill-opacity", 0)
                    .attr("y", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return maxR * i * 2 + 3 * maxR + xLabelHeight;
                }))
                    .attr("transform", "translate(-6," + maxR / 2.5 + ")")
                    .style("fill-opacity", 1);
                // append sums to rows
                chart.selectAll(".sums-y")
                    .data(sumsY)
                    .enter()
                    .append("circle")
                    .text(( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return d;
                }))
                    .attr("cy", 0)
                    .attr("class", "sums-y")
                    .style("fill", "#ffffff")
                    .style("fill-opacity", 0)
                    .attr("cy", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return maxR * i * 2 + 3 * maxR + xLabelHeight;
                }))
                    .attr("r", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return sizeScale(d, sumsY);
                }))
                    .attr("cx", yLabelWidth + maxR)
                    .attr("shape-rendering", "auto")
                    .style("fill", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return colorScaleAxes(d, sumsY);
                }))
                    .style("fill-opacity", 1)
                    .style("stroke", "#9e9999")
                    .style("stroke-width", 1);
                /** @type {?} */
                var sumsYValues = chart.selectAll(".sums-y-value").data(sumsY)
                    // //adds mouseover transition
                    .enter()
                    .append("g")
                    .attr("class", "sums-y-value")
                    .on("mouseover", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    /** @type {?} */
                    var selection = d3.select(this);
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
                    .on("mouseout", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    /** @type {?} */
                    var selection = d3.select(this);
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
                    .attr("r", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return maxR;
                }))
                    .attr("cx", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return maxR;
                }))
                    .attr("cy", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
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
                    .attr("transform", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return ("translate(" +
                        yLabelWidth +
                        "," +
                        (xLabelHeight + 2 * maxR + 2 * maxR * i) +
                        ")");
                }))
                    .select("text")
                    .text(( /**
             * @param {?} d
             * @return {?}
             */function (d) {
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
                var sumsXAxis = chart.selectAll(".sums-x").data(sumsX);
                // styling for the labels
                sumsXAxis
                    .enter()
                    .append("circle")
                    .text(( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return d;
                }))
                    .attr("cy", 0)
                    .attr("class", "sums-x")
                    .style("fill", "#ffffff")
                    .style("fill-opacity", 0)
                    .attr("cy", xLabelHeight + maxR)
                    .attr("r", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return sizeScale(d, sumsX);
                }))
                    .attr("cx", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return yLabelWidth + 3 * maxR + maxR * i * 2;
                }))
                    .attr("shape-rendering", "auto")
                    .style("fill", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return colorScaleAxes(d, sumsX);
                }))
                    .style("fill-opacity", 1)
                    .style("stroke", "#9e9999")
                    .style("stroke-width", 1);
                /** @type {?} */
                var sumsXValues = chart.selectAll(".sums-x-value").data(sumsX)
                    // //adds mouseover transition
                    .enter()
                    .append("g")
                    .attr("class", "sums-x-value")
                    .on("mouseover", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    /** @type {?} */
                    var selection = d3.select(this);
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
                    .on("mouseout", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    /** @type {?} */
                    var selection = d3.select(this);
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
                    .attr("r", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    return maxR;
                }))
                    .attr("cx", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return maxR;
                }))
                    .attr("cy", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
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
                    .attr("transform", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return ("translate(" +
                        (yLabelWidth + 2 * maxR * i + 2 * maxR) +
                        ", " +
                        xLabelHeight +
                        ")");
                }))
                    .select("text")
                    .text(( /**
             * @param {?} d
             * @return {?}
             */function (d) {
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
                    .attr("x1", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return maxR * i * 2 + yLabelWidth + 2 * maxR;
                }))
                    .attr("x2", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return maxR * i * 2 + yLabelWidth + 2 * maxR;
                }))
                    .attr("y1", xLabelHeight + borderWidth / 2)
                    .attr("y2", height + 2 * maxR)
                    .style("stroke-opacity", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return i ? 0.5 : 0;
                }));
                chart.selectAll(".horiz")
                    .data(data, ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
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
                    .attr("y1", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return i * maxR * 2 + xLabelHeight + 2 * maxR;
                }))
                    .attr("y2", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return i * maxR * 2 + xLabelHeight + 2 * maxR;
                }))
                    .style("stroke-opacity", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return i ? 0.5 : 0;
                }));
                // outer Border Bottom
                chart
                    .append("line")
                    .attr("x1", yLabelWidth + borderWidth / 2)
                    .attr("y1", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return (i * maxR * 2 + 2 * maxR) + height;
                }))
                    .attr("x2", maxR * 25 * 2 + yLabelWidth)
                    .attr("y2", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return (i * maxR * 2 + 2 * maxR) + height;
                }))
                    .attr("stroke-width", 2)
                    .attr("shape-rendering", "crispEdges")
                    .attr("stroke", "grey")
                    .attr('class', 'punch-border');
                // outer border right
                chart
                    .append("line")
                    .attr("x1", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return (maxR * 25 * 2) + yLabelWidth; //+ width;
                }))
                    .attr("x2", ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return (maxR * 25 * 2) + yLabelWidth; //+ width;
                }))
                    .attr("y1", xLabelHeight + borderWidth / 2)
                    .attr("y2", height + 2 * maxR)
                    .attr("stroke-width", 2)
                    .style("shape-rendering", "crispEdges")
                    .attr("stroke", "grey")
                    .attr('class', 'punch-border');
                // Emit ready event.
            };
        PunchCardComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'eikos-punch-card',
                        template: "\n  <h2>{{title}}</h2>\n  <div style=\"height: 750px; width: 1500px; margin-left: 3%\" >\n      <div [id]=\"propID\" style=\"width:100%;height:100%\"> </div>\n  </div>\n",
                        styles: ["\n    .punch-border {\n      stroke: grey\n    }\n  "]
                    }] }
        ];
        /** @nocollapse */
        PunchCardComponent.ctorParameters = function () { return []; };
        PunchCardComponent.propDecorators = {
            propID: [{ type: i0.Input }],
            data: [{ type: i0.Input }],
            title: [{ type: i0.Input }],
            axisColors: [{ type: i0.Input }],
            axisLabel: [{ type: i0.Input }],
            colors: [{ type: i0.Input }]
        };
        return PunchCardComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SunburstComponent = /** @class */ (function () {
        function SunburstComponent() {
            this.propID = 'line';
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
        SunburstComponent.prototype.ngOnInit =
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
                this.drawSunburst();
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        SunburstComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                this.drawSunburst();
            };
        /**
         * @return {?}
         */
        SunburstComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.drawSunburst();
            };
        /**
         * @return {?}
         */
        SunburstComponent.prototype.drawSunburst = /**
         * @return {?}
         */
            function () {
                // let localThis = this;
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
                    element = [{ clientWidth: 500, clientHeight: 500 }];
                }
                else {
                    element = selected[0];
                }
                /** @type {?} */
                var width = element.clientWidth;
                /** @type {?} */
                var height = element.clientHeight;
                // Account for panel heading height if it exists.
                if (this.title) {
                    height -= 40;
                }
                if (height === undefined || height === 0) {
                    height = width / 4;
                }
                /** @type {?} */
                var radius = Math.min(width, height) / 2;
                /** @type {?} */
                var color = d3.scaleOrdinal(d3.schemePaired);
                /** @type {?} */
                var formatNumber = d3.format(",d");
                /** @type {?} */
                var x = d3.scaleLinear()
                    .range([0, 2 * Math.PI]);
                /** @type {?} */
                var y = d3.scaleSqrt()
                    .range([0, radius]);
                /** @type {?} */
                var partition = d3.partition();
                /** @type {?} */
                var arc = d3.arc()
                    .startAngle(( /**
             * @param {?} d
             * @return {?}
             */function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); }))
                    .endAngle(( /**
             * @param {?} d
             * @return {?}
             */function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); }))
                    .innerRadius(( /**
             * @param {?} d
             * @return {?}
             */function (d) { return Math.max(0, y(d.y0)); }))
                    .outerRadius(( /**
             * @param {?} d
             * @return {?}
             */function (d) { return Math.max(0, y(d.y1)); }));
                /** @type {?} */
                var svg = d3.select(selection_string).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");
                /** @type {?} */
                var tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "d3_visuals_tooltip " + this.propID + "_tooltip")
                    .style("opacity", 0);
                /** @type {?} */
                var root = d3.hierarchy(this.data[0]);
                root.sum(( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) { return d.size; }));
                /** @type {?} */
                var nodes = partition(root).descendants();
                svg.selectAll("path")
                    .data(nodes)
                    .enter().append("path")
                    .attr("d", arc)
                    .attr('class', 'segment')
                    .style("fill", ( /**
             * @param {?} d
             * @return {?}
             */function (d) { return color((d.children ? d : d.parent).data.name); }))
                    .on("click", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    click(d);
                }))
                    .on("mouseover", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    tooltip.transition()
                        .duration(100)
                        .style("opacity", 1);
                    tooltip
                        .html("Name: " + d.data.name + "<br/>" + (d.data.size ? "Value: " + d.data.size : ""))
                        .style("left", d3.event.pageX + 5 + "px")
                        .style("top", d3.event.pageY - 28 + "px");
                }))
                    .on("mouseout", ( /**
             * @param {?} d
             * @return {?}
             */function (d) {
                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                }))
                    .append("title")
                    .text(( /**
             * @param {?} d
             * @return {?}
             */function (d) { return d.data.name + "\n" + formatNumber(d.value); }));
                /**
                 * @param {?} d
                 * @return {?}
                 */
                function click(d) {
                    svg.transition()
                        .duration(750)
                        .tween("scale", ( /**
                 * @return {?}
                 */function () {
                        /** @type {?} */
                        var xd = d3.interpolate(x.domain(), [d.x0, d.x1]);
                        /** @type {?} */
                        var yd = d3.interpolate(y.domain(), [d.y0, 1]);
                        /** @type {?} */
                        var yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
                        return ( /**
                         * @param {?} t
                         * @return {?}
                         */function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); });
                    }))
                        .selectAll("path")
                        .attrTween("d", ( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                        return ( /**
                         * @return {?}
                         */function () { return arc(d); });
                    }));
                }
                d3.select(self.frameElement).style("height", height + "px");
            };
        SunburstComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'eikos-sunburst',
                        template: "\n  <h2>{{title}}</h2>\n  <div style=\"height: 750px; width: 750px;\" >\n      <div [id]=\"propID\" style=\"width:100%;height:100%\"> </div>\n  </div>\n"
                    }] }
        ];
        /** @nocollapse */
        SunburstComponent.ctorParameters = function () { return []; };
        SunburstComponent.propDecorators = {
            propID: [{ type: i0.Input }],
            data: [{ type: i0.Input }],
            title: [{ type: i0.Input }]
        };
        return SunburstComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgcatalystModule = /** @class */ (function () {
        function NgcatalystModule() {
        }
        NgcatalystModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [NgcatalystComponent,
                            BarChartComponent, BubbleChartComponent, LinePlotComponent, PieChartComponent, PunchCardComponent, SunburstComponent],
                        imports: [],
                        exports: [NgcatalystComponent,
                            BarChartComponent, BubbleChartComponent, LinePlotComponent, PieChartComponent, PunchCardComponent, SunburstComponent]
                    },] }
        ];
        return NgcatalystModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgcatalystService = NgcatalystService;
    exports.NgcatalystComponent = NgcatalystComponent;
    exports.NgcatalystModule = NgcatalystModule;
    exports.BarChartComponent = BarChartComponent;
    exports.BubbleChartComponent = BubbleChartComponent;
    exports.LinePlotComponent = LinePlotComponent;
    exports.PieChartComponent = PieChartComponent;
    exports.PunchCardComponent = PunchCardComponent;
    exports.SunburstComponent = SunburstComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngcatalyst.umd.js.map