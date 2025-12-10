import { Component, ChangeDetectionStrategy, TemplateRef, numberAttribute, input, contentChild, Signal, computed } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ThyBreadcrumbItem } from './breadcrumb-item.component';
import { SafeAny } from 'ngx-tethys/types';
import { ThyDropdownDirective, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective } from 'ngx-tethys/dropdown';
import { ThyAction } from 'ngx-tethys/action';
import { coerceBooleanProperty } from 'ngx-tethys/util';

const THY_BREADCRUMB_ITEM_ELLIPSIS_ID = 'THY_BREADCRUMB_ITEM_ELLIPSIS_ID';

const ELLIPSIS_ITEM = { _id: THY_BREADCRUMB_ITEM_ELLIPSIS_ID };

/**
 * 面包屑组件
 * @name thy-breadcrumb
 * @order 10
 */
@Component({
    selector: 'thy-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    exportAs: 'ThyBreadcrumb',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-breadcrumb',
        '[class.thy-breadcrumb-separator]': '!!thySeparator()',
        '[class.thy-breadcrumb-separator-slash]': 'thySeparator() === "slash"',
        '[class.thy-breadcrumb-separator-backslash]': 'thySeparator() === "backslash"',
        '[class.thy-breadcrumb-separator-vertical-line]': 'thySeparator() === "vertical-line"'
    },
    imports: [
        ThyIcon,
        NgClass,
        ThyBreadcrumbItem,
        NgTemplateOutlet,
        ThyAction,
        ThyDropdownDirective,
        ThyDropdownMenuItemDirective,
        ThyDropdownMenuComponent,
        ThyIcon
    ]
})
export class ThyBreadcrumb {
    /**
     * 面包屑的前缀 展示图标，如 folder-fill
     */
    readonly thyIcon = input<string>();

    iconClasses: Signal<string[] | null> = computed(() => {
        const icon = this.thyIcon();
        if (icon && icon.includes('wtf')) {
            const classes = icon.split(' ');
            if (classes.length === 1) {
                classes.unshift('wtf');
            }
            return classes;
        } else {
            return null;
        }
    });

    svgIconName: Signal<string | null> = computed(() => {
        const icon = this.thyIcon();
        if (icon && !icon.includes('wtf')) {
            return icon;
        } else {
            return null;
        }
    });

    /**
     * 面包屑的分隔符，不传值默认为 ">"
     * @type slash | backslash | vertical-line
     */
    readonly thySeparator = input<'slash' | 'backslash' | 'vertical-line'>();

    /**
     * 面包屑的每一项数据
     */
    readonly items = input<SafeAny[]>(undefined, { alias: 'thyItems' });

    /**
     * 最大显示数量，超出此数量后，面包屑会被省略, 0 表示不省略（仅当传入 thyItems 时有效）
     */
    readonly thyMaxCount = input(4, { transform: numberAttribute });

    /**
     * 是否可点击弹出已被省略的面包屑项（仅当传入 thyItems 时有效）
     */
    readonly thyExpandable = input(true, { transform: coerceBooleanProperty });

    /**
     * 面包屑的每一项模板（仅当传入 thyItems 时有效）
     */
    readonly itemTemplate = contentChild<TemplateRef<SafeAny>>('item');

    public ellipsisItemId = THY_BREADCRUMB_ITEM_ELLIPSIS_ID;

    public readonly processedItems: Signal<
        | {
              ellipsisItems: SafeAny[];
              showItems: SafeAny[];
          }
        | undefined
    > = computed(() => {
        const items = this.items();
        if (!items?.length) {
            return;
        }
        const thyMaxCount = this.thyMaxCount();
        if (thyMaxCount && items.length > thyMaxCount) {
            const ellipsisIndex = items.length - thyMaxCount + 2;
            return {
                ellipsisItems: items.slice(1, ellipsisIndex),
                showItems: [items[0], ELLIPSIS_ITEM, ...items.slice(ellipsisIndex)]
            };
        } else {
            return {
                ellipsisItems: [],
                showItems: [...items]
            };
        }
    });
}
