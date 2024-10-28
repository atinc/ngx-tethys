import { OnInit, Directive, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, NgZone, Input, OnDestroy, inject } from '@angular/core';
import { ThyDragDirective } from './drag.directive';
import { merge, Observable, defer, Subject } from 'rxjs';
import { takeUntil, startWith, take, switchMap } from 'rxjs/operators';
import { ThyDragDropEvent, ThyDragStartEvent, ThyDragEndEvent, ThyDragOverEvent } from './drag-drop.class';
import { THY_DROP_CONTAINER_DIRECTIVE, IThyDropContainerDirective } from './drop-container.class';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @name thy-drop-container,[thyDropContainer]
 * @order 30
 */
@Directive({
    selector: 'thy-drop-container,[thyDropContainer]',
    providers: [
        {
            provide: THY_DROP_CONTAINER_DIRECTIVE,
            useExisting: ThyDropContainerDirective
        }
    ],
    standalone: true
})
export class ThyDropContainerDirective<T = any> implements OnInit, AfterContentInit, IThyDropContainerDirective, OnDestroy {
    private ngZone = inject(NgZone);

    private ngUnsubscribe$ = new Subject<void>();

    /**
     * 元数据
     * @type any[]
     */
    @Input('thyDropContainer')
    set dragContainer(data: T[]) {
        this.data = data;
    }

    /**
     * 元数据
     * @type any[]
     */
    @Input('thyDropContainerData') data: T[];

    /**
     * 是否禁用拖拽
     * @default false
     */
    @Input({ alias: 'thyDropContainerDisabled', transform: coerceBooleanProperty }) disabled: boolean;

    /**
     * 拖拽之前的回调，函数返回 false 则阻止拖拽
     */
    @Input('thyBeforeDragStart') beforeStart: (e: ThyDragStartEvent<T>) => boolean;

    /**
     * 拖拽时回调，函数返回 false 则阻止移入
     */
    @Input('thyBeforeDragOver') beforeOver: (e: ThyDragOverEvent<T>) => boolean;

    /**
     * 拖放到元素时回调，函数返回 false 则阻止放置
     */
    @Input('thyBeforeDragDrop') beforeDrop: (e: ThyDragDropEvent<T>) => boolean;

    /**
     * 开始拖拽时调用
     */
    @Output('thyDragStarted') started = new EventEmitter<ThyDragStartEvent<ThyDragDirective>>();

    /**
     * dragend 触发时调用
     */
    @Output('thyDragEnded') ended = new EventEmitter<ThyDragEndEvent<ThyDragDirective>>();

    /**
     * dragover 触发时调用
     */
    @Output('thyDragOvered') overed = new EventEmitter<ThyDragOverEvent<ThyDragDirective>>();

    /**
     * drop 触发时调用
     */
    @Output('thyDragDropped') dropped = new EventEmitter<ThyDragDropEvent<ThyDragDirective>>();

    /**
     * @internal
     */
    @ContentChildren(ThyDragDirective, {
        descendants: false
    })
    draggables: QueryList<ThyDragDirective>;

    ngOnInit() {}

    ngAfterContentInit() {
        this.draggables.changes.pipe(startWith(null), takeUntil(this.ngUnsubscribe$)).subscribe(() => {
            this.draggableChanges();
        });
    }

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
            if (this.draggables) {
                return merge(...this.draggables.map(fn));
            }
            return this.ngZone.onStable.asObservable().pipe(
                take(1),
                switchMap(() => this.resetDraggableChanges.bind(this, fn))
            );
        }).pipe(takeUntil(merge(this.ngUnsubscribe$, this.draggables.changes))) as Observable<any>;
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
