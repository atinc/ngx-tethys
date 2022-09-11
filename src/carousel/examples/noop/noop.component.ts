import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './noop.component.html',
    styleUrls: ['./noop.component.scss']
})
export class ThyCarouselNoopExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    ngOnInit(): void {
        for (let i = 0; i < 8; i++) {
            this.array.push(`Slide ${i}`);
        }
    }
}
