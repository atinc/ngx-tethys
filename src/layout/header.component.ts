import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 布局头部组件
 * @name thy-header
 */
@Component({
    selector: 'thy-header',
    preserveWhitespaces: false,
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: `thy-layout-header`,
        '[class.thy-layout-header-sm]': `thySize === 'sm'`,
        '[class.thy-layout-header-lg]': `thySize === 'lg'`,
        '[class.thy-layout-header-xlg]': `thySize === 'xlg'`,
        '[class.thy-layout-header-divided]': `divided`,
        '[class.thy-layout-header-shadow]': `thyShadow`
    },
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, ThyIconComponent, NgClass]
})
export class ThyHeaderComponent implements OnInit {
    public iconClass: string;

    public svgIconName: string;

    divided = false;

    /**
     * 底部是否有分割线
     * @deprecated please use thyDivided
     */
    @Input('thyHasBorder')
    set thyHasBorder(value: string) {
        this.divided = coerceBooleanProperty(value);
    }

    /**
     * 底部是否有分割线
     */
    @Input()
    @InputBoolean()
    set thyDivided(value: string | boolean) {
        this.divided = value as boolean;
    }

    /**
     * 头部大小
     * @type md | sm | lg | xlg
     * @default md
     */
    @Input('thySize') thySize: 'sm' | 'md' | 'lg' | 'xlg' = 'md';

    /**
     * 头部标题
     */
    @Input() thyTitle: string;

    /**
     * 图标前缀，被弃用，图标使用 SVG 图标
     * @default wtf
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
     * 底部是否有阴影
     * @default false
     */
    @Input() @InputBoolean() thyShadow = false;

    /**
     * 头部自定义标题模板，，<ng-template #headerTitle></ng-template>
     * @type TemplateRef
     */
    @ContentChild('headerTitle')
    public titleTemplateRef: TemplateRef<any>;

    /**
     * 头部自定义内容模板，<ng-template #headerContent></ng-template>
     * @type TemplateRef
     */
    @ContentChild('headerContent')
    public contentTemplateRef: TemplateRef<any>;

    /**
     * 头部自定义操作模板，<ng-template #headerOperation></ng-template>
     * @type TemplateRef
     */
    @ContentChild('headerOperation')
    public operationTemplateRef: TemplateRef<any>;

    constructor() {}

    ngOnInit() {}
}
