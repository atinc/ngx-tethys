import { OnInit, Directive, NgZone, OnDestroy, inject, input, computed, output, contentChildren, effect } from '@angular/core';
import { ThyDragDirective } from './drag.directive';
import { merge, Observable, defer, Subject } from 'rxjs';
import { takeUntil, startWith, take, switchMap, tap, skip } from 'rxjs/operators';
import { ThyDragDropEvent, ThyDragStartEvent, ThyDragEndEvent, ThyDragOverEvent } from './drag-drop.class';
import { THY_DROP_CONTAINER_DIRECTIVE, IThyDropContainerDirective } from './drag-drop.token';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { toObservable } from '@angular/core/rxjs-interop';

/**
 * @name thy-drop-container,[thyDropContainer]
 * @order 30
 * @deprecated please use @angular/cdk/drag-drop
 */
@Directive({
    selector: 'thy-drop-container,[thyDropContainer]',
    providers: [
        {
            provide: THY_DROP_CONTAINER_DIRECTIVE,
            useExisting: ThyDropContainerDirective
        }
    ]
})
export class ThyDropContainerDirective<T = any> implements OnInit, IThyDropContainerDirective, OnDestroy {
    private ngZone = inject(NgZone);

    private ngUnsubscribe$ = new Subject<void>();

    /**
     * 元数据
     * @type any[]
     */
    readonly thyDropContainer = input<T[]>();

    /**
     * 元数据
     * @type any[]
     */
    readonly thyDropContainerData = input<T[]>();

    data = computed(() => {
        return this.thyDropContainer() || this.thyDropContainerData();
    });

    /**
     * 是否禁用拖拽
     * @default false
     */
    readonly disabled = input<boolean, boolean | string | number>(undefined, {
        alias: 'thyDropContainerDisabled',
        transform: coerceBooleanProperty
    });

    /**
     * 拖拽之前的回调，函数返回 false 则阻止拖拽
     */
    readonly beforeStart = input<(e: ThyDragStartEvent<T>) => boolean>(undefined, { alias: 'thyBeforeDragStart' });

    /**
     * 拖拽时回调，函数返回 false 则阻止移入
     */
    readonly beforeOver = input<(e: ThyDragOverEvent<T>) => boolean>(undefined, { alias: 'thyBeforeDragOver' });

    /**
     * 拖放到元素时回调，函数返回 false 则阻止放置
     */
    readonly beforeDrop = input<(e: ThyDragDropEvent<T>) => boolean>(undefined, { alias: 'thyBeforeDragDrop' });

    /**
     * 开始拖拽时调用
     */
    readonly started = output<ThyDragStartEvent<ThyDragDirective>>({ alias: 'thyDragStarted' });

    /**
     * dragend 触发时调用
     */
    readonly ended = output<ThyDragEndEvent<ThyDragDirective>>({ alias: 'thyDragEnded' });

    /**
     * dragover 触发时调用
     */
    readonly overed = output<ThyDragOverEvent<ThyDragDirective>>({ alias: 'thyDragOvered' });

    /**
     * drop 触发时调用
     */
    readonly dropped = output<ThyDragDropEvent<ThyDragDirective>>({ alias: 'thyDragDropped' });

    /**
     * @internal
     */
    readonly draggables = contentChildren(ThyDragDirective, { descendants: false });

    draggablesChanges$ = toObservable(this.draggables);

    constructor() {
        effect(() => {
            this.draggables();
            this.draggableChanges();
        });
    }

    ngOnInit() {}

    private draggableChanges() {
        this.resetDraggableChanges(item => item.dragRef.started).subscribe(event => {
            this.started.emit(event);
        });
        this.resetDraggableChanges(item => item.dragRef.ended).subscribe(event => {
            this.ended.emit(event);
        });
        this.resetDraggableChanges(item => item.dragRef.overed).subscribe(event => {
            this.overed.emit(event);
        });
        this.resetDraggableChanges(item => item.dragRef.dropped).subscribe(event => {
            this.dropped.emit(event);
        });
    }

    private resetDraggableChanges(fn: (item: ThyDragDirective) => Observable<any>) {
        return defer(() => {
            const draggables = this.draggables();
            if (draggables) {
                return merge(...draggables.map(fn));
            }
            return this.ngZone.onStable.asObservable().pipe(
                take(1),
                switchMap(() => this.resetDraggableChanges.bind(this, fn))
            );
        }).pipe(takeUntil(merge(this.ngUnsubscribe$, this.draggablesChanges$.pipe(skip(1))))) as Observable<any>;
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
