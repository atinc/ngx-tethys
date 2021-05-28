import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-nav-responsive-example',
    templateUrl: './responsive.component.html'
})
export class ThyNavResponsiveExampleComponent implements OnInit {
    activeIndex = 13;

    constructor() {}

    ngOnInit(): void {}

    select(value: number) {
        this.activeIndex = value;
    }
}
