import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkItemsStore } from './work-items.store';
import { Subject } from 'rxjs';

@Component({
    selector: 'thy-store-basic',
    templateUrl: './basic.component.html',
    // 为了避免数据混乱难以管理，建议单独注入
    providers: [WorkItemsStore]
})
export class ThyStoreBasicExampleComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();

    constructor(public workItemsStore: WorkItemsStore) {}

    ngOnInit() {
        this.fetchWorkItems();

        this.workItemsStore
            .select(state => state.workItems)
            // 必须取消订阅
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                console.log('work items changed');
            });
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

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
