import { ComponentFixture, tick } from '@angular/core/testing';
import { ThyTreeDropPosition } from '../tree.class';
import { dispatchFakeEvent, dispatchMouseEvent } from '../../../cdk/testing';
import { animationFrameScheduler } from 'rxjs';
import { ExtendedScrollToOptions } from '@angular/cdk/scrolling';

export function dargNode(
    fixture: ComponentFixture<any>,
    startNode: HTMLElement,
    targetNode: HTMLElement,
    dropPosition: ThyTreeDropPosition
) {
    startDragging(fixture, startNode, 10, 10);

    const targetClientRect = targetNode.getBoundingClientRect();
    let targetClientY = 0;
    if (dropPosition === ThyTreeDropPosition.before) {
        targetClientY = targetClientRect.top;
    } else if (dropPosition === ThyTreeDropPosition.in) {
        targetClientY = targetClientRect.top + targetClientRect.height / 2 - 1;
    } else {
        targetClientY = targetClientRect.top + targetClientRect.height - 1;
    }

    dispatchMouseEvent(targetNode, 'mousemove', targetClientRect.left, targetClientY);
    fixture.detectChanges();

    dispatchMouseEvent(targetNode, 'mouseup', targetClientRect.left, targetClientY);
    fixture.detectChanges();

    tick();
}

export function startDragging(fixture: ComponentFixture<any>, element: Element, x?: number, y?: number) {
    dispatchMouseEvent(element, 'mousedown', x, y);
    fixture.detectChanges();

    dispatchMouseEvent(document, 'mousemove', x, y);
    fixture.detectChanges();
}

export function scrollToViewportOffset(fixture: ComponentFixture<any>, offset?: number) {
    if (offset !== undefined) {
        fixture.componentInstance.treeComponent.viewport.scrollToOffset(offset);
    }
    dispatchFakeEvent(fixture.componentInstance.treeComponent.viewport.elementRef.nativeElement, 'scroll');
    animationFrameScheduler.flush();
    tick(100);
    fixture.detectChanges();
}

export function scrollToViewport(fixture: ComponentFixture<any>, options: ExtendedScrollToOptions) {
    fixture.componentInstance.treeComponent.viewport.scrollTo(options);
    dispatchFakeEvent(fixture.componentInstance.treeComponent.viewport.elementRef.nativeElement, 'scroll');
    animationFrameScheduler.flush();
    tick(100);
    fixture.detectChanges();
}
