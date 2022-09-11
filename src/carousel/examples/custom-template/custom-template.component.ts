import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './custom-template.component.html',
    styleUrls: ['./custom-template.component.scss']
})
export class ThyCarouselCustomTemplateExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    ngOnInit(): void {
        for (let i = 0; i < 8; i++) {
            this.array.push(`Slide ${i}`);
        }
    }
}
