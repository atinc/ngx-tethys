import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    OnInit,
    TemplateRef,
    ViewEncapsulation,
    inject,
    input,
    computed,
    signal
} from '@angular/core';

import { ThyTranslate } from 'ngx-tethys/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';

import { ThyFormDirective } from './form.directive';
import { coerceBooleanProperty } from 'ngx-tethys/util';

const internalIconMap: Record<string, string> = {
    date: 'calendar'
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
    imports: [NgTemplateOutlet, ThyIcon, NgClass, ThyTooltipDirective],
    host: {
        class: 'form-group',
        '[class.row-fill]': 'thyRowFill()',
        '[class.row]': 'isHorizontalSignal()',
        '[class.has-feedback]': 'thyFeedbackIcon()'
    }
})
export class ThyFormGroup implements OnInit {
    private thyParentForm = inject(ThyFormDirective, { optional: true })!;
    private thyTranslate = inject(ThyTranslate);

    protected isHorizontalSignal = signal(true);

    /**
     * Label 文本
     */
    readonly thyLabelText = input<string>();

    /**
     * Label 文本多语言 Key
     */
    readonly thyLabelTextTranslateKey = input<string>();

    protected labelTextSignal = computed(() => {
        const labelTextTranslateKey = this.thyLabelTextTranslateKey();
        const labelText = this.thyLabelText();
        if (labelText) {
            return labelText;
        } else if (labelTextTranslateKey) {
            return this.thyTranslate.instant(labelTextTranslateKey);
        }
        return '';
    });

    /**
     * Label 是否显示必填项样式
     */
    readonly thyLabelRequired = input(false, {
        transform: coerceBooleanProperty
    });

    /**
     * 清楚 Label padding 间距
     */
    readonly thyLabelPaddingTopClear = input(false, {
        transform: coerceBooleanProperty
    });

    /**
     * 反馈图标，比如日期输入框显示日期的图标，常用输入 date 表示时间 wtf wtf-schedule-o
     */
    thyFeedbackIcon = input('', {
        transform: (value: string) => {
            if (internalIconMap[value]) {
                return internalIconMap[value];
            }
            return value;
        }
    });

    /**
     * 提示文字的显示模式，`label`模式表示在 label 后通过图标+Tooltip 提示, `default`模式在 Form Control 下方直接显示
     * @type default | label
     * @default default
     */
    thyTipsMode = input<TipsMode>('default');

    /**
     * 提示文案
     */
    readonly thyTips = input<string>('');

    /**
     * 提示文案的多语言 Key
     */
    readonly thyTipsTranslateKey = input<string>('');

    protected readonly tipsSignal = computed(() => {
        const key = this.thyTipsTranslateKey();
        const tips = this.thyTips();

        if (key) {
            return this.thyTranslate.instant(key);
        }
        if (tips) {
            return tips;
        }
        return '';
    });

    /**
     * 是否填充整行, 没有 Label 文本，只有输入框
     * @default false
     */
    readonly thyRowFill = input(false, { transform: coerceBooleanProperty });

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

    constructor() {
        // effect(() => {
        //     const isHorizontal = this.thyParentForm ? this.thyParentForm.isHorizontal : true;
        //     this.isHorizontal.set(isHorizontal);
        // });
    }

    ngOnInit() {
        const isHorizontal = this.thyParentForm ? this.thyParentForm.isHorizontal : true;
        this.isHorizontalSignal.set(isHorizontal);
    }
}
