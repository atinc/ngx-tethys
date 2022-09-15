import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './touchable.component.html',
    styleUrls: ['./touchable.component.scss']
})
export class ThyCarouselTouchableExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    enable = true;

    ngOnInit(): void {}
}
