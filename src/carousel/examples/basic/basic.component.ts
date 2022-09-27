import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './basic.component.html',
    styles: [
        `
            .custom-carousel-item {
                height: 300px !important;
                text-align: center;
                font-size: 18px;
                display: flex;
                color: #fff;
                justify-content: center;
                align-items: center;
                background: #6698ff;
            }
        `
    ]
})
export class ThyCarouselBasicExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    ngOnInit(): void {
        for (let i = 0; i < 6; ) {
            this.array.push(`Slide ${i++}`);
        }
    }
}
