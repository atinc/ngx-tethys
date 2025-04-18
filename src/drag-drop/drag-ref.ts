import { NgZone, ElementRef, Renderer2 } from '@angular/core';
import { coerceElement } from '@angular/cdk/coercion';
import { Subject, fromEvent } from 'rxjs';
import { auditTime, takeUntil } from 'rxjs/operators';
import { ThyDragDropService } from './drag-drop.service';
import { ThyDragStartEvent, ThyDragEndEvent, ThyDragOverEvent, ThyDragDropEvent, ThyDropPosition } from './drag-drop.class';
import { IThyDragDirective, IThyDragHandleDirective, IThyDropContainerDirective } from './drag-drop.token';
import { coerceArray, isEmpty, isString } from 'ngx-tethys/util';

const dropPositionClass = {
    [ThyDropPosition.in]: 'thy-drop-position-in',
    [ThyDropPosition.before]: 'thy-drop-position-before',
    [ThyDropPosition.after]: 'thy-drop-position-after'
};

export class DragRef<T = any> {
    private rootElement: HTMLElement;

    private contentElement: HTMLElement;

    private target: HTMLElement;

    private handles: IThyDragHandleDirective[];

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

    private addPositionClass$ = new Subject<{ element: HTMLElement; class: string }>();

    constructor(
        element: ElementRef<HTMLElement> | HTMLElement,
        private drag: IThyDragDirective,
        private container: IThyDropContainerDirective<T>,
        private dragDropService: ThyDragDropService<T>,
        private document: any,
        private ngZone: NgZone,
        private renderer: Renderer2
    ) {
        this.withRootElement(element);
        this.subAddPositionClass();
    }

    subAddPositionClass() {
        this.addPositionClass$.pipe(auditTime(30), takeUntil(this.ngUnsubscribe$)).subscribe(data => {
            this.removeExistClassByMap(this.dragDropService.classMap);
            this.dragDropService.classMap.set(data.element, data.class);
            this.renderer.addClass(data.element, data.class);
        });
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

    withHandles(handleOrHandles: IThyDragHandleDirective | IThyDragHandleDirective[]): this {
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
                    fromEvent(this.rootElement, name).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(events[name].bind(this));
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
        if (this.disabled || !this.isTriggerHandle() || (this.container.beforeStart && !this.container.beforeStart(dragStartEvent))) {
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
                    !handle.disabled && (handle.element.nativeElement === this.target || handle.element.nativeElement.contains(this.target))
                );
            });
            return !!targetHandle;
        } else {
            return true;
        }
    }

    private getPreviousEventData() {
        const previousItem = this.dragDropService.previousDrag?.data;
        const previousContainerItems = this.dragDropService.previousDrag?.container?.data;
        return {
            previousItem: previousItem,
            previousContainerItems,
            previousIndex: isEmpty(previousContainerItems) ? -1 : previousContainerItems.indexOf(previousItem)
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
        const previousEventData = this.getPreviousEventData();
        if (previousEventData.previousIndex < 0) {
            return;
        }
        const dragOverEvent: ThyDragOverEvent<T> = {
            event: event,
            item: this.drag.data,
            containerItems: this.drag.container.data,
            currentIndex: this.container.data.indexOf(this.drag.data),
            position: dropPosition,
            ...previousEventData
        };

        if (this.isContinueDragOver(dragOverEvent, this.container)) {
            this.dragOverHandler(dropPosition);
            this.overed.next(dragOverEvent);
        }
    }

    private dragOverHandler(position: ThyDropPosition) {
        const element = this.contentElement || this.rootElement;
        this.addPositionClass$.next({ element, class: dropPositionClass[position] });
        this.dragDropService.dropPosition = position;
    }

    private dragDrop(event: DragEvent) {
        event.stopPropagation();
        this.clearDragPositionClass();
        const previousEventData = this.getPreviousEventData();
        if (previousEventData.previousIndex < 0) {
            return;
        }
        const dragDropEvent: ThyDragDropEvent<T> = {
            event: event,
            item: this.drag.data,
            containerItems: this.drag.container.data,
            currentIndex: this.container.data.indexOf(this.drag.data),
            position: this.calcDropPosition(event),
            ...previousEventData
        };
        if (this.dragDropService.previousDrag === this.drag || (this.container.beforeDrop && !this.container.beforeDrop(dragDropEvent))) {
            event.preventDefault();
            return;
        }
        this.ngZone.run(() => {
            this.dropped.next(dragDropEvent);
        });
    }

    private dragEnd(event: DragEvent) {
        this.clearDragPositionClass();
        this.ngZone.run(() => {
            this.ended.next({
                event: event,
                item: this.drag.data,
                containerItems: this.container.data
            });
        });
        this.dragDropService.previousDrag = undefined;
    }

    private dragLeave(event: DragEvent) {
        event.stopPropagation();
        this.clearDragPositionClass();
        this.leaved.next(event);
    }

    private clearDragPositionClass() {
        setTimeout(() => {
            const classMap = this.dragDropService.classMap;
            this.removeExistClassByMap(classMap);
            classMap.clear();
        }, 30);
    }

    private removeExistClassByMap(classMap: Map<Element, string>) {
        classMap.forEach((value, key) => {
            if (isString(value) && key) {
                this.renderer.removeClass(key, value);
            }
        });
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
