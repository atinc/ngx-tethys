import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyCarouselBasicExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    ngOnInit(): void {}
}
