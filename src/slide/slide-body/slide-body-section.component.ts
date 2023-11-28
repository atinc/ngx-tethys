import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @name thy-slide-body-section
 * @order 50
 */
@Component({
    selector: 'thy-slide-body-section',
    template: '<ng-content></ng-content>',
    standalone: true
})
export class ThySlideBodySection implements OnInit {
    @HostBinding('class.thy-slide-body-section') thySlideBodyItem = true;

    @HostBinding('class.thy-slide-body-section-divider') hasDivider = false;

    /**
     * 是否有分割线
     * @default false
     */
    @Input()
    set thyDividerBorder(value: string | boolean) {
        this.hasDivider = coerceBooleanProperty(value);
    }

    ngOnInit() {}
}
