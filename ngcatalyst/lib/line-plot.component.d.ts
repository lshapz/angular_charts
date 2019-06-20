import { OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
export declare class LinePlotComponent implements OnInit, OnChanges, AfterViewInit {
    propID: string;
    data: [{
        date: string;
        value: number;
    }];
    title: "Line Plot";
    color: string;
    yAxisLabel: string;
    xAxisLabel: string;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    drawLinePlot(dataArray: any, selection_string: any, color: any): void;
}
