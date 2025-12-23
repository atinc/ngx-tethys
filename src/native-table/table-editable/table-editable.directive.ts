import { AfterViewInit, DestroyRef, Directive, ElementRef, NgZone, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
    THY_NATIVE_TABLE_CELL_SELECTOR,
    THY_NATIVE_TABLE_EDIT_OPEN_SELECTOR,
    THY_NATIVE_TABLE_EDIT_PANE_SELECTOR,
    ThyNativeTableEditTrigger
} from '../constant';
import { ThyNativeTableEditEventDispatcher } from './edit-event-dispatcher.service';

@Directive({
    selector: 'thy-native-table[thyEditable]',
    providers: [ThyNativeTableEditEventDispatcher]
})
export class ThyNativeTableEditableDirective implements AfterViewInit {
    private elementRef = inject(ElementRef<HTMLElement>);
    private ngZone = inject(NgZone);
    private destroyRef = inject(DestroyRef);
    private dispatcher = inject(ThyNativeTableEditEventDispatcher);

    thyEditTrigger = input<ThyNativeTableEditTrigger>(ThyNativeTableEditTrigger.CLICK);

    ngAfterViewInit(): void {
        this.listenForEditEvents();
    }

    private listenForEditEvents(): void {
        const element = this.elementRef.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            const trigger = this.thyEditTrigger();

            if (trigger === 'click') {
                fromEvent<MouseEvent>(element, 'click')
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe(event => this.handleClickEdit(event));
            } else if (trigger === 'dblclick') {
                fromEvent<MouseEvent>(element, 'dblclick')
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe(event => this.handleClickEdit(event));
            }

            fromEvent<KeyboardEvent>(document, 'keydown')
                .pipe(
                    filter(event => event.key === 'Enter'),
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe(event => this.handelEnterEvent(event));

            fromEvent<KeyboardEvent>(element, 'keydown')
                .pipe(
                    filter(event => event.key === 'Escape'),
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe(() => {
                    this.ngZone.run(() => this.dispatcher.stopEditing());
                });

            fromEvent<MouseEvent>(document, 'click')
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(event => this.handleClickOutside(event));
        });
    }

    private handleClickEdit(event: MouseEvent): void {
        const target = event.target as HTMLElement;

        if (target.closest(THY_NATIVE_TABLE_EDIT_OPEN_SELECTOR)) {
            return;
        }

        const cell = target.closest(THY_NATIVE_TABLE_CELL_SELECTOR) as HTMLElement;
        if (cell) {
            this.ngZone.run(() => this.dispatcher.startEditing(cell));
        }
    }

    private handelEnterEvent(event: KeyboardEvent): void {
        const target = event.target as HTMLElement;

        if (target.closest(THY_NATIVE_TABLE_EDIT_PANE_SELECTOR)) {
            if (this.dispatcher.getCurrentEditingCell()) {
                event.preventDefault();
                this.ngZone.run(() => this.dispatcher.stopEditing());
            }
        }
    }

    private handleClickOutside(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        const element = this.elementRef.nativeElement;

        if (!element.contains(target) && !target.closest(THY_NATIVE_TABLE_EDIT_PANE_SELECTOR)) {
            this.ngZone.run(() => this.dispatcher.stopEditing());
        }
    }
}
