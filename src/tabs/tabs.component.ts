import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    TemplateRef
} from '@angular/core';
import { ThyTabComponent } from './tab.component';
import { ThyActiveTabInfo, ThyTabChangeEvent } from './types';

export type ThyTabsSize = 'lg' | 'md' | 'sm';

export type ThyTabsType = 'pulled' | 'tabs' | 'pills' | 'lite';

export type ThyTabsPosition = 'top' | 'left';

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
export class ThyTabsComponent implements OnInit {
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
     * 激活的项发生改变时的回调
     */
    @Output() thyActiveTabChange: EventEmitter<ThyTabChangeEvent> = new EventEmitter<ThyTabChangeEvent>();

    constructor() {}

    ngOnInit(): void {}

    activeTab(tab: ThyTabComponent, index: number) {
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
