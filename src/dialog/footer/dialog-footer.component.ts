import { useHostRenderer } from '@tethys/cdk/dom';
import { Component, OnInit, TemplateRef, inject, input, contentChild, computed, WritableSignal, effect, Input } from '@angular/core';

import { THY_DIALOG_LAYOUT_CONFIG, ThyDialogFooterAlign } from '../dialog.config';
import { NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 模态框底部组件
 * @name thy-dialog-footer
 * @order 60
 */
@Component({
    selector: 'thy-dialog-footer',
    templateUrl: './dialog-footer.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'thyDialogFooter',
    imports: [NgTemplateOutlet]
})
export class ThyDialogFooter implements OnInit {
    private dialogLayoutConfig = inject(THY_DIALOG_LAYOUT_CONFIG);

    /**
     * 自定义弹出框底部的描述模板
     * @type TemplateRef
     */
    readonly description = contentChild<TemplateRef<any>>('description');

    /**
     * 底部是否有分割线，可全局配置默认值
     * @type boolean
     */
    readonly thyDivided = input(undefined, { transform: coerceBooleanProperty });

    divided = computed(() => {
        if (this.thyDivided() === undefined) {
            return this.dialogLayoutConfig.footerDivided;
        }
        return this.thyDivided();
    });

    /**
     * 对齐方式，可全局配置默认值
     * @type left | right | center
     */
    readonly thyAlign = input<ThyDialogFooterAlign>();

    readonly align = computed(() => (!!this.thyAlign() ? this.thyAlign() : this.dialogLayoutConfig.footerAlign));

    private hostRenderer = useHostRenderer();

    constructor() {}

    ngOnInit() {
        this.hostRenderer.updateClassByMap({
            'dialog-footer': true,
            [`dialog-footer-actions-align-${this.align()}`]: true,
            'dialog-footer-border-top': this.divided()
        });
    }
}
