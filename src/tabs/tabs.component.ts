import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    inject,
    input,
    model,
    OnInit,
    TemplateRef,
    computed,
    contentChildren
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';
import { coerceBooleanProperty, isNumber, ThyBooleanInput } from 'ngx-tethys/util';
import { fromEvent } from 'rxjs';
import { ThyTabContent } from './tab-content.component';
import { ThyTab } from './tab.component';
import { ThyActiveTabValue } from './types';

export type ThyTabsSize = 'lg' | 'md' | 'sm';

export type ThyTabsVariant = 'pulled' | 'tabs' | 'pills' | 'lite' | 'card';

/** @deprecated use ThyTabsVariant */
export type ThyTabsType = ThyTabsVariant;

export type ThyTabsPosition = 'top' | 'left';

/**
 * 选项卡切换组件
 * @name thy-tabs
 */
@Component({
    selector: 'thy-tabs',
    templateUrl: './tabs.component.html',
    host: {
        class: 'thy-tabs',
        '[class.thy-tabs-top]': `thyPosition() === 'top'`,
        '[class.thy-tabs-left]': `thyPosition() === 'left'`,
        '[style.overflow]': `transitionStarted ? "hidden" : null`
    },
    imports: [ThyNav, ThyNavItemDirective, NgTemplateOutlet, ThyTabContent]
})
export class ThyTabs implements OnInit {
    private cd = inject(ChangeDetectorRef);
    private el = inject(ElementRef);
    private readonly destroyRef = inject(DestroyRef);

    readonly tabs = contentChildren(ThyTab, { descendants: true });

    /**
     * 标签形态
     * @type pulled | tabs | pills | lite | card
     * @default tabs
     */
    readonly thyVariant = input<ThyTabsVariant>();

    /**
     * 标签类型（已废弃），请使用 thyVariant
     * @deprecated please use thyVariant
     * @type pulled | tabs | pills | lite | card
     * @default tabs
     */
    readonly thyType = input<ThyTabsType>('tabs');

    readonly variant = computed(() => this.thyVariant() || this.thyType() || 'tabs');

    /**
     * 选项卡的大小
     * @type 'lg' | 'md' | 'sm'
     */
    readonly thySize = input<ThyTabsSize>('md');

    /**
     * 激活的项，支持传入 tab id 或索引
     */
    readonly thyActiveTab = model<ThyActiveTabValue>(0);

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

    readonly activeTabIndex = computed(() => {
        const activeTab = this.thyActiveTab();
        const matchedIndex = this.tabs().findIndex(tab => tab.id() === activeTab);
        if (matchedIndex >= 0) {
            return matchedIndex;
        }
        return isNumber(activeTab) ? activeTab : 0;
    });

    transitionStarted: boolean = false;

    ngOnInit(): void {
        const tabsContent = this.el.nativeElement.querySelector('.thy-tabs-content');
        fromEvent(tabsContent, 'transitionend')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.transitionStarted = false;
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
        this.thyActiveTab.set(this.getTabActiveValue(tab, index));
    }

    private getTabActiveValue(tab: ThyTab, index: number): ThyActiveTabValue {
        return tab.id() ?? index;
    }
}
