/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
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
        var result = days.filter((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
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
        var result = days.filter((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
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
        var chart = d3
            .select(elementName)
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
        var allValues = Array.prototype.concat.apply([], data.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.hour_volumes;
        })));
        // finds longest array in data
        /** @type {?} */
        var maxWidth = d3.max(data.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.hour_volumes.length;
        })));
        // maximum radius for bubble.
        /** @type {?} */
        var maxR = d3.min([
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
        var labelsX = this.labelsX;
        // calc total volumes per day, for sumsY label
        /** @type {?} */
        var sumsY = [];
        for (var i = 0; i < data.length; i++) {
            /** @type {?} */
            var sum = data[i]["hour_volumes"].reduce((/**
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
        var sumsX = [];
        var _loop_1 = function (i) {
            /** @type {?} */
            var sum = data.reduce((/**
             * @param {?} acc
             * @param {?} val
             * @return {?}
             */
            function (acc, val) {
                return acc + val["hour_volumes"][i];
            }), 0);
            sumsX.push(sum);
        };
        for (var i = 0; i < data[0]["hour_volumes"].length; i++) {
            _loop_1(i);
        }
        // this essentially scales radius values according to the maxR
        /** @type {?} */
        var sizeScale = (/**
         * @param {?} d
         * @param {?} dataset
         * @return {?}
         */
        function (d, dataset) {
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
        var colorScale = (/**
         * @param {?} d
         * @param {?} dataset
         * @return {?}
         */
        function (d, dataset) {
            /** @type {?} */
            var f = d3.scaleLinear()
                .domain([d3.min(dataset), d3.max(dataset)])
                .range([localThis.colors[7], localThis.colors[0]]);
            return f(d);
        });
        /** @type {?} */
        var colorScaleAxes = (/**
         * @param {?} d
         * @param {?} dataset
         * @return {?}
         */
        function (d, dataset) {
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
        var rows = chart.selectAll(".row").data(data, (/**
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
        var dotLabels = rows.selectAll(".dot-label").data((/**
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
            .on("mouseout", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
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
        var yLabels = chart.selectAll(".yLabel")
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
        var sumsYValues = chart.selectAll(".sums-y-value").data(sumsY)
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
            .on("mouseout", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
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
        var sumsXAxis = chart.selectAll(".sums-x").data(sumsX);
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
        var sumsXValues = chart.selectAll(".sums-x-value").data(sumsX)
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
            .on("mouseout", (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
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
    };
    PunchCardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'eikos-punch-card',
                    template: "\n  <h2>{{title}}</h2>\n  <div style=\"height: 750px; width: 1500px; margin-left: 3%\" >\n      <div [id]=\"propID\" style=\"width:100%;height:100%\"> </div>\n  </div>\n",
                    styles: ["\n    .punch-border {\n      stroke: grey\n    }\n  "]
                }] }
    ];
    /** @nocollapse */
    PunchCardComponent.ctorParameters = function () { return []; };
    PunchCardComponent.propDecorators = {
        propID: [{ type: Input }],
        data: [{ type: Input }],
        title: [{ type: Input }],
        axisColors: [{ type: Input }],
        axisLabel: [{ type: Input }],
        colors: [{ type: Input }]
    };
    return PunchCardComponent;
}());
export { PunchCardComponent };
if (false) {
    /** @type {?} */
    PunchCardComponent.prototype.propID;
    /** @type {?} */
    PunchCardComponent.prototype.data;
    /** @type {?} */
    PunchCardComponent.prototype.title;
    /** @type {?} */
    PunchCardComponent.prototype.axisColors;
    /** @type {?} */
    PunchCardComponent.prototype.axisLabel;
    /** @type {?} */
    PunchCardComponent.prototype.colors;
    /** @type {?} */
    PunchCardComponent.prototype.labelsX;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVuY2gtY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ2NhdGFseXN0LyIsInNvdXJjZXMiOlsibGliL3B1bmNoLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBMkMsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFHekI7SUF3QkU7UUFSUyxXQUFNLEdBQUcsT0FBTyxDQUFDO1FBR2pCLGVBQVUsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwQyxjQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ25CLFdBQU0sR0FBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztRQUVsSSxZQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pKLENBQUM7Ozs7SUFFakIscUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsd0NBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsNENBQWU7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VUFBVTtRQUNqRCxDQUFDLEVBQUM7YUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2FBQzFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDN0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7YUFDdkIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLFlBQVksQ0FBQzthQUN0QyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQzthQUN0QixJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRWpDLG9CQUFvQjtJQUN0QixDQUFDOztnQkEvdUJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQU01QixRQUFRLEVBQUUsMktBS1g7NkJBVlUsc0RBSVI7aUJBT0Y7Ozs7O3lCQUdFLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzZCQUNMLEtBQUs7NEJBQ0wsS0FBSzt5QkFDTCxLQUFLOztJQTJ0QlIseUJBQUM7Q0FBQSxBQWh2QkQsSUFndkJDO1NBbHVCWSxrQkFBa0I7OztJQUU3QixvQ0FBMEI7O0lBQzFCLGtDQUF5RDs7SUFDekQsbUNBQXVCOztJQUN2Qix3Q0FBNkM7O0lBQzdDLHVDQUE0Qjs7SUFDNUIsb0NBQWtJOztJQUVsSSxxQ0FBaUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuaW1wb3J0IGx1eG9uIGZyb20gJ2x1eG9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZWlrb3MtcHVuY2gtY2FyZCcsXG4gIHN0eWxlczogW2BcbiAgICAucHVuY2gtYm9yZGVyIHtcbiAgICAgIHN0cm9rZTogZ3JleVxuICAgIH1cbiAgYF0sXG4gIHRlbXBsYXRlOiBgXG4gIDxoMj57e3RpdGxlfX08L2gyPlxuICA8ZGl2IHN0eWxlPVwiaGVpZ2h0OiA3NTBweDsgd2lkdGg6IDE1MDBweDsgbWFyZ2luLWxlZnQ6IDMlXCIgPlxuICAgICAgPGRpdiBbaWRdPVwicHJvcElEXCIgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDoxMDAlXCI+IDwvZGl2PlxuICA8L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgUHVuY2hDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHByb3BJRCA9ICdwdW5jaCc7XG4gIEBJbnB1dCgpIGRhdGE6IFt7ZGF5X29mX3dlZWs6IHN0cmluZywgaG91cl92b2x1bWVzOiBbXX1dO1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSBheGlzQ29sb3JzID0gW1wiI2U1YjFhNVwiLCBcIiNmZjJiMmJcIl07XG4gIEBJbnB1dCgpIGF4aXNMYWJlbCA9ICdEYXRlJztcbiAgQElucHV0KCkgY29sb3JzID0gIFtcIiMwODFBNEVcIiwgXCIjMDkyMzY5XCIsIFwiIzFBNjQ5RlwiLCBcIiMyNDg1QjRcIiwgXCIjMkRBOEM5XCIsIFwiIzVEQzFEMFwiLCBcIiM5QUQ1Q0RcIiwgXCIjRDVFOUNCXCIsIFwiIzY0QjVGNlwiLCBcIiMwMTU3OUJcIl07XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgbGFiZWxzWCA9IFtcIjEyYVwiLCBcIjFhXCIsIFwiMmFcIiwgXCIzYVwiLCBcIjRhXCIsIFwiNWFcIiwgXCI2YVwiLCBcIjdhXCIsIFwiOGFcIiwgXCI5YVwiLCBcIjEwYVwiLCBcIjExYVwiLCBcIjEycFwiLCBcIjFwXCIsIFwiMnBcIiwgXCIzcFwiLCBcIjRwXCIsIFwiNXBcIiwgXCI2cFwiLCBcIjdwXCIsIFwiOHBcIiwgXCI5cFwiLCBcIjEwcFwiLCBcIjExcFwiXTtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRyYXdQdW5jaENhcmQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmRyYXdQdW5jaENhcmQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRyYXdQdW5jaENhcmQoKTtcbiAgfVxuXG4gIGdldERheSAoZGF5KSB7XG4gICAgY29uc3QgZGF5cyA9IFtcbiAgICAgICAgeyBuYW1lOiAnTW9uJywgdmFsdWU6IDIsIGRlc2NyaXB0aW9uOiAnTW9uZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdUdWUnLCB2YWx1ZTogMywgZGVzY3JpcHRpb246ICdUdWVzZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdXZWQnLCB2YWx1ZTogNCwgZGVzY3JpcHRpb246ICdXZWRuZXNkYXknIH0sXG4gICAgICAgIHsgbmFtZTogJ1RodScsIHZhbHVlOiA1LCBkZXNjcmlwdGlvbjogJ1RodXJzZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdGcmknLCB2YWx1ZTogNiwgZGVzY3JpcHRpb246ICdGcmlkYXknIH0sXG4gICAgICAgIHsgbmFtZTogJ1NhdCcsIHZhbHVlOiA3LCBkZXNjcmlwdGlvbjogJ1NhdHVyZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdTdW4nLCB2YWx1ZTogMSwgZGVzY3JpcHRpb246ICdTdW5kYXknIH1cbiAgICBdO1xuICAgIGNvbnN0IHJlc3VsdCA9IGRheXMuZmlsdGVyKGQgPT4ge1xuICAgICAgcmV0dXJuIGQubmFtZSA9PT0gZGF5O1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRbMF0udmFsdWU7XG4gIH1cblxuICBnZXREYXlOYW1lIChkYXkpIHtcbiAgICBjb25zdCBkYXlzID0gW1xuICAgICAgICB7IG5hbWU6ICdNb24nLCB2YWx1ZTogXCIxXCIsIGRlc2NyaXB0aW9uOiAnTW9uZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdUdWUnLCB2YWx1ZTogXCIyXCIsIGRlc2NyaXB0aW9uOiAnVHVlc2RheScgfSxcbiAgICAgICAgeyBuYW1lOiAnV2VkJywgdmFsdWU6IFwiM1wiLCBkZXNjcmlwdGlvbjogJ1dlZG5lc2RheScgfSxcbiAgICAgICAgeyBuYW1lOiAnVGh1JywgdmFsdWU6IFwiNFwiLCBkZXNjcmlwdGlvbjogJ1RodXJzZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdGcmknLCB2YWx1ZTogXCI1XCIsIGRlc2NyaXB0aW9uOiAnRnJpZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdTYXQnLCB2YWx1ZTogXCI2XCIsIGRlc2NyaXB0aW9uOiAnU2F0dXJkYXknIH0sXG4gICAgICAgIHsgbmFtZTogJ1N1bicsIHZhbHVlOiBcIjBcIiwgZGVzY3JpcHRpb246ICdTdW5kYXknIH1cbiAgICBdO1xuICAgIGNvbnN0IHJlc3VsdCA9IGRheXMuZmlsdGVyKGQgPT4ge1xuICAgICAgcmV0dXJuIGQudmFsdWUgPT09IGRheTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHRbMF0ubmFtZTtcbiAgfVxuXG4gIGRyYXdQdW5jaENhcmQoKSB7XG4gICAgaWYgKHRoaXMuZGF0YSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxuICAgICAgLy8gdHJ5IHtcbiAgICAgIC8vICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICAvLyB9IGNhdGNoIChlKSB7XG4gICAgICAvLyAgIHJldHVybjtcbiAgICAgIC8vIH1cblxuICAgIGNvbnN0IGxvY2FsVGhpcyA9IHRoaXM7XG4gICAgLy8gVGhpcyB3YXMgbmVlZGVkIGZvciB0aGUgSW5jaWRlbnQgU2V0IE1vZGFsIFRlc3QgdG8gcGFzcy5cblxuICAgIGNvbnN0IGVsZW1lbnROYW1lID0gXCIjXCIgKyB0aGlzLnByb3BJRDtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50TmFtZSArIFwiIHN2Z1wiKVswXSAhPSBudWxsKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnROYW1lICsgXCIgc3ZnXCIpWzBdLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpKTsgLy8gZGVlcCBjb3B5XG5cblxuICAgIGNvbnN0IG1hcmdpbiA9IHsgdG9wOiA0MCwgcmlnaHQ6IDc1LCBib3R0b206IDQwLCBsZWZ0OiAxNSB9O1xuICAgIGNvbnN0IHBhZGRpbmcgPSAzO1xuICAgIGNvbnN0IHhMYWJlbEhlaWdodCA9IDMwO1xuICAgIGNvbnN0IHlMYWJlbFdpZHRoID0gMzA7XG4gICAgY29uc3QgYm9yZGVyV2lkdGggPSAxO1xuICAgIC8vIGNvbnN0IHdpZHRoID0gNTAwO1xuICAgIC8vIGNvbnN0IGhlaWdodCA9IDE4MTtcblxuICAgIGxldCBlbGVtZW50OiBhbnk7XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudE5hbWUpO1xuXG4gICAgaWYgKHNlbGVjdGVkWzBdID09IG51bGwpIHtcbiAgICAgIGVsZW1lbnQgPSBbe2NsaWVudFdpZHRoOiAxMDAwLCBjbGllbnRIZWlnaHQ6IDUwMH1dO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIGVsZW1lbnQgPSBzZWxlY3RlZFswXTtcbiAgICB9XG5cbiAgICBjb25zdCB3aWR0aCA9XG4gICAgICBlbGVtZW50LmNsaWVudFdpZHRoIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQgLSB5TGFiZWxXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPVxuICAgIGVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gMjQgKiA3ICtcbiAgICAgIDIgKiB4TGFiZWxIZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxuLy8gICBpZiAodGhpcy4uY2hhbmdlSGVpZ2h0ICE9PSB1bmRlZmluZWQgKSB7XG4vLyAgICAgICB0aGlzLi5jaGFuZ2VIZWlnaHQoaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20gKyAyICogeExhYmVsSGVpZ2h0KTtcbi8vICB9XG5cbiAgICBjb25zdCBjaGFydCA9IGQzXG4gICAgICAuc2VsZWN0KGVsZW1lbnROYW1lKVxuICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgIC5hdHRyKFwiZGF0YS1oZWlnaHRcIiwgXCIwLjU2NzhcIilcbiAgICAgIC5hdHRyKFwidmlld0JveFwiLCBgMCAwICR7d2lkdGggLyAyLjF9ICR7aGVpZ2h0ICogMn1gKVxuICAgICAgLmF0dHIoXCJwcmVzZXJ2ZUFzcGVjdFJhdGlvXCIsIFwieE1heFlNYXggbWVldFwiKVxuICAgICAgLy8gLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0ICsgMiAqIHlMYWJlbFdpZHRoKVxuICAgICAgLy8gLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20gKyAyICogeExhYmVsSGVpZ2h0KVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIixcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XG5cbiAgICAvLyBhcnJheSBvZiBhbGwgdmFsdWVzIGluIHRoZSBkYXRhLCBmb3IgbWluIG1heGluZyBhbmQgbGVuZ3RoIGNhbGN1bGF0aW9uc1xuICAgIGNvbnN0IGFsbFZhbHVlcyA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoXG4gICAgICBbXSxcbiAgICAgIGRhdGEubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuaG91cl92b2x1bWVzO1xuICAgICAgfSlcbiAgICApO1xuICAgIC8vIGZpbmRzIGxvbmdlc3QgYXJyYXkgaW4gZGF0YVxuICAgIGNvbnN0IG1heFdpZHRoID0gZDMubWF4KFxuICAgICAgZGF0YS5tYXAoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5ob3VyX3ZvbHVtZXMubGVuZ3RoO1xuICAgICAgfSlcbiAgICApO1xuICAgIC8vIG1heGltdW0gcmFkaXVzIGZvciBidWJibGUuXG4gICAgY29uc3QgbWF4UiA9XG4gICAgICBkMy5taW4oW1xuICAgICAgICAod2lkdGggLSB5TGFiZWxXaWR0aCkgLyBtYXhXaWR0aCxcbiAgICAgICAgKGhlaWdodCAtIHhMYWJlbEhlaWdodCkgLyBkYXRhLmxlbmd0aFxuICAgICAgXSkgLyAyO1xuXG4gICAgLy8gc29ydCBkYXRhIGFuZCB0cmFuc2xhdGUgaW50byBodW1hbi1yZWFkYWJsZVxuICAgIGRhdGEuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICBwYXJzZUludChhW1wiZGF5X29mX3dlZWtcIl0pID4gcGFyc2VJbnQoYltcImRheV9vZl93ZWVrXCJdKTtcbiAgICB9KTtcblxuICAgIGRhdGEucHVzaChkYXRhLnNoaWZ0KCkpO1xuXG4gICAgaWYgKGRhdGFbMF1bXCJkYXlfb2Zfd2Vla1wiXS5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRhdGEgPSBkYXRhLm1hcChmdW5jdGlvbihkKSB7XG4gICAgICAgIGRbXCJkYXlfb2Zfd2Vla1wiXSA9IGxvY2FsVGhpcy5nZXREYXlOYW1lKGRbXCJkYXlfb2Zfd2Vla1wiXSk7XG4gICAgICAgIHJldHVybiBkO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGxhYmVsc1xuICAgIGNvbnN0IGxhYmVsc1ggPSB0aGlzLmxhYmVsc1g7XG5cbiAgICAvLyBjYWxjIHRvdGFsIHZvbHVtZXMgcGVyIGRheSwgZm9yIHN1bXNZIGxhYmVsXG4gICAgY29uc3Qgc3Vtc1kgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHN1bSA9IGRhdGFbaV1bXCJob3VyX3ZvbHVtZXNcIl0ucmVkdWNlKGZ1bmN0aW9uKGFjYywgdmFsKSB7XG4gICAgICAgIHJldHVybiBhY2MgKyB2YWw7XG4gICAgICB9LCAwKTtcbiAgICAgIHN1bXNZLnB1c2goc3VtKTtcbiAgICB9XG5cbiAgICAvLyBjYWxjIHRvdGFsIHZvbHVtZXMgcGVyIGhvdXIsIGZvciBzdW1zWCBsYWJlbFxuICAgIGNvbnN0IHN1bXNYID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhWzBdW1wiaG91cl92b2x1bWVzXCJdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzdW0gPSBkYXRhLnJlZHVjZShmdW5jdGlvbihhY2MsIHZhbCkge1xuICAgICAgICByZXR1cm4gYWNjICsgdmFsW1wiaG91cl92b2x1bWVzXCJdW2ldO1xuICAgICAgfSwgMCk7XG4gICAgICBzdW1zWC5wdXNoKHN1bSk7XG4gICAgfVxuXG4gICAgLy8gdGhpcyBlc3NlbnRpYWxseSBzY2FsZXMgcmFkaXVzIHZhbHVlcyBhY2NvcmRpbmcgdG8gdGhlIG1heFJcbiAgICBjb25zdCBzaXplU2NhbGUgPSBmdW5jdGlvbihkLCBkYXRhc2V0KSB7XG4gICAgICBpZiAoZCA9PT0gMCkgeyByZXR1cm4gMDsgfVxuICAgICAgY29uc3QgZiA9IGQzLnNjYWxlU3FydCgpXG4gICAgICAgIC5kb21haW4oW2QzLm1pbihkYXRhc2V0KSwgZDMubWF4KGRhdGFzZXQpXSlcbiAgICAgICAgLnJhbmdlUm91bmQoWzIsIG1heFIgLSBwYWRkaW5nXSk7XG4gICAgICByZXR1cm4gZihkKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29sb3JTY2FsZSA9IGZ1bmN0aW9uKGQsIGRhdGFzZXQpIHtcbiAgICAgIGNvbnN0IGYgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oW2QzLm1pbihkYXRhc2V0KSwgZDMubWF4KGRhdGFzZXQpXSlcbiAgICAgICAgLnJhbmdlKFtsb2NhbFRoaXMuY29sb3JzWzddLCBsb2NhbFRoaXMuY29sb3JzWzBdXSk7XG5cbiAgICAgIHJldHVybiBmKGQpO1xuICAgIH07XG5cbiAgICBjb25zdCBjb2xvclNjYWxlQXhlcyA9IGZ1bmN0aW9uKGQsIGRhdGFzZXQpIHtcbiAgICAgIGNvbnN0IGYgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oW2QzLm1pbihkYXRhc2V0KSwgZDMubWF4KGRhdGFzZXQpXSlcbiAgICAgICAgLnJhbmdlKGxvY2FsVGhpcy5heGlzQ29sb3JzKTtcbiAgICAgIHJldHVybiBmKGQpO1xuICAgIH07XG5cbiAgICAvLyB5QXhpcyBCb3JkZXJcbiAgICBjaGFydFxuICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgIC5hdHRyKFwieFwiLCB5TGFiZWxXaWR0aClcbiAgICAgIC5hdHRyKFwieVwiLCB4TGFiZWxIZWlnaHQgKyAyICogbWF4UilcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgMiAqIG1heFIpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgLSB4TGFiZWxIZWlnaHQpXG4gICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAyKVxuICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJncmV5XCIpXG4gICAgICAuYXR0cihcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgICAgLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJjcmlzcEVkZ2VzXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwicHVuY2gtYm9yZGVyXCIpO1xuICAgIC8vIHhBeGlzIEJvcmRlclxuICAgIGNoYXJ0XG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIHlMYWJlbFdpZHRoICsgMiAqIG1heFIpXG4gICAgICAuYXR0cihcInlcIiwgeExhYmVsSGVpZ2h0KVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBtYXhSICogMjQgKiAyKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgMiAqIG1heFIpXG4gICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAyKVxuICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJncmV5XCIpXG4gICAgICAuYXR0cihcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgICAgLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJjcmlzcEVkZ2VzXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwicHVuY2gtYm9yZGVyLCBmb28tYmFyXCIpO1xuXG4gICAgLy8gY3JlYXRlcyByb3dzIGFjY29yZGluZyB0byBkYXRhIGxhYmVsc1xuICAgIGNvbnN0IHJvd3MgPSBjaGFydC5zZWxlY3RBbGwoXCIucm93XCIpLmRhdGEoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5kYXlfb2Zfd2VlaztcbiAgICAgIH0pXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJyb3dcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBcInRyYW5zbGF0ZShcIiArXG4gICAgICAgICAgKHlMYWJlbFdpZHRoICsgMiAqIG1heFIpICtcbiAgICAgICAgICBcIixcIiArXG4gICAgICAgICAgKG1heFIgKiBpICogMiArIDMgKiBtYXhSICsgeExhYmVsSGVpZ2h0KSArXG4gICAgICAgICAgXCIpXCJcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgLy8gY3JlYXRpbmcgdGhlIGVsZW1lbnRzIHRoYXQgd2lsbCBob2xkIGFuZCByZXByZXNlbnQgb3VyIGRhdGFcbiAgICByb3dzLnNlbGVjdEFsbChcImNpcmNsZVwiKVxuICAgICAgLmRhdGEoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5ob3VyX3ZvbHVtZXM7XG4gICAgICB9KVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAgIC5hdHRyKFwiY3lcIiwgMClcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gc2l6ZVNjYWxlKGQsIGFsbFZhbHVlcyk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJjeFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBpICogbWF4UiAqIDIgKyBtYXhSO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwic2hhcGUtcmVuZGVyaW5nXCIsIFwiYXV0b1wiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBjb2xvclNjYWxlKGQsIGFsbFZhbHVlcyk7XG4gICAgICB9KTtcblxuICAgIC8vIGFkZHMgbGFiZWxzXG4gICAgY29uc3QgZG90TGFiZWxzID0gcm93cy5zZWxlY3RBbGwoXCIuZG90LWxhYmVsXCIpLmRhdGEoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGQuaG91cl92b2x1bWVzLm1hcChmdW5jdGlvbih2LCBpZHgpIHtcbiAgICAgICAgcmV0dXJuIFt2LCBkLmRheV9vZl93ZWVrLCBpZHhdO1xuICAgICAgfSk7XG4gICAgfSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImRvdC1sYWJlbFwiKVxuICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBpZiAoZFswXSA+IDApIHtcbiAgICAgICAgICBzZWxlY3Rpb24uc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgIC5zZWxlY3QoXCJjaXJjbGVcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmR1cmF0aW9uKDEwMClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAuc2VsZWN0KFwidGV4dFwiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oMTAwKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSk7XG4gICAgICB9KVxuXG4gICAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgc2VsZWN0aW9uLnN0eWxlKFwiY3Vyc29yXCIsIFwiZGVmYXVsdFwiKTtcbiAgICAgICAgc2VsZWN0aW9uXG4gICAgICAgICAgLnNlbGVjdChcImNpcmNsZVwiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAuc2VsZWN0KFwidGV4dFwiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgfSk7XG4gICAgICAvLyAub24oXCJjbGlja1wiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAvLyAgIGlmIChsb2NhbFRoaXMub25DbGljayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyAgICAgaWYgKGRbMF0gPiAwKSB7XG4gICAgICAvLyAgICAgICBsb2NhbFRoaXMub25DbGljayhcInBvaW50XCIsIGxvY2FsVGhpcy5nZXREYXkoZFsxXSksIGkpO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSk7XG5cblxuICAgIGRvdExhYmVsc1xuICAgICAgLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgLmF0dHIoXCJyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIG1heFI7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJjeFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBtYXhSO1xuICAgICAgICB9KVxuICAgICAgLmF0dHIoXCJjeVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBtYXhSO1xuICAgICAgfSlcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgbG9jYWxUaGlzLmNvbG9yc1swXSlcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG5cbiAgICBkb3RMYWJlbHNcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcIiNmZmZmZmZcIilcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMClcbiAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgOCk7XG5cbiAgICBkb3RMYWJlbHMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgLy8gY2VudGVycyBhbmQgcmVzaXplcyB0aGUgdGV4dCBzbyBpdCBkb2Vzbid0IGV4Y2VlZCBpdHMgcmVjdFxuICAgIGRvdExhYmVsc1xuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyBpICogbWF4UiAqIDIgKyBcIixcIiArIC1tYXhSICsgXCIpXCI7XG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcInRleHRcIilcbiAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGRbMF07XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ5XCIsIG1heFIgKyA0KVxuICAgICAgLmF0dHIoXCJ4XCIsIG1heFIpO1xuXG4gICAgLy8gZW5zdXJlcyB0aGUgY29sb3JlZCByZWN0IG9uIHRoZSBsYWJlbCBpcyB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgY2lyY2xlIGRpYW1ldGVyIChtYXhSICogMilcbiAgICBkb3RMYWJlbHNcbiAgICAgIC5zZWxlY3QoXCJyZWN0XCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIG1heFIgKiAyKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgbWF4UiAqIDIpO1xuXG4gICAgLy8gY3JlYXRlcyBsYWJlbHMgZm9yIHRoZSB4IGF4aXMgKGhvdXIpXG4gICAgY2hhcnQuc2VsZWN0QWxsKFwiLnhMYWJlbFwiKVxuICAgICAgLmRhdGEobGFiZWxzWClcbiAgICAvLyBzdHlsaW5nIGZvciB0aGUgbGFiZWxzXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwieVwiLCB4TGFiZWxIZWlnaHQpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLC02KVwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInhMYWJlbFwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC5zdHlsZShcImZpbGwtb3BhY2l0eVwiLCAwKVxuICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gbWF4UiAqIGkgKiAyICsgMyAqIG1heFIgKyB5TGFiZWxXaWR0aDtcbiAgICAgIH0pXG4gICAgICAuc3R5bGUoXCJmaWxsLW9wYWNpdHlcIiwgMSk7XG5cbiAgICAvLyBjcmVhdGVzIGxhYmVscyBmb3IgdGhlIHkgYXhpcyAoZGF5IG9mIHdlZWspXG4gICAgY29uc3QgeUxhYmVscyA9IGNoYXJ0LnNlbGVjdEFsbChcIi55TGFiZWxcIilcbiAgICAgIC5kYXRhKGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuZGF5X29mX3dlZWs7XG4gICAgICB9KVxuICAgIC8vIHkgbGFiZWwgY3JlYXRpb25cbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5kYXlfb2Zfd2VlaztcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInhcIiwgeUxhYmVsV2lkdGgpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieUxhYmVsXCIpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcImVuZFwiKVxuICAgICAgLnN0eWxlKFwiZmlsbC1vcGFjaXR5XCIsIDApXG4gICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gbWF4UiAqIGkgKiAyICsgMyAqIG1heFIgKyB4TGFiZWxIZWlnaHQ7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoLTYsXCIgKyBtYXhSIC8gMi41ICsgXCIpXCIpXG4gICAgICAuc3R5bGUoXCJmaWxsLW9wYWNpdHlcIiwgMSk7XG5cbiAgICAvLyBhcHBlbmQgc3VtcyB0byByb3dzXG4gICAgY2hhcnQuc2VsZWN0QWxsKFwiLnN1bXMteVwiKVxuICAgICAgLmRhdGEoc3Vtc1kpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImN5XCIsIDApXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwic3Vtcy15XCIpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgLnN0eWxlKFwiZmlsbC1vcGFjaXR5XCIsIDApXG4gICAgICAuYXR0cihcImN5XCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIG1heFIgKiBpICogMiArIDMgKiBtYXhSICsgeExhYmVsSGVpZ2h0O1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBzaXplU2NhbGUoZCwgc3Vtc1kpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiY3hcIiwgeUxhYmVsV2lkdGggKyBtYXhSKVxuICAgICAgLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJhdXRvXCIpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGNvbG9yU2NhbGVBeGVzKGQsIHN1bXNZKTtcbiAgICAgIH0pXG4gICAgICAuc3R5bGUoXCJmaWxsLW9wYWNpdHlcIiwgMSlcbiAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIiM5ZTk5OTlcIilcbiAgICAgIC5zdHlsZShcInN0cm9rZS13aWR0aFwiLCAxKTtcblxuICAgIGNvbnN0IHN1bXNZVmFsdWVzID0gY2hhcnQuc2VsZWN0QWxsKFwiLnN1bXMteS12YWx1ZVwiKS5kYXRhKHN1bXNZKVxuICAgIC8vIC8vYWRkcyBtb3VzZW92ZXIgdHJhbnNpdGlvblxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwic3Vtcy15LXZhbHVlXCIpXG4gICAgICAub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGlmIChkID4gMCkge1xuICAgICAgICAgIHNlbGVjdGlvbi5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIik7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0aW9uXG4gICAgICAgICAgLnNlbGVjdChcImNpcmNsZVwiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oMClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAuc2VsZWN0KFwidGV4dFwiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oMClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgfSlcbiAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBzZWxlY3Rpb24uc3R5bGUoXCJjdXJzb3JcIiwgXCJkZWZhdWx0XCIpO1xuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAuc2VsZWN0KFwiY2lyY2xlXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgIC5zZWxlY3QoXCJ0ZXh0XCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICB9KTtcbiAgICAgIC8vIC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgIC8vICAgaWYgKGQgPiAwKSB7XG4gICAgICAvLyAgICAgaWYgKGxvY2FsVGhpcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyAgICAgICBsb2NhbFRoaXMub25DbGljayhcbiAgICAgIC8vICAgICAgICAgXCJkYXlcIixcbiAgICAgIC8vICAgICAgICAgbG9jYWxUaGlzLmdldERheSh5TGFiZWxzWzBdW2ldLnRleHRDb250ZW50KSxcbiAgICAgIC8vICAgICAgICAgLTFcbiAgICAgIC8vICAgICAgICk7XG4gICAgICAvLyAgICAgfVxuXG4gICAgICAvLyAgICAgLy8gd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdF91cmwgKyB5TGFiZWxzWzBdW2ldLnRleHRDb250ZW50ICsgJy8tMSc7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pO1xuXG4gICAgLy8gY3JlYXRlcyB0aGUgbmVlZGVkIHN2ZyBhbmQgdGV4dCBlbGVtZW50cyB0byBtYWtlIHRoZSBsYWJlbHMgYWN0dWFsbHkgcmVhZGFibGVcbiAgICBzdW1zWVZhbHVlc1xuICAgICAgLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgLmF0dHIoXCJyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIG1heFI7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJjeFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBtYXhSO1xuICAgICAgICB9KVxuICAgICAgLmF0dHIoXCJjeVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBtYXhSO1xuICAgICAgfSlcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgdGhpcy5heGlzQ29sb3JzWzFdKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcblxuICAgIHN1bXNZVmFsdWVzXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApXG4gICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIDgpO1xuXG4gICAgc3Vtc1lWYWx1ZXMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgLy8gY2VudGVycyBhbmQgcmVzaXplcyB0aGUgdGV4dCBzbyBpdCBkb2Vzbid0IGV4Y2VlZCBpdHMgcmVjdFxuICAgIHN1bXNZVmFsdWVzXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgXCJ0cmFuc2xhdGUoXCIgK1xuICAgICAgICAgIHlMYWJlbFdpZHRoICtcbiAgICAgICAgICBcIixcIiArXG4gICAgICAgICAgKHhMYWJlbEhlaWdodCArIDIgKiBtYXhSICsgMiAqIG1heFIgKiBpKSArXG4gICAgICAgICAgXCIpXCJcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwidGV4dFwiKVxuICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInlcIiwgbWF4UiArIDQpXG4gICAgICAuYXR0cihcInhcIiwgbWF4Uik7XG5cbiAgICAvLyBlbnN1cmVzIHRoZSBjb2xvcmVkIHJlY3Qgb24gdGhlIGxhYmVsIGlzIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBjaXJjbGUgZGlhbWV0ZXIgKG1heFIgKiAyKVxuICAgIHN1bXNZVmFsdWVzXG4gICAgICAuc2VsZWN0KFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBtYXhSICogMilcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIG1heFIgKiAyKTtcblxuICAgIC8vIGNyZWF0ZSB0b3AgbGFiZWwgZm9yIHlcbiAgICAvLyBjaGFydFxuICAgIC8vICAgLmFwcGVuZChcInRleHRcIilcbiAgICAvLyAgIC5hdHRyKFwieFwiLCB5TGFiZWxXaWR0aClcbiAgICAvLyAgIC5hdHRyKFwieVwiLCBoZWlnaHQgKyBtYXhSICogMilcbiAgICAvLyAgIC5hcHBlbmQoXCJ0c3BhblwiKVxuICAgIC8vICAgLmF0dHIoXCJjbGFzc1wiLCBcInN1bS1sYWJlbC15XCIpXG4gICAgLy8gICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcInN0YXJ0XCIpXG4gICAgLy8gICAudGV4dChcIlRvdGFsL1wiKVxuICAgIC8vICAgLmFwcGVuZChcInRzcGFuXCIpXG4gICAgLy8gICAuYXR0cihcImR5XCIsIDE1KVxuICAgIC8vICAgLmF0dHIoXCJ4XCIsIHlMYWJlbFdpZHRoKVxuICAgIC8vICAgLnRleHQoXCJEYXlcIilcbiAgICAvLyAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdW0tbGFiZWwteVwiKVxuICAgIC8vICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJzdGFydFwiKTtcbiAgICAvLyB4IGF4aXMgc3Vtc1xuXG4gICAgY29uc3Qgc3Vtc1hBeGlzID0gY2hhcnQuc2VsZWN0QWxsKFwiLnN1bXMteFwiKS5kYXRhKHN1bXNYKTtcblxuICAgIC8vIHN0eWxpbmcgZm9yIHRoZSBsYWJlbHNcbiAgICBzdW1zWEF4aXNcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiY3lcIiwgMClcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdW1zLXhcIilcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAuc3R5bGUoXCJmaWxsLW9wYWNpdHlcIiwgMClcbiAgICAgIC5hdHRyKFwiY3lcIiwgeExhYmVsSGVpZ2h0ICsgbWF4UilcbiAgICAgIC5hdHRyKFwiclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBzaXplU2NhbGUoZCwgc3Vtc1gpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiY3hcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4geUxhYmVsV2lkdGggKyAzICogbWF4UiArIG1heFIgKiBpICogMjtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInNoYXBlLXJlbmRlcmluZ1wiLCBcImF1dG9cIilcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gY29sb3JTY2FsZUF4ZXMoZCwgc3Vtc1gpO1xuICAgICAgfSlcbiAgICAgIC5zdHlsZShcImZpbGwtb3BhY2l0eVwiLCAxKVxuICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiIzllOTk5OVwiKVxuICAgICAgLnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIDEpO1xuXG4gICAgY29uc3Qgc3Vtc1hWYWx1ZXMgPSBjaGFydC5zZWxlY3RBbGwoXCIuc3Vtcy14LXZhbHVlXCIpLmRhdGEoc3Vtc1gpXG4gICAgLy8gLy9hZGRzIG1vdXNlb3ZlciB0cmFuc2l0aW9uXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdW1zLXgtdmFsdWVcIilcbiAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgaWYgKGQgPiAwKSB7XG4gICAgICAgICAgc2VsZWN0aW9uLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAuc2VsZWN0KFwiY2lyY2xlXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbigxMDApXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcbiAgICAgICAgc2VsZWN0aW9uXG4gICAgICAgICAgLnNlbGVjdChcInRleHRcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmR1cmF0aW9uKDEwMClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgfSlcbiAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBzZWxlY3Rpb24uc3R5bGUoXCJjdXJzb3JcIiwgXCJkZWZhdWx0XCIpO1xuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAuc2VsZWN0KFwiY2lyY2xlXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgIC5zZWxlY3QoXCJ0ZXh0XCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICB9KTtcbiAgICAgIC8vIC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgIC8vICAgaWYgKGQgPiAwKSB7XG4gICAgICAvLyAgICAgbG9jYWxUaGlzLm9uQ2xpY2soXCJob3VyXCIsIDAsIGkpO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9KTtcblxuICAgIC8vIGNyZWF0ZXMgdGhlIG5lZWRlZCBzdmcgYW5kIHRleHQgZWxlbWVudHMgdG8gbWFrZSB0aGUgbGFiZWxzIGFjdHVhbGx5IHJlYWRhYmxlXG4gICAgc3Vtc1hWYWx1ZXNcbiAgICAgIC5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAgIC5hdHRyKFwiclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBtYXhSO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiY3hcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gbWF4UjtcbiAgICAgICAgfSlcbiAgICAgIC5hdHRyKFwiY3lcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gbWF4UjtcbiAgICAgIH0pXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIHRoaXMuYXhpc0NvbG9yc1sxXSlcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG5cbiAgICBzdW1zWFZhbHVlc1xuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKVxuICAgICAgLnN0eWxlKCdmb250LXNpemUnLCA4KTtcblxuICAgIHN1bXNYVmFsdWVzLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgIC8vIGNlbnRlcnMgYW5kIHJlc2l6ZXMgdGhlIHRleHQgc28gaXQgZG9lc24ndCBleGNlZWQgaXRzIHJlY3RcbiAgICBzdW1zWFZhbHVlc1xuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIFwidHJhbnNsYXRlKFwiICtcbiAgICAgICAgICAoeUxhYmVsV2lkdGggKyAyICogbWF4UiAqIGkgKyAyICogbWF4UikgK1xuICAgICAgICAgIFwiLCBcIiArXG4gICAgICAgICAgeExhYmVsSGVpZ2h0ICtcbiAgICAgICAgICBcIilcIlxuICAgICAgICApO1xuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoXCJ0ZXh0XCIpXG4gICAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwieVwiLCBtYXhSICsgNClcbiAgICAgIC5hdHRyKFwieFwiLCBtYXhSKTtcblxuICAgIC8vIGVuc3VyZXMgdGhlIGNvbG9yZWQgcmVjdCBvbiB0aGUgbGFiZWwgaXMgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGNpcmNsZSBkaWFtZXRlciAobWF4UiAqIDIpXG4gICAgc3Vtc1hWYWx1ZXNcbiAgICAgIC5zZWxlY3QoXCJyZWN0XCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIG1heFIgKiAyKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgbWF4UiAqIDIpO1xuXG4gICAgLy8gY3JlYXRlIGxlZnQgbGFiZWwgZm9yIHN1bXNYXG4gICAgLy8gY2hhcnRcbiAgICAvLyAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLy8gICAuYXR0cihcInhcIiwgd2lkdGggKyAyICogbWF4UiArIDcpXG4gICAgLy8gICAuYXR0cihcInlcIiwgeExhYmVsSGVpZ2h0ICsgbWF4UiAvIDIpXG4gICAgLy8gICAuYXBwZW5kKFwidHNwYW5cIilcbiAgICAvLyAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdW0tbGFiZWwteVwiKVxuICAgIC8vICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJzdGFydFwiKVxuICAgIC8vICAgLnRleHQoXCJUb3RhbC9cIilcbiAgICAvLyAgIC5hcHBlbmQoXCJ0c3BhblwiKVxuICAgIC8vICAgLmF0dHIoXCJkeVwiLCAxNSlcbiAgICAvLyAgIC5hdHRyKFwieFwiLCB3aWR0aCArIDIgKiBtYXhSICsgNylcbiAgICAvLyAgIC50ZXh0KFwiSHJcIilcbiAgICAvLyAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdW0tbGFiZWwteVwiKVxuICAgIC8vICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJzdGFydFwiKTtcblxuICAgIC8vIGRyYXcgaW4tY2hhcnQgbGlnaHQgYXhlcyBzZXBhcmF0aW5nIHNxdWFyZXNcbiAgICBjaGFydC5zZWxlY3RBbGwoXCIudmVydFwiKVxuICAgICAgLmRhdGEobGFiZWxzWClcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwibGluZVwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInZlcnRcIilcbiAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiIzg4OFwiKVxuICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMSlcbiAgICAgIC5zdHlsZShcInNoYXBlLXJlbmRlcmluZ1wiLCBcImNyaXNwRWRnZXNcIilcbiAgICAgIC5zdHlsZShcInN0cm9rZS1vcGFjaXR5XCIsIDApXG4gICAgICAuYXR0cihcIngxXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIG1heFIgKiBpICogMiArIHlMYWJlbFdpZHRoICsgMiAqIG1heFI7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ4MlwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBtYXhSICogaSAqIDIgKyB5TGFiZWxXaWR0aCArIDIgKiBtYXhSO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwieTFcIiwgeExhYmVsSGVpZ2h0ICsgYm9yZGVyV2lkdGggLyAyKVxuICAgICAgLmF0dHIoXCJ5MlwiLCBoZWlnaHQgKyAyICogbWF4UilcbiAgICAgIC5zdHlsZShcInN0cm9rZS1vcGFjaXR5XCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIGkgPyAwLjUgOiAwO1xuICAgICAgfSk7XG5cbiAgICBjaGFydC5zZWxlY3RBbGwoXCIuaG9yaXpcIilcbiAgICAgIC5kYXRhKGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuZGF5X29mX3dlZWs7XG4gICAgICB9KVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJsaW5lXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwiaG9yaXpcIilcbiAgICAgIC5hdHRyKFwieDFcIiwgeUxhYmVsV2lkdGggKyBib3JkZXJXaWR0aCAvIDIpXG4gICAgICAuYXR0cihcInN0cm9rZVwiLCBcIiM4ODhcIilcbiAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDEpXG4gICAgICAuc3R5bGUoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJjcmlzcEVkZ2VzXCIpXG4gICAgICAuc3R5bGUoXCJzdHJva2Utb3BhY2l0eVwiLCAwKVxuICAgICAgLmF0dHIoXCJ4MlwiLCAobWF4UiAqIDI1ICogMikgKyB5TGFiZWxXaWR0aClcbiAgICAgIC5hdHRyKFwieTFcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gaSAqIG1heFIgKiAyICsgeExhYmVsSGVpZ2h0ICsgMiAqIG1heFI7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ5MlwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBpICogbWF4UiAqIDIgKyB4TGFiZWxIZWlnaHQgKyAyICogbWF4UjtcbiAgICAgIH0pXG4gICAgICAuc3R5bGUoXCJzdHJva2Utb3BhY2l0eVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBpID8gMC41IDogMDtcbiAgICAgIH0pO1xuXG4gICAgLy8gb3V0ZXIgQm9yZGVyIEJvdHRvbVxuICAgIGNoYXJ0XG4gICAgICAuYXBwZW5kKFwibGluZVwiKVxuICAgICAgLmF0dHIoXCJ4MVwiLCB5TGFiZWxXaWR0aCArIGJvcmRlcldpZHRoIC8gMilcbiAgICAgIC5hdHRyKFwieTFcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gKGkgKiBtYXhSICogMiArIDIgKiBtYXhSKSArIGhlaWdodDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcIngyXCIsIG1heFIgKiAyNSAqIDIgKyB5TGFiZWxXaWR0aClcbiAgICAgIC5hdHRyKFwieTJcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gKGkgKiBtYXhSICogMiArIDIgKiBtYXhSKSArIGhlaWdodDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAyKVxuICAgICAgLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJjcmlzcEVkZ2VzXCIpXG4gICAgICAuYXR0cihcInN0cm9rZVwiLCBcImdyZXlcIilcbiAgICAgIC5hdHRyKCdjbGFzcycsICdwdW5jaC1ib3JkZXInKTtcblxuICAgIC8vIG91dGVyIGJvcmRlciByaWdodFxuICAgIGNoYXJ0XG4gICAgICAuYXBwZW5kKFwibGluZVwiKVxuICAgICAgLmF0dHIoXCJ4MVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiAobWF4UiAqIDI1ICogMikgKyB5TGFiZWxXaWR0aCAvLysgd2lkdGg7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ4MlwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiAobWF4UiAqIDI1ICogMikgKyB5TGFiZWxXaWR0aCAvLysgd2lkdGg7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ5MVwiLCB4TGFiZWxIZWlnaHQgKyBib3JkZXJXaWR0aCAvIDIpXG4gICAgICAuYXR0cihcInkyXCIsIGhlaWdodCArIDIgKiBtYXhSKVxuICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMilcbiAgICAgIC5zdHlsZShcInNoYXBlLXJlbmRlcmluZ1wiLCBcImNyaXNwRWRnZXNcIilcbiAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiZ3JleVwiKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3B1bmNoLWJvcmRlcicpO1xuXG4gICAgLy8gRW1pdCByZWFkeSBldmVudC5cbiAgfVxufVxuIl19