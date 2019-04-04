import { Component, ViewEncapsulation, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-slide-layout',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class ThySlideLayoutComponent implements OnInit {
    @HostBinding('class.thy-slide-layout') slideLayout = true;

    constructor() {}

    ngOnInit() {}
}
