import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Id, SafeAny } from 'ngx-tethys/types';

import { Direction, InnerTransferDragEvent, ThyTransferDragEvent, ThyTransferItem } from './transfer.interface';

@Component({
    selector: 'thy-transfer-list',
    templateUrl: './transfer-list.component.html',
    host: {
        class: 'thy-transfer-list'
    },
    encapsulation: ViewEncapsulation.None
})
export class ThyTransferListComponent implements OnInit {
    /**
     * 数据源
     * @private
     * @type {ThyTransferItem[]}
     * @memberof ThyTransferListComponent
     */
    @Input() thyDataSource: ThyTransferItem[] = [];

    /**
     * @private
     * @type {Direction}
     * @default left
     */
    @Input() direction: Direction = 'left';

    /**
     * @private
     * @type {boolean}
     * @default false
     */
    @Input() draggable: boolean = true;

    /**
     * @private
     * @type {string}
     */
    @Input() title: string;

    /**
     * @private
     *
     * 最大选择
     */
    @Input() max: number;

    /**
     * @private
     *
     * 数据量 使用自定义模板时必填
     */
    @Input() renderItemCount: number;

    /**
     * @private
     *
     */
    @Input() selectionModel: SelectionModel<Id>;

    /**
     * @private
     * @type {TemplateRef<SafeAny>}
     * @memberof ThyTransferListComponent
     */
    @Input() renderItem: TemplateRef<SafeAny>;

    /** @private */
    @Input() virtualScroll = false;

    /** @private */
    @Input() thyRender: TemplateRef<void> | null = null;

    /** @private */
    @Input() thyCanUncheckRightItemFn = (item?: ThyTransferItem, rightDataSource?: ThyTransferItem[]) => true;

    /**
     * @private
     *
     * @type {EventEmitter<ThyTransferItem>}
     * @memberof ThyTransferListComponent
     */
    @Output() readonly handleSelect: EventEmitter<ThyTransferItem> = new EventEmitter();

    /**
     * @private
     *
     * @type {EventEmitter<ThyTransferItem>}
     * @memberof ThyTransferListComponent
     */
    @Output() search: EventEmitter<string> = new EventEmitter();

    /** @private */
    @Output() draggableUpdate: EventEmitter<InnerTransferDragEvent> = new EventEmitter<InnerTransferDragEvent>();

    public searchText = '';

    constructor(@Inject(DOCUMENT) private document: any) {}

    ngOnInit() {}

    public onSearch(keyword: string) {
        if (this.search) {
            this.search.emit(keyword);
        }
    }

    public toggleSelect(item: ThyTransferItem, index: number) {
        if (this.direction === 'left') {
            item = { ...item, index };
            this.handleSelect.emit(item);
        }
    }

    public remove(item: ThyTransferItem, index: number) {
        item = { ...item, index };
        this.handleSelect.emit(item);
    }

    public drop(event: CdkDragDrop<ThyTransferItem[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
        const dragEvent: ThyTransferDragEvent = {
            model: event.item.data,
            models: event.container.data,
            oldIndex: event.previousIndex,
            newIndex: event.currentIndex
        };
        this.draggableUpdate.emit({
            dragEvent: dragEvent
        });
    }

    public onDragStarted() {
        const preview = this.document.getElementsByClassName('cdk-drag-preview')[0];
        if (preview) {
            preview.classList.add('thy-transfer-list-drag-preview');
        }
    }
}
