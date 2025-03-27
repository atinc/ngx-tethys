import { Component } from '@angular/core';

@Component({
    selector: 'thy-tabs-dynamic-example',
    templateUrl: './dynamic.component.html',
    standalone: false
})
export class ThyTabsDynamicExampleComponent {
    public tabs = [
        { id: 'tab1', title: 'Tab1' },
        { id: 'tab2', title: 'Tab2' },
        { id: 'tab3', title: 'Tab3' }
    ];

    public activeTab = 'tab1';

    add() {
        this.tabs.push({ id: `tab${this.tabs.length + 1}`, title: `Tab${this.tabs.length + 1}` });
        this.activeTab = this.tabs[this.tabs.length - 1].id;
    }

    trackByFn(index: number, item: string) {
        return item;
    }
}
