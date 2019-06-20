/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
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
         */
        function () {
            return this.data.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
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
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "d3_visuals_tooltip " + this.propID + "_tooltip")
            .style("opacity", 0);
        /** @type {?} */
        var chart = d3
            .select(selection_string)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        if (data.length > 0) {
            y.domain([
                0,
                d3.max(data, (/**
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
                d3
                    .select(this)
                    .transition()
                    .duration(50)
                    .style("fill", (/**
                 * @param {?} dt
                 * @return {?}
                 */
                function (dt) {
                    /** @type {?} */
                    var currentFill;
                    currentFill = hex2rgb(localThis.color);
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
            }))
                .on("mouseout", (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                d3
                    .select(this)
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
        { type: Component, args: [{
                    selector: 'eikos-bar-chart',
                    template: "\n  <h2>{{title}}</h2>\n    <div style=\"height: 750px; width: 750px;\" >\n      <div [id]=\"propID\" style=\"width:100%;height:100%\">\n      </div>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    BarChartComponent.ctorParameters = function () { return []; };
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
    return BarChartComponent;
}());
export { BarChartComponent };
if (false) {
    /** @type {?} */
    BarChartComponent.prototype.data;
    /** @type {?} */
    BarChartComponent.prototype.propID;
    /** @type {?} */
    BarChartComponent.prototype.color;
    /** @type {?} */
    BarChartComponent.prototype.yAxisLabel;
    /** @type {?} */
    BarChartComponent.prototype.xAxisLabel;
    /** @type {?} */
    BarChartComponent.prototype.xAxisAngle;
    /** @type {?} */
    BarChartComponent.prototype.yAxisAngle;
    /** @type {?} */
    BarChartComponent.prototype.title;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nY2F0YWx5c3QvIiwic291cmNlcyI6WyJsaWIvYmFyLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTBDLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXpCO0lBb0JFO1FBUlMsV0FBTSxHQUFHLFVBQVUsQ0FBQztRQUNwQixVQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxHQUFHLENBQUM7UUFDakIsZUFBVSxHQUFHLEdBQUcsQ0FBQztRQUNqQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsVUFBSyxHQUFHLFdBQVcsQ0FBQztJQUViLENBQUM7SUFFakIsc0JBQUksd0NBQVM7Ozs7UUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxJQUFJO2dCQUN2QixPQUFPLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQztZQUN2QyxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUM7OztPQUFBOzs7O0lBRUQsMkNBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzNHLENBQUM7Ozs7O0lBRUQsdUNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElB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Q0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7b0JBQzlCLENBQUMsRUFBQztvQkFDRixPQUFPLFNBQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQUcsQ0FBQztnQkFDdkQsQ0FBQyxFQUFDLENBQUM7WUFDVCxDQUFDLEVBQUM7aUJBQ0QsRUFBRSxDQUFDLFVBQVU7Ozs7WUFBRSxVQUFTLENBQUM7Z0JBQ3hCLEVBQUU7cUJBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQztxQkFDWixVQUFVLEVBQUU7cUJBQ1osUUFBUSxDQUFDLEdBQUcsQ0FBQztxQkFDYixLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEMsT0FBTztxQkFDSixVQUFVLEVBQUU7cUJBQ1osUUFBUSxDQUFDLEdBQUcsQ0FBQztxQkFDYixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsRUFBQyxDQUFDO1NBQ047SUFDUCxDQUFDOztnQkEvTkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSx1S0FNVDtpQkFDRjs7Ozs7dUJBRUUsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzt3QkFDTCxLQUFLOztJQStNUix3QkFBQztDQUFBLEFBak9ELElBaU9DO1NBdk5ZLGlCQUFpQjs7O0lBQzVCLGlDQUErQzs7SUFDL0MsbUNBQTZCOztJQUM3QixrQ0FBMkI7O0lBQzNCLHVDQUEwQjs7SUFDMUIsdUNBQTBCOztJQUMxQix1Q0FBeUI7O0lBQ3pCLHVDQUF5Qjs7SUFDekIsa0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBBZnRlclZpZXdJbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZWlrb3MtYmFyLWNoYXJ0JyxcbiAgdGVtcGxhdGU6IGBcbiAgPGgyPnt7dGl0bGV9fTwvaDI+XG4gICAgPGRpdiBzdHlsZT1cImhlaWdodDogNzUwcHg7IHdpZHRoOiA3NTBweDtcIiA+XG4gICAgICA8ZGl2IFtpZF09XCJwcm9wSURcIiBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OjEwMCVcIj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEJhckNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgZGF0YTogW3tuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXJ9XTtcbiAgQElucHV0KCkgcHJvcElEID0gJ2JhcmNoYXJ0JztcbiAgQElucHV0KCkgY29sb3IgPSAnIzJEQThDOSc7XG4gIEBJbnB1dCgpIHlBeGlzTGFiZWwgPSAneSc7XG4gIEBJbnB1dCgpIHhBeGlzTGFiZWwgPSAneCc7XG4gIEBJbnB1dCgpIHhBeGlzQW5nbGUgPSA0NTtcbiAgQElucHV0KCkgeUF4aXNBbmdsZSA9IDQ1O1xuICBASW5wdXQoKSB0aXRsZSA9IFwiQmFyIENoYXJ0XCI7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBnZXQgZGF0YU1vZGVsKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIHt4OiBpdGVtLm5hbWUsIHk6IGl0ZW0udmFsdWV9O1xuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZHJhd0JhclBsb3QodGhpcy5kYXRhTW9kZWwsIHRoaXMucHJvcElELCB0aGlzLnlBeGlzTGFiZWwsIHRoaXMueEF4aXNMYWJlbCwgdGhpcy5tb3VzZW92ZXJfY2FsbGJhY2spO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuZHJhd0JhclBsb3QodGhpcy5kYXRhTW9kZWwsIHRoaXMucHJvcElELCB0aGlzLnlBeGlzTGFiZWwsIHRoaXMueEF4aXNMYWJlbCwgdGhpcy5tb3VzZW92ZXJfY2FsbGJhY2spO1xuICB9XG5cbiAgbW91c2VvdmVyX2NhbGxiYWNrKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICB9XG5cbiAgZHJhd0JhclBsb3QgKGRhdGEsIGlkLCB5YXhpc3ZhbHVlLCB4YXhpc3ZhbHVlLCBtb3VzZW92ZXJfY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgbG9jYWxUaGlzID0gdGhpcztcbiAgICAgICAgZDMuc2VsZWN0QWxsKGAuJHt0aGlzLnByb3BJRH1fdG9vbHRpcGApLnJlbW92ZSgpO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbl9zdHJpbmcgPSBcIiNcIiArIGlkO1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rpb25fc3RyaW5nICsgXCIgc3ZnXCIpWzBdICE9IG51bGwpIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdGlvbl9zdHJpbmcgKyBcIiBzdmdcIilbMF0ucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbWVudDogYW55O1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyk7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkWzBdID09IG51bGwpIHtcbiAgICAgICAgICBlbGVtZW50ID0ge2NsaWVudFdpZHRoOiA1MDAsIGNsaWVudEhlaWdodDogNTAwfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtZW50ID0gc2VsZWN0ZWRbMF07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwLCByaWdodDogMzAsIGJvdHRvbTogMTUsIGxlZnQ6IDQwIH07XG4gICAgICAgIGlmICh0aGlzLnhBeGlzQW5nbGUgPiAwKSB7XG4gICAgICAgICAgbWFyZ2luLmJvdHRvbSArPSAodGhpcy54QXhpc0FuZ2xlIC8gMik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgd2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXG4gICAgICAgICAgaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxuICAgICAgICBjb25zdCB4ID0gZDMuc2NhbGVCYW5kKClcbiAgICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgICAgICAucGFkZGluZ0lubmVyKC4yKVxuICAgICAgICAgIC5wYWRkaW5nT3V0ZXIoLjIpO1xuXG4gICAgICAgIGNvbnN0IHkgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgLnJhbmdlKFtoZWlnaHQgLSBtYXJnaW4uYm90dG9tLCAwXSk7XG5cbiAgICAgICAgY29uc3QgeEF4aXMgPSBkMy5heGlzQm90dG9tKClcbiAgICAgICAgICAuc2NhbGUoeClcbiAgICAgICAgICAudGlja1NpemVPdXRlcigwKTtcblxuICAgICAgICBjb25zdCB5QXhpcyA9IGQzLmF4aXNMZWZ0KClcbiAgICAgICAgICAuc2NhbGUoeSlcbiAgICAgICAgICAudGlja1NpemVJbm5lcigtd2lkdGgpXG4gICAgICAgICAgLnRpY2tTaXplT3V0ZXIoMCk7XG5cbiAgICAgICAgY29uc3QgdG9vbHRpcCA9IGQzXG4gICAgICAgICAgLnNlbGVjdChcImJvZHlcIilcbiAgICAgICAgICAuYXBwZW5kKFwiZGl2XCIpXG4gICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBgZDNfdmlzdWFsc190b29sdGlwICR7dGhpcy5wcm9wSUR9X3Rvb2x0aXBgKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG5cbiAgICAgICAgY29uc3QgY2hhcnQgPSBkM1xuICAgICAgICAgIC5zZWxlY3Qoc2VsZWN0aW9uX3N0cmluZylcbiAgICAgICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKVxuICAgICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgeS5kb21haW4oW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIGQzLm1heChkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkLnk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pO1xuICAgICAgICAgIHguZG9tYWluKFxuICAgICAgICAgICAgZGF0YS5tYXAoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4gZC54O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hhcnRcbiAgICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ4IGF4aXNcIilcbiAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiICsgIChoZWlnaHQgLSBtYXJnaW4uIGJvdHRvbSkgKyBcIilcIilcbiAgICAgICAgICAuY2FsbCh4QXhpcylcbiAgICAgICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYWJlbFwiKVxuICAgICAgICAgIC5hdHRyKFwieFwiLCB3aWR0aCAvIDIgKyBtYXJnaW4ucmlnaHQpXG4gICAgICAgICAgLmF0dHIoXCJ5XCIsIDMwKVxuICAgICAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgICAgICAgLnRleHQoeGF4aXN2YWx1ZSk7XG5cbiAgICAgICAgY29uc3QgdGV4dCA9IGNoYXJ0LnNlbGVjdEFsbChcInRleHRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMueEF4aXNBbmdsZSA+IDApIHtcbiAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgcm90YXRlKCR7dGhpcy54QXhpc0FuZ2xlfSkgdHJhbnNsYXRlKDAsICR7bWFyZ2luLnRvcH0pYClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKTtcblxuICAgICAgICAgICAgY29uc3QgZGltZW5zaW9ucyA9IHRleHQubm9kZSgpLmdldEJCb3goKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMueEF4aXNBbmdsZSA9PT0gNDUpIHtcbiAgICAgICAgICAgICAgdGV4dC5hdHRyKFwieFwiLCAxNSlcbiAgICAgICAgICAgICAgICAgIC5hdHRyKFwieVwiLCBkaW1lbnNpb25zLmhlaWdodCAqIDIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy54QXhpc0FuZ2xlID09PSA5MCkge1xuICAgICAgICAgICAgICB0ZXh0LmF0dHIoXCJ4XCIsIGRpbWVuc2lvbnMud2lkdGggLSAxMClcbiAgICAgICAgICAgICAgICAgIC5hdHRyKFwieVwiLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNoYXJ0XG4gICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpXG4gICAgICAgICAgLmNhbGwoeUF4aXMpXG4gICAgICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgICAgICAgLmF0dHIoXCJ5XCIsIDYpXG4gICAgICAgICAgLmF0dHIoXCJkeVwiLCBcIi43MWVtXCIpXG4gICAgICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJlbmRcIilcbiAgICAgICAgICAudGV4dCh5YXhpc3ZhbHVlKTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGhleDJyZ2IoaGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gWzxhbnk+JzB4JyArIGhleFsxXSArIGhleFsyXSB8IDAsIDxhbnk+JzB4JyArIGhleFszXSArIGhleFs0XSB8IDAsIDxhbnk+JzB4JyArIGhleFs1XSArIGhleFs2XSB8IDBdO1xuICAgICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY2hhcnRcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoXCIuYmFyXCIpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYmFyXCIpXG4gICAgICAgICAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4geChkLngpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiB5KGQueSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0IC0geShkLnkpIC0gbWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIHguYmFuZHdpZHRoKCkgLSB4LnBhZGRpbmdJbm5lcigpKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBsb2NhbFRoaXMuY29sb3IpXG4gICAgICAgICAgICAub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICBjb25zdCB5dmFsID0gbW91c2VvdmVyX2NhbGxiYWNrKGQueSk7XG4gICAgICAgICAgICAgIHRvb2x0aXBcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKDEwMClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgICAgICAgICB0b29sdGlwXG4gICAgICAgICAgICAgICAgLmh0bWwoXG4gICAgICAgICAgICAgICAgICB4YXhpc3ZhbHVlICtcbiAgICAgICAgICAgICAgICAgICAgXCI6IDxiPlwiICtcbiAgICAgICAgICAgICAgICAgICAgZC54ICsgXCI8L2I+PGJyPlwiICtcbiAgICAgICAgICAgICAgICAgIHlheGlzdmFsdWUgK1xuICAgICAgICAgICAgICAgICAgICBcIjogPGI+XCIgK1xuICAgICAgICAgICAgICAgICAgICB5dmFsICsgXCI8L2I+XCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBkMy5ldmVudC5wYWdlWCArIDUgKyBcInB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIGQzLmV2ZW50LnBhZ2VZIC0gMjggKyBcInB4XCIpO1xuICAgICAgICAgICAgICBkM1xuICAgICAgICAgICAgICAgIC5zZWxlY3QodGhpcylcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24oZHQpIHtcblxuICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRGaWxsOiBhbnk7XG4gICAgICAgICAgICAgICAgICBjdXJyZW50RmlsbCA9IGhleDJyZ2IobG9jYWxUaGlzLmNvbG9yKTtcbiAgICAgICAgICAgICAgICAgIC8vIGlmIChjdXJyZW50RmlsbC5pbmNsdWRlcygnIycpKXtcbiAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyAgIGN1cnJlbnRGaWxsID0gY3VycmVudEZpbGwuc2xpY2UoMCwgY3VycmVudEZpbGwubGVuZ3RoIC0yKS5zbGljZSg0KS5zcGxpdCgnLCAnKVxuICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgY29uc3QgZGFya2VyID0gY3VycmVudEZpbGwubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogcmFkaXhcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGl0ZW0pICogLjc1O1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYHJnYigke2RhcmtlclswXX0sICR7ZGFya2VyWzFdfSwgJHtkYXJrZXJbMl19KWA7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIGQzXG4gICAgICAgICAgICAgICAgLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oMTAwKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgbG9jYWxUaGlzLmNvbG9yKTtcbiAgICAgICAgICAgICAgdG9vbHRpcFxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oMzAwKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICB9XG5cbn1cbiJdfQ==