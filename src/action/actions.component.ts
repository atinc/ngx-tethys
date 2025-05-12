import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges, contentChildren, effect, input } from '@angular/core';
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
export class ThyActions implements OnInit, OnChanges {
    readonly actions = contentChildren<ThyAction>(ThyAction);

    /**
     * 大小，支持 `zero` | `xxs` | `xs` | `sm` | `md` | `lg` | `xlg` 和自定义数字大小
     * @type string | number
     */
    readonly thySize = input<ThySpacingSize>('md');

    constructor() {
        effect(() => {
            this.setActionsSize(Array.from(this.actions()));
        });
    }

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        const actions = Array.from(this.actions());
        if (changes.thySize && !changes.thySize.firstChange && actions) {
            this.setActionsSize(actions);
        }
    }

    private setActionsSize(actions: ThyAction[]) {
        actions.forEach((action: ThyAction, index) => {
            // can't set marginRight value for last item
            if (index !== actions.length - 1) {
                action.setMarginRight(getNumericSize(this.thySize(), 'md') + 'px');
            }
        });
    }
}
