import {
    Directive,
    NgZone,
    ElementRef,
    HostBinding,
    Input,
    Inject,
    ContentChildren,
    OnDestroy,
    Optional,
    AfterContentInit
} from '@angular/core';
import { DragRef } from './drag-ref';
import { DOCUMENT } from '@angular/common';
import { ThyDragHandleDirective } from './drag-handle.directive';
import { ThyDragDropService } from './drag-drop.service';
import { mixinUnsubscribe, MixinBase, Constructor, ThyUnsubscribe } from 'ngx-tethys/core';
import { THY_DROP_CONTAINER_DIRECTIVE, IThyDropContainerDirective } from './drop-container.class';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

@Directive({ selector: 'thy-drag,[thyDrag]' })
export class ThyDragDirective<T = any> extends _MixinBase implements OnDestroy {
    @Input('thyDrag')
    set dragData(data: T) {
        this.data = data;
    }

    @Input('thyDragData') data: T;

    @HostBinding('attr.draggable') isDraggable = true;

    private _disabled = false;
    @Input('thyDragDisabled') set disabled(isDisabled: boolean) {
        this._disabled = isDisabled;
        if (isDisabled) {
            this.isDraggable = false;
        }
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
        service: ThyDragDropService<T>
    ) {
        super();
        this.dragRef = new DragRef<T>(elementRef, this, container, service, document, ngZone);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.dragRef.dispose();
    }
}
