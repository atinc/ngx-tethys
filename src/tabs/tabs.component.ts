import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    OnInit,
    QueryList,
    TemplateRef,
    effect,
    inject,
    input,
    output
} from '@angular/core';
import { coerceBooleanProperty, isString, ThyBooleanInput } from 'ngx-tethys/util';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThyTab } from './tab.component';
import { ThyActiveTabInfo, ThyTabActiveEvent } from './types';
import { ThyTabContent } from './tab-content.component';
import { NgTemplateOutlet } from '@angular/common';
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
        '[class.thy-tabs-top]': `thyPosition() === 'top'`,
        '[class.thy-tabs-left]': `thyPosition() === 'left'`,
        '[style.overflow]': `transitionStarted ? "hidden" : null`
    },
    imports: [ThyNav, ThyNavItemDirective, NgTemplateOutlet, ThyTabContent]
})
export class ThyTabs implements OnInit, AfterContentInit {
    private cd = inject(ChangeDetectorRef);
    private el = inject(ElementRef);

    @ContentChildren(ThyTab, { descendants: true }) tabs = new QueryList<ThyTab>();

    private readonly destroyRef = inject(DestroyRef);

    /**
     * 标签类型
     * @type 'pulled' | 'tabs' | 'pills' | 'lite'
     */
    readonly thyType = input<ThyTabsType>('tabs');

    /**
     * 选项卡的大小
     * @type 'lg' | 'md' | 'sm'
     */
    readonly thySize = input<ThyTabsSize>('md');

    /**
     * 激活的项
     */
    readonly thyActiveTab = input<ThyActiveTabInfo>(0);

    /**
     * 附加操作
     */
    readonly thyExtra = input<TemplateRef<unknown>>(undefined);

    /**
     * 选项卡的位置
     * @type 'top' | 'left'
     */
    readonly thyPosition = input<ThyTabsPosition>('top');

    /**
     * 是否使用动画切换 Tabs
     */
    readonly thyAnimated = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * 响应式，自动计算宽度存放 thyNavItem，并添加更多弹框
     */
    readonly thyResponsive = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * 激活的项发生改变时的回调
     */
    readonly thyActiveTabChange = output<ThyTabActiveEvent>();

    activeTabIndex: number = 0;

    activeTabId: string;

    transitionStarted: boolean = false;

    constructor() {
        effect(() => {
            const value = this.thyActiveTab();
            if (isString(value)) {
                this.activeTabId = value;
                this.activeTabIndex = undefined;
            } else {
                this.activeTabIndex = value;
                this.activeTabId = undefined;
            }
        });
    }

    ngOnInit(): void {
        const tabsContent = this.el.nativeElement.querySelector('.thy-tabs-content');
        fromEvent(tabsContent, 'transitionend')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.transitionStarted = false;
                this.cd.markForCheck();
            });
    }

    ngAfterContentInit() {
        this.tabs.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
            if (this.thyAnimated()) {
                this.transitionStarted = true;
            }
            this.activeTabIndex = data.length - 1;
            this.cd.markForCheck();
        });
    }

    get tabPaneAnimated(): boolean {
        return this.thyPosition() === 'top' && this.thyAnimated();
    }

    getTabContentMarginLeft(): string {
        if (this.tabPaneAnimated) {
            return `${-(this.activeTabIndex || 0) * 100}%`;
        }
        return '';
    }

    activeTab(tab: ThyTab, index: number) {
        if (tab.thyDisabled()) {
            return;
        }
        this.activeTabId = tab.id() || null;
        if (this.thyAnimated()) {
            this.transitionStarted = this.activeTabIndex !== index;
        }
        this.activeTabIndex = index;
        const id = tab.id();
        const activeTab = id ? id : index;
        this.thyActiveTabChange.emit(activeTab);
    }
}
