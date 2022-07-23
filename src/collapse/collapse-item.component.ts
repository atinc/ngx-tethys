import { collapseMotion } from 'ngx-tethys/core';

import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Host,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef
} from '@angular/core';

import { ThyCollapseComponent } from './collapse.component';
import { SafeAny } from 'ngx-tethys/types';

/**
 * 折叠面板项组件
 */
@Component({
    selector: 'thy-collapse-panel, thy-collapse-item',
    templateUrl: './collapse-item.component.html',
    exportAs: 'ThyCollapseComponent',
    animations: [collapseMotion],
    host: {
        '[class.thy-collapse-item]': 'true',
        '[class.thy-collapse-no-arrow]': '!thyShowArrow',
        '[class.thy-collapse-item-active]': 'thyActive',
        '[class.thy-collapse-item-disabled]': 'thyDisabled'
    }
})
export class ThyCollapseItemComponent implements OnInit, OnDestroy {
    public showArrow: boolean = true;

    public arrowIconTemplate: TemplateRef<SafeAny>;

    public arrowIcon: string = 'angle-right';

    /**
     * 标题
     */
    @Input() thyTitle: string;

    /**
     * 是否处于激活展开状态
     */
    @Input() thyActive: boolean = false;

    /**
     * 禁用当前面板
     */
    @Input() thyDisabled: boolean;

    /**
     * 自定义面板头
     */
    @Input() thyHeaderTemplate: TemplateRef<SafeAny>;

    /**
     * 自定义箭头(展开收起)图标，设置为 false 表示隐藏图标
     * @type {string | TemplateRef<SafeAny> | false}
     */
    @Input()
    set thyArrowIcon(value: string | TemplateRef<SafeAny> | false) {
        if (value instanceof TemplateRef) {
            this.arrowIconTemplate = value as TemplateRef<SafeAny>;
        } else if (value) {
            this.arrowIcon = value as string;
        } else {
            this.showArrow = false;
        }
    }

    /**
     * 额外附加模板
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
