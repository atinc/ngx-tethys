import { Component, TemplateRef, input, contentChild, effect, computed } from '@angular/core';
import { coerceBooleanProperty, isString } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgTemplateOutlet } from '@angular/common';

const weakTypes = ['primary-weak', 'success-weak', 'warning-weak', 'danger-weak'];

/**
 * 'primary-weak' | 'success-weak' | 'warning-weak' | 'danger-weak' 类型已废弃，将在 v23 中移除，请使用 thyAppearance="bordered" + thyColor="color" 组合
 */
export type ThyAlertColor =
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'primary'
    | 'primary-weak'
    | 'success-weak'
    | 'warning-weak'
    | 'danger-weak';

export type ThyAlertAppearance = 'fill' | 'bordered' | 'naked';

/** @deprecated use ThyAlertAppearance */
export type ThyAlertTheme = ThyAlertAppearance;

/** @deprecated use ThyAlertColor */
export type ThyAlertType = ThyAlertColor;

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
    host: {
        class: 'thy-alert',
        '[class.thy-alert-hidden]': 'hidden'
    },
    imports: [ThyIcon, NgTemplateOutlet]
})
export class ThyAlert {
    protected hidden = false;

    private hostRenderer = useHostRenderer();

    messageIsTemplate = computed(() => {
        const value = this.thyMessage();
        return value instanceof TemplateRef;
    });

    /**
     * 指定警告提示的颜色
     * @type success | warning | danger | info | primary
     * @default info
     */
    readonly thyColor = input<ThyAlertColor>();

    /**
     * 指定警告提示的外观
     * @type fill | bordered | naked
     * @default fill
     */
    readonly thyAppearance = input<ThyAlertAppearance>();

    /**
     * 指定警告提示的类型（已废弃，将在 v23 中移除），请使用 thyColor
     * @deprecated please use thyColor, will be removed in v23
     * @type success | warning | danger | info | primary
     * @default info
     */
    readonly thyType = input<ThyAlertType>('info');

    /**
     * 指定警告提示的主题（已废弃，将在 v23 彻底移除），请使用 thyAppearance
     * @deprecated please use thyAppearance, will be removed in v23
     * @type fill | bordered | naked
     * @default fill
     */
    readonly thyTheme = input<ThyAlertTheme>('fill');

    readonly color = computed(() => this.thyColor() || this.thyType() || 'info');

    readonly appearance = computed(() => this.thyAppearance() || this.thyTheme() || 'fill');

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
        const color = this.color();
        if (icon) {
            return isString(icon) ? icon : typeIconsMap[color];
        } else {
            return icon === 'false' || icon === false ? '' : typeIconsMap[color];
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
        let appearance = this.appearance();
        let color = this.color();
        if (weakTypes.includes(color)) {
            appearance = 'bordered';
            color = color.split('-')[0] as ThyAlertColor;
        }
        this.hostRenderer.updateClass([`thy-alert-${appearance}`, `thy-alert-${appearance}-${color}`]);
    }
}
