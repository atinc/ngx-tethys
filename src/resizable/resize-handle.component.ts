import {
    OnInit,
    OnDestroy,
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    Renderer2,
    NgZone,
    EventEmitter,
    ElementRef
} from '@angular/core';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { ThyResizeDirection } from './interface';
import { ThyResizableService } from './resizable.service';
import { takeUntil } from 'rxjs/operators';
import { Constructor, ThyUnsubscribe, MixinBase, mixinUnsubscribe } from 'ngx-tethys/core';
import { fromEvent, merge } from 'rxjs';

export class ThyResizeHandleMouseDownEvent {
    constructor(public direction: ThyResizeDirection, public mouseEvent: MouseEvent | TouchEvent) {}
}

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

const passiveEventListenerOptions = <AddEventListenerOptions>normalizePassiveListenerOptions({ passive: true });

/**
 * 定义调整手柄及方向
 * @name thy-resize-handle
 */
@Component({
    selector: 'thy-resize-handle, [thy-resize-handle]',
    exportAs: 'thyResizeHandle',
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-resizable-handle',
        '[class.thy-resizable-handle-top]': `thyDirection === 'top'`,
        '[class.thy-resizable-handle-right]': `thyDirection === 'right'`,
        '[class.thy-resizable-handle-bottom]': `thyDirection === 'bottom'`,
        '[class.thy-resizable-handle-left]': `thyDirection === 'left'`,
        '[class.thy-resizable-handle-topRight]': `thyDirection === 'topRight'`,
        '[class.thy-resizable-handle-bottomRight]': `thyDirection === 'bottomRight'`,
        '[class.thy-resizable-handle-bottomLeft]': `thyDirection === 'bottomLeft'`,
        '[class.thy-resizable-handle-topLeft]': `thyDirection === 'topLeft'`,
        '[class.thy-resizable-handle-box-hover]': 'entered'
    }
})
export class ThyResizeHandleComponent extends _MixinBase implements OnInit, OnDestroy {
    /**
     * 调整方向
     */
    @Input() thyDirection: ThyResizeDirection = 'bottomRight';

    /**
     * MouseDown 回调事件
     */
    @Output() readonly thyMouseDown = new EventEmitter<ThyResizeHandleMouseDownEvent>();

    constructor(
        private ngZone: NgZone,
        private thyResizableService: ThyResizableService,
        private host: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {
        super();
    }

    ngOnInit(): void {
        this.thyResizableService.mouseEnteredOutsideAngular$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(entered => {
            if (entered) {
                this.renderer.addClass(this.host.nativeElement, 'thy-resizable-handle-box-hover');
            } else {
                this.renderer.removeClass(this.host.nativeElement, 'thy-resizable-handle-box-hover');
            }
        });
        this.ngZone.runOutsideAngular(() => {
            // Note: since Chrome 56 defaults document level `touchstart` listener to passive.
            // The element `touchstart` listener is not passive by default
            // We never call `preventDefault()` on it, so we're safe making it passive too.
            merge(
                fromEvent<MouseEvent>(this.host.nativeElement, 'mousedown', passiveEventListenerOptions),
                fromEvent<TouchEvent>(this.host.nativeElement, 'touchstart', passiveEventListenerOptions)
            )
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe((event: MouseEvent | TouchEvent) => {
                    this.thyResizableService.handleMouseDownOutsideAngular$.next(
                        new ThyResizeHandleMouseDownEvent(this.thyDirection, event)
                    );
                });
        });
    }
    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
