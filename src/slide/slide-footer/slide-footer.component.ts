import { Component, OnInit, HostBinding } from '@angular/core';

/**
 * @private
 */
@Component({
    selector: 'thy-slide-footer',
    template: '<ng-content></ng-content>',
    standalone: true
})
export class ThySlideFooterComponent implements OnInit {
    @HostBinding('class.thy-slide-footer') slideLayoutFooter = true;

    ngOnInit() {}
}
