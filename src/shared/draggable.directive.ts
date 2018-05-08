
import { Directive, Input, ElementRef, OnInit, AfterViewInit, Output, EventEmitter, Renderer2 } from '@angular/core';

@Directive({
    selector: '[thyDraggable]'
})
export class ThyDraggableDirective implements AfterViewInit {

    readonly DRAG_START_CLASS = 'thy-drag-start';

    readonly DRAG_OVER_CLASS = 'thy-over-start';

    public data: any = [];

    private _elements: any;

    private _dragEvent: ThyDraggableEvent = {};

    @Input()
    set thyDraggable(value: any) {
        if (value) {
            this.data = value;
        }
    }

    @Output() thyOnStart: EventEmitter<ThyDraggableEvent> = new EventEmitter<ThyDraggableEvent>();
    @Output() thyOnEnd: EventEmitter<ThyDraggableEvent> = new EventEmitter<ThyDraggableEvent>();

    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef
    ) {
    }

    ngAfterViewInit() {
        this._initial();
    }

    private _initial() {
        this._initialElements();
        this._bindEvents();
    }

    private _initialElements() {
        const childNodes = Array.from(this._elementRef.nativeElement.childNodes);
        this._elements = childNodes.filter((node: any) => node.nodeName !== '#comment');
    }

    private _bindEvents() {
        this._elements.forEach((elem: any) => {
            elem.draggable = 'true';
            elem.addEventListener('dragstart', this._dragstart.bind(this));
            elem.addEventListener('dragend', this._dragend.bind(this));
            elem.addEventListener('dragenter', this._dragenter.bind(this));
            elem.addEventListener('dragleave', this._dragleave.bind(this));
            elem.addEventListener('dragover', this._dragover.bind(this));
            elem.addEventListener('drop', this._drop.bind(this));
        });
    }

    private _getValidDragElement(elem: any): any {
        const draggable = elem.getAttribute('draggable');
        return draggable === 'true' ? elem : this._getValidDragElement(elem.parentElement);
    }

    // 开始拖拽
    private _dragstart(event: any) {
        event.dataTransfer.effectAllowed = 'move';
        this._renderer.addClass(event.target, this.DRAG_START_CLASS);
        this._dragEvent.dragElement = event.target;
        this._dragEvent.oldIndex = Array.from(this._elements).indexOf(event.target);
        this.thyOnStart.emit(this._dragEvent);
    }

    // 结束拖拽
    private _dragend(event: any) {
        event.preventDefault();
        this.thyOnEnd.emit(this._dragEvent);
        this._clear();
    }

    // 拖拽到可释放目标
    private _dragenter(event: any) {
    }

    // 离开可释放目标
    private _dragleave(event: any) {
    }

    // 拖拽到可释放目标
    private _dragover(event: any) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        return false;
    }

    // 当元素或选中的文本在可释放目标上被释放时触发
    private _drop(event: any) {
        event.stopPropagation();
        this._dragEvent.targetElement = this._getValidDragElement(event.target);
        this._dragEvent.newIndex = Array.from(this._elements).indexOf(this._dragEvent.targetElement);
        this._move();
        return false;
    }

    private _move() {
        const data = this.data;
        const oldIndex = this._dragEvent.oldIndex;
        const newIndex = this._dragEvent.newIndex;
        if (oldIndex > newIndex) {
            data.splice(newIndex, 0, data[oldIndex]);
            data.splice(oldIndex + 1, 1);
        } else {
            data.splice(newIndex + 1, 0, data[oldIndex]);
            data.splice(oldIndex, 1);
        }
        setTimeout(() => {
            this._initialElements();
        }, 100);
    }

    private _clear() {
        this._renderer.removeClass(this._dragEvent.dragElement, this.DRAG_START_CLASS);
        this._dragEvent = {};
    }
}


export class ThyDraggableEvent {
    dragElement?: any;
    targetElement?: any;
    oldIndex?: number;
    newIndex?: number;
    model?: any;
}
