/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
export class SunburstComponent {
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
        const color = d3.scaleOrdinal(d3.schemePaired);
        /** @type {?} */
        const formatNumber = d3.format(",d");
        /** @type {?} */
        let x = d3.scaleLinear()
            .range([0, 2 * Math.PI]);
        /** @type {?} */
        let y = d3.scaleSqrt()
            .range([0, radius]);
        /** @type {?} */
        const partition = d3.partition();
        /** @type {?} */
        const arc = d3.arc()
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
        const svg = d3.select(selection_string).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");
        /** @type {?} */
        const tooltip = d3
            .select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);
        /** @type {?} */
        const root = d3.hierarchy(this.data[0]);
        root.sum((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.size; }));
        /** @type {?} */
        const nodes = partition(root).descendants();
        svg.selectAll("path")
            .data(nodes)
            .enter().append("path")
            .attr("d", arc)
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
                .style("left", d3.event.pageX + 5 + "px")
                .style("top", d3.event.pageY - 28 + "px");
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
                const xd = d3.interpolate(x.domain(), [d.x0, d.x1]);
                /** @type {?} */
                const yd = d3.interpolate(y.domain(), [d.y0, 1]);
                /** @type {?} */
                const yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
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
            function () { return arc(d); }); }));
        }
        d3.select(self.frameElement).style("height", height + "px");
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
if (false) {
    /** @type {?} */
    SunburstComponent.prototype.propID;
    /** @type {?} */
    SunburstComponent.prototype.data;
    /** @type {?} */
    SunburstComponent.prototype.title;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VuYnVyc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdjYXRhbHlzdC8iLCJzb3VyY2VzIjpbImxpYi9zdW5idXJzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUEyQyxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQVd6QixNQUFNLE9BQU8saUJBQWlCO0lBTTVCO1FBSlMsV0FBTSxHQUFHLE1BQU0sQ0FBQztJQUlULENBQUM7Ozs7Ozs7Ozs7SUFTakIsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELFlBQVk7UUFDTix3QkFBd0I7UUFDeEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDOztjQUMzQyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU07UUFDMUMsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ25FLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNsRTs7WUFDRyxPQUFZOztjQUNWLFFBQVEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUM7UUFFNUQsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxF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RSxDQUFDLENBQUMsQ0FBQzs7c0JBQzFDLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMzRDs7OztnQkFBTyxVQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7WUFDeEUsQ0FBQyxFQUFDO2lCQUNILFNBQVMsQ0FBQyxNQUFNLENBQUM7aUJBQ2YsU0FBUyxDQUFDLEdBQUc7Ozs7WUFBRSxVQUFTLENBQUMsSUFBSTs7O1lBQU8sY0FBYSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1FBQzdFLENBQUM7UUFFRCxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztJQUVsRSxDQUFDOzs7WUFqSkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Q0FLWDthQUNBOzs7OztxQkFHRSxLQUFLO21CQUNMLEtBQUs7b0JBQ0wsS0FBSzs7OztJQUZOLG1DQUF5Qjs7SUFDekIsaUNBQXdHOztJQUN4RyxrQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlaWtvcy1zdW5idXJzdCcsXG4gIHRlbXBsYXRlOiBgXG4gIDxoMj57e3RpdGxlfX08L2gyPlxuICA8ZGl2IHN0eWxlPVwiaGVpZ2h0OiA3NTBweDsgd2lkdGg6IDc1MHB4O1wiID5cbiAgICAgIDxkaXYgW2lkXT1cInByb3BJRFwiIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwJVwiPiA8L2Rpdj5cbiAgPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFN1bmJ1cnN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHByb3BJRCA9ICdsaW5lJztcbiAgQElucHV0KCkgZGF0YTogW3tuYW1lOiBzdHJpbmcsIGNoaWxkcmVuOiBbe25hbWU6IHN0cmluZywgc2l6ZTogbnVtYmVyfSwge25hbWU6IHN0cmluZywgY2hpbGRyZW46IFtdfV19XTtcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8vIHlvdSBtaWdodCBuZWVkIGEgbWV0aG9kIGxpa2UgdGhpcyB0byByZWZvcm1hdCBnaXZlbiBkYXRhIHdpdGggdGhlIGFwcHJvcHJpYXRlIGZpZWxkIG5hbWVzLFxuICAvLyBnZXQgZGF0YU1vZGVsKCkge1xuICAvLyAgIHJldHVybiB0aGlzLmRhdGEubWFwKGl0ZW0gPT4ge1xuICAvLyAgICAgcmV0dXJuIHtkYXRlOiBpdGVtLnNvbWV0aGluZywgdmFsdWU6IGl0ZW0uc29tZXRoaW5nRWxzZX07XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRyYXdTdW5idXJzdCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuZHJhd1N1bmJ1cnN0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kcmF3U3VuYnVyc3QoKTtcbiAgfVxuXG4gIGRyYXdTdW5idXJzdCgpIHtcbiAgICAgICAgLy8gbGV0IGxvY2FsVGhpcyA9IHRoaXM7XG4gICAgICAgIGQzLnNlbGVjdEFsbChgLiR7dGhpcy5wcm9wSUR9X3Rvb2x0aXBgKS5yZW1vdmUoKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uX3N0cmluZyA9IFwiI1wiICsgdGhpcy5wcm9wSUQ7XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdGlvbl9zdHJpbmcgKyBcIiBzdmdcIilbMF0gIT0gbnVsbCkge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyArIFwiIHN2Z1wiKVswXS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZWxlbWVudDogYW55O1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyk7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkWzBdID09IG51bGwpIHtcbiAgICAgICAgICBlbGVtZW50ID0gW3tjbGllbnRXaWR0aDogNTAwLCBjbGllbnRIZWlnaHQ6IDUwMH1dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1lbnQgPSBzZWxlY3RlZFswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0XHR3aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIGxldFx0aGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgLy8gQWNjb3VudCBmb3IgcGFuZWwgaGVhZGluZyBoZWlnaHQgaWYgaXQgZXhpc3RzLlxuICAgICAgICBpZiAodGhpcy50aXRsZSkge1xuICAgICAgICAgIGhlaWdodCAtPSA0MDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggaGVpZ2h0ID09PSB1bmRlZmluZWQgfHwgaGVpZ2h0ID09PSAwICkge1xuICAgICAgICAgIGhlaWdodCA9IHdpZHRoIC8gNDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpIC8gMjtcbiAgICAgICAgY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lUGFpcmVkKTtcblxuICAgICAgICBjb25zdCBmb3JtYXROdW1iZXIgPSBkMy5mb3JtYXQoXCIsZFwiKTtcblxuICAgICAgICBsZXQgeCA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5yYW5nZShbMCwgMiAqIE1hdGguUEldKTtcblxuICAgICAgICBsZXQgeSA9IGQzLnNjYWxlU3FydCgpXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHJhZGl1c10pO1xuXG4gICAgICAgIGNvbnN0IHBhcnRpdGlvbiA9IGQzLnBhcnRpdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgICAgICAgICAuc3RhcnRBbmdsZShmdW5jdGlvbihkKSB7IHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigyICogTWF0aC5QSSwgeChkLngwKSkpOyB9KVxuICAgICAgICAgICAgLmVuZEFuZ2xlKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKDIgKiBNYXRoLlBJLCB4KGQueDEpKSk7IH0pXG4gICAgICAgICAgICAuaW5uZXJSYWRpdXMoZnVuY3Rpb24oZCkgeyByZXR1cm4gTWF0aC5tYXgoMCwgeShkLnkwKSk7IH0pXG4gICAgICAgICAgICAub3V0ZXJSYWRpdXMoZnVuY3Rpb24oZCkgeyByZXR1cm4gTWF0aC5tYXgoMCwgeShkLnkxKSk7IH0pO1xuXG5cbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KHNlbGVjdGlvbl9zdHJpbmcpLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB3aWR0aCAvIDIgKyBcIixcIiArIChoZWlnaHQgLyAyKSArIFwiKVwiKTtcblxuICAgICAgICBjb25zdCB0b29sdGlwID0gZDNcbiAgICAgICAgICAgIC5zZWxlY3QoXCJib2R5XCIpXG4gICAgICAgICAgICAuYXBwZW5kKFwiZGl2XCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIGBkM192aXN1YWxzX3Rvb2x0aXAgJHt0aGlzLnByb3BJRH1fdG9vbHRpcGApXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuXG4gICAgICAgIGNvbnN0IHJvb3QgPSBkMy5oaWVyYXJjaHkodGhpcy5kYXRhWzBdKTtcbiAgICAgICAgcm9vdC5zdW0oZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zaXplOyB9KTtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBwYXJ0aXRpb24ocm9vdCkuZGVzY2VuZGFudHMoKTtcblxuICAgICAgICBzdmcuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgLmRhdGEobm9kZXMpXG4gICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIGFyYylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzZWdtZW50JylcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gY29sb3IoKGQuY2hpbGRyZW4gPyBkIDogZC5wYXJlbnQpLmRhdGEubmFtZSk7IH0pXG4gICAgICAgICAgICAub24oXCJjbGlja1wiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIGNsaWNrKGQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHRvb2x0aXAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKDEwMClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgICAgICAgICB0b29sdGlwXG4gICAgICAgICAgICAgICAgLmh0bWwoXG4gICAgICAgICAgICAgICAgICAgXCJOYW1lOiBcIiArIGQuZGF0YS5uYW1lICsgXCI8YnIvPlwiICsgIChkLmRhdGEuc2l6ZSA/IFwiVmFsdWU6IFwiICsgZC5kYXRhLnNpemUgOiBcIlwiKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIGQzLmV2ZW50LnBhZ2VYICsgNSArIFwicHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgZDMuZXZlbnQucGFnZVkgLSAyOCArIFwicHhcIik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbigzMDApXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgLmFwcGVuZChcInRpdGxlXCIpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7IHJldHVybiBkLmRhdGEubmFtZSArIFwiXFxuXCIgKyBmb3JtYXROdW1iZXIoZC52YWx1ZSk7IH0pO1xuXG5cblxuICAgICAgICBmdW5jdGlvbiBjbGljayhkKSB7XG4gICAgICAgICAgc3ZnLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuZHVyYXRpb24oNzUwKVxuICAgICAgICAgICAgICAudHdlZW4oXCJzY2FsZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB4ZCA9IGQzLmludGVycG9sYXRlKHguZG9tYWluKCksIFtkLngwLCBkLngxXSksXG4gICAgICAgICAgICAgICAgICAgIHlkID0gZDMuaW50ZXJwb2xhdGUoeS5kb21haW4oKSwgW2QueTAsIDFdKSxcbiAgICAgICAgICAgICAgICAgICAgeXIgPSBkMy5pbnRlcnBvbGF0ZSh5LnJhbmdlKCksIFtkLnkwID8gMjAgOiAwLCByYWRpdXNdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyB4LmRvbWFpbih4ZCh0KSk7IHkuZG9tYWluKHlkKHQpKS5yYW5nZSh5cih0KSk7IH07XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgICAuYXR0clR3ZWVuKFwiZFwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIGFyYyhkKTsgfTsgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBkMy5zZWxlY3Qoc2VsZi5mcmFtZUVsZW1lbnQpLnN0eWxlKFwiaGVpZ2h0XCIsIGhlaWdodCArIFwicHhcIik7XG5cbiAgfVxufVxuIl19