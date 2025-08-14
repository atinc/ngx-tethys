import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, TemplateRef, computed, contentChild, input } from '@angular/core';
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
        '[class.thy-layout-header-sm]': `thySize() === 'sm'`,
        '[class.thy-layout-header-lg]': `thySize() === 'lg'`,
        '[class.thy-layout-header-xlg]': `thySize() === 'xlg'`,
        '[class.thy-layout-header-shadow]': `thyShadow()`,
        '[class.thy-layout-header-divided]': `divided()`
    }
})
export class ThyHeaderDirective {
    /**
     * 头部大小
     * @type sm | md  | lg | xlg
     */
    readonly thySize = input<'sm' | 'md' | 'lg' | 'xlg'>('md');

    /**
     * 底部是否有阴影
     * @default false
     */
    readonly thyShadow = input(false, { transform: coerceBooleanProperty });

    /**
     * 底部是否有分割线
     */
    readonly thyDivided = input(false, { transform: coerceBooleanProperty });

    /**
     * 底部是否有分割线，已废弃，请使用 thyDivided
     * @deprecated please use thyDivided
     */
    readonly thyHasBorder = input(false, { transform: coerceBooleanProperty });

    readonly divided = computed(() => {
        const value = this.thyDivided();
        if (value !== undefined) {
            return value;
        }
        return this.thyHasBorder();
    });
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
    imports: [NgTemplateOutlet, ThyIcon, NgClass]
})
export class ThyHeader {
    /**
     * 头部标题
     */
    readonly thyTitle = input<string>(undefined);

    /**
     * 图标前缀，被弃用，图标使用 SVG 图标
     */
    readonly thyIconPrefix = input('wtf');

    /**
     * 图标，SVG 图标名称
     */
    readonly thyIcon = input<string>(undefined);

    readonly svgIconName = computed(() => {
        const icon = this.thyIcon();
        if (icon && !icon.includes('wtf')) {
            return icon;
        }
        return null;
    });

    readonly iconClass = computed(() => {
        const icon = this.svgIconName();
        if (icon) {
            return null;
        } else {
            const icon = this.thyIcon();
            if (icon && icon.includes('wtf')) {
                return `${this.thyIconPrefix()} ${icon}`;
            }
        }
        return null;
    });

    /**
     * 头部自定义标题模板，`<ng-template #headerTitle></ng-template>`
     * @type TemplateRef
     */
    readonly titleTemplateRef = contentChild<TemplateRef<any>>('headerTitle');

    /**
     * 头部自定义内容模板，`<ng-template #headerContent></ng-template>`
     * @type TemplateRef
     */
    readonly contentTemplateRef = contentChild<TemplateRef<any>>('headerContent');

    /**
     * 头部自定义操作模板，`<ng-template #headerOperation></ng-template>`
     * @type TemplateRef
     */
    readonly operationTemplateRef = contentChild<TemplateRef<any>>('headerOperation');
}
