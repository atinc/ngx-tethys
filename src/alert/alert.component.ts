import { Component, Input, OnInit, ContentChild, TemplateRef, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { isString } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { InputBoolean } from 'ngx-tethys/core';

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
    imports: [NgIf, ThyIcon, NgTemplateOutlet]
})
export class ThyAlert implements OnInit, OnChanges {
    private hidden = false;

    private showIcon = true;

    private icon: string;

    private type: ThyAlertType = 'info';

    private hostRenderer = useHostRenderer();

    public theme: ThyAlertTheme = 'fill';

    messageTemplate: TemplateRef<HTMLElement>;

    messageText: string;

    /**
     * 指定警告提示的类型
     * @type success | warning | danger | info | primary | primary-weak | success-weak | warning-weak | danger-weak
     * @default info
     */
    @Input() set thyType(value: ThyAlertType) {
        this.type = value;
    }

    /**
     * 指定警告提示的主题
     * @type fill | bordered | naked
     * @default fill
     */
    @Input() set thyTheme(value: ThyAlertTheme) {
        this.theme = value;
    }

    /**
     * 显示警告提示的内容
     */
    @Input() set thyMessage(value: string | TemplateRef<HTMLElement>) {
        if (value instanceof TemplateRef) {
            this.messageTemplate = value;
        } else {
            this.messageText = value;
        }
    }

    /**
     * 显示自定义图标，可传 true/false 控制是否显示图标，或者传字符串去指定图标名称
     */
    @Input()
    set thyIcon(value: boolean | string) {
        if (value) {
            this.showIcon = true;
            this.icon = isString(value) ? value.toString() : null;
        } else {
            this.showIcon = false;
        }
    }

    get thyIcon() {
        if (this.showIcon) {
            return this.icon || typeIconsMap[this.type];
        } else {
            return null;
        }
    }

    /**
     * 是否显示关闭警告框按钮，默认不显示
     * @default false
     */
    @Input() @InputBoolean() thyCloseable: boolean;

    /**
     * 警告框自定义操作
     * @type TemplateRef
     */
    @ContentChild('operation') alertOperation: TemplateRef<any>;

    constructor() {}

    ngOnInit() {
        this.updateClass();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes.thyTheme && !changes.thyTheme.firstChange) || (changes.thyType && !changes.thyType.firstChange)) {
            this.updateClass();
        }
    }

    closeAlert() {
        this.hidden = true;
    }

    private updateClass() {
        // 兼容 'primary-weak', 'success-weak', 'warning-weak', 'danger-weak' types
        let theme = this.theme;
        let type = this.type;
        if (weakTypes.includes(this.type)) {
            theme = 'bordered';
            type = this.type.split('-')[0] as ThyAlertType;
        }
        this.hostRenderer.updateClass([`thy-alert-${theme}`, `thy-alert-${theme}-${type}`]);
    }
}
