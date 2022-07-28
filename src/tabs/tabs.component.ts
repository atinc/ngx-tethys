import { ChangeDetectionStrategy, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { ThyTabComponent } from './tab.component';

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

    @Input() thyActiveIndex = 0;

    constructor() {}

    ngOnInit(): void {}

    activeTab(tab: ThyTabComponent, index: number) {
        this.thyActiveIndex = index;
    }

    tabTrackBy(index: number, item: ThyTabComponent) {
        return index;
    }
}
