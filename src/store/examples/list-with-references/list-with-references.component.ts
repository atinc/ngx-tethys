import { Component, OnInit } from '@angular/core';
import { WorkItemsStore } from './work-items.store';

@Component({
    selector: 'thy-store-list-with-references',
    templateUrl: './list-with-references.component.html',
    providers: [WorkItemsStore]
})
export class ThyStoreListWithReferencesExampleComponent implements OnInit {
    constructor(public workItemsStore: WorkItemsStore) {}

    ngOnInit() {
        this.fetchWorkItems();
    }

    fetchWorkItems() {
        this.workItemsStore.fetchWorkItems();
    }

    addWorkItem() {
        this.workItemsStore.addWorkItem();
    }

    deleteWorkItem(id: string) {
        this.workItemsStore.deleteWorkItem(id);
    }
}
