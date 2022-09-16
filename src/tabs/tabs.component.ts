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
    SimpleChanges
} from '@angular/core';
import { Constructor, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { ThyTabComponent } from './tab.component';
import { ThyActiveTabInfo, ThyTabChangeEvent } from './types';
import { takeUntil } from 'rxjs/operators';

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
        '[class.thy-tabs-left]': `thyPosition === 'left'`
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
     * 激活的项发生改变时的回调
     */
    @Output() thyActiveTabChange: EventEmitter<ThyTabChangeEvent> = new EventEmitter<ThyTabChangeEvent>();

    constructor() {
        super();
    }

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        const { thyActiveTab } = changes;
        if (thyActiveTab && !thyActiveTab.firstChange && this.thyAnimated) {
            if (!thyActiveTab?.currentValue?.index) {
                this.thyActiveTab = {
                    id: thyActiveTab?.currentValue.id,
                    index: Array.from(this.tabs).findIndex(k => k.id === thyActiveTab?.currentValue.id)
                };
            }
        }
    }

    ngAfterContentInit() {
        this.tabs.changes.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(data => {
            this.thyActiveTab = {
                id: data._results[+data.length - 1].id || null,
                index: data.length - 1
            };
        });
    }

    get tabPaneAnimated(): boolean {
        return this.thyPosition === 'top' && this.thyAnimated;
    }

    getTabContentMarginLeft(): string {
        if (this.tabPaneAnimated) {
            return `${-(this.thyActiveTab?.index || 0) * 100}%`;
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
        this.thyActiveTabChange.emit(this.thyActiveTab);
    }

    tabTrackBy(index: number, item: ThyTabComponent) {
        return index;
    }
}
