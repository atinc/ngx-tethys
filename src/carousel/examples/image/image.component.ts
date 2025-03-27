import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './image.component.html',
    styles: [
        `
            [thycarouselitem] {
                height: 400px;
                display: flex;
                color: #fff;
                justify-content: center;
                align-items: center;
            }
        `
    ],
    standalone: false
})
export class ThyCarouselImageExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
