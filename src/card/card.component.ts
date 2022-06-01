import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { InputBoolean } from 'ngx-tethys/core';

@Component({
    selector: 'thy-card',
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-card',
        '[class.thy-card--divided]': '!!thyDivided',
        '[class.thy-card--clear-left-right-padding]': '!thyHasLeftRightPadding',
        '[class.thy-card-sm]': 'thySize === "sm"',
        '[class.thy-card-lg]': 'thySize === "lg"'
    }
})
export class ThyCardComponent {
    @Input('thyHasLeftRightPadding')
    @InputBoolean()
    thyHasLeftRightPadding: boolean | string = true;

    @Input('thyDivided')
    @InputBoolean()
    thyDivided: boolean | string;

    @Input()
    thySize: 'md' | 'sm' | 'lg';
}
