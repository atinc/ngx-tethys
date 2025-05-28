import {
    Directive,
    OnDestroy,
    ElementRef,
    Renderer2,
    NgZone,
    inject,
    DestroyRef,
    numberAttribute,
    input,
    output,
    afterNextRender,
    signal
} from '@angular/core';
import { ThyResizableService } from './resizable.service';
import { Platform } from '@angular/cdk/platform';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThyResizeHandleMouseDownEvent } from './interface';
import { ThyResizeEvent } from './interface';
import { getEventWithPoint, ensureInBounds, setCompatibleStyle } from './utils';
import { fromEvent } from 'rxjs';
import { coerceBooleanProperty, ThyNumberInput } from 'ngx-tethys/util';

/**
 * 调整尺寸
 * @name thyResizable
 */
@Directive({
    selector: '[thyResizable]',
    providers: [ThyResizableService],
    host: {
        class: 'thy-resizable',
        '[class.thy-resizable-resizing]': 'resizing()',
        '[class.thy-resizable-disabled]': 'thyDisabled()'
    }
})
export class ThyResizableDirective implements OnDestroy {
    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private renderer = inject(Renderer2);
    private platform = inject(Platform);
    private ngZone = inject(NgZone);
    private thyResizableService = inject(ThyResizableService);

    /**
     * 调整尺寸的边界
     * @default parent
     * @type 'window' | 'parent' | ElementRef<HTMLElement>
     */
    readonly thyBounds = input<'window' | 'parent' | ElementRef<HTMLElement>>('parent');

    /**
     * 最大高度(超过边界部分忽略)
     */
    readonly thyMaxHeight = input<number, ThyNumberInput>(undefined, { transform: numberAttribute });

    /**
     * 最大宽度(超过边界部分忽略)
     */
    readonly thyMaxWidth = input<number, ThyNumberInput>(undefined, { transform: numberAttribute });

    /**
     * 最小高度
     */
    readonly thyMinHeight = input(40, { transform: numberAttribute });

    /**
     * 最小宽度
     */
    readonly thyMinWidth = input(40, { transform: numberAttribute });

    /**
     * 栅格列数(-1 为不栅格)
     */
    readonly thyGridColumnCount = input(-1, { transform: numberAttribute });

    /**
     * 栅格最大列数
     */
    readonly thyMaxColumn = input(-1, { transform: numberAttribute });

    /**
     * 栅格最小列数
     */
    readonly thyMinColumn = input(-1, { transform: numberAttribute });

    /**
     * 锁定宽高比
     */
    readonly thyLockAspectRatio = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否预览模式
     */
    readonly thyPreview = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否禁用调整大小
     */
    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    /**
     * 调整尺寸时的事件
     */
    readonly thyResize = output<ThyResizeEvent>();

    /**
     * 开始调整尺寸时的事件
     */
    readonly thyResizeStart = output<ThyResizeEvent>();

    /**
     * 结束调整尺寸时的事件
     */
    readonly thyResizeEnd = output<ThyResizeEvent>();

    resizing = signal(false);
    private nativeElement!: HTMLElement;
    private nativeElementRect!: ClientRect | DOMRect;
    private sizeCache: ThyResizeEvent | null = null;
    private ghostElement: HTMLDivElement | null = null;
    private currentHandleEvent: ThyResizeHandleMouseDownEvent | null = null;
    private readonly destroyRef = inject(DestroyRef);

    constructor() {
        this.thyResizableService.handleMouseDownOutsideAngular$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
            if (this.thyDisabled()) {
                return;
            }
            this.resizing.set(true);
            const { mouseEvent } = event;
            this.thyResizableService.startResizing(mouseEvent);
            this.currentHandleEvent = event;
            this.setCursor();
            // Re-enter the Angular zone and run the change detection only if there're any `thyResizeStart` listeners,
            // e.g.: `<div thyResizable (thyResizeStart)="..."></div>`.
            this.ngZone.run(() => this.thyResizeStart.emit({ mouseEvent }));
            this.nativeElementRect = this.nativeElement.getBoundingClientRect();
        });

        this.thyResizableService.documentMouseUpOutsideAngular$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
            if (this.resizing()) {
                this.ngZone.run(() => {
                    this.resizing.set(false);
                });
                this.thyResizableService.documentMouseUpOutsideAngular$.next(event);
                this.endResize(event);
            }
        });

        this.thyResizableService.documentMouseMoveOutsideAngular$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
            if (this.resizing()) {
                this.resize(event);
            }
        });

        afterNextRender(() => {
            if (!this.platform.isBrowser) {
                return;
            }
            this.nativeElement = this.elementRef.nativeElement;
            this.ngZone.runOutsideAngular(() => {
                fromEvent(this.nativeElement, 'mouseenter')
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe(() => {
                        this.thyResizableService.mouseEnteredOutsideAngular$.next(true);
                    });

                fromEvent(this.nativeElement, 'mouseleave')
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe(() => {
                        this.thyResizableService.mouseEnteredOutsideAngular$.next(false);
                    });
            });
        });
    }

    setCursor(): void {
        switch (this.currentHandleEvent!.direction) {
            case 'left':
            case 'right':
                this.renderer.setStyle(document.body, 'cursor', 'ew-resize');
                break;
            case 'top':
            case 'bottom':
                this.renderer.setStyle(document.body, 'cursor', 'ns-resize');
                break;
            case 'topLeft':
            case 'bottomRight':
                this.renderer.setStyle(document.body, 'cursor', 'nwse-resize');
                break;
            case 'topRight':
            case 'bottomLeft':
                this.renderer.setStyle(document.body, 'cursor', 'nesw-resize');
                break;
        }
        setCompatibleStyle(document.body, 'user-select', 'none');
    }

    endResize(event: MouseEvent | TouchEvent): void {
        this.renderer.setStyle(document.body, 'cursor', '');
        setCompatibleStyle(document.body, 'user-select', '');
        this.removeGhostElement();
        const size = this.sizeCache
            ? { ...this.sizeCache }
            : {
                  width: this.nativeElementRect.width,
                  height: this.nativeElementRect.height
              };
        // Re-enter the Angular zone and run the change detection only if there're any `thyResizeEnd` listeners,
        // e.g.: `<div thyResizable (thyResizeEnd)="..."></div>`.
        this.ngZone.run(() => {
            this.thyResizeEnd.emit({
                ...size,
                mouseEvent: event
            });
        });
        this.sizeCache = null;
        this.currentHandleEvent = null;
    }

    resize(event: MouseEvent | TouchEvent): void {
        const nativeElementRect = this.nativeElementRect;
        const resizeEvent = getEventWithPoint(event);
        const handleEvent = getEventWithPoint(this.currentHandleEvent!.mouseEvent);
        let width = nativeElementRect.width;
        let height = nativeElementRect.height;
        const ratio = this.thyLockAspectRatio() ? width / height : -1;
        switch (this.currentHandleEvent!.direction) {
            case 'bottomRight':
                width = resizeEvent.clientX - nativeElementRect.left;
                height = resizeEvent.clientY - nativeElementRect.top;
                break;
            case 'bottomLeft':
                width = nativeElementRect.width + (handleEvent.clientX - resizeEvent.clientX);
                height = resizeEvent.clientY - nativeElementRect.top;
                break;
            case 'topRight':
                width = resizeEvent.clientX - nativeElementRect.left;
                height = nativeElementRect.height + (handleEvent.clientY - resizeEvent.clientY);
                break;
            case 'topLeft':
                width = nativeElementRect.width + (handleEvent.clientX - resizeEvent.clientX);
                height = nativeElementRect.height + (handleEvent.clientY - resizeEvent.clientY);
                break;
            case 'top':
                height = nativeElementRect.height + (handleEvent.clientY - resizeEvent.clientY);
                break;
            case 'right':
                width = resizeEvent.clientX - nativeElementRect.left;
                break;
            case 'bottom':
                height = resizeEvent.clientY - nativeElementRect.top;
                break;
            case 'left':
                width = nativeElementRect.width + (handleEvent.clientX - resizeEvent.clientX);
        }
        const size = this.calcSize(width, height, ratio);
        this.sizeCache = { ...size };
        // Re-enter the Angular zone and run the change detection only if there're any `thyResize` listeners,
        // e.g.: `<div thyResizable (thyResize)="..."></div>`.
        this.ngZone.run(() => {
            this.thyResize.emit({
                ...size,
                mouseEvent: event
            });
        });

        if (this.thyPreview()) {
            this.previewResize(size);
        }
    }

    calcSize(width: number, height: number, ratio: number): ThyResizeEvent {
        let newWidth: number;
        let newHeight: number;
        let maxWidth: number;
        let maxHeight: number;
        let col = 0;
        let spanWidth = 0;
        let minWidth = this.thyMinWidth();
        let boundWidth = Infinity;
        let boundHeight = Infinity;
        const bounds = this.thyBounds();
        if (bounds === 'parent') {
            const parent = this.renderer.parentNode(this.nativeElement);
            if (parent instanceof HTMLElement) {
                const parentRect = parent.getBoundingClientRect();
                boundWidth = parentRect.width;
                boundHeight = parentRect.height;
            }
        } else if (bounds === 'window') {
            if (typeof window !== 'undefined') {
                boundWidth = window.innerWidth;
                boundHeight = window.innerHeight;
            }
        } else if (bounds && bounds.nativeElement && bounds.nativeElement instanceof HTMLElement) {
            const boundsRect = bounds.nativeElement.getBoundingClientRect();
            boundWidth = boundsRect.width;
            boundHeight = boundsRect.height;
        }

        maxWidth = ensureInBounds(this.thyMaxWidth()!, boundWidth);
        maxHeight = ensureInBounds(this.thyMaxHeight()!, boundHeight);

        const gridColumnCount = this.thyGridColumnCount();
        if (gridColumnCount !== -1) {
            spanWidth = maxWidth / gridColumnCount;
            const minColumn = this.thyMinColumn();
            minWidth = minColumn !== -1 ? spanWidth * minColumn : minWidth;
            const maxColumn = this.thyMaxColumn();
            maxWidth = maxColumn !== -1 ? spanWidth * maxColumn : maxWidth;
        }

        const minHeight = this.thyMinHeight();
        if (ratio !== -1) {
            if (/(left|right)/i.test(this.currentHandleEvent!.direction)) {
                newWidth = Math.min(Math.max(width, minWidth), maxWidth);
                newHeight = Math.min(Math.max(newWidth / ratio, minHeight), maxHeight);
                if (newHeight >= maxHeight || newHeight <= minHeight) {
                    newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
                }
            } else {
                newHeight = Math.min(Math.max(height, minHeight), maxHeight);
                newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
                if (newWidth >= maxWidth || newWidth <= minWidth) {
                    newHeight = Math.min(Math.max(newWidth / ratio, minHeight), maxHeight);
                }
            }
        } else {
            newWidth = Math.min(Math.max(width, minWidth), maxWidth);
            newHeight = Math.min(Math.max(height, minHeight), maxHeight);
        }

        if (gridColumnCount !== -1) {
            col = Math.round(newWidth / spanWidth);
            newWidth = col * spanWidth;
        }

        return {
            col,
            width: newWidth,
            height: newHeight
        };
    }

    previewResize({ width, height }: ThyResizeEvent): void {
        this.createGhostElement();
        this.renderer.setStyle(this.ghostElement, 'width', `${width}px`);
        this.renderer.setStyle(this.ghostElement, 'height', `${height}px`);
    }

    createGhostElement(): void {
        if (!this.ghostElement) {
            this.ghostElement = this.renderer.createElement('div');
            this.renderer.setAttribute(this.ghostElement, 'class', 'thy-resizable-preview');
        }
        this.renderer.appendChild(this.nativeElement, this.ghostElement);
    }

    removeGhostElement(): void {
        if (this.ghostElement) {
            this.renderer.removeChild(this.nativeElement, this.ghostElement);
        }
    }

    ngOnDestroy(): void {
        this.ghostElement = null;
        this.sizeCache = null;
    }
}
