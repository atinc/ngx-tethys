import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ThyTranslate } from 'ngx-tethys/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';

import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    HostBinding,
    Input,
    OnInit,
    TemplateRef,
    ViewEncapsulation,
    inject
} from '@angular/core';

import { ThyFormDirective } from './form.directive';
import { coerceBooleanProperty } from 'ngx-tethys/util';

const internalIconMap = {
    date: 'wtf wtf-schedule-o'
};

type TipsMode = 'default' | 'label';

/**
 * 表单分组组件
 * @name thy-form-group
 * @order 40
 */
@Component({
    selector: 'thy-form-group',
    templateUrl: './form-group.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet, ThyIcon, NgClass, ThyTooltipDirective]
})
export class ThyFormGroup implements OnInit {
    private thyParentForm = inject(ThyFormDirective, { optional: true })!;
    private thyTranslate = inject(ThyTranslate);

    labelText: string;
    labelRequired = false;
    labelPaddingTopClear = false;
    feedbackIcon: string;
    feedbackSvgIconName: string;
    tips: string;
    tipMode: TipsMode = 'default';

    @HostBinding('class.row-fill') _rowFill = false;

    @HostBinding('class.form-group') _isFormGroup = true;

    @HostBinding('class.row') isHorizontal = true;

    @HostBinding('class.has-feedback') hasFeedback = false;

    /**
     * Label 文本
     */
    @Input()
    set thyLabelText(value: string) {
        this.labelText = value;
    }

    /**
     * Label 文本多语言 Key
     */
    @Input()
    set thyLabelTextTranslateKey(value: string) {
        if (value) {
            this.labelText = this.thyTranslate.instant(value);
        } else {
            this.labelText = '';
        }
    }

    /**
     * Label 是否显示必填项样式
     */
    @Input({ transform: coerceBooleanProperty })
    set thyLabelRequired(value: boolean) {
        this.labelRequired = value;
    }

    @Input({ transform: coerceBooleanProperty })
    set thyLabelPaddingTopClear(value: boolean) {
        this.labelPaddingTopClear = value;
    }

    /**
     * 反馈图标，比如日期输入框显示日期的图标，常用输入 date 表示时间 wtf wtf-schedule-o
     */
    @Input()
    set thyFeedbackIcon(value: string) {
        this.hasFeedback = true;
        if (internalIconMap[value]) {
            this.feedbackIcon = internalIconMap[value];
            this.feedbackSvgIconName = null;
        } else {
            this.feedbackSvgIconName = value;
            this.feedbackIcon = null;
        }
    }

    /**
     * 提示文字的显示模式，`label`模式表示在 label 后通过图标+Tooltip 提示, `default`模式在 Form Control 下方直接显示
     * @type default | label
     * @default default
     */
    @Input()
    set thyTipsMode(mode: TipsMode) {
        this.tipMode = mode;
    }

    /**
     * 提示文案
     */
    @Input()
    set thyTips(value: string) {
        this.tips = value;
    }

    /**
     * 提示文案的多语言 Key
     */
    @Input()
    set thyTipsTranslateKey(value: string) {
        this.tips = this.thyTranslate.instant(value);
    }

    /**
     * 是否填充整行, 没有 Label 文本，只有输入框
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    set thyRowFill(value: boolean) {
        this._rowFill = value;
    }

    /**
     * 已废弃
     * @deprecated please use content because formGroup is same name with angular formGroup directive
     */
    @ContentChild('formGroup')
    public contentTemplateRef: TemplateRef<any>;

    /**
     * 内容自定义模板，`<ng-template #content></ng-template>`
     */
    @ContentChild('content')
    public contentTemplate: TemplateRef<any>;

    ngOnInit() {
        this.isHorizontal = this.thyParentForm ? this.thyParentForm.isHorizontal : true;
    }
}
