import { OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
export declare class PieChartComponent implements OnInit, OnChanges, AfterViewInit {
    propID: string;
    data: [{
        label: string;
        value: number;
    }];
    title: 'Pie Chart';
    donutWidth: number;
    colors: string[];
    savedColors: {};
    total: number;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    drawPieChart(): void;
}
