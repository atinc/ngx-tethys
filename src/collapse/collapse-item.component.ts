import { collapseMotion, InputBoolean } from 'ngx-tethys/core';

import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Host,
    ChangeDetectionStrategy,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef
} from '@angular/core';

import { ThyCollapseComponent } from './collapse.component';
import { SafeAny } from 'ngx-tethys/types';
import { isString } from 'ngx-tethys/util';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf, NgTemplateOutlet } from '@angular/common';

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
    imports: [NgIf, NgTemplateOutlet, ThyIconComponent]
})
export class ThyCollapseItemComponent implements OnInit, OnDestroy {
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
    @Input() @InputBoolean() thyActive: boolean = false;

    /**
     * 是否禁用当前面板
     * @default false
     */
    @Input() @InputBoolean() thyDisabled: boolean;

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

    constructor(private cdr: ChangeDetectorRef, @Host() private thyCollapseComponent: ThyCollapseComponent) {}

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
