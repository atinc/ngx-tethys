import { Component, OnInit, input } from '@angular/core';
import { coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';

/**
 * @name thy-slide-body-section
 * @order 50
 */
@Component({
    selector: 'thy-slide-body-section',
    template: '<ng-content></ng-content>',
    host: {
        class: 'thy-slide-body-section',
        '[class.thy-slide-body-section-divider]': 'thyDividerBorder()'
    }
})
export class ThySlideBodySection implements OnInit {
    /**
     * 是否有分割线
     * @default false
     */
    readonly thyDividerBorder = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    ngOnInit() {}
}
