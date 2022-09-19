import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './dot.component.html',
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

            .custom-dots {
                display: block;
                width: 16px;
                height: 4px;
                background: #fff;
                opacity: 0.3;
                transition: opacity 500ms linear, width 300ms linear;
                border-radius: 2px;
            }

            .custom-dots:hover {
                opacity: 0.75;
            }

            .custom-dots.active {
                width: 24px;
                opacity: 1;
            }

            .default-color {
                font-size: 16px;
                color: #fff;
            }

            .active-color {
                font-size: 25px;
                color: #007bff;
            }
        `
    ]
})
export class ThyCarouselDotExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    isShow = true;

    ngOnInit(): void {
        for (let i = 0; i < 6; ) {
            this.array.push(`Slide ${i++}`);
        }
    }
}
