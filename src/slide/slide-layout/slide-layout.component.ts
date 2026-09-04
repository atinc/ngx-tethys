import { Component, ViewEncapsulation, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';

/**
 * @name thy-slide-layout
 * @order 35
 */
@Component({
    selector: 'thy-slide-layout',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.Eager,
    encapsulation: ViewEncapsulation.None
})
export class ThySlideLayout implements OnInit {
    @HostBinding('class.thy-slide-layout') slideLayout = true;

    constructor() {}

    ngOnInit() {}
}
