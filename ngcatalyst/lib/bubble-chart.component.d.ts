import { OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
export declare class BubbleChartComponent implements OnInit, OnChanges, AfterViewInit {
    propID: string;
    data: [{
        label: string;
        value: number;
    }];
    title: string;
    isTime: boolean;
    isDate: boolean;
    themeColors: string[];
    yAxisLabel: string;
    xAxisLabel: string;
    dateFormat: string;
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    constructor();
    readonly processedData: [{
        label: string;
        value: number;
    }];
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    xValue(d: any): any;
    yValue(d: any): any;
    zValue(d: any): any;
    pretty_duration(d: any): any;
    get_min_bubble_size(max_value_size: any, cutoff: any, min_pixels: any): any;
    get_max_bubble_size(max_value_size: any, min_bubble_size: any, cutoff: any, max_pixels: any): any;
    get_bubble_sizes(max_value_size: any): {
        'min': any;
        'max': any;
    };
    get_duration_zoom_range(max_value_mins: any, min_zoom_mins?: number): number[];
    get_x_zoom_range(asrs: any, xval: any, min_zoom_mins?: number): number[];
    drawBubbleChart(data: any): void;
}
