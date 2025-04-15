import { collapseMotion } from 'ngx-tethys/core';

import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    ChangeDetectionStrategy,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    inject
} from '@angular/core';

import { IThyCollapseItemComponent, THY_COLLAPSE_COMPONENT } from './collapse.token';
import { SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty, isString } from 'ngx-tethys/util';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgTemplateOutlet } from '@angular/common';

const DEFAULT_ARROW_ICON = 'angle-right';

/**
 * 折叠面板项组件
 * @name thy-collapse-panel,thy-collapse-item
 * @order 20
 */
@Component({
    selector: 'thy-collapse-panel, thy-collapse-item',
    templateUrl: './collapse-item.component.html',
    exportAs: 'ThyCollapseComponent',
    animations: [collapseMotion],
    host: {
        '[class.thy-collapse-item]': 'true',
        '[class.thy-collapse-no-arrow]': '!showArrow',
        '[class.thy-collapse-item-active]': 'thyActive',
        '[class.thy-collapse-item-disabled]': 'thyDisabled'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet, ThyIcon]
})
export class ThyCollapseItem implements IThyCollapseItemComponent, OnInit, OnDestroy {
    private cdr = inject(ChangeDetectorRef);
    private thyCollapseComponent = inject(THY_COLLAPSE_COMPONENT, { host: true })!;

    public showArrow: boolean = true;

    public arrowIconTemplate: TemplateRef<SafeAny>;

    public arrowIcon: string = DEFAULT_ARROW_ICON;

    /**
     * 标题
     */
    @Input() thyTitle: string;

    /**
     * 是否处于激活展开状态
     */
    @Input({ transform: coerceBooleanProperty }) thyActive: boolean = false;

    /**
     * 是否禁用当前面板
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyDisabled: boolean;

    /**
     * 自定义面板头
     * @type TemplateRef
     */
    @Input() thyHeaderTemplate: TemplateRef<SafeAny>;

    /**
     * 自定义箭头(展开收起)图标，设置为 false 表示隐藏图标
     * @type {string | TemplateRef<SafeAny> | false}
     */
    @Input()
    set thyArrowIcon(value: string | TemplateRef<SafeAny> | boolean) {
        if (value instanceof TemplateRef) {
            this.arrowIconTemplate = value as TemplateRef<SafeAny>;
        } else if (isString(value)) {
            this.arrowIcon = value as string;
        } else {
            this.showArrow = value;
            this.arrowIconTemplate = null;
            this.arrowIcon = DEFAULT_ARROW_ICON;
        }
    }

    /**
     * 额外附加模板
     * @type TemplateRef
     */
    @Input() thyExtra: TemplateRef<SafeAny>;

    /**
     * 展开收起事件
     */
    @Output() thyActiveChange = new EventEmitter<{ active: boolean; event: Event }>();

    ngOnInit() {
        this.thyCollapseComponent.addPanel(this);
    }

    markForCheck(): void {
        this.cdr.markForCheck();
    }

    activeChange(event: Event) {
        if (!this.thyDisabled) {
            this.thyCollapseComponent.click(this, event);
        }
    }

    ngOnDestroy(): void {
        this.thyCollapseComponent.removePanel(this);
    }
}
