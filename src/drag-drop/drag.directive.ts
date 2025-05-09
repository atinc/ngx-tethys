import { Directive, NgZone, ElementRef, HostBinding, Input, OnDestroy, Renderer2, inject, input, computed } from '@angular/core';
import { DragRef } from './drag-ref';
import { DOCUMENT } from '@angular/common';
import { ThyDragDropService } from './drag-drop.service';
import { IThyDragDirective, THY_DROP_CONTAINER_DIRECTIVE } from './drag-drop.token';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 拖拽项
 * @name thy-drag,[thyDrag]
 * @order 10
 * @deprecated please use @angular/cdk/drag-drop
 */
@Directive({
    selector: 'thy-drag,[thyDrag]',
    host: {
        '[attr.draggable]': '!disabled()'
    }
})
export class ThyDragDirective<T = any> implements IThyDragDirective, OnDestroy {
    container = inject(THY_DROP_CONTAINER_DIRECTIVE, { optional: true })!;
    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /**
     * 元数据
     * @type any
     */
    readonly thyDrag = input<T>();

    /**
     * 元数据
     * @type any
     */
    readonly thyDragData = input<T>();

    /**
     * 是否禁用拖拽
     * @default false
     */
    readonly disabled = input(false, { alias: 'thyDragDisabled', transform: coerceBooleanProperty });

    data = computed(() => {
        return this.thyDrag() || this.thyDragData();
    });

    public dragRef: DragRef<T>;

    constructor() {
        const document = inject(DOCUMENT);
        const container = this.container;
        const ngZone = inject(NgZone);
        const elementRef = this.elementRef;
        const service = inject<ThyDragDropService<T>>(ThyDragDropService);
        const renderer = inject(Renderer2);

        this.dragRef = new DragRef<T>(elementRef, this, container, service, document, ngZone, renderer);
    }

    ngOnDestroy() {
        this.dragRef.dispose();
    }
}
