import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
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
        '[class.thy-card--bordered]': '!!thyBordered',
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

    @Input('thyBordered')
    @InputBoolean()
    thyBordered: boolean | string;

    @Input()
    thySize: 'md' | 'sm' | 'lg';
}
