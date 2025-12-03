import { Directive, input, TemplateRef, TrackByFunction } from '@angular/core';

@Directive({
    selector: '[thyNativeTableVirtualScroll]',
    standalone: true,
    exportAs: 'thyNativeTableVirtualScroll'
})
export class ThyNativeTableVirtualScrollDirective<T = any> {
    readonly thyVirtualItemSize = input<number>(0);

    readonly thyVirtualForTrackBy = input<TrackByFunction<T>>(index => index);

    templateRef: TemplateRef<{ $implicit: T; index: number }> | null = null;
}
