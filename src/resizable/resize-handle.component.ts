import {
    OnInit,
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    NgZone,
    EventEmitter,
    ElementRef,
    inject,
    DestroyRef
} from '@angular/core';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { ThyResizeDirection } from './interface';
import { ThyResizableService } from './resizable.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge } from 'rxjs';
import { useHostRenderer } from '@tethys/cdk/dom';

import { coerceBooleanProperty } from 'ngx-tethys/util';

export class ThyResizeHandleMouseDownEvent {
    constructor(
        public direction: ThyResizeDirection,
        public mouseEvent: MouseEvent | TouchEvent
    ) {}
}

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
        @if (thyLine) {
            <div class="thy-resizable-handle-line"></div>
        }
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
    },
    imports: []
})
export class ThyResizeHandle implements OnInit {
    private ngZone = inject(NgZone);
    private thyResizableService = inject(ThyResizableService);
    private host = inject<ElementRef<HTMLElement>>(ElementRef);

    /**
     * 调整方向
     * @type top | right | bottom | left | topRight | bottomRight | bottomLeft | topLeft
     */
    @Input() thyDirection: ThyResizeDirection = 'bottomRight';

    /**
     * 是否展示拖拽线
     */
    @Input({ transform: coerceBooleanProperty }) thyLine = false;

    /**
     * MouseDown 回调事件
     */
    @Output() readonly thyMouseDown = new EventEmitter<ThyResizeHandleMouseDownEvent>();

    private hostRenderer = useHostRenderer();

    private readonly destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        this.thyResizableService.mouseEnteredOutsideAngular$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(entered => {
            if (entered) {
                this.hostRenderer.addClass('thy-resizable-handle-box-hover');
            } else {
                this.hostRenderer.removeClass('thy-resizable-handle-box-hover');
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
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((event: MouseEvent | TouchEvent) => {
                    this.thyResizableService.handleMouseDownOutsideAngular$.next(
                        new ThyResizeHandleMouseDownEvent(this.thyDirection, event)
                    );
                });
        });
    }
}
