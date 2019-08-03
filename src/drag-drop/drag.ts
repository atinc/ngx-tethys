import {
    Directive,
    NgZone,
    Renderer2,
    ElementRef,
    ViewChild,
    HostBinding,
    Input,
    OnInit,
    Inject,
    ContentChildren,
    Output,
    EventEmitter
} from '@angular/core';
import { Subject, fromEvent, from } from 'rxjs';
import { DragRef } from './drag-ref';
import { DOCUMENT } from '@angular/common';
import { ThyDragHandleDirective } from './drag-handle';
import { CdkDragStart } from '@angular/cdk/drag-drop';

@Directive({ selector: 'thy-drag,[thyDrag]' })
export class ThyDragDirective implements OnInit {
    ngUnsubscribe$ = new Subject();

    @Input('thyDragData') data: any;

    @Input('thyDisabled') disabled = true;

    @Output('thyDragStarted') started = new EventEmitter<{
        event: DragEvent;
        source: ThyDragDirective;
    }>();

    @Output('thyDragEnded') ended = new EventEmitter<{
        event: DragEvent;
        source: ThyDragDirective;
    }>();

    @Output('thyDragOvered') overed = new EventEmitter<{
        event: DragEvent;
        source: ThyDragDirective;
    }>();

    @Output('thyDragDropped') dropped = new EventEmitter<{
        event: DragEvent;
        currentIndex: number;
        container: any;
        direction: string;
        item: ThyDragDirective;
        previousIndex: number;
        previousContainer: any;
    }>();

    @HostBinding('attr.draggable') isDraggable = true;

    @ContentChildren(ThyDragHandleDirective)
    set dragHandles(components: ThyDragHandleDirective[]) {
        this.dragRef.withHandles(components);
    }

    dragRef: DragRef<ThyDragDirective>;

    constructor(@Inject(DOCUMENT) document: any, ngZone: NgZone, elementRef: ElementRef<HTMLElement>) {
        const start: CdkDragStart = null;
        this.dragRef = new DragRef(elementRef, this, document, ngZone);
    }

    ngOnInit() {}
}
