import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './arrow.component.html',
    styleUrls: ['./arrow.component.scss']
})
export class ThyCarouselArrowExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    isShow = true;

    ngOnInit(): void {
        for (let i = 0; i < 8; i++) {
            this.array.push(`Slide ${i}`);
        }
    }
}
