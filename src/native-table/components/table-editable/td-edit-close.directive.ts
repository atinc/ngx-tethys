import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

import { ThyNativeTableEditRef } from './edit-ref';

@Directive({
    selector: '[thyEditClose]',
    standalone: true
})
export class ThyNativeTableTdEditCloseDirective {
    private editRef = inject(ThyNativeTableEditRef);
    private elementRef = inject(ElementRef<HTMLElement>);
    private destroyRef = inject(DestroyRef);

    constructor() {
        fromEvent(this.elementRef.nativeElement, 'click')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.editRef.close();
            });
    }
}
