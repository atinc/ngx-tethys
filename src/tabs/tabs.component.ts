import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    AfterContentInit,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef,
    ElementRef
} from '@angular/core';
import { Constructor, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { ThyTabComponent } from './tab.component';
import { ThyActiveTabInfo, ThyTabChangeEvent } from './types';
import { takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

export type ThyTabsSize = 'lg' | 'md' | 'sm';

export type ThyTabsType = 'pulled' | 'tabs' | 'pills' | 'lite';

export type ThyTabsPosition = 'top' | 'left';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

/**
 * thy-tabs
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
    }
})
export class ThyTabsComponent extends _MixinBase implements OnInit, OnChanges, AfterContentInit {
    @ContentChildren(ThyTabComponent, { descendants: true }) tabs = new QueryList<ThyTabComponent>();

    /**
     * 标签类型
     */
    @Input() thyType: ThyTabsType = 'tabs';

    /**
     * 选项卡的大小
     */
    @Input() thySize: ThyTabsSize = 'md';

    /**
     * 激活的项
     */
    @Input() thyActiveTab: ThyActiveTabInfo = {
        id: this.tabs[0]?.id || null,
        index: 0
    };

    /**
     * 附加操作
     */
    @Input() thyExtra: TemplateRef<unknown>;

    /**
     * 选项卡的位置
     * @default 'top'
     */
    @Input() thyPosition: ThyTabsPosition = 'top';

    /**
     * 是否使用动画切换 Tabs
     * @default false
     */
    @Input() thyAnimated: boolean = false;

    /**
     * 响应式，自动计算宽度存放 thyNavItem，并添加更多弹框
     * @default false
     */
    @Input() thyResponsive: boolean = false;

    /**
     * 激活的项发生改变时的回调
     */
    @Output() thyActiveTabChange: EventEmitter<ThyTabChangeEvent> = new EventEmitter<ThyTabChangeEvent>();

    activeTabIndex: number = 0;

    transitionStarted: boolean = false;

    constructor(private cd: ChangeDetectorRef, private el: ElementRef) {
        super();
    }

    ngOnInit(): void {
        const tabContent = this.el.nativeElement.querySelector('.thy-tabs-content');
        fromEvent(tabContent, 'transitionend')
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(() => {
                this.transitionStarted = false;
                this.cd.markForCheck();
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thyActiveTab } = changes;
        if (thyActiveTab && !thyActiveTab.firstChange && this.thyAnimated) {
            // if (!thyActiveTab?.currentValue?.index) {
            //     this.thyActiveTab = {
            //         id: thyActiveTab?.currentValue.id,
            //         index: Array.from(this.tabs).findIndex(k => k.id === thyActiveTab?.currentValue.id)
            //     };
            // }
            const index = thyActiveTab?.currentValue?.index || Array.from(this.tabs).findIndex(k => k.id === thyActiveTab?.currentValue.id);
            this.transitionStarted = this.activeTabIndex !== index;
            this.activeTabIndex = index;
        }
    }

    ngAfterContentInit() {
        this.tabs.changes.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(data => {
            // this.thyActiveTab = {
            //     id: data._results[+data.length - 1].id || null,
            //     index: data.length - 1
            // };
            this.thyAnimated && (this.transitionStarted = true);
            this.activeTabIndex = data.length - 1;
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

    activeTab(tab: ThyTabComponent, index: number) {
        if (tab.thyDisabled) {
            return;
        }
        this.thyActiveTab = {
            id: tab.id || null,
            index
        };
        this.thyAnimated && (this.transitionStarted = this.activeTabIndex !== index);
        this.activeTabIndex = index;
        this.thyActiveTabChange.emit(this.thyActiveTab);
    }

    tabTrackBy(index: number, item: ThyTabComponent) {
        return index;
    }
}
