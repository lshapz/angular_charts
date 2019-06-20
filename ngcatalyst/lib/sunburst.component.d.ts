import { OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
export declare class SunburstComponent implements OnInit, OnChanges, AfterViewInit {
    propID: string;
    data: [{
        name: string;
        children: [{
            name: string;
            size: number;
        }, {
            name: string;
            children: [];
        }];
    }];
    title: string;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    drawSunburst(): void;
}
