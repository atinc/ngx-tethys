import { useHostRenderer } from '@tethys/cdk/dom';

import { ChangeDetectionStrategy, Component, Directive, input, TemplateRef, computed, effect, contentChildren } from '@angular/core';
import { ThySpacingSize, getNumericSize } from 'ngx-tethys/core';
import { NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 间距组件项，使用结构性指令 *thySpaceItem 传入模板
 * @name thySpaceItem
 * @order 20
 */
@Directive({ selector: '[thySpaceItem]', host: { class: 'thy-space-item' } })
export class ThySpaceItemDirective {}

const DEFAULT_SIZE: ThySpacingSize = 'md';

/**
 * 间距组件
 * @name thy-space
 * @order 10
 */
@Component({
    selector: 'thy-space',
    templateUrl: './space.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.thy-space]': 'true',
        '[class.thy-space-vertical]': 'thyVertical()'
    },
    imports: [NgTemplateOutlet]
})
export class ThySpace {
    private hostRenderer = useHostRenderer();

    /**
     * 大小，支持 `zero` | `xxs` | `xs` | `sm` | `md` | `lg` | `xlg` 和自定义数字大小
     * @type string | number
     */
    readonly thySize = input<ThySpacingSize>(DEFAULT_SIZE);

    readonly space = computed(() => {
        return getNumericSize(this.thySize(), DEFAULT_SIZE);
    });

    /**
     * 间距垂直方向，默认是水平方向
     */
    readonly thyVertical = input<string | boolean, boolean>(false, { transform: coerceBooleanProperty });

    // @ClassBinding(`align-items-{{value}}`)
    /**
     * 对齐方式，可选择 `start` | `end` | `baseline` | `center`
     */
    readonly thyAlign = input<string>();

    readonly items = contentChildren(ThySpaceItemDirective, { read: TemplateRef<HTMLElement> });

    constructor() {
        effect(() => {
            this.hostRenderer.updateClass(this.thyAlign() ? [`align-items-${this.thyAlign()}`] : []);
        });
    }
}
