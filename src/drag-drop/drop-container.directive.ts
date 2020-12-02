import { OnInit, Directive, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, NgZone, Input } from '@angular/core';
import { ThyDragDirective } from './drag.directive';
import { merge, Observable, defer } from 'rxjs';
import { mixinUnsubscribe, MixinBase, Constructor, ThyUnsubscribe } from 'ngx-tethys/core';
import { takeUntil, startWith, take, switchMap } from 'rxjs/operators';
import { ThyDragDropEvent, ThyDragStartEvent, ThyDragEndEvent, ThyDragOverEvent } from './drag-drop.class';
import { THY_DROP_CONTAINER_DIRECTIVE, IThyDropContainerDirective } from './drop-container.class';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

@Directive({
    selector: 'thy-drop-container,[thyDropContainer]',
    providers: [
        {
            provide: THY_DROP_CONTAINER_DIRECTIVE,
            useExisting: ThyDropContainerDirective
        }
    ]
})
export class ThyDropContainerDirective<T = any> extends _MixinBase implements OnInit, AfterContentInit, IThyDropContainerDirective {
    @Input('thyDropContainer')
    set dragContainer(data: T[]) {
        this.data = data;
    }

    @Input('thyDropContainerData') data: T[];

    @Input('thyDropContainerDisabled') disabled: boolean;

    @Input('thyBeforeDragStart') beforeStart: (e: ThyDragStartEvent<T>) => boolean;

    @Input('thyBeforeDragOver') beforeOver: (e: ThyDragOverEvent<T>) => boolean;

    @Input('thyBeforeDragDrop') beforeDrop: (e: ThyDragDropEvent<T>) => boolean;

    @Output('thyDragStarted') started = new EventEmitter<ThyDragStartEvent<ThyDragDirective>>();

    @Output('thyDragEnded') ended = new EventEmitter<ThyDragEndEvent<ThyDragDirective>>();

    @Output('thyDragOvered') overed = new EventEmitter<ThyDragOverEvent<ThyDragDirective>>();

    @Output('thyDragDropped') dropped = new EventEmitter<ThyDragDropEvent<ThyDragDirective>>();

    @ContentChildren(ThyDragDirective, {
        descendants: false
    })
    draggables: QueryList<ThyDragDirective>;

    constructor(private ngZone: NgZone) {
        super();
    }

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
}
