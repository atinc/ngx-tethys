import {
    OnInit,
    OnDestroy,
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    ElementRef
} from '@angular/core';
import { ThyResizeDirection } from './interface';
import { ThyResizableService } from './resizable.service';
import { takeUntil } from 'rxjs/operators';
import { Constructor, ThyUnsubscribe, MixinBase, mixinUnsubscribe } from 'ngx-tethys/core';

export class ThyResizeHandleMouseDownEvent {
    constructor(public direction: ThyResizeDirection, public mouseEvent: MouseEvent | TouchEvent) {}
}
const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

@Component({
    selector: 'thy-resize-handle, [thy-resize-handle]',
    exportAs: 'thyResizeHandle',
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.thy-resizable-handle-top]': `thyDirection === 'top'`,
        '[class.thy-resizable-handle-right]': `thyDirection === 'right'`,
        '[class.thy-resizable-handle-bottom]': `thyDirection === 'bottom'`,
        '[class.thy-resizable-handle-left]': `thyDirection === 'left'`,
        '[class.thy-resizable-handle-topRight]': `thyDirection === 'topRight'`,
        '[class.thy-resizable-handle-bottomRight]': `thyDirection === 'bottomRight'`,
        '[class.thy-resizable-handle-bottomLeft]': `thyDirection === 'bottomLeft'`,
        '[class.thy-resizable-handle-topLeft]': `thyDirection === 'topLeft'`,
        '[class.thy-resizable-handle-box-hover]': 'entered',
        '(mousedown)': 'onMousedown($event)',
        '(touchstart)': 'onMousedown($event)'
    }
})
export class ThyResizeHandleComponent extends _MixinBase implements OnInit, OnDestroy {
    @Input() thyDirection: ThyResizeDirection = 'bottomRight';
    @Output() readonly thyMouseDown = new EventEmitter<ThyResizeHandleMouseDownEvent>();

    entered = false;

    constructor(private thyResizableService: ThyResizableService, private cdr: ChangeDetectorRef, private elementRef: ElementRef) {
        super();
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('thy-resizable-handle');
    }

    ngOnInit(): void {
        this.thyResizableService.mouseEntered$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(entered => {
            this.entered = entered;
            this.cdr.markForCheck();
        });
    }

    onMousedown(event: MouseEvent | TouchEvent): void {
        this.thyResizableService.handleMouseDown$.next(new ThyResizeHandleMouseDownEvent(this.thyDirection, event));
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
