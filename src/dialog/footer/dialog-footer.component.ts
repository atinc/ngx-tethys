import { useHostRenderer } from '@tethys/cdk/dom';
import { Component, ContentChild, Input, OnInit, TemplateRef, inject } from '@angular/core';

import { THY_DIALOG_LAYOUT_CONFIG, ThyDialogFooterAlign, ThyDialogLayoutConfig } from '../dialog.config';
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
    @ContentChild('description') description: TemplateRef<any>;

    /**
     * 底部是否有分割线，可全局配置默认值
     * @type boolean
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    set thyDivided(value: boolean) {
        this.divided = value;
    }

    /**
     * 对齐方式，可全局配置默认值
     * @type left | right | center
     * @default left
     */
    @Input() thyAlign: ThyDialogFooterAlign;

    private divided: boolean;

    private hostRenderer = useHostRenderer();

    private get align() {
        return !!this.thyAlign ? this.thyAlign : this.dialogLayoutConfig.footerAlign;
    }

    constructor() {
        this.divided = this.dialogLayoutConfig.footerDivided;
    }

    ngOnInit() {
        this.hostRenderer.updateClassByMap({
            'dialog-footer': true,
            [`dialog-footer-actions-align-${this.align}`]: true,
            'dialog-footer-border-top': this.divided
        });
    }
}
