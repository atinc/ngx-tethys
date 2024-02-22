import { Component, OnInit, HostBinding } from '@angular/core';

/**
 * @name thy-slide-footer
 * @order 55
 */
@Component({
    selector: 'thy-slide-footer',
    template: '<ng-content></ng-content>',
    standalone: true
})
export class ThySlideFooter implements OnInit {
    @HostBinding('class.thy-slide-footer') slideLayoutFooter = true;

    ngOnInit() {}
}
