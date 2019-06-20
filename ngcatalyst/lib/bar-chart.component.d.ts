import { OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
export declare class BarChartComponent implements OnChanges, AfterViewInit {
    data: [{
        name: string;
        value: number;
    }];
    propID: string;
    color: string;
    yAxisLabel: string;
    xAxisLabel: string;
    xAxisAngle: number;
    yAxisAngle: number;
    title: string;
    constructor();
    readonly dataModel: {
        x: string;
        y: number;
    }[];
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    mouseover_callback(x: any): any;
    drawBarPlot(data: any, id: any, yaxisvalue: any, xaxisvalue: any, mouseover_callback: any): void;
}
