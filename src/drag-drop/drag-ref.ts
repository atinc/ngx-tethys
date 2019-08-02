import { NgZone, ElementRef } from '@angular/core';
import { coerceElement } from '@angular/cdk/coercion';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyDragHandleDirective } from './drag-handle';

export enum DragDirection {
    top = 'top',
    center = 'center',
    bottom = 'bottom',
    none = ''
}

const dragSideRange = 0.25;

const dragMinGap = 0;

const defaultPreviewClass = 'thy-drag-preview';

const coverClassMap = {
    [DragDirection.center]: 'drag-cover',
    [DragDirection.top]: 'drag-cover-gap-top',
    [DragDirection.bottom]: 'drag-cover-gap-bottom'
};

export class DragRef<T = any> {
    private _target: HTMLElement;

    private _rootElement: HTMLElement;

    private _handles: ThyDragHandleDirective[];

    private _previewClass: string[] = [defaultPreviewClass];

    private _preview: HTMLElement;

    private _dropContainer: HTMLElement;

    private _dragDragDirection = DragDirection.none;

    started = new Subject<DragEvent>();

    entered = new Subject<DragEvent>();

    overed = new Subject<DragEvent>();

    leaved = new Subject<DragEvent>();

    dropped = new Subject<DragEvent>();

    ended = new Subject<DragEvent>();

    ngUnsubscribe$ = new Subject();

    data: T;

    private _disabled = false;

    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = value;
    }

    constructor(
        element: ElementRef<HTMLElement> | HTMLElement,
        _drag: T,
        private _document: any,
        private _ngZone: NgZone
    ) {
        this.data = _drag;
        this.withRootElement(element);
    }

    registerDragEvents() {
        this._ngZone.runOutsideAngular(() => {
            fromEvent(this._rootElement, 'dragstart')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(this.dragStart.bind(this));

            fromEvent(this._rootElement, 'dragenter')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe((event: DragEvent) => {
                    this.entered.next(event);
                });
            fromEvent(this._rootElement, 'dragover')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(this.dragOver.bind(this));

            fromEvent(this._rootElement, 'dragleave')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(this.dragLeave.bind(this));

            fromEvent(this._rootElement, 'drop')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(this.dragDrop.bind(this));

            fromEvent(this._rootElement, 'dragend')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe((event: DragEvent) => {
                    this.ended.next(event);
                });

            fromEvent(this._rootElement, 'mouseover')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe((event: DragEvent) => {
                    this._target = event.target as HTMLElement;
                });
        });
    }

    private dragStart(event: DragEvent) {
        console.log(this.data['data']);
        event.stopPropagation();
        if (!this.isTriggerHandle()) {
            event.preventDefault();
            return false;
        }
        this.started.next(event);
    }

    private dragOver(event: DragEvent) {
        console.log(this.data['data']);
        event.preventDefault();
        event.stopPropagation();
        this.dragCoverHandler(event);
        this.overed.next(event);
    }

    private dragLeave(event: DragEvent) {
        console.log(this.data['data']);
        event.stopPropagation();
        this.clearDragCoverClass();
        this.leaved.next(event);
    }

    private dragDrop(event: DragEvent) {
        console.log(this.data['data']);
        event.stopPropagation();
        this.clearDragCoverClass();
        this.dropped.next(event);
    }

    withRootElement(rootElement: ElementRef<HTMLElement> | HTMLElement): this {
        const element = coerceElement(rootElement);
        this._rootElement = element;
        this.registerDragEvents();
        return this;
    }

    withHandles(handles: ThyDragHandleDirective[]): this {
        this._handles = handles;
        return this;
    }

    private isTriggerHandle() {
        if (this._handles.length > 0) {
            return !!this._handles.find(handle => !handle.disabled && handle.element.nativeElement === this._target);
        } else {
            return true;
        }
    }

    private dragCoverHandler(event: DragEvent) {
        const dropPosition = this.calcDropPosition(event);
        if (this._dragDragDirection !== dropPosition) {
            this.clearDragCoverClass();
            this._dragDragDirection = dropPosition;
            this._rootElement.classList.add(coverClassMap[this._dragDragDirection]);
        }
    }

    private clearDragCoverClass(): void {
        const classList = ['drag-cover-gap-top', 'drag-cover-gap-bottom', 'drag-cover'];
        this._rootElement.classList.remove(...classList);
    }

    private createPreviewElement(event: DragEvent) {
        // const preview = this._rootElement.cloneNode(true) as any;
        // const computedStyles = window.getComputedStyle(this._rootElement);
        // preview.classList.add(...this._previewClass);
        // preview.style.position = 'absolute';
        // preview.style.top = '-1000px';
        // preview.style.left = '-1000px';
        // preview.style.width = computedStyles.width;
        // preview.style.height = computedStyles.height;
        // document.body.appendChild(preview);
        // event.dataTransfer.setDragImage(preview, 0, 0);
        // this._preview = preview;
    }

    private removePreviewElement() {
        if (this._preview) {
            this._document.body.removeChild(this._preview);
        }
    }

    private calcDropPosition(event: DragEvent): any {
        const { clientY } = event;
        // to fix firefox undefined
        const { top, bottom, height } = event.srcElement
            ? (event.srcElement as Element).getBoundingClientRect()
            : (event.target as Element).getBoundingClientRect();
        const des = Math.max(height * dragSideRange, dragMinGap);
        if (clientY <= top + des) {
            return -1;
        } else if (clientY >= bottom - des) {
            return 1;
        }
        return 0;
    }

    dispose() {
        this.ngUnsubscribe$.complete();
    }
}
