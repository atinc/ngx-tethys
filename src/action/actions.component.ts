import {
    Component,
    OnInit,
    OnChanges,
    ChangeDetectionStrategy,
    Input,
    ContentChildren,
    QueryList,
    AfterContentInit,
    SimpleChanges
} from '@angular/core';
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
    },
    standalone: true
})
export class ThyActions implements OnInit, AfterContentInit, OnChanges {
    @ContentChildren(ThyAction) actions: QueryList<ThyAction>;

    /**
     * 大小，支持 `zero` | `xxs` | `xs` | `sm` | `md` | `lg` | `xlg` 和自定义数字大小
     * @type string | number
     */
    @Input() thySize: ThySpacingSize = 'md';

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thySize && !changes.thySize.firstChange && this.actions) {
            this.setActionsSize(this.actions.toArray());
        }
    }

    ngAfterContentInit(): void {
        this.actions.changes.subscribe((actions: ThyAction[]) => {
            this.setActionsSize(actions);
        });
        this.setActionsSize(this.actions.toArray());
    }

    private setActionsSize(actions: ThyAction[]) {
        actions.forEach((action: ThyAction, index) => {
            // can't set marginRight value for last item
            if (index !== actions.length - 1) {
                action.setMarginRight(getNumericSize(this.thySize, 'md') + 'px');
            }
        });
    }
}
