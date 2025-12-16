import { NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    inject,
    input,
    linkedSignal,
    model,
    OnInit,
    QueryList,
    TemplateRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';
import { coerceBooleanProperty, isNumber, ThyBooleanInput } from 'ngx-tethys/util';
import { fromEvent } from 'rxjs';
import { ThyTabContent } from './tab-content.component';
import { ThyTab } from './tab.component';
import { ThyActiveTabInfo } from './types';

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
    readonly thyActiveTab = model<ThyActiveTabInfo>(0);

    /**
     * 附加操作
     */
    readonly thyExtra = input<TemplateRef<unknown> | undefined>(undefined);

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

    readonly activeTabIndex = linkedSignal(() => {
        const activeTab = this.thyActiveTab();
        return isNumber(activeTab) ? activeTab : undefined;
    });

    readonly activeTabId = linkedSignal(() => {
        return this.thyActiveTab() ?? undefined;
    });

    transitionStarted: boolean = false;

    constructor() {}

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
            this.thyAnimated() && (this.transitionStarted = true);
            this.activeTabIndex.set(data.length - 1);
            this.cd.markForCheck();
        });
    }

    get tabPaneAnimated(): boolean {
        return this.thyPosition() === 'top' && this.thyAnimated();
    }

    getTabContentMarginLeft(): string {
        if (this.tabPaneAnimated) {
            return `${-(this.activeTabIndex() || 0) * 100}%`;
        }
        return '';
    }

    activeTab(tab: ThyTab, index: number) {
        if (tab.thyDisabled()) {
            return;
        }
        this.thyAnimated() && (this.transitionStarted = this.activeTabIndex() !== index);
        const id = tab.id();
        this.thyActiveTab.set(id ? id : index);
    }
}
