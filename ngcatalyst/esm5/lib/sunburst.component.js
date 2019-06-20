/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
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
        var svg = d3.select(selection_string).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");
        /** @type {?} */
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "d3_visuals_tooltip " + this.propID + "_tooltip")
            .style("opacity", 0);
        /** @type {?} */
        var root = d3.hierarchy(this.data[0]);
        root.sum((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.size; }));
        /** @type {?} */
        var nodes = partition(root).descendants();
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
                var xd = d3.interpolate(x.domain(), [d.x0, d.x1]);
                /** @type {?} */
                var yd = d3.interpolate(y.domain(), [d.y0, 1]);
                /** @type {?} */
                var yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
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
    };
    SunburstComponent.decorators = [
        { type: Component, args: [{
                    selector: 'eikos-sunburst',
                    template: "\n  <h2>{{title}}</h2>\n  <div style=\"height: 750px; width: 750px;\" >\n      <div [id]=\"propID\" style=\"width:100%;height:100%\"> </div>\n  </div>\n"
                }] }
    ];
    /** @nocollapse */
    SunburstComponent.ctorParameters = function () { return []; };
    SunburstComponent.propDecorators = {
        propID: [{ type: Input }],
        data: [{ type: Input }],
        title: [{ type: Input }]
    };
    return SunburstComponent;
}());
export { SunburstComponent };
if (false) {
    /** @type {?} */
    SunburstComponent.prototype.propID;
    /** @type {?} */
    SunburstComponent.prototype.data;
    /** @type {?} */
    SunburstComponent.prototype.title;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VuYnVyc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdjYXRhbHlzdC8iLCJzb3VyY2VzIjpbImxpYi9zdW5idXJzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUEyQyxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUV6QjtJQWVFO1FBSlMsV0FBTSxHQUFHLE1BQU0sQ0FBQztJQUlULENBQUM7SUFFakIsNkZBQTZGO0lBQzdGLG9CQUFvQjtJQUNwQixtQ0FBbUM7SUFDbkMsZ0VBQWdFO0lBQ2hFLFFBQVE7SUFDUixJQUFJOzs7Ozs7Ozs7O0lBRUosb0NBQVE7Ozs7Ozs7Ozs7SUFBUjtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUVELHVDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELDJDQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsd0NBQVk7OztJQUFaO1FBQ00sd0JBQXdCO1FBQ3hCLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBSSxJQUFJLENBQUMsTUFBTSxhQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7WUFDM0MsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNO1FBQzFDLElBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNuRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbEU7O1lBQ0csT0FB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QXdHOztJQUN4RyxrQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlaWtvcy1zdW5idXJzdCcsXG4gIHRlbXBsYXRlOiBgXG4gIDxoMj57e3RpdGxlfX08L2gyPlxuICA8ZGl2IHN0eWxlPVwiaGVpZ2h0OiA3NTBweDsgd2lkdGg6IDc1MHB4O1wiID5cbiAgICAgIDxkaXYgW2lkXT1cInByb3BJRFwiIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwJVwiPiA8L2Rpdj5cbiAgPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFN1bmJ1cnN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHByb3BJRCA9ICdsaW5lJztcbiAgQElucHV0KCkgZGF0YTogW3tuYW1lOiBzdHJpbmcsIGNoaWxkcmVuOiBbe25hbWU6IHN0cmluZywgc2l6ZTogbnVtYmVyfSwge25hbWU6IHN0cmluZywgY2hpbGRyZW46IFtdfV19XTtcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8vIHlvdSBtaWdodCBuZWVkIGEgbWV0aG9kIGxpa2UgdGhpcyB0byByZWZvcm1hdCBnaXZlbiBkYXRhIHdpdGggdGhlIGFwcHJvcHJpYXRlIGZpZWxkIG5hbWVzLFxuICAvLyBnZXQgZGF0YU1vZGVsKCkge1xuICAvLyAgIHJldHVybiB0aGlzLmRhdGEubWFwKGl0ZW0gPT4ge1xuICAvLyAgICAgcmV0dXJuIHtkYXRlOiBpdGVtLnNvbWV0aGluZywgdmFsdWU6IGl0ZW0uc29tZXRoaW5nRWxzZX07XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRyYXdTdW5idXJzdCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuZHJhd1N1bmJ1cnN0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kcmF3U3VuYnVyc3QoKTtcbiAgfVxuXG4gIGRyYXdTdW5idXJzdCgpIHtcbiAgICAgICAgLy8gbGV0IGxvY2FsVGhpcyA9IHRoaXM7XG4gICAgICAgIGQzLnNlbGVjdEFsbChgLiR7dGhpcy5wcm9wSUR9X3Rvb2x0aXBgKS5yZW1vdmUoKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uX3N0cmluZyA9IFwiI1wiICsgdGhpcy5wcm9wSUQ7XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdGlvbl9zdHJpbmcgKyBcIiBzdmdcIilbMF0gIT0gbnVsbCkge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyArIFwiIHN2Z1wiKVswXS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZWxlbWVudDogYW55O1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0aW9uX3N0cmluZyk7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkWzBdID09IG51bGwpIHtcbiAgICAgICAgICBlbGVtZW50ID0gW3tjbGllbnRXaWR0aDogNTAwLCBjbGllbnRIZWlnaHQ6IDUwMH1dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1lbnQgPSBzZWxlY3RlZFswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0XHR3aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIGxldFx0aGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgLy8gQWNjb3VudCBmb3IgcGFuZWwgaGVhZGluZyBoZWlnaHQgaWYgaXQgZXhpc3RzLlxuICAgICAgICBpZiAodGhpcy50aXRsZSkge1xuICAgICAgICAgIGhlaWdodCAtPSA0MDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggaGVpZ2h0ID09PSB1bmRlZmluZWQgfHwgaGVpZ2h0ID09PSAwICkge1xuICAgICAgICAgIGhlaWdodCA9IHdpZHRoIC8gNDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpIC8gMjtcbiAgICAgICAgY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lUGFpcmVkKTtcblxuICAgICAgICBjb25zdCBmb3JtYXROdW1iZXIgPSBkMy5mb3JtYXQoXCIsZFwiKTtcblxuICAgICAgICBsZXQgeCA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5yYW5nZShbMCwgMiAqIE1hdGguUEldKTtcblxuICAgICAgICBsZXQgeSA9IGQzLnNjYWxlU3FydCgpXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHJhZGl1c10pO1xuXG4gICAgICAgIGNvbnN0IHBhcnRpdGlvbiA9IGQzLnBhcnRpdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgICAgICAgICAuc3RhcnRBbmdsZShmdW5jdGlvbihkKSB7IHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigyICogTWF0aC5QSSwgeChkLngwKSkpOyB9KVxuICAgICAgICAgICAgLmVuZEFuZ2xlKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKDIgKiBNYXRoLlBJLCB4KGQueDEpKSk7IH0pXG4gICAgICAgICAgICAuaW5uZXJSYWRpdXMoZnVuY3Rpb24oZCkgeyByZXR1cm4gTWF0aC5tYXgoMCwgeShkLnkwKSk7IH0pXG4gICAgICAgICAgICAub3V0ZXJSYWRpdXMoZnVuY3Rpb24oZCkgeyByZXR1cm4gTWF0aC5tYXgoMCwgeShkLnkxKSk7IH0pO1xuXG5cbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KHNlbGVjdGlvbl9zdHJpbmcpLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB3aWR0aCAvIDIgKyBcIixcIiArIChoZWlnaHQgLyAyKSArIFwiKVwiKTtcblxuICAgICAgICBjb25zdCB0b29sdGlwID0gZDNcbiAgICAgICAgICAgIC5zZWxlY3QoXCJib2R5XCIpXG4gICAgICAgICAgICAuYXBwZW5kKFwiZGl2XCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIGBkM192aXN1YWxzX3Rvb2x0aXAgJHt0aGlzLnByb3BJRH1fdG9vbHRpcGApXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuXG4gICAgICAgIGNvbnN0IHJvb3QgPSBkMy5oaWVyYXJjaHkodGhpcy5kYXRhWzBdKTtcbiAgICAgICAgcm9vdC5zdW0oZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zaXplOyB9KTtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBwYXJ0aXRpb24ocm9vdCkuZGVzY2VuZGFudHMoKTtcblxuICAgICAgICBzdmcuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgLmRhdGEobm9kZXMpXG4gICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIGFyYylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzZWdtZW50JylcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gY29sb3IoKGQuY2hpbGRyZW4gPyBkIDogZC5wYXJlbnQpLmRhdGEubmFtZSk7IH0pXG4gICAgICAgICAgICAub24oXCJjbGlja1wiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIGNsaWNrKGQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHRvb2x0aXAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKDEwMClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgICAgICAgICB0b29sdGlwXG4gICAgICAgICAgICAgICAgLmh0bWwoXG4gICAgICAgICAgICAgICAgICAgXCJOYW1lOiBcIiArIGQuZGF0YS5uYW1lICsgXCI8YnIvPlwiICsgIChkLmRhdGEuc2l6ZSA/IFwiVmFsdWU6IFwiICsgZC5kYXRhLnNpemUgOiBcIlwiKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIGQzLmV2ZW50LnBhZ2VYICsgNSArIFwicHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgZDMuZXZlbnQucGFnZVkgLSAyOCArIFwicHhcIik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbigzMDApXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgLmFwcGVuZChcInRpdGxlXCIpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7IHJldHVybiBkLmRhdGEubmFtZSArIFwiXFxuXCIgKyBmb3JtYXROdW1iZXIoZC52YWx1ZSk7IH0pO1xuXG5cblxuICAgICAgICBmdW5jdGlvbiBjbGljayhkKSB7XG4gICAgICAgICAgc3ZnLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuZHVyYXRpb24oNzUwKVxuICAgICAgICAgICAgICAudHdlZW4oXCJzY2FsZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB4ZCA9IGQzLmludGVycG9sYXRlKHguZG9tYWluKCksIFtkLngwLCBkLngxXSksXG4gICAgICAgICAgICAgICAgICAgIHlkID0gZDMuaW50ZXJwb2xhdGUoeS5kb21haW4oKSwgW2QueTAsIDFdKSxcbiAgICAgICAgICAgICAgICAgICAgeXIgPSBkMy5pbnRlcnBvbGF0ZSh5LnJhbmdlKCksIFtkLnkwID8gMjAgOiAwLCByYWRpdXNdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyB4LmRvbWFpbih4ZCh0KSk7IHkuZG9tYWluKHlkKHQpKS5yYW5nZSh5cih0KSk7IH07XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgICAuYXR0clR3ZWVuKFwiZFwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIGFyYyhkKTsgfTsgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBkMy5zZWxlY3Qoc2VsZi5mcmFtZUVsZW1lbnQpLnN0eWxlKFwiaGVpZ2h0XCIsIGhlaWdodCArIFwicHhcIik7XG5cbiAgfVxufVxuIl19