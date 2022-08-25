import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyCarouselBasicExampleComponent implements OnInit {
    constructor() {}

    array = [1, 2, 3, 4];

    ngOnInit(): void {}
}
