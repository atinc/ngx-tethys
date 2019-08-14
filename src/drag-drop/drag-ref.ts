import { NgZone, ElementRef } from '@angular/core';
import { coerceElement } from '@angular/cdk/coercion';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyDragHandleDirective } from './drag-handle.directive';
import { ThyDragDropService } from './drag-drop.service';
import {
    ThyDragStartEvent,
    ThyDragEndEvent,
    ThyDragOverEvent,
    ThyDragDropEvent,
    ThyDropPosition
} from './drag-drop.class';
import { ThyDragDirective } from './drag.directive';
import { IThyDropContainerDirective } from './drop-container.class';
import { coerceArray } from '../util/helpers';

const dropPositionClass = {
    [ThyDropPosition.in]: 'thy-drop-position-in',
    [ThyDropPosition.before]: 'thy-drop-position-before',
    [ThyDropPosition.after]: 'thy-drop-position-after'
};

export class DragRef<T = any> {
    private rootElement: HTMLElement;

    private contentElement: HTMLElement;

    private target: HTMLElement;

    private handles: ThyDragHandleDirective[];

    private ngUnsubscribe$ = new Subject();

    started = new Subject<ThyDragStartEvent>();

    ended = new Subject<ThyDragEndEvent>();

    overed = new Subject<ThyDragOverEvent>();

    dropped = new Subject<ThyDragDropEvent>();

    entered = new Subject<DragEvent>();

    leaved = new Subject<DragEvent>();

    private _disabled = false;

    get disabled(): boolean {
        return (this.container && this.container.disabled) || this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = value;
    }

    constructor(
        element: ElementRef<HTMLElement> | HTMLElement,
        private drag: ThyDragDirective,
        private container: IThyDropContainerDirective<T>,
        private dragDropService: ThyDragDropService<T>,
        private document: any,
        private ngZone: NgZone
    ) {
        this.withRootElement(element);
    }

    withRootElement(rootElement: ElementRef<HTMLElement> | HTMLElement): this {
        const element = coerceElement(rootElement);
        this.rootElement = element;
        this.registerDragDropEvents();
        return this;
    }

    withContentElement(contentElement: ElementRef<HTMLElement> | HTMLElement): this {
        this.contentElement = coerceElement(contentElement);
        return this;
    }

    withHandles(handleOrHandles: ThyDragHandleDirective | ThyDragHandleDirective[]): this {
        this.handles = coerceArray(handleOrHandles);
        return this;
    }

    private registerDragDropEvents() {
        const events = {
            dragstart: this.dragStart,
            dragover: this.dragOver,
            dragend: this.dragEnd,
            drop: this.dragDrop,
            dragleave: this.dragLeave,
            dragenter: (event: DragEvent) => {
                this.entered.next(event);
            },
            mouseover: (event: MouseEvent) => {
                this.target = event.target as HTMLElement;
            }
        };
        this.ngZone.runOutsideAngular(() => {
            for (const name in events) {
                if (events.hasOwnProperty(name)) {
                    fromEvent(this.rootElement, name)
                        .pipe(takeUntil(this.ngUnsubscribe$))
                        .subscribe(events[name].bind(this));
                }
            }
        });
    }

    private dragStart(event: DragEvent) {
        event.stopPropagation();
        const dragStartEvent: ThyDragStartEvent = {
            event: event,
            item: this.drag.data,
            containerItems: this.container.data,
            currentIndex: this.container.data.indexOf(this.drag.data)
        };
        if (
            this.disabled ||
            !this.isTriggerHandle() ||
            (this.container.beforeStart && !this.container.beforeStart(dragStartEvent))
        ) {
            event.preventDefault();
            return false;
        }
        this.dragDropService.previousDrag = this.drag;
        this.ngZone.run(() => {
            this.started.next(dragStartEvent);
        });
    }

    private isTriggerHandle() {
        if (this.handles && this.handles.length > 0) {
            const targetHandle = this.handles.find(handle => {
                return (
                    !handle.disabled &&
                    (handle.element.nativeElement === this.target || handle.element.nativeElement.contains(this.target))
                );
            });
            return !!targetHandle;
        } else {
            return true;
        }
    }

    private getPreviousEventData() {
        const previousItem = this.dragDropService.previousDrag.data;
        const previousContainerItems = this.dragDropService.previousDrag.container.data;
        return {
            previousItem: previousItem,
            previousContainerItems: this.dragDropService.previousDrag.container.data,
            previousIndex: previousContainerItems.indexOf(previousItem)
        };
    }

    private isContinueDragOver(event: ThyDragOverEvent, container: IThyDropContainerDirective<T>) {
        if (event.item === event.previousItem && event.position === ThyDropPosition.in) {
            return false;
        }
        if (container && container.beforeOver) {
            return container.beforeOver(event);
        }
        return true;
    }

    private dragOver(event: DragEvent) {
        event.stopPropagation();
        event.preventDefault();

        const dropPosition = this.calcDropPosition(event);
        const dragOverEvent: ThyDragOverEvent<T> = {
            event: event,
            item: this.drag.data,
            containerItems: this.drag.container.data,
            currentIndex: this.container.data.indexOf(this.drag.data),
            position: dropPosition,
            ...this.getPreviousEventData()
        };

        if (this.isContinueDragOver(dragOverEvent, this.container)) {
            this.dragOverHandler(dropPosition);
            this.overed.next(dragOverEvent);
        }
    }

    private dragOverHandler(position: ThyDropPosition) {
        const element = this.contentElement || this.rootElement;
        if (this.dragDropService.dropPosition !== position) {
            this.clearDragPositionClass();
        }
        element.classList.add(dropPositionClass[position]);
        this.dragDropService.dropPosition = position;
    }

    private dragDrop(event: DragEvent) {
        event.stopPropagation();
        this.clearDragPositionClass();
        const dragDropEvent: ThyDragDropEvent<T> = {
            event: event,
            item: this.drag.data,
            containerItems: this.drag.container.data,
            currentIndex: this.container.data.indexOf(this.drag.data),
            position: this.calcDropPosition(event),
            ...this.getPreviousEventData()
        };
        if (
            this.dragDropService.previousDrag === this.drag ||
            (this.container.beforeDrop && !this.container.beforeDrop(dragDropEvent))
        ) {
            event.preventDefault();
            return;
        }
        this.ngZone.run(() => {
            this.dropped.next(dragDropEvent);
        });
    }

    private dragEnd(event: DragEvent) {
        this.ngZone.run(() => {
            this.ended.next({
                event: event,
                item: this.drag.data,
                containerItems: this.container.data
            });
        });
    }

    private dragLeave(event: DragEvent) {
        event.stopPropagation();
        this.clearDragPositionClass();
        this.leaved.next(event);
    }

    private clearDragPositionClass(): void {
        const element = this.contentElement || this.rootElement;
        for (const key in dropPositionClass) {
            if (dropPositionClass[key]) {
                element.classList.remove(dropPositionClass[key]);
            }
        }
    }

    private calcDropPosition(event: DragEvent): ThyDropPosition {
        const sideRange = 0.25;
        const minGap = 2;
        const { clientY } = event;
        const { top, bottom, height } = event.srcElement
            ? (event.srcElement as Element).getBoundingClientRect()
            : (event.target as Element).getBoundingClientRect();
        const des = Math.max(height * sideRange, minGap);
        if (clientY <= top + des) {
            return ThyDropPosition.before;
        } else if (clientY >= bottom - des) {
            return ThyDropPosition.after;
        }
        return ThyDropPosition.in;
    }

    dispose() {
        this.ngUnsubscribe$.complete();
    }
}
