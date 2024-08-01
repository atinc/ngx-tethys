import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 头部布局指令
 * @name thyHeader
 * @order 10
 */
@Directive({
    selector: '[thyHeader]',
    host: {
        class: `thy-layout-header`,
        '[class.thy-layout-header-sm]': `thySize === 'sm'`,
        '[class.thy-layout-header-lg]': `thySize === 'lg'`,
        '[class.thy-layout-header-xlg]': `thySize === 'xlg'`,
        '[class.thy-layout-header-shadow]': `thyShadow`,
        '[class.thy-layout-header-divided]': `divided`
    },
    standalone: true
})
export class ThyHeaderDirective {
    /**
     * 头部大小
     * @type sm | md  | lg | xlg
     */
    @Input('thySize') thySize: 'sm' | 'md' | 'lg' | 'xlg' = 'md';

    /**
     * 底部是否有阴影
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyShadow = false;

    divided = false;

    /**
     * 底部是否有分割线
     */
    @Input({ transform: coerceBooleanProperty })
    set thyDivided(value: boolean) {
        this.divided = value;
    }

    /**
     * 底部是否有分割线，已废弃，请使用 thyDivided
     * @deprecated please use thyDivided
     */
    @Input({ transform: coerceBooleanProperty })
    set thyHasBorder(value: boolean) {
        this.divided = value;
    }
}

/**
 * 头部布局组件
 * @name thy-header
 * @order 11
 */
@Component({
    selector: 'thy-header',
    preserveWhitespaces: false,
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [
        {
            directive: ThyHeaderDirective,
            inputs: ['thySize', 'thyShadow', 'thyHasBorder', 'thyDivided']
        }
    ],
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, ThyIcon, NgClass, ThyHeaderDirective]
})
export class ThyHeader {
    public iconClass: string;

    public svgIconName: string;

    /**
     * 头部标题
     */
    @Input() thyTitle: string;

    /**
     * 图标前缀，被弃用，图标使用 SVG 图标
     */
    @Input() thyIconPrefix = 'wtf';

    /**
     * 图标，SVG 图标名称
     */
    @Input('thyIcon')
    set thyIcon(value: string) {
        if (value) {
            if (value.includes('wtf')) {
                this.iconClass = `${this.thyIconPrefix} ${value}`;
            } else {
                this.svgIconName = value;
            }
        } else {
            this.iconClass = null;
            this.svgIconName = null;
        }
    }

    /**
     * 头部自定义标题模板，`<ng-template #headerTitle></ng-template>`
     * @type TemplateRef
     */
    @ContentChild('headerTitle')
    public titleTemplateRef: TemplateRef<any>;

    /**
     * 头部自定义内容模板，`<ng-template #headerContent></ng-template>`
     * @type TemplateRef
     */
    @ContentChild('headerContent')
    public contentTemplateRef: TemplateRef<any>;

    /**
     * 头部自定义操作模板，`<ng-template #headerOperation></ng-template>`
     * @type TemplateRef
     */
    @ContentChild('headerOperation')
    public operationTemplateRef: TemplateRef<any>;
}
