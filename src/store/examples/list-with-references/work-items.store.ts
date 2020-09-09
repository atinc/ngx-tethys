import { Injectable } from '@angular/core';
import { Action, EntityStore, EntityState, OnCombineRefs, ReferencesIdDictionary } from 'ngx-tethys';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { workItemResponseData, addWorkItemResponseData } from '../work-items.mock';

export type WorkItemStateInfo = any;

export type MemberInfo = any;

export type ProjectInfo = any;

export interface WorkItemInfo {
    _id: string;
    title: string;
    state_id: string;
    created_at: number;
    refs?: {
        state?: WorkItemsState;
    };
}

export interface WorkItemsReferences {
    projects: ProjectInfo[];
    states: WorkItemStateInfo[];
    members: MemberInfo[];
}

// 定义一个继承于EntityState的State
export interface WorkItemsState extends EntityState<WorkItemInfo, WorkItemsReferences> {}

// 继承EntityStore
@Injectable()
export class WorkItemsStore extends EntityStore<WorkItemsState, WorkItemInfo, WorkItemsReferences>
    implements OnCombineRefs<WorkItemInfo, WorkItemsReferences> {
    constructor() {
        super(undefined);
    }

    onCombineRefs(entity: WorkItemInfo, referencesIdMap: ReferencesIdDictionary<WorkItemsReferences>, references?: WorkItemsReferences) {
        entity.refs = {
            state: referencesIdMap.states[entity.state_id]
        };
    }

    @Action()
    fetchWorkItems() {
        return of(workItemResponseData).pipe(
            map(data => {
                // 初始化一个列表数据，根据业务选择是否初始化分页数据
                this.initializeWithReferences(data.value, data.references, {
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
                this.addWithReferences(data.value, data.references, { prepend: true });
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
