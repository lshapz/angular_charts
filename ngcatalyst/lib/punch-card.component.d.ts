import { OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
export declare class PunchCardComponent implements OnInit, OnChanges, AfterViewInit {
    propID: string;
    data: [{
        day_of_week: string;
        hour_volumes: [];
    }];
    title: string;
    axisColors: string[];
    axisLabel: string;
    colors: string[];
    labelsX: string[];
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    getDay(day: any): number;
    getDayName(day: any): string;
    drawPunchCard(): void;
}
