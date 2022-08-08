import { Component } from '@angular/core';

@Component({
    selector: 'thy-tabs-dynamic-example',
    templateUrl: './dynamic.component.html'
})
export class ThyTabsDynamicExampleComponent {
    public tabs = [
        { id: 'tab1', title: 'Tab1' },
        { id: 'tab2', title: 'Tab2' },
        { id: 'tab3', title: 'Tab3' }
    ];

    public activeTab = {
        id: 'tab1'
    };

    add() {
        this.tabs.push({ id: `tab${this.tabs.length + 1}`, title: `Tab${this.tabs.length + 1}` });
        this.activeTab = { id: this.tabs[this.tabs.length - 1].id };
    }

    trackByFn(index: number, item: { id: string }) {
        return item.id;
    }
}
