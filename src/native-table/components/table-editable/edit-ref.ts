import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ThyNativeTableEditEventDispatcher } from './edit-event-dispatcher.service';

@Injectable()
export class ThyNativeTableEditRef {
    private dispatcher = inject(ThyNativeTableEditEventDispatcher);
    private afterClosedSubject = new Subject<void>();

    readonly afterClosed: Observable<void> = this.afterClosedSubject.asObservable();

    close(): void {
        this.dispatcher.stopEditing();
        this.afterClosedSubject.next();
    }
}
