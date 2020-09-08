import { Injectable } from '@angular/core';
import { Action, EntityStore, EntityState } from 'ngx-tethys';
import { produce } from 'ngx-tethys/util';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { workItemResponseData, addWorkItemResponseData } from '../work-items.mock';

export interface WorkItemInfo {}

// 定义一个继承于EntityState的State
export interface WorkItemsState extends EntityState<WorkItemInfo> {}

// 继承EntityStore
@Injectable()
export class WorkItemsStore extends EntityStore<WorkItemsState, WorkItemInfo> {
    constructor() {
        super();
    }

    @Action()
    fetchWorkItems() {
        return of(workItemResponseData).pipe(
            map(data => {
                // 初始化一个列表数据，根据业务选择是否初始化分页数据
                this.initialize(data.value, {
                    pageIndex: data.page_index,
                    pageSize: data.page_size,
                    pageCount: data.page_count,
                    count: data.count
                });
            })
        );
    }

    @Action()
    addWorkItem() {
        return of(addWorkItemResponseData).pipe(
            map(data => {
                this.add(data.value, { prepend: true });
                return true;
            })
        );
    }

    @Action()
    updateWorkItem(id: string, partial: Partial<WorkItemInfo>) {
        return of(true).pipe(
            map(data => {
                this.update(id, partial);
                return true;
            })
        );
    }

    @Action()
    deleteWorkItem(id: string) {
        return of(true).pipe(
            map(data => {
                this.remove(id);
                return data;
            })
        );
    }
}
