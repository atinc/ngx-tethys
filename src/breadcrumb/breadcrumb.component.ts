import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ContentChild,
    TemplateRef,
    numberAttribute,
    OnChanges,
    SimpleChanges,
    OnInit,
    ChangeDetectorRef
} from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgIf, NgClass, NgTemplateOutlet, NgFor } from '@angular/common';
import { ThyBreadcrumbItem } from './breadcrumb-item.component';
import { SafeAny } from 'ngx-tethys/types';
import {
    ThyDropdownDirective,
    ThyDropdownMenuComponent,
    ThyDropdownMenuItemDirective,
    ThyDropdownMenuItemNameDirective
} from 'ngx-tethys/dropdown';
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
        '[class.thy-breadcrumb-separator]': '!!thySeparator',
        '[class.thy-breadcrumb-separator-slash]': 'thySeparator === "slash"',
        '[class.thy-breadcrumb-separator-backslash]': 'thySeparator === "backslash"',
        '[class.thy-breadcrumb-separator-vertical-line]': 'thySeparator === "vertical-line"'
    },
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        ThyIcon,
        NgClass,
        ThyBreadcrumbItem,
        NgTemplateOutlet,
        ThyAction,
        ThyDropdownDirective,
        ThyDropdownMenuItemDirective,
        ThyDropdownMenuItemNameDirective,
        ThyDropdownMenuComponent,
        ThyIcon
    ]
})
export class ThyBreadcrumb implements OnInit, OnChanges {
    iconClasses: string[];
    svgIconName: string;

    /**
     * 面包屑的前缀 展示图标，如 folder-fill
     */
    @Input()
    set thyIcon(icon: string) {
        this.setIcon(icon);
    }

    /**
     * 面包屑的分隔符，不传值默认为 ">"
     * @type slash | backslash | vertical-line
     */
    @Input() thySeparator: 'slash' | 'backslash' | 'vertical-line';

    /**
     * 面包屑的每一项数据
     */
    @Input({ alias: 'thyItems' }) items: SafeAny[];

    /**
     * 最大显示数量，超出此数量后，面包屑会被省略, 0 表示不省略（仅当传入 thyItems 时有效）
     */
    @Input({ transform: numberAttribute }) thyMaxCount = 4;

    /**
     * 是否可点击弹出已被省略的面包屑项（仅当传入 thyItems 时有效）
     */
    @Input({ transform: coerceBooleanProperty }) thyExpandable = true;

    /**
     * 面包屑的每一项模板（仅当传入 thyItems 时有效）
     */
    @ContentChild('item') itemTemplate: TemplateRef<SafeAny>;

    public ellipsisItemId = THY_BREADCRUMB_ITEM_ELLIPSIS_ID;

    public ellipsisItems: SafeAny[];

    public showItems: SafeAny[];

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.resetItems();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ((changes.items && !changes.items.firstChange) || (changes.thyMaxCount && !changes.thyMaxCount.firstChange)) {
            this.resetItems();
        }
    }

    private setIcon(icon: string) {
        if (icon) {
            if (icon.includes('wtf')) {
                const classes = icon.split(' ');
                if (classes.length === 1) {
                    classes.unshift('wtf');
                }
                this.iconClasses = classes;
            } else {
                this.svgIconName = icon;
            }
        } else {
            this.iconClasses = null;
            this.svgIconName = null;
        }
    }

    private resetItems() {
        if (!this.items?.length) {
            return;
        }
        if (this.thyMaxCount && this.items.length > this.thyMaxCount) {
            const ellipsisIndex = this.items.length - this.thyMaxCount + 2;
            this.ellipsisItems = this.items.slice(1, ellipsisIndex);
            this.showItems = [this.items[0], ELLIPSIS_ITEM, ...this.items.slice(ellipsisIndex)];
        } else {
            this.showItems = [...this.items];
            this.ellipsisItems = [];
        }
    }
}
