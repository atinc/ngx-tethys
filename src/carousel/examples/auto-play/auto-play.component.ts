import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './auto-play.component.html',
    styleUrls: ['./auto-play.component.scss']
})
export class ThyCarouselAutoPlayExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    authPlay = true;

    ngOnInit(): void {}
}
