import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-carousel',
    templateUrl: './carousel.component.html'
})
export class ThyCarouselComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        console.log(`ThyCarouselComponent init`);
    }
}
