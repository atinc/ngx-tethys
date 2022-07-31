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

/**
 * thy-tabs
 */
@Component({
    selector: 'thy-tabs',
    templateUrl: './tabs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-tabs'
    }
})
export class ThyTabsComponent implements OnInit {
    @ContentChildren(ThyTabComponent, { descendants: true }) tabs = new QueryList<ThyTabComponent>();

    /**
     * 选项卡的大小
     */
    @Input() thySize: ThyTabsSize = 'sm';

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
