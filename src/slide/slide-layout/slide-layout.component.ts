import { Component, ViewEncapsulation, OnInit, HostBinding } from '@angular/core';

/**
 * @name thy-slide-layout
 * @order 35
 */
@Component({
    selector: 'thy-slide-layout',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class ThySlideLayoutComponent implements OnInit {
    @HostBinding('class.thy-slide-layout') slideLayout = true;

    constructor() {}

    ngOnInit() {}
}
