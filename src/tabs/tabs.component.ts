import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    inject
} from '@angular/core';
import { coerceBooleanProperty, isString } from 'ngx-tethys/util';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThyTab } from './tab.component';
import { ThyActiveTabInfo, ThyTabActiveEvent } from './types';
import { ThyTabContent } from './tab-content.component';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';

export type ThyTabsSize = 'lg' | 'md' | 'sm';

export type ThyTabsType = 'pulled' | 'tabs' | 'pills' | 'lite';

export type ThyTabsPosition = 'top' | 'left';

/**
 * 选项卡切换组件
 * @name thy-tabs
 */
@Component({
    selector: 'thy-tabs',
    templateUrl: './tabs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-tabs',
        '[class.thy-tabs-top]': `thyPosition === 'top'`,
        '[class.thy-tabs-left]': `thyPosition === 'left'`,
        '[style.overflow]': `transitionStarted ? "hidden" : null`
    },
    standalone: true,
    imports: [ThyNav, NgFor, ThyNavItemDirective, NgIf, NgTemplateOutlet, ThyTabContent]
})
export class ThyTabs implements OnInit, OnChanges, AfterContentInit {
    @ContentChildren(ThyTab, { descendants: true }) tabs = new QueryList<ThyTab>();

    private readonly destroyRef = inject(DestroyRef);

    /**
     * 标签类型
     * @type 'pulled' | 'tabs' | 'pills' | 'lite'
     */
    @Input() thyType: ThyTabsType = 'tabs';

    /**
     * 选项卡的大小
     * @type 'lg' | 'md' | 'sm'
     */
    @Input() thySize: ThyTabsSize = 'md';

    /**
     * 激活的项
     */
    @Input()
    set thyActiveTab(value: ThyActiveTabInfo) {
        if (isString(value)) {
            this.activeTabId = value;
            this.activeTabIndex = undefined;
        } else {
            this.activeTabIndex = value;
            this.activeTabId = undefined;
        }
    }

    /**
     * 附加操作
     */
    @Input() thyExtra: TemplateRef<unknown>;

    /**
     * 选项卡的位置
     * @type 'top' | 'left'
     */
    @Input() thyPosition: ThyTabsPosition = 'top';

    /**
     * 是否使用动画切换 Tabs
     */
    @Input({ transform: coerceBooleanProperty }) thyAnimated: boolean = false;

    /**
     * 响应式，自动计算宽度存放 thyNavItem，并添加更多弹框
     */
    @Input({ transform: coerceBooleanProperty }) thyResponsive: boolean = false;

    /**
     * 激活的项发生改变时的回调
     */
    @Output() thyActiveTabChange: EventEmitter<ThyTabActiveEvent> = new EventEmitter<ThyTabActiveEvent>();

    activeTabIndex: number = 0;

    activeTabId: string;

    transitionStarted: boolean = false;

    constructor(
        private cd: ChangeDetectorRef,
        private el: ElementRef
    ) {}

    ngOnInit(): void {
        const tabsContent = this.el.nativeElement.querySelector('.thy-tabs-content');
        fromEvent(tabsContent, 'transitionend')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.transitionStarted = false;
                this.cd.markForCheck();
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thyActiveTab } = changes;
        if (thyActiveTab && !thyActiveTab.firstChange && this.thyAnimated) {
            const index = thyActiveTab?.currentValue?.index || Array.from(this.tabs).findIndex(k => k.id === thyActiveTab?.currentValue.id);
            this.transitionStarted = this.activeTabIndex !== index;
            this.activeTabIndex = index;
        }
    }

    ngAfterContentInit() {
        this.tabs.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
            this.thyAnimated && (this.transitionStarted = true);
            this.activeTabIndex = data.length - 1;
            this.cd.markForCheck();
        });
    }

    get tabPaneAnimated(): boolean {
        return this.thyPosition === 'top' && this.thyAnimated;
    }

    getTabContentMarginLeft(): string {
        if (this.tabPaneAnimated) {
            return `${-(this.activeTabIndex || 0) * 100}%`;
        }
        return '';
    }

    activeTab(tab: ThyTab, index: number) {
        if (tab.thyDisabled) {
            return;
        }
        this.activeTabId = tab.id || null;
        this.thyAnimated && (this.transitionStarted = this.activeTabIndex !== index);
        this.activeTabIndex = index;
        const activeTab = tab.id ? tab.id : index;
        this.thyActiveTabChange.emit(activeTab);
    }

    tabTrackBy(index: number, item: ThyTab) {
        return index;
    }
}
