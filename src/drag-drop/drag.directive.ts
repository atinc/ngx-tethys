import { Directive, NgZone, ElementRef, HostBinding, Input, Inject, OnDestroy, Optional, Renderer2 } from '@angular/core';
import { DragRef } from './drag-ref';
import { DOCUMENT } from '@angular/common';
import { ThyDragDropService } from './drag-drop.service';
import { THY_DROP_CONTAINER_DIRECTIVE, IThyDropContainerDirective } from './drop-container.class';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 拖拽项
 * @name thy-drag,[thyDrag]
 * @order 10
 */
@Directive({
    selector: 'thy-drag,[thyDrag]',
    standalone: true
})
export class ThyDragDirective<T = any> implements OnDestroy {
    /**
     * 元数据
     * @type any
     */
    @Input('thyDrag')
    set dragData(data: T) {
        this.data = data;
    }

    /**
     * 元数据
     * @type any
     */
    @Input('thyDragData') data: T;

    @HostBinding('attr.draggable') isDraggable = true;

    private _disabled = false;

    /**
     * 是否禁用拖拽
     * @default false
     */
    @Input({ alias: 'thyDragDisabled', transform: coerceBooleanProperty })
    set disabled(isDisabled: boolean) {
        this._disabled = isDisabled;
        this.isDraggable = !isDisabled;
    }
    get disabled() {
        return this._disabled;
    }

    public dragRef: DragRef<T>;

    constructor(
        @Inject(DOCUMENT) document: any,
        @Optional() @Inject(THY_DROP_CONTAINER_DIRECTIVE) public container: IThyDropContainerDirective,
        ngZone: NgZone,
        private elementRef: ElementRef<HTMLElement>,
        service: ThyDragDropService<T>,
        renderer: Renderer2
    ) {
        this.dragRef = new DragRef<T>(elementRef, this, container, service, document, ngZone, renderer);
    }

    ngOnDestroy() {
        this.dragRef.dispose();
    }
}
