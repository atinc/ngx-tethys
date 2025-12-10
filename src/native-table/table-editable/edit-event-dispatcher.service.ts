import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

@Injectable()
export class ThyNativeTableEditEventDispatcher {
    private editing = new Subject<HTMLElement | null>();
    private currentEditingCell: HTMLElement | null = null;

    readonly editing$ = this.editing.asObservable().pipe(distinctUntilChanged(), shareReplay(1));

    editingCell(element: HTMLElement): Observable<boolean> {
        return this.editing$.pipe(
            map(cell => cell === element),
            distinctUntilChanged()
        );
    }

    startEditing(cell: HTMLElement): void {
        this.currentEditingCell = cell;
        this.editing.next(cell);
    }

    stopEditing(): void {
        this.currentEditingCell = null;
        this.editing.next(null);
    }

    getCurrentEditingCell(): HTMLElement | null {
        return this.currentEditingCell;
    }
}
