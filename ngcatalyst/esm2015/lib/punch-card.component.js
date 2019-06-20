/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
export class PunchCardComponent {
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
        const chart = d3
            .select(elementName)
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
        const maxWidth = d3.max(data.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.hour_volumes.length;
        })));
        // maximum radius for bubble.
        /** @type {?} */
        const maxR = d3.min([
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
            const f = d3.scaleSqrt()
                .domain([d3.min(dataset), d3.max(dataset)])
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
            const f = d3.scaleLinear()
                .domain([d3.min(dataset), d3.max(dataset)])
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
            const f = d3.scaleLinear()
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
            const selection = d3.select(this);
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
            const selection = d3.select(this);
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
            const selection = d3.select(this);
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
            const selection = d3.select(this);
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
            const selection = d3.select(this);
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
            const selection = d3.select(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVuY2gtY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ2NhdGFseXN0LyIsInNvdXJjZXMiOlsibGliL3B1bmNoLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBMkMsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFpQnpCLE1BQU0sT0FBTyxrQkFBa0I7SUFVN0I7UUFSUyxXQUFNLEdBQUcsT0FBTyxDQUFDO1FBR2pCLGVBQVUsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwQyxjQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ25CLFdBQU0sR0FBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztRQUVsSSxZQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pKLENBQUM7Ozs7SUFFakIsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELGVBQWU7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LElBQUksRUFBRSxZQUFZLEdBQUcsV0FBVyxHQUFHLENBQUMsQ0FBQzthQUMxQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQzdCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUM7YUFDdEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7YUFDdEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztRQUVqQyxvQkFBb0I7SUFDdEIsQ0FBQzs7O1lBL3VCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFNNUIsUUFBUSxFQUFFOzs7OztDQUtYO3lCQVZVOzs7O0dBSVI7YUFPRjs7Ozs7cUJBR0UsS0FBSzttQkFDTCxLQUFLO29CQUNMLEtBQUs7eUJBQ0wsS0FBSzt3QkFDTCxLQUFLO3FCQUNMLEtBQUs7Ozs7SUFMTixvQ0FBMEI7O0lBQzFCLGtDQUF5RDs7SUFDekQsbUNBQXVCOztJQUN2Qix3Q0FBNkM7O0lBQzdDLHVDQUE0Qjs7SUFDNUIsb0NBQWtJOztJQUVsSSxxQ0FBaUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuaW1wb3J0IGx1eG9uIGZyb20gJ2x1eG9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZWlrb3MtcHVuY2gtY2FyZCcsXG4gIHN0eWxlczogW2BcbiAgICAucHVuY2gtYm9yZGVyIHtcbiAgICAgIHN0cm9rZTogZ3JleVxuICAgIH1cbiAgYF0sXG4gIHRlbXBsYXRlOiBgXG4gIDxoMj57e3RpdGxlfX08L2gyPlxuICA8ZGl2IHN0eWxlPVwiaGVpZ2h0OiA3NTBweDsgd2lkdGg6IDE1MDBweDsgbWFyZ2luLWxlZnQ6IDMlXCIgPlxuICAgICAgPGRpdiBbaWRdPVwicHJvcElEXCIgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDoxMDAlXCI+IDwvZGl2PlxuICA8L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgUHVuY2hDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHByb3BJRCA9ICdwdW5jaCc7XG4gIEBJbnB1dCgpIGRhdGE6IFt7ZGF5X29mX3dlZWs6IHN0cmluZywgaG91cl92b2x1bWVzOiBbXX1dO1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSBheGlzQ29sb3JzID0gW1wiI2U1YjFhNVwiLCBcIiNmZjJiMmJcIl07XG4gIEBJbnB1dCgpIGF4aXNMYWJlbCA9ICdEYXRlJztcbiAgQElucHV0KCkgY29sb3JzID0gIFtcIiMwODFBNEVcIiwgXCIjMDkyMzY5XCIsIFwiIzFBNjQ5RlwiLCBcIiMyNDg1QjRcIiwgXCIjMkRBOEM5XCIsIFwiIzVEQzFEMFwiLCBcIiM5QUQ1Q0RcIiwgXCIjRDVFOUNCXCIsIFwiIzY0QjVGNlwiLCBcIiMwMTU3OUJcIl07XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgbGFiZWxzWCA9IFtcIjEyYVwiLCBcIjFhXCIsIFwiMmFcIiwgXCIzYVwiLCBcIjRhXCIsIFwiNWFcIiwgXCI2YVwiLCBcIjdhXCIsIFwiOGFcIiwgXCI5YVwiLCBcIjEwYVwiLCBcIjExYVwiLCBcIjEycFwiLCBcIjFwXCIsIFwiMnBcIiwgXCIzcFwiLCBcIjRwXCIsIFwiNXBcIiwgXCI2cFwiLCBcIjdwXCIsIFwiOHBcIiwgXCI5cFwiLCBcIjEwcFwiLCBcIjExcFwiXTtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRyYXdQdW5jaENhcmQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmRyYXdQdW5jaENhcmQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRyYXdQdW5jaENhcmQoKTtcbiAgfVxuXG4gIGdldERheSAoZGF5KSB7XG4gICAgY29uc3QgZGF5cyA9IFtcbiAgICAgICAgeyBuYW1lOiAnTW9uJywgdmFsdWU6IDIsIGRlc2NyaXB0aW9uOiAnTW9uZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdUdWUnLCB2YWx1ZTogMywgZGVzY3JpcHRpb246ICdUdWVzZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdXZWQnLCB2YWx1ZTogNCwgZGVzY3JpcHRpb246ICdXZWRuZXNkYXknIH0sXG4gICAgICAgIHsgbmFtZTogJ1RodScsIHZhbHVlOiA1LCBkZXNjcmlwdGlvbjogJ1RodXJzZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdGcmknLCB2YWx1ZTogNiwgZGVzY3JpcHRpb246ICdGcmlkYXknIH0sXG4gICAgICAgIHsgbmFtZTogJ1NhdCcsIHZhbHVlOiA3LCBkZXNjcmlwdGlvbjogJ1NhdHVyZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdTdW4nLCB2YWx1ZTogMSwgZGVzY3JpcHRpb246ICdTdW5kYXknIH1cbiAgICBdO1xuICAgIGNvbnN0IHJlc3VsdCA9IGRheXMuZmlsdGVyKGQgPT4ge1xuICAgICAgcmV0dXJuIGQubmFtZSA9PT0gZGF5O1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRbMF0udmFsdWU7XG4gIH1cblxuICBnZXREYXlOYW1lIChkYXkpIHtcbiAgICBjb25zdCBkYXlzID0gW1xuICAgICAgICB7IG5hbWU6ICdNb24nLCB2YWx1ZTogXCIxXCIsIGRlc2NyaXB0aW9uOiAnTW9uZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdUdWUnLCB2YWx1ZTogXCIyXCIsIGRlc2NyaXB0aW9uOiAnVHVlc2RheScgfSxcbiAgICAgICAgeyBuYW1lOiAnV2VkJywgdmFsdWU6IFwiM1wiLCBkZXNjcmlwdGlvbjogJ1dlZG5lc2RheScgfSxcbiAgICAgICAgeyBuYW1lOiAnVGh1JywgdmFsdWU6IFwiNFwiLCBkZXNjcmlwdGlvbjogJ1RodXJzZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdGcmknLCB2YWx1ZTogXCI1XCIsIGRlc2NyaXB0aW9uOiAnRnJpZGF5JyB9LFxuICAgICAgICB7IG5hbWU6ICdTYXQnLCB2YWx1ZTogXCI2XCIsIGRlc2NyaXB0aW9uOiAnU2F0dXJkYXknIH0sXG4gICAgICAgIHsgbmFtZTogJ1N1bicsIHZhbHVlOiBcIjBcIiwgZGVzY3JpcHRpb246ICdTdW5kYXknIH1cbiAgICBdO1xuICAgIGNvbnN0IHJlc3VsdCA9IGRheXMuZmlsdGVyKGQgPT4ge1xuICAgICAgcmV0dXJuIGQudmFsdWUgPT09IGRheTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHRbMF0ubmFtZTtcbiAgfVxuXG4gIGRyYXdQdW5jaENhcmQoKSB7XG4gICAgaWYgKHRoaXMuZGF0YSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxuICAgICAgLy8gdHJ5IHtcbiAgICAgIC8vICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICAvLyB9IGNhdGNoIChlKSB7XG4gICAgICAvLyAgIHJldHVybjtcbiAgICAgIC8vIH1cblxuICAgIGNvbnN0IGxvY2FsVGhpcyA9IHRoaXM7XG4gICAgLy8gVGhpcyB3YXMgbmVlZGVkIGZvciB0aGUgSW5jaWRlbnQgU2V0IE1vZGFsIFRlc3QgdG8gcGFzcy5cblxuICAgIGNvbnN0IGVsZW1lbnROYW1lID0gXCIjXCIgKyB0aGlzLnByb3BJRDtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50TmFtZSArIFwiIHN2Z1wiKVswXSAhPSBudWxsKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnROYW1lICsgXCIgc3ZnXCIpWzBdLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpKTsgLy8gZGVlcCBjb3B5XG5cblxuICAgIGNvbnN0IG1hcmdpbiA9IHsgdG9wOiA0MCwgcmlnaHQ6IDc1LCBib3R0b206IDQwLCBsZWZ0OiAxNSB9O1xuICAgIGNvbnN0IHBhZGRpbmcgPSAzO1xuICAgIGNvbnN0IHhMYWJlbEhlaWdodCA9IDMwO1xuICAgIGNvbnN0IHlMYWJlbFdpZHRoID0gMzA7XG4gICAgY29uc3QgYm9yZGVyV2lkdGggPSAxO1xuICAgIC8vIGNvbnN0IHdpZHRoID0gNTAwO1xuICAgIC8vIGNvbnN0IGhlaWdodCA9IDE4MTtcblxuICAgIGxldCBlbGVtZW50OiBhbnk7XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudE5hbWUpO1xuXG4gICAgaWYgKHNlbGVjdGVkWzBdID09IG51bGwpIHtcbiAgICAgIGVsZW1lbnQgPSBbe2NsaWVudFdpZHRoOiAxMDAwLCBjbGllbnRIZWlnaHQ6IDUwMH1dO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIGVsZW1lbnQgPSBzZWxlY3RlZFswXTtcbiAgICB9XG5cbiAgICBjb25zdCB3aWR0aCA9XG4gICAgICBlbGVtZW50LmNsaWVudFdpZHRoIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQgLSB5TGFiZWxXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPVxuICAgIGVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gMjQgKiA3ICtcbiAgICAgIDIgKiB4TGFiZWxIZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxuLy8gICBpZiAodGhpcy4uY2hhbmdlSGVpZ2h0ICE9PSB1bmRlZmluZWQgKSB7XG4vLyAgICAgICB0aGlzLi5jaGFuZ2VIZWlnaHQoaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20gKyAyICogeExhYmVsSGVpZ2h0KTtcbi8vICB9XG5cbiAgICBjb25zdCBjaGFydCA9IGQzXG4gICAgICAuc2VsZWN0KGVsZW1lbnROYW1lKVxuICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgIC5hdHRyKFwiZGF0YS1oZWlnaHRcIiwgXCIwLjU2NzhcIilcbiAgICAgIC5hdHRyKFwidmlld0JveFwiLCBgMCAwICR7d2lkdGggLyAyLjF9ICR7aGVpZ2h0ICogMn1gKVxuICAgICAgLmF0dHIoXCJwcmVzZXJ2ZUFzcGVjdFJhdGlvXCIsIFwieE1heFlNYXggbWVldFwiKVxuICAgICAgLy8gLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0ICsgMiAqIHlMYWJlbFdpZHRoKVxuICAgICAgLy8gLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20gKyAyICogeExhYmVsSGVpZ2h0KVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIixcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XG5cbiAgICAvLyBhcnJheSBvZiBhbGwgdmFsdWVzIGluIHRoZSBkYXRhLCBmb3IgbWluIG1heGluZyBhbmQgbGVuZ3RoIGNhbGN1bGF0aW9uc1xuICAgIGNvbnN0IGFsbFZhbHVlcyA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoXG4gICAgICBbXSxcbiAgICAgIGRhdGEubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuaG91cl92b2x1bWVzO1xuICAgICAgfSlcbiAgICApO1xuICAgIC8vIGZpbmRzIGxvbmdlc3QgYXJyYXkgaW4gZGF0YVxuICAgIGNvbnN0IG1heFdpZHRoID0gZDMubWF4KFxuICAgICAgZGF0YS5tYXAoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5ob3VyX3ZvbHVtZXMubGVuZ3RoO1xuICAgICAgfSlcbiAgICApO1xuICAgIC8vIG1heGltdW0gcmFkaXVzIGZvciBidWJibGUuXG4gICAgY29uc3QgbWF4UiA9XG4gICAgICBkMy5taW4oW1xuICAgICAgICAod2lkdGggLSB5TGFiZWxXaWR0aCkgLyBtYXhXaWR0aCxcbiAgICAgICAgKGhlaWdodCAtIHhMYWJlbEhlaWdodCkgLyBkYXRhLmxlbmd0aFxuICAgICAgXSkgLyAyO1xuXG4gICAgLy8gc29ydCBkYXRhIGFuZCB0cmFuc2xhdGUgaW50byBodW1hbi1yZWFkYWJsZVxuICAgIGRhdGEuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICBwYXJzZUludChhW1wiZGF5X29mX3dlZWtcIl0pID4gcGFyc2VJbnQoYltcImRheV9vZl93ZWVrXCJdKTtcbiAgICB9KTtcblxuICAgIGRhdGEucHVzaChkYXRhLnNoaWZ0KCkpO1xuXG4gICAgaWYgKGRhdGFbMF1bXCJkYXlfb2Zfd2Vla1wiXS5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRhdGEgPSBkYXRhLm1hcChmdW5jdGlvbihkKSB7XG4gICAgICAgIGRbXCJkYXlfb2Zfd2Vla1wiXSA9IGxvY2FsVGhpcy5nZXREYXlOYW1lKGRbXCJkYXlfb2Zfd2Vla1wiXSk7XG4gICAgICAgIHJldHVybiBkO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGxhYmVsc1xuICAgIGNvbnN0IGxhYmVsc1ggPSB0aGlzLmxhYmVsc1g7XG5cbiAgICAvLyBjYWxjIHRvdGFsIHZvbHVtZXMgcGVyIGRheSwgZm9yIHN1bXNZIGxhYmVsXG4gICAgY29uc3Qgc3Vtc1kgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHN1bSA9IGRhdGFbaV1bXCJob3VyX3ZvbHVtZXNcIl0ucmVkdWNlKGZ1bmN0aW9uKGFjYywgdmFsKSB7XG4gICAgICAgIHJldHVybiBhY2MgKyB2YWw7XG4gICAgICB9LCAwKTtcbiAgICAgIHN1bXNZLnB1c2goc3VtKTtcbiAgICB9XG5cbiAgICAvLyBjYWxjIHRvdGFsIHZvbHVtZXMgcGVyIGhvdXIsIGZvciBzdW1zWCBsYWJlbFxuICAgIGNvbnN0IHN1bXNYID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhWzBdW1wiaG91cl92b2x1bWVzXCJdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzdW0gPSBkYXRhLnJlZHVjZShmdW5jdGlvbihhY2MsIHZhbCkge1xuICAgICAgICByZXR1cm4gYWNjICsgdmFsW1wiaG91cl92b2x1bWVzXCJdW2ldO1xuICAgICAgfSwgMCk7XG4gICAgICBzdW1zWC5wdXNoKHN1bSk7XG4gICAgfVxuXG4gICAgLy8gdGhpcyBlc3NlbnRpYWxseSBzY2FsZXMgcmFkaXVzIHZhbHVlcyBhY2NvcmRpbmcgdG8gdGhlIG1heFJcbiAgICBjb25zdCBzaXplU2NhbGUgPSBmdW5jdGlvbihkLCBkYXRhc2V0KSB7XG4gICAgICBpZiAoZCA9PT0gMCkgeyByZXR1cm4gMDsgfVxuICAgICAgY29uc3QgZiA9IGQzLnNjYWxlU3FydCgpXG4gICAgICAgIC5kb21haW4oW2QzLm1pbihkYXRhc2V0KSwgZDMubWF4KGRhdGFzZXQpXSlcbiAgICAgICAgLnJhbmdlUm91bmQoWzIsIG1heFIgLSBwYWRkaW5nXSk7XG4gICAgICByZXR1cm4gZihkKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29sb3JTY2FsZSA9IGZ1bmN0aW9uKGQsIGRhdGFzZXQpIHtcbiAgICAgIGNvbnN0IGYgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oW2QzLm1pbihkYXRhc2V0KSwgZDMubWF4KGRhdGFzZXQpXSlcbiAgICAgICAgLnJhbmdlKFtsb2NhbFRoaXMuY29sb3JzWzddLCBsb2NhbFRoaXMuY29sb3JzWzBdXSk7XG5cbiAgICAgIHJldHVybiBmKGQpO1xuICAgIH07XG5cbiAgICBjb25zdCBjb2xvclNjYWxlQXhlcyA9IGZ1bmN0aW9uKGQsIGRhdGFzZXQpIHtcbiAgICAgIGNvbnN0IGYgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oW2QzLm1pbihkYXRhc2V0KSwgZDMubWF4KGRhdGFzZXQpXSlcbiAgICAgICAgLnJhbmdlKGxvY2FsVGhpcy5heGlzQ29sb3JzKTtcbiAgICAgIHJldHVybiBmKGQpO1xuICAgIH07XG5cbiAgICAvLyB5QXhpcyBCb3JkZXJcbiAgICBjaGFydFxuICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgIC5hdHRyKFwieFwiLCB5TGFiZWxXaWR0aClcbiAgICAgIC5hdHRyKFwieVwiLCB4TGFiZWxIZWlnaHQgKyAyICogbWF4UilcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgMiAqIG1heFIpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgLSB4TGFiZWxIZWlnaHQpXG4gICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAyKVxuICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJncmV5XCIpXG4gICAgICAuYXR0cihcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgICAgLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJjcmlzcEVkZ2VzXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwicHVuY2gtYm9yZGVyXCIpO1xuICAgIC8vIHhBeGlzIEJvcmRlclxuICAgIGNoYXJ0XG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIHlMYWJlbFdpZHRoICsgMiAqIG1heFIpXG4gICAgICAuYXR0cihcInlcIiwgeExhYmVsSGVpZ2h0KVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBtYXhSICogMjQgKiAyKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgMiAqIG1heFIpXG4gICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAyKVxuICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJncmV5XCIpXG4gICAgICAuYXR0cihcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgICAgLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJjcmlzcEVkZ2VzXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwicHVuY2gtYm9yZGVyLCBmb28tYmFyXCIpO1xuXG4gICAgLy8gY3JlYXRlcyByb3dzIGFjY29yZGluZyB0byBkYXRhIGxhYmVsc1xuICAgIGNvbnN0IHJvd3MgPSBjaGFydC5zZWxlY3RBbGwoXCIucm93XCIpLmRhdGEoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5kYXlfb2Zfd2VlaztcbiAgICAgIH0pXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJyb3dcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBcInRyYW5zbGF0ZShcIiArXG4gICAgICAgICAgKHlMYWJlbFdpZHRoICsgMiAqIG1heFIpICtcbiAgICAgICAgICBcIixcIiArXG4gICAgICAgICAgKG1heFIgKiBpICogMiArIDMgKiBtYXhSICsgeExhYmVsSGVpZ2h0KSArXG4gICAgICAgICAgXCIpXCJcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgLy8gY3JlYXRpbmcgdGhlIGVsZW1lbnRzIHRoYXQgd2lsbCBob2xkIGFuZCByZXByZXNlbnQgb3VyIGRhdGFcbiAgICByb3dzLnNlbGVjdEFsbChcImNpcmNsZVwiKVxuICAgICAgLmRhdGEoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5ob3VyX3ZvbHVtZXM7XG4gICAgICB9KVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAgIC5hdHRyKFwiY3lcIiwgMClcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gc2l6ZVNjYWxlKGQsIGFsbFZhbHVlcyk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJjeFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBpICogbWF4UiAqIDIgKyBtYXhSO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwic2hhcGUtcmVuZGVyaW5nXCIsIFwiYXV0b1wiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBjb2xvclNjYWxlKGQsIGFsbFZhbHVlcyk7XG4gICAgICB9KTtcblxuICAgIC8vIGFkZHMgbGFiZWxzXG4gICAgY29uc3QgZG90TGFiZWxzID0gcm93cy5zZWxlY3RBbGwoXCIuZG90LWxhYmVsXCIpLmRhdGEoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGQuaG91cl92b2x1bWVzLm1hcChmdW5jdGlvbih2LCBpZHgpIHtcbiAgICAgICAgcmV0dXJuIFt2LCBkLmRheV9vZl93ZWVrLCBpZHhdO1xuICAgICAgfSk7XG4gICAgfSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImRvdC1sYWJlbFwiKVxuICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBpZiAoZFswXSA+IDApIHtcbiAgICAgICAgICBzZWxlY3Rpb24uc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgIC5zZWxlY3QoXCJjaXJjbGVcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmR1cmF0aW9uKDEwMClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAuc2VsZWN0KFwidGV4dFwiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oMTAwKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSk7XG4gICAgICB9KVxuXG4gICAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgc2VsZWN0aW9uLnN0eWxlKFwiY3Vyc29yXCIsIFwiZGVmYXVsdFwiKTtcbiAgICAgICAgc2VsZWN0aW9uXG4gICAgICAgICAgLnNlbGVjdChcImNpcmNsZVwiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAuc2VsZWN0KFwidGV4dFwiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgfSk7XG4gICAgICAvLyAub24oXCJjbGlja1wiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAvLyAgIGlmIChsb2NhbFRoaXMub25DbGljayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyAgICAgaWYgKGRbMF0gPiAwKSB7XG4gICAgICAvLyAgICAgICBsb2NhbFRoaXMub25DbGljayhcInBvaW50XCIsIGxvY2FsVGhpcy5nZXREYXkoZFsxXSksIGkpO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSk7XG5cblxuICAgIGRvdExhYmVsc1xuICAgICAgLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgLmF0dHIoXCJyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIG1heFI7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJjeFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBtYXhSO1xuICAgICAgICB9KVxuICAgICAgLmF0dHIoXCJjeVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBtYXhSO1xuICAgICAgfSlcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgbG9jYWxUaGlzLmNvbG9yc1swXSlcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG5cbiAgICBkb3RMYWJlbHNcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcIiNmZmZmZmZcIilcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMClcbiAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgOCk7XG5cbiAgICBkb3RMYWJlbHMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgLy8gY2VudGVycyBhbmQgcmVzaXplcyB0aGUgdGV4dCBzbyBpdCBkb2Vzbid0IGV4Y2VlZCBpdHMgcmVjdFxuICAgIGRvdExhYmVsc1xuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyBpICogbWF4UiAqIDIgKyBcIixcIiArIC1tYXhSICsgXCIpXCI7XG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcInRleHRcIilcbiAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGRbMF07XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ5XCIsIG1heFIgKyA0KVxuICAgICAgLmF0dHIoXCJ4XCIsIG1heFIpO1xuXG4gICAgLy8gZW5zdXJlcyB0aGUgY29sb3JlZCByZWN0IG9uIHRoZSBsYWJlbCBpcyB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgY2lyY2xlIGRpYW1ldGVyIChtYXhSICogMilcbiAgICBkb3RMYWJlbHNcbiAgICAgIC5zZWxlY3QoXCJyZWN0XCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIG1heFIgKiAyKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgbWF4UiAqIDIpO1xuXG4gICAgLy8gY3JlYXRlcyBsYWJlbHMgZm9yIHRoZSB4IGF4aXMgKGhvdXIpXG4gICAgY2hhcnQuc2VsZWN0QWxsKFwiLnhMYWJlbFwiKVxuICAgICAgLmRhdGEobGFiZWxzWClcbiAgICAvLyBzdHlsaW5nIGZvciB0aGUgbGFiZWxzXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwieVwiLCB4TGFiZWxIZWlnaHQpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLC02KVwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInhMYWJlbFwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC5zdHlsZShcImZpbGwtb3BhY2l0eVwiLCAwKVxuICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gbWF4UiAqIGkgKiAyICsgMyAqIG1heFIgKyB5TGFiZWxXaWR0aDtcbiAgICAgIH0pXG4gICAgICAuc3R5bGUoXCJmaWxsLW9wYWNpdHlcIiwgMSk7XG5cbiAgICAvLyBjcmVhdGVzIGxhYmVscyBmb3IgdGhlIHkgYXhpcyAoZGF5IG9mIHdlZWspXG4gICAgY29uc3QgeUxhYmVscyA9IGNoYXJ0LnNlbGVjdEFsbChcIi55TGFiZWxcIilcbiAgICAgIC5kYXRhKGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuZGF5X29mX3dlZWs7XG4gICAgICB9KVxuICAgIC8vIHkgbGFiZWwgY3JlYXRpb25cbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5kYXlfb2Zfd2VlaztcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInhcIiwgeUxhYmVsV2lkdGgpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieUxhYmVsXCIpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcImVuZFwiKVxuICAgICAgLnN0eWxlKFwiZmlsbC1vcGFjaXR5XCIsIDApXG4gICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gbWF4UiAqIGkgKiAyICsgMyAqIG1heFIgKyB4TGFiZWxIZWlnaHQ7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoLTYsXCIgKyBtYXhSIC8gMi41ICsgXCIpXCIpXG4gICAgICAuc3R5bGUoXCJmaWxsLW9wYWNpdHlcIiwgMSk7XG5cbiAgICAvLyBhcHBlbmQgc3VtcyB0byByb3dzXG4gICAgY2hhcnQuc2VsZWN0QWxsKFwiLnN1bXMteVwiKVxuICAgICAgLmRhdGEoc3Vtc1kpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImN5XCIsIDApXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwic3Vtcy15XCIpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgLnN0eWxlKFwiZmlsbC1vcGFjaXR5XCIsIDApXG4gICAgICAuYXR0cihcImN5XCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIG1heFIgKiBpICogMiArIDMgKiBtYXhSICsgeExhYmVsSGVpZ2h0O1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBzaXplU2NhbGUoZCwgc3Vtc1kpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiY3hcIiwgeUxhYmVsV2lkdGggKyBtYXhSKVxuICAgICAgLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJhdXRvXCIpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGNvbG9yU2NhbGVBeGVzKGQsIHN1bXNZKTtcbiAgICAgIH0pXG4gICAgICAuc3R5bGUoXCJmaWxsLW9wYWNpdHlcIiwgMSlcbiAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIiM5ZTk5OTlcIilcbiAgICAgIC5zdHlsZShcInN0cm9rZS13aWR0aFwiLCAxKTtcblxuICAgIGNvbnN0IHN1bXNZVmFsdWVzID0gY2hhcnQuc2VsZWN0QWxsKFwiLnN1bXMteS12YWx1ZVwiKS5kYXRhKHN1bXNZKVxuICAgIC8vIC8vYWRkcyBtb3VzZW92ZXIgdHJhbnNpdGlvblxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwic3Vtcy15LXZhbHVlXCIpXG4gICAgICAub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGlmIChkID4gMCkge1xuICAgICAgICAgIHNlbGVjdGlvbi5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIik7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0aW9uXG4gICAgICAgICAgLnNlbGVjdChcImNpcmNsZVwiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oMClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAuc2VsZWN0KFwidGV4dFwiKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oMClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgfSlcbiAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBzZWxlY3Rpb24uc3R5bGUoXCJjdXJzb3JcIiwgXCJkZWZhdWx0XCIpO1xuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAuc2VsZWN0KFwiY2lyY2xlXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgIC5zZWxlY3QoXCJ0ZXh0XCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICB9KTtcbiAgICAgIC8vIC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgIC8vICAgaWYgKGQgPiAwKSB7XG4gICAgICAvLyAgICAgaWYgKGxvY2FsVGhpcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyAgICAgICBsb2NhbFRoaXMub25DbGljayhcbiAgICAgIC8vICAgICAgICAgXCJkYXlcIixcbiAgICAgIC8vICAgICAgICAgbG9jYWxUaGlzLmdldERheSh5TGFiZWxzWzBdW2ldLnRleHRDb250ZW50KSxcbiAgICAgIC8vICAgICAgICAgLTFcbiAgICAgIC8vICAgICAgICk7XG4gICAgICAvLyAgICAgfVxuXG4gICAgICAvLyAgICAgLy8gd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdF91cmwgKyB5TGFiZWxzWzBdW2ldLnRleHRDb250ZW50ICsgJy8tMSc7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pO1xuXG4gICAgLy8gY3JlYXRlcyB0aGUgbmVlZGVkIHN2ZyBhbmQgdGV4dCBlbGVtZW50cyB0byBtYWtlIHRoZSBsYWJlbHMgYWN0dWFsbHkgcmVhZGFibGVcbiAgICBzdW1zWVZhbHVlc1xuICAgICAgLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgLmF0dHIoXCJyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIG1heFI7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJjeFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBtYXhSO1xuICAgICAgICB9KVxuICAgICAgLmF0dHIoXCJjeVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBtYXhSO1xuICAgICAgfSlcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgdGhpcy5heGlzQ29sb3JzWzFdKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcblxuICAgIHN1bXNZVmFsdWVzXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApXG4gICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIDgpO1xuXG4gICAgc3Vtc1lWYWx1ZXMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgLy8gY2VudGVycyBhbmQgcmVzaXplcyB0aGUgdGV4dCBzbyBpdCBkb2Vzbid0IGV4Y2VlZCBpdHMgcmVjdFxuICAgIHN1bXNZVmFsdWVzXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgXCJ0cmFuc2xhdGUoXCIgK1xuICAgICAgICAgIHlMYWJlbFdpZHRoICtcbiAgICAgICAgICBcIixcIiArXG4gICAgICAgICAgKHhMYWJlbEhlaWdodCArIDIgKiBtYXhSICsgMiAqIG1heFIgKiBpKSArXG4gICAgICAgICAgXCIpXCJcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwidGV4dFwiKVxuICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInlcIiwgbWF4UiArIDQpXG4gICAgICAuYXR0cihcInhcIiwgbWF4Uik7XG5cbiAgICAvLyBlbnN1cmVzIHRoZSBjb2xvcmVkIHJlY3Qgb24gdGhlIGxhYmVsIGlzIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBjaXJjbGUgZGlhbWV0ZXIgKG1heFIgKiAyKVxuICAgIHN1bXNZVmFsdWVzXG4gICAgICAuc2VsZWN0KFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBtYXhSICogMilcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIG1heFIgKiAyKTtcblxuICAgIC8vIGNyZWF0ZSB0b3AgbGFiZWwgZm9yIHlcbiAgICAvLyBjaGFydFxuICAgIC8vICAgLmFwcGVuZChcInRleHRcIilcbiAgICAvLyAgIC5hdHRyKFwieFwiLCB5TGFiZWxXaWR0aClcbiAgICAvLyAgIC5hdHRyKFwieVwiLCBoZWlnaHQgKyBtYXhSICogMilcbiAgICAvLyAgIC5hcHBlbmQoXCJ0c3BhblwiKVxuICAgIC8vICAgLmF0dHIoXCJjbGFzc1wiLCBcInN1bS1sYWJlbC15XCIpXG4gICAgLy8gICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcInN0YXJ0XCIpXG4gICAgLy8gICAudGV4dChcIlRvdGFsL1wiKVxuICAgIC8vICAgLmFwcGVuZChcInRzcGFuXCIpXG4gICAgLy8gICAuYXR0cihcImR5XCIsIDE1KVxuICAgIC8vICAgLmF0dHIoXCJ4XCIsIHlMYWJlbFdpZHRoKVxuICAgIC8vICAgLnRleHQoXCJEYXlcIilcbiAgICAvLyAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdW0tbGFiZWwteVwiKVxuICAgIC8vICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJzdGFydFwiKTtcbiAgICAvLyB4IGF4aXMgc3Vtc1xuXG4gICAgY29uc3Qgc3Vtc1hBeGlzID0gY2hhcnQuc2VsZWN0QWxsKFwiLnN1bXMteFwiKS5kYXRhKHN1bXNYKTtcblxuICAgIC8vIHN0eWxpbmcgZm9yIHRoZSBsYWJlbHNcbiAgICBzdW1zWEF4aXNcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiY3lcIiwgMClcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdW1zLXhcIilcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAuc3R5bGUoXCJmaWxsLW9wYWNpdHlcIiwgMClcbiAgICAgIC5hdHRyKFwiY3lcIiwgeExhYmVsSGVpZ2h0ICsgbWF4UilcbiAgICAgIC5hdHRyKFwiclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBzaXplU2NhbGUoZCwgc3Vtc1gpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiY3hcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4geUxhYmVsV2lkdGggKyAzICogbWF4UiArIG1heFIgKiBpICogMjtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInNoYXBlLXJlbmRlcmluZ1wiLCBcImF1dG9cIilcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gY29sb3JTY2FsZUF4ZXMoZCwgc3Vtc1gpO1xuICAgICAgfSlcbiAgICAgIC5zdHlsZShcImZpbGwtb3BhY2l0eVwiLCAxKVxuICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiIzllOTk5OVwiKVxuICAgICAgLnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIDEpO1xuXG4gICAgY29uc3Qgc3Vtc1hWYWx1ZXMgPSBjaGFydC5zZWxlY3RBbGwoXCIuc3Vtcy14LXZhbHVlXCIpLmRhdGEoc3Vtc1gpXG4gICAgLy8gLy9hZGRzIG1vdXNlb3ZlciB0cmFuc2l0aW9uXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdW1zLXgtdmFsdWVcIilcbiAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgaWYgKGQgPiAwKSB7XG4gICAgICAgICAgc2VsZWN0aW9uLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAuc2VsZWN0KFwiY2lyY2xlXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbigxMDApXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcbiAgICAgICAgc2VsZWN0aW9uXG4gICAgICAgICAgLnNlbGVjdChcInRleHRcIilcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmR1cmF0aW9uKDEwMClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgfSlcbiAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBzZWxlY3Rpb24uc3R5bGUoXCJjdXJzb3JcIiwgXCJkZWZhdWx0XCIpO1xuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAuc2VsZWN0KFwiY2lyY2xlXCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgIC5zZWxlY3QoXCJ0ZXh0XCIpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICB9KTtcbiAgICAgIC8vIC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgIC8vICAgaWYgKGQgPiAwKSB7XG4gICAgICAvLyAgICAgbG9jYWxUaGlzLm9uQ2xpY2soXCJob3VyXCIsIDAsIGkpO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9KTtcblxuICAgIC8vIGNyZWF0ZXMgdGhlIG5lZWRlZCBzdmcgYW5kIHRleHQgZWxlbWVudHMgdG8gbWFrZSB0aGUgbGFiZWxzIGFjdHVhbGx5IHJlYWRhYmxlXG4gICAgc3Vtc1hWYWx1ZXNcbiAgICAgIC5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAgIC5hdHRyKFwiclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBtYXhSO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiY3hcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gbWF4UjtcbiAgICAgICAgfSlcbiAgICAgIC5hdHRyKFwiY3lcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gbWF4UjtcbiAgICAgIH0pXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIHRoaXMuYXhpc0NvbG9yc1sxXSlcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG5cbiAgICBzdW1zWFZhbHVlc1xuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKVxuICAgICAgLnN0eWxlKCdmb250LXNpemUnLCA4KTtcblxuICAgIHN1bXNYVmFsdWVzLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgIC8vIGNlbnRlcnMgYW5kIHJlc2l6ZXMgdGhlIHRleHQgc28gaXQgZG9lc24ndCBleGNlZWQgaXRzIHJlY3RcbiAgICBzdW1zWFZhbHVlc1xuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIFwidHJhbnNsYXRlKFwiICtcbiAgICAgICAgICAoeUxhYmVsV2lkdGggKyAyICogbWF4UiAqIGkgKyAyICogbWF4UikgK1xuICAgICAgICAgIFwiLCBcIiArXG4gICAgICAgICAgeExhYmVsSGVpZ2h0ICtcbiAgICAgICAgICBcIilcIlxuICAgICAgICApO1xuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoXCJ0ZXh0XCIpXG4gICAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwieVwiLCBtYXhSICsgNClcbiAgICAgIC5hdHRyKFwieFwiLCBtYXhSKTtcblxuICAgIC8vIGVuc3VyZXMgdGhlIGNvbG9yZWQgcmVjdCBvbiB0aGUgbGFiZWwgaXMgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGNpcmNsZSBkaWFtZXRlciAobWF4UiAqIDIpXG4gICAgc3Vtc1hWYWx1ZXNcbiAgICAgIC5zZWxlY3QoXCJyZWN0XCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIG1heFIgKiAyKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgbWF4UiAqIDIpO1xuXG4gICAgLy8gY3JlYXRlIGxlZnQgbGFiZWwgZm9yIHN1bXNYXG4gICAgLy8gY2hhcnRcbiAgICAvLyAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLy8gICAuYXR0cihcInhcIiwgd2lkdGggKyAyICogbWF4UiArIDcpXG4gICAgLy8gICAuYXR0cihcInlcIiwgeExhYmVsSGVpZ2h0ICsgbWF4UiAvIDIpXG4gICAgLy8gICAuYXBwZW5kKFwidHNwYW5cIilcbiAgICAvLyAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdW0tbGFiZWwteVwiKVxuICAgIC8vICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJzdGFydFwiKVxuICAgIC8vICAgLnRleHQoXCJUb3RhbC9cIilcbiAgICAvLyAgIC5hcHBlbmQoXCJ0c3BhblwiKVxuICAgIC8vICAgLmF0dHIoXCJkeVwiLCAxNSlcbiAgICAvLyAgIC5hdHRyKFwieFwiLCB3aWR0aCArIDIgKiBtYXhSICsgNylcbiAgICAvLyAgIC50ZXh0KFwiSHJcIilcbiAgICAvLyAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdW0tbGFiZWwteVwiKVxuICAgIC8vICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJzdGFydFwiKTtcblxuICAgIC8vIGRyYXcgaW4tY2hhcnQgbGlnaHQgYXhlcyBzZXBhcmF0aW5nIHNxdWFyZXNcbiAgICBjaGFydC5zZWxlY3RBbGwoXCIudmVydFwiKVxuICAgICAgLmRhdGEobGFiZWxzWClcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwibGluZVwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInZlcnRcIilcbiAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiIzg4OFwiKVxuICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMSlcbiAgICAgIC5zdHlsZShcInNoYXBlLXJlbmRlcmluZ1wiLCBcImNyaXNwRWRnZXNcIilcbiAgICAgIC5zdHlsZShcInN0cm9rZS1vcGFjaXR5XCIsIDApXG4gICAgICAuYXR0cihcIngxXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIG1heFIgKiBpICogMiArIHlMYWJlbFdpZHRoICsgMiAqIG1heFI7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ4MlwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBtYXhSICogaSAqIDIgKyB5TGFiZWxXaWR0aCArIDIgKiBtYXhSO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwieTFcIiwgeExhYmVsSGVpZ2h0ICsgYm9yZGVyV2lkdGggLyAyKVxuICAgICAgLmF0dHIoXCJ5MlwiLCBoZWlnaHQgKyAyICogbWF4UilcbiAgICAgIC5zdHlsZShcInN0cm9rZS1vcGFjaXR5XCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIGkgPyAwLjUgOiAwO1xuICAgICAgfSk7XG5cbiAgICBjaGFydC5zZWxlY3RBbGwoXCIuaG9yaXpcIilcbiAgICAgIC5kYXRhKGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuZGF5X29mX3dlZWs7XG4gICAgICB9KVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJsaW5lXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwiaG9yaXpcIilcbiAgICAgIC5hdHRyKFwieDFcIiwgeUxhYmVsV2lkdGggKyBib3JkZXJXaWR0aCAvIDIpXG4gICAgICAuYXR0cihcInN0cm9rZVwiLCBcIiM4ODhcIilcbiAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDEpXG4gICAgICAuc3R5bGUoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJjcmlzcEVkZ2VzXCIpXG4gICAgICAuc3R5bGUoXCJzdHJva2Utb3BhY2l0eVwiLCAwKVxuICAgICAgLmF0dHIoXCJ4MlwiLCAobWF4UiAqIDI1ICogMikgKyB5TGFiZWxXaWR0aClcbiAgICAgIC5hdHRyKFwieTFcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gaSAqIG1heFIgKiAyICsgeExhYmVsSGVpZ2h0ICsgMiAqIG1heFI7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ5MlwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBpICogbWF4UiAqIDIgKyB4TGFiZWxIZWlnaHQgKyAyICogbWF4UjtcbiAgICAgIH0pXG4gICAgICAuc3R5bGUoXCJzdHJva2Utb3BhY2l0eVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBpID8gMC41IDogMDtcbiAgICAgIH0pO1xuXG4gICAgLy8gb3V0ZXIgQm9yZGVyIEJvdHRvbVxuICAgIGNoYXJ0XG4gICAgICAuYXBwZW5kKFwibGluZVwiKVxuICAgICAgLmF0dHIoXCJ4MVwiLCB5TGFiZWxXaWR0aCArIGJvcmRlcldpZHRoIC8gMilcbiAgICAgIC5hdHRyKFwieTFcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gKGkgKiBtYXhSICogMiArIDIgKiBtYXhSKSArIGhlaWdodDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcIngyXCIsIG1heFIgKiAyNSAqIDIgKyB5TGFiZWxXaWR0aClcbiAgICAgIC5hdHRyKFwieTJcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gKGkgKiBtYXhSICogMiArIDIgKiBtYXhSKSArIGhlaWdodDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAyKVxuICAgICAgLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJjcmlzcEVkZ2VzXCIpXG4gICAgICAuYXR0cihcInN0cm9rZVwiLCBcImdyZXlcIilcbiAgICAgIC5hdHRyKCdjbGFzcycsICdwdW5jaC1ib3JkZXInKTtcblxuICAgIC8vIG91dGVyIGJvcmRlciByaWdodFxuICAgIGNoYXJ0XG4gICAgICAuYXBwZW5kKFwibGluZVwiKVxuICAgICAgLmF0dHIoXCJ4MVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiAobWF4UiAqIDI1ICogMikgKyB5TGFiZWxXaWR0aCAvLysgd2lkdGg7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ4MlwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiAobWF4UiAqIDI1ICogMikgKyB5TGFiZWxXaWR0aCAvLysgd2lkdGg7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ5MVwiLCB4TGFiZWxIZWlnaHQgKyBib3JkZXJXaWR0aCAvIDIpXG4gICAgICAuYXR0cihcInkyXCIsIGhlaWdodCArIDIgKiBtYXhSKVxuICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMilcbiAgICAgIC5zdHlsZShcInNoYXBlLXJlbmRlcmluZ1wiLCBcImNyaXNwRWRnZXNcIilcbiAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiZ3JleVwiKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3B1bmNoLWJvcmRlcicpO1xuXG4gICAgLy8gRW1pdCByZWFkeSBldmVudC5cbiAgfVxufVxuIl19