import { Component } from '@angular/core';
import { ThyTab, ThyTabs } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-card-example',
    templateUrl: './card.component.html',
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsCardExampleComponent {
    public tabs = [
        { id: 1, title: 'Tab1', content: 'Tab1 Content' },
        { id: 2, title: 'Tab2', content: 'Tab2 Content' },
        { id: 3, title: 'Tab3', content: 'Tab3 Content' }
    ];

    public activeTab = 1;
}
