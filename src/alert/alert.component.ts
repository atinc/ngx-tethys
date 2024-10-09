import { Component, TemplateRef, ChangeDetectionStrategy, input, contentChild, effect, computed } from '@angular/core';
import { coerceBooleanProperty, isString } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgTemplateOutlet } from '@angular/common';

const weakTypes = ['primary-weak', 'success-weak', 'warning-weak', 'danger-weak'];

type ThyAlertType =
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'primary'
    | 'primary-weak'
    | 'success-weak'
    | 'warning-weak'
    | 'danger-weak';

export type ThyAlertTheme = 'fill' | 'bordered' | 'naked';

const typeIconsMap: Record<string, string> = {
    success: 'check-circle-fill',
    warning: 'waring-fill',
    danger: 'close-circle-fill',
    info: 'minus-circle-fill',
    primary: 'info-circle-fill',
    'primary-weak': 'info-circle-fill',
    'success-weak': 'check-circle-fill',
    'warning-weak': 'waring-fill',
    'danger-weak': 'close-circle-fill'
};

/**
 * 警告提示，展现需要关注的信息
 * @name thy-alert
 * @order 10
 */
@Component({
    selector: 'thy-alert',
    templateUrl: './alert.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-alert',
        '[class.thy-alert-hidden]': 'hidden'
    },
    standalone: true,
    imports: [ThyIcon, NgTemplateOutlet]
})
export class ThyAlert {
    private hidden = false;

    private hostRenderer = useHostRenderer();

    messageIsTemplate = computed(() => {
        const value = this.thyMessage();
        return value instanceof TemplateRef;
    });

    /**
     * 指定警告提示的类型
     * @type success | warning | danger | info | primary | primary-weak | success-weak | warning-weak | danger-weak
     * @default info
     */
    thyType = input<ThyAlertType>('info');

    /**
     * 指定警告提示的主题
     * @type fill | bordered | naked
     * @default fill
     */
    thyTheme = input<ThyAlertTheme>('fill');

    /**
     * 显示警告提示的内容
     */
    thyMessage = input<string | TemplateRef<HTMLElement>>();

    /**
     * 显示自定义图标，可传 true/false 控制是否显示图标，或者传字符串去指定图标名称
     */
    thyIcon = input<boolean | string>();

    icon = computed(() => {
        const icon = this.thyIcon();
        if (icon) {
            return isString(icon) ? icon : typeIconsMap[this.thyType()];
        } else {
            return icon === 'false' || icon === false ? '' : typeIconsMap[this.thyType()];
        }
    });

    /**
     * 是否显示关闭警告框按钮，默认不显示
     * @default false
     */
    thyCloseable = input(false, { transform: coerceBooleanProperty });

    /**
     * 警告框自定义操作
     * @type TemplateRef
     */
    alertOperation = contentChild<TemplateRef<any>>('operation');

    constructor() {
        effect(() => {
            this.updateClass();
        });
    }

    closeAlert() {
        this.hidden = true;
    }

    private updateClass() {
        // 兼容 'primary-weak', 'success-weak', 'warning-weak', 'danger-weak' types
        let theme = this.thyTheme();
        let type = this.thyType();
        if (weakTypes.includes(type)) {
            theme = 'bordered';
            type = type.split('-')[0] as ThyAlertType;
        }
        this.hostRenderer.updateClass([`thy-alert-${theme}`, `thy-alert-${theme}-${type}`]);
    }
}
