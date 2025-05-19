import { ChangeDetectionStrategy, Component, OnInit, contentChildren, effect, input } from '@angular/core';
import { ThySpacingSize, getNumericSize } from 'ngx-tethys/core';
import { ThyAction } from './action.component';

/**
 * Actions 组件
 * @name thy-actions
 */
@Component({
    selector: 'thy-actions',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-actions'
    }
})
export class ThyActions implements OnInit {
    readonly actions = contentChildren<ThyAction>(ThyAction);

    /**
     * 大小，支持 `zero` | `xxs` | `xs` | `sm` | `md` | `lg` | `xlg` 和自定义数字大小
     * @type string | number
     */
    readonly thySize = input<ThySpacingSize>('md');

    constructor() {
        effect(() => {
            this.setActionsSize();
        });
    }

    ngOnInit(): void {}

    private setActionsSize() {
        const actions: ThyAction[] = Array.from(this.actions());
        actions.forEach((action: ThyAction, index) => {
            // can't set marginRight value for last item
            if (index !== actions.length - 1) {
                action.setMarginRight(getNumericSize(this.thySize(), 'md') + 'px');
            }
        });
    }
}
