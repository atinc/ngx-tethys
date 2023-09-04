import {
    Directive,
    AfterViewInit,
    OnDestroy,
    ElementRef,
    Renderer2,
    NgZone,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef
} from '@angular/core';
import { InputBoolean, InputNumber, UnsubscribeMixin } from 'ngx-tethys/core';
import { ThyResizableService } from './resizable.service';
import { Platform } from '@angular/cdk/platform';
import { takeUntil } from 'rxjs/operators';
import { ThyResizeHandleMouseDownEvent } from './resize-handle.component';
import { ThyResizeEvent } from './interface';
import { getEventWithPoint, ensureInBounds, setCompatibleStyle } from './utils';
import { fromEvent } from 'rxjs';

/**
 * 调整尺寸
 * @name thyResizable
 */
@Directive({
    selector: '[thyResizable]',
    providers: [ThyResizableService],
    host: {
        class: 'thy-resizable',
        '[class.thy-resizable-resizing]': 'resizing',
        '[class.thy-resizable-disabled]': 'thyDisabled'
    },
    standalone: true
})
export class ThyResizableDirective extends UnsubscribeMixin implements AfterViewInit, OnDestroy {
    /**
     * 调整尺寸的边界
     * @default parent
     * @type 'window' | 'parent' | ElementRef<HTMLElement>
     */
    @Input() thyBounds: 'window' | 'parent' | ElementRef<HTMLElement> = 'parent';

    /**
     * 最大高度(超过边界部分忽略)
     */
    @Input() @InputNumber() thyMaxHeight?: number;

    /**
     * 最大宽度(超过边界部分忽略)
     */
    @Input() @InputNumber() thyMaxWidth?: number;

    /**
     * 最小高度
     */
    @Input() @InputNumber() thyMinHeight: number = 40;

    /**
     * 最小宽度
     */
    @Input() @InputNumber() thyMinWidth: number = 40;

    /**
     * 栅格列数(-1 为不栅格)
     */
    @Input() @InputNumber() thyGridColumnCount: number = -1;

    /**
     * 栅格最大列数
     */
    @Input() @InputNumber() thyMaxColumn: number = -1;

    /**
     * 栅格最小列数
     */
    @Input() @InputNumber() thyMinColumn: number = -1;

    /**
     * 锁定宽高比
     */
    @Input() @InputBoolean() thyLockAspectRatio: boolean = false;

    /**
     * 是否预览模式
     */
    @Input() @InputBoolean() thyPreview: boolean = false;

    /**
     * 是否禁用调整大小
     */
    @Input() @InputBoolean() thyDisabled: boolean = false;

    /**
     * 调整尺寸时的事件
     */
    @Output() readonly thyResize = new EventEmitter<ThyResizeEvent>();

    /**
     * 开始调整尺寸时的事件
     */
    @Output() readonly thyResizeStart = new EventEmitter<ThyResizeEvent>();

    /**
     * 结束调整尺寸时的事件
     */
    @Output() readonly thyResizeEnd = new EventEmitter<ThyResizeEvent>();

    resizing = false;
    private nativeElement!: HTMLElement;
    private nativeElementRect!: ClientRect | DOMRect;
    private sizeCache: ThyResizeEvent | null = null;
    private ghostElement: HTMLDivElement | null = null;
    private currentHandleEvent: ThyResizeHandleMouseDownEvent | null = null;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2,
        private platform: Platform,
        private ngZone: NgZone,
        private thyResizableService: ThyResizableService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        super();
        this.thyResizableService.handleMouseDownOutsideAngular$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
            if (this.thyDisabled) {
                return;
            }
            this.resizing = true;
            const { mouseEvent } = event;
            this.thyResizableService.startResizing(mouseEvent);
            this.currentHandleEvent = event;
            this.setCursor();
            // Re-enter the Angular zone and run the change detection only if there're any `thyResizeStart` listeners,
            // e.g.: `<div thyResizable (thyResizeStart)="..."></div>`.
            if (this.thyResizeStart.observers.length) {
                this.ngZone.run(() => this.thyResizeStart.emit({ mouseEvent }));
            }
            this.nativeElementRect = this.nativeElement.getBoundingClientRect();
        });

        this.thyResizableService.documentMouseUpOutsideAngular$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
            if (this.resizing) {
                this.ngZone.run(() => {
                    this.resizing = false;
                    this.changeDetectorRef.markForCheck();
                });
                this.thyResizableService.documentMouseUpOutsideAngular$.next(event);
                this.endResize(event);
            }
        });

        this.thyResizableService.documentMouseMoveOutsideAngular$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
            if (this.resizing) {
                this.resize(event);
            }
        });
    }

    ngAfterViewInit(): void {
        if (!this.platform.isBrowser) {
            return;
        }
        this.nativeElement = this.elementRef.nativeElement;
        this.setPosition();
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.nativeElement, 'mouseenter')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(() => {
                    this.thyResizableService.mouseEnteredOutsideAngular$.next(true);
                });

            fromEvent(this.nativeElement, 'mouseleave')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(() => {
                    this.thyResizableService.mouseEnteredOutsideAngular$.next(false);
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

    setPosition(): void {
        const position = getComputedStyle(this.nativeElement).position;
        if (position === 'static' || !position) {
            this.renderer.setStyle(this.nativeElement, 'position', 'relative');
        }
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
        if (this.thyResizeEnd.observers.length) {
            this.ngZone.run(() => {
                this.thyResizeEnd.emit({
                    ...size,
                    mouseEvent: event
                });
            });
        }
        this.sizeCache = null;
        this.currentHandleEvent = null;
    }

    resize(event: MouseEvent | TouchEvent): void {
        const nativeElementRect = this.nativeElementRect;
        const resizeEvent = getEventWithPoint(event);
        const handleEvent = getEventWithPoint(this.currentHandleEvent!.mouseEvent);
        let width = nativeElementRect.width;
        let height = nativeElementRect.height;
        const ratio = this.thyLockAspectRatio ? width / height : -1;
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
        if (this.thyResize.observers.length) {
            this.ngZone.run(() => {
                this.thyResize.emit({
                    ...size,
                    mouseEvent: event
                });
            });
        }

        if (this.thyPreview) {
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
        let minWidth = this.thyMinWidth;
        let boundWidth = Infinity;
        let boundHeight = Infinity;
        if (this.thyBounds === 'parent') {
            const parent = this.renderer.parentNode(this.nativeElement);
            if (parent instanceof HTMLElement) {
                const parentRect = parent.getBoundingClientRect();
                boundWidth = parentRect.width;
                boundHeight = parentRect.height;
            }
        } else if (this.thyBounds === 'window') {
            if (typeof window !== 'undefined') {
                boundWidth = window.innerWidth;
                boundHeight = window.innerHeight;
            }
        } else if (this.thyBounds && this.thyBounds.nativeElement && this.thyBounds.nativeElement instanceof HTMLElement) {
            const boundsRect = this.thyBounds.nativeElement.getBoundingClientRect();
            boundWidth = boundsRect.width;
            boundHeight = boundsRect.height;
        }

        maxWidth = ensureInBounds(this.thyMaxWidth!, boundWidth);
        maxHeight = ensureInBounds(this.thyMaxHeight!, boundHeight);

        if (this.thyGridColumnCount !== -1) {
            spanWidth = maxWidth / this.thyGridColumnCount;
            minWidth = this.thyMinColumn !== -1 ? spanWidth * this.thyMinColumn : minWidth;
            maxWidth = this.thyMaxColumn !== -1 ? spanWidth * this.thyMaxColumn : maxWidth;
        }

        if (ratio !== -1) {
            if (/(left|right)/i.test(this.currentHandleEvent!.direction)) {
                newWidth = Math.min(Math.max(width, minWidth), maxWidth);
                newHeight = Math.min(Math.max(newWidth / ratio, this.thyMinHeight), maxHeight);
                if (newHeight >= maxHeight || newHeight <= this.thyMinHeight) {
                    newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
                }
            } else {
                newHeight = Math.min(Math.max(height, this.thyMinHeight), maxHeight);
                newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
                if (newWidth >= maxWidth || newWidth <= minWidth) {
                    newHeight = Math.min(Math.max(newWidth / ratio, this.thyMinHeight), maxHeight);
                }
            }
        } else {
            newWidth = Math.min(Math.max(width, minWidth), maxWidth);
            newHeight = Math.min(Math.max(height, this.thyMinHeight), maxHeight);
        }

        if (this.thyGridColumnCount !== -1) {
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
        super.ngOnDestroy();
    }
}
