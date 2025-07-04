import { ComponentFixture, tick } from '@angular/core/testing';

import { dispatchFakeEvent } from '../../../cdk/testing';
import { ExtendedScrollToOptions } from '@angular/cdk/scrolling';

export function scrollToViewportOffset(fixture: ComponentFixture<any>, offset?: number) {
    if (offset !== undefined) {
        fixture.componentInstance.treeComponent().viewport().scrollToOffset(offset);
    }
    dispatchFakeEvent(fixture.componentInstance.treeComponent().viewport().elementRef.nativeElement, 'scroll');
    tick(100);
    fixture.detectChanges();
}

export function scrollToViewport(fixture: ComponentFixture<any>, options: ExtendedScrollToOptions) {
    fixture.componentInstance.treeComponent().viewport().scrollTo(options);
    dispatchFakeEvent(fixture.componentInstance.treeComponent().viewport().elementRef.nativeElement, 'scroll');
    tick(100);
    fixture.detectChanges();
}
