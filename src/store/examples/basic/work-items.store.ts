import { Injectable } from '@angular/core';
import { Store, Action } from 'ngx-tethys';
import { produce } from 'ngx-tethys/util';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { workItemResponseData, addWorkItemResponseData } from '../work-items.mock';

export interface WorkItemInfo {}

export interface WorkItemsState {
    workItems: WorkItemInfo[];
}

@Injectable()
export class WorkItemsStore extends Store<WorkItemsState> {
    constructor() {
        super({});
    }

    @Action()
    fetchWorkItems() {
        return of(workItemResponseData).pipe(
            map(data => {
                this.setState({
                    workItems: data.value
                });
                return data.value;
            })
        );
    }

    @Action()
    addWorkItem() {
        return of(addWorkItemResponseData).pipe(
            map(data => {
                this.setState({
                    workItems: produce(this.snapshot.workItems).add(addWorkItemResponseData.value, { prepend: true })
                });
                return true;
            })
        );
    }

    @Action()
    updateWorkItem(id: string, partial: Partial<WorkItemInfo>) {
        return of(true).pipe(
            map(data => {
                this.setState({
                    workItems: produce(this.snapshot.workItems).update(id, partial)
                });
                return true;
            })
        );
    }

    @Action()
    deleteWorkItem(id: string) {
        return of(true).pipe(
            map(data => {
                this.setState({
                    workItems: produce(this.snapshot.workItems).remove(id)
                });
                return data;
            })
        );
    }
}
