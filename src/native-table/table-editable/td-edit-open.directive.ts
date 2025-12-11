import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

import { THY_NATIVE_TABLE_CELL_SELECTOR } from '../constant';
import { ThyNativeTableEditEventDispatcher } from './edit-event-dispatcher.service';

@Directive({
    selector: '[thyEditOpen]',
    standalone: true
})
export class ThyNativeTableTdEditOpenDirective {
    readonly elementRef = inject(ElementRef<HTMLElement>);
    private dispatcher = inject(ThyNativeTableEditEventDispatcher);
    private destroyRef = inject(DestroyRef);

    constructor() {
        fromEvent(this.elementRef.nativeElement, 'click')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event: Event) => {
                event.stopPropagation();
                const cell = this.elementRef.nativeElement.closest(THY_NATIVE_TABLE_CELL_SELECTOR) as HTMLElement;
                if (cell) {
                    this.dispatcher.startEditing(cell);
                }
            });
    }
}
