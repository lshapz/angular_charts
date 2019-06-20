/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
export class BarChartComponent {
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
        d3.selectAll(`.${this.propID}_tooltip`).remove();
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
        const x = d3.scaleBand()
            .range([0, width])
            .paddingInner(.2)
            .paddingOuter(.2);
        /** @type {?} */
        const y = d3.scaleLinear()
            .range([height - margin.bottom, 0]);
        /** @type {?} */
        const xAxis = d3.axisBottom()
            .scale(x)
            .tickSizeOuter(0);
        /** @type {?} */
        const yAxis = d3.axisLeft()
            .scale(y)
            .tickSizeInner(-width)
            .tickSizeOuter(0);
        /** @type {?} */
        const tooltip = d3
            .select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);
        /** @type {?} */
        const chart = d3
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nY2F0YWx5c3QvIiwic291cmNlcyI6WyJsaWIvYmFyLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTBDLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBWXpCLE1BQU0sT0FBTyxpQkFBaUI7SUFVNUI7UUFSUyxXQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ3BCLFVBQUssR0FBRyxTQUFTLENBQUM7UUFDbEIsZUFBVSxHQUFHLEdBQUcsQ0FBQztRQUNqQixlQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixVQUFLLEdBQUcsV0FBVyxDQUFDO0lBRWIsQ0FBQzs7OztJQUVqQixJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFCLE9BQU8sRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDM0csQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVB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QztvQkFDOUIsQ0FBQyxFQUFDO29CQUNGLE9BQU8sT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUN2RCxDQUFDLEVBQUMsQ0FBQztZQUNULENBQUMsRUFBQztpQkFDRCxFQUFFLENBQUMsVUFBVTs7OztZQUFFLFVBQVMsQ0FBQztnQkFDeEIsRUFBRTtxQkFDQyxNQUFNLENBQUMsSUFBSSxDQUFDO3FCQUNaLFVBQVUsRUFBRTtxQkFDWixRQUFRLENBQUMsR0FBRyxDQUFDO3FCQUNiLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQyxPQUFPO3FCQUNKLFVBQVUsRUFBRTtxQkFDWixRQUFRLENBQUMsR0FBRyxDQUFDO3FCQUNiLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekIsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNQLENBQUM7OztZQS9ORixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7R0FNVDthQUNGOzs7OzttQkFFRSxLQUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLO29CQUNMLEtBQUs7Ozs7SUFQTixpQ0FBK0M7O0lBQy9DLG1DQUE2Qjs7SUFDN0Isa0NBQTJCOztJQUMzQix1Q0FBMEI7O0lBQzFCLHVDQUEwQjs7SUFDMUIsdUNBQXlCOztJQUN6Qix1Q0FBeUI7O0lBQ3pCLGtDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Vpa29zLWJhci1jaGFydCcsXG4gIHRlbXBsYXRlOiBgXG4gIDxoMj57e3RpdGxlfX08L2gyPlxuICAgIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDc1MHB4OyB3aWR0aDogNzUwcHg7XCIgPlxuICAgICAgPGRpdiBbaWRdPVwicHJvcElEXCIgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDoxMDAlXCI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBCYXJDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIGRhdGE6IFt7bmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyfV07XG4gIEBJbnB1dCgpIHByb3BJRCA9ICdiYXJjaGFydCc7XG4gIEBJbnB1dCgpIGNvbG9yID0gJyMyREE4QzknO1xuICBASW5wdXQoKSB5QXhpc0xhYmVsID0gJ3knO1xuICBASW5wdXQoKSB4QXhpc0xhYmVsID0gJ3gnO1xuICBASW5wdXQoKSB4QXhpc0FuZ2xlID0gNDU7XG4gIEBJbnB1dCgpIHlBeGlzQW5nbGUgPSA0NTtcbiAgQElucHV0KCkgdGl0bGUgPSBcIkJhciBDaGFydFwiO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgZ2V0IGRhdGFNb2RlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLm1hcChpdGVtID0+IHtcbiAgICAgIHJldHVybiB7eDogaXRlbS5uYW1lLCB5OiBpdGVtLnZhbHVlfTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRyYXdCYXJQbG90KHRoaXMuZGF0YU1vZGVsLCB0aGlzLnByb3BJRCwgdGhpcy55QXhpc0xhYmVsLCB0aGlzLnhBeGlzTGFiZWwsIHRoaXMubW91c2VvdmVyX2NhbGxiYWNrKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmRyYXdCYXJQbG90KHRoaXMuZGF0YU1vZGVsLCB0aGlzLnByb3BJRCwgdGhpcy55QXhpc0xhYmVsLCB0aGlzLnhBeGlzTGFiZWwsIHRoaXMubW91c2VvdmVyX2NhbGxiYWNrKTtcbiAgfVxuXG4gIG1vdXNlb3Zlcl9jYWxsYmFjayh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgfVxuXG4gIGRyYXdCYXJQbG90IChkYXRhLCBpZCwgeWF4aXN2YWx1ZSwgeGF4aXN2YWx1ZSwgbW91c2VvdmVyX2NhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsVGhpcyA9IHRoaXM7XG4gICAgICAgIGQzLnNlbGVjdEFsbChgLiR7dGhpcy5wcm9wSUR9X3Rvb2x0aXBgKS5yZW1vdmUoKTtcblxuICAgICAgICBjb25zdCBzZWxlY3Rpb25fc3RyaW5nID0gXCIjXCIgKyBpZDtcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyArIFwiIHN2Z1wiKVswXSAhPSBudWxsKSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rpb25fc3RyaW5nICsgXCIgc3ZnXCIpWzBdLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1lbnQ6IGFueTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdGlvbl9zdHJpbmcpO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZFswXSA9PSBudWxsKSB7XG4gICAgICAgICAgZWxlbWVudCA9IHtjbGllbnRXaWR0aDogNTAwLCBjbGllbnRIZWlnaHQ6IDUwMH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbWVudCA9IHNlbGVjdGVkWzBdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hcmdpbiA9IHsgdG9wOiAyMCwgcmlnaHQ6IDMwLCBib3R0b206IDE1LCBsZWZ0OiA0MCB9O1xuICAgICAgICBpZiAodGhpcy54QXhpc0FuZ2xlID4gMCkge1xuICAgICAgICAgIG1hcmdpbi5ib3R0b20gKz0gKHRoaXMueEF4aXNBbmdsZSAvIDIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICAgIGhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgICAgICAgY29uc3QgeCA9IGQzLnNjYWxlQmFuZCgpXG4gICAgICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXG4gICAgICAgICAgLnBhZGRpbmdJbm5lciguMilcbiAgICAgICAgICAucGFkZGluZ091dGVyKC4yKTtcblxuICAgICAgICBjb25zdCB5ID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgIC5yYW5nZShbaGVpZ2h0IC0gbWFyZ2luLmJvdHRvbSwgMF0pO1xuXG4gICAgICAgIGNvbnN0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSgpXG4gICAgICAgICAgLnNjYWxlKHgpXG4gICAgICAgICAgLnRpY2tTaXplT3V0ZXIoMCk7XG5cbiAgICAgICAgY29uc3QgeUF4aXMgPSBkMy5heGlzTGVmdCgpXG4gICAgICAgICAgLnNjYWxlKHkpXG4gICAgICAgICAgLnRpY2tTaXplSW5uZXIoLXdpZHRoKVxuICAgICAgICAgIC50aWNrU2l6ZU91dGVyKDApO1xuXG4gICAgICAgIGNvbnN0IHRvb2x0aXAgPSBkM1xuICAgICAgICAgIC5zZWxlY3QoXCJib2R5XCIpXG4gICAgICAgICAgLmFwcGVuZChcImRpdlwiKVxuICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgYGQzX3Zpc3VhbHNfdG9vbHRpcCAke3RoaXMucHJvcElEfV90b29sdGlwYClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuXG4gICAgICAgIGNvbnN0IGNoYXJ0ID0gZDNcbiAgICAgICAgICAuc2VsZWN0KHNlbGVjdGlvbl9zdHJpbmcpXG4gICAgICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIixcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XG5cbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHkuZG9tYWluKFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBkMy5tYXgoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4gZC55O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKTtcbiAgICAgICAgICB4LmRvbWFpbihcbiAgICAgICAgICAgIGRhdGEubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGQueDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoYXJ0XG4gICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArICAoaGVpZ2h0IC0gbWFyZ2luLiBib3R0b20pICsgXCIpXCIpXG4gICAgICAgICAgLmNhbGwoeEF4aXMpXG4gICAgICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAgICAgICAuYXR0cihcInhcIiwgd2lkdGggLyAyICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgICAgIC5hdHRyKFwieVwiLCAzMClcbiAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgIC50ZXh0KHhheGlzdmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IHRleHQgPSBjaGFydC5zZWxlY3RBbGwoXCJ0ZXh0XCIpO1xuXG4gICAgICAgIGlmICh0aGlzLnhBeGlzQW5nbGUgPiAwKSB7XG4gICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHJvdGF0ZSgke3RoaXMueEF4aXNBbmdsZX0pIHRyYW5zbGF0ZSgwLCAke21hcmdpbi50b3B9KWApXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIik7XG5cbiAgICAgICAgICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0ZXh0Lm5vZGUoKS5nZXRCQm94KCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhBeGlzQW5nbGUgPT09IDQ1KSB7XG4gICAgICAgICAgICAgIHRleHQuYXR0cihcInhcIiwgMTUpXG4gICAgICAgICAgICAgICAgICAuYXR0cihcInlcIiwgZGltZW5zaW9ucy5oZWlnaHQgKiAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMueEF4aXNBbmdsZSA9PT0gOTApIHtcbiAgICAgICAgICAgICAgdGV4dC5hdHRyKFwieFwiLCBkaW1lbnNpb25zLndpZHRoIC0gMTApXG4gICAgICAgICAgICAgICAgICAuYXR0cihcInlcIiwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjaGFydFxuICAgICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInkgYXhpc1wiKVxuICAgICAgICAgIC5jYWxsKHlBeGlzKVxuICAgICAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImxhYmVsXCIpXG4gICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgICAgIC5hdHRyKFwieVwiLCA2KVxuICAgICAgICAgIC5hdHRyKFwiZHlcIiwgXCIuNzFlbVwiKVxuICAgICAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgICAgICAgLnRleHQoeWF4aXN2YWx1ZSk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBoZXgycmdiKGhleCkge1xuICAgICAgICAgICAgcmV0dXJuIFs8YW55PicweCcgKyBoZXhbMV0gKyBoZXhbMl0gfCAwLCA8YW55PicweCcgKyBoZXhbM10gKyBoZXhbNF0gfCAwLCA8YW55PicweCcgKyBoZXhbNV0gKyBoZXhbNl0gfCAwXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNoYXJ0XG4gICAgICAgICAgICAuc2VsZWN0QWxsKFwiLmJhclwiKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImJhclwiKVxuICAgICAgICAgICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHgoZC54KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4geShkLnkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodCAtIHkoZC55KSAtIG1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB4LmJhbmR3aWR0aCgpIC0geC5wYWRkaW5nSW5uZXIoKSlcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgbG9jYWxUaGlzLmNvbG9yKVxuICAgICAgICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgY29uc3QgeXZhbCA9IG1vdXNlb3Zlcl9jYWxsYmFjayhkLnkpO1xuICAgICAgICAgICAgICB0b29sdGlwXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbigxMDApXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcbiAgICAgICAgICAgICAgdG9vbHRpcFxuICAgICAgICAgICAgICAgIC5odG1sKFxuICAgICAgICAgICAgICAgICAgeGF4aXN2YWx1ZSArXG4gICAgICAgICAgICAgICAgICAgIFwiOiA8Yj5cIiArXG4gICAgICAgICAgICAgICAgICAgIGQueCArIFwiPC9iPjxicj5cIiArXG4gICAgICAgICAgICAgICAgICB5YXhpc3ZhbHVlICtcbiAgICAgICAgICAgICAgICAgICAgXCI6IDxiPlwiICtcbiAgICAgICAgICAgICAgICAgICAgeXZhbCArIFwiPC9iPlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgZDMuZXZlbnQucGFnZVggKyA1ICsgXCJweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBkMy5ldmVudC5wYWdlWSAtIDI4ICsgXCJweFwiKTtcbiAgICAgICAgICAgICAgZDNcbiAgICAgICAgICAgICAgICAuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbig1MClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGR0KSB7XG5cbiAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50RmlsbDogYW55O1xuICAgICAgICAgICAgICAgICAgY3VycmVudEZpbGwgPSBoZXgycmdiKGxvY2FsVGhpcy5jb2xvcik7XG4gICAgICAgICAgICAgICAgICAvLyBpZiAoY3VycmVudEZpbGwuaW5jbHVkZXMoJyMnKSl7XG4gICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gICBjdXJyZW50RmlsbCA9IGN1cnJlbnRGaWxsLnNsaWNlKDAsIGN1cnJlbnRGaWxsLmxlbmd0aCAtMikuc2xpY2UoNCkuc3BsaXQoJywgJylcbiAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgIGNvbnN0IGRhcmtlciA9IGN1cnJlbnRGaWxsLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHJhZGl4XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChpdGVtKSAqIC43NTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGByZ2IoJHtkYXJrZXJbMF19LCAke2RhcmtlclsxXX0sICR7ZGFya2VyWzJdfSlgO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICBkM1xuICAgICAgICAgICAgICAgIC5zZWxlY3QodGhpcylcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKDEwMClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGxvY2FsVGhpcy5jb2xvcik7XG4gICAgICAgICAgICAgIHRvb2x0aXBcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKDMwMClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgfVxuXG59XG4iXX0=