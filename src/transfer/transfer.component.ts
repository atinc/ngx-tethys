import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Id, SafeAny } from 'ngx-tethys/types';
import { produce, warnDeprecation } from 'ngx-tethys/util';

import {
    Direction,
    InnerTransferDragEvent,
    ThyTransferChangeEvent,
    ThyTransferDragEvent,
    ThyTransferItem,
    TransferDirection
} from './transfer.interface';

@Component({
    selector: 'thy-transfer',
    templateUrl: './transfer.component.html',
    host: {
        class: 'thy-transfer'
    },
    encapsulation: ViewEncapsulation.None
})
export class ThyTransferComponent implements OnInit {
    /**
     * 数据源
     *
     * @memberof ThyTransferComponent
     */
    @Input()
    set thyData(value: ThyTransferItem[]) {
        if (value) {
            this.initializeTransferData(value);
        }
    }

    /** The left list item can be handled when the method return true. */
    /**
     * 左侧列表是否可选中
     *
     * @param item
     * @param leftDataSource
     * @param selectData: Id[]
     * @default true
     */
    @Input() canCheckLeftItemFn = (item?: ThyTransferItem, leftDataSource?: ThyTransferItem[], selectData?: Id[]): boolean => true;

    /** The right list item can be handled & show when the method return true. */
    /**
     * 右侧列表是否可移除
     *
     * @param item
     * @param rightDataSource
     * @param selectData: Id[]
     * @default true
     */
    @Input() canUncheckRightItemFn = (item?: ThyTransferItem, rightDataSource?: ThyTransferItem[], selectData?: Id[]): boolean => true;

    /**
     * 是否展示穿梭按钮
     *
     * @memberof ThyTransferComponent
     */
    @Input() thyShowOperationBtn = true;

    /** Custom render list array. The first be used to left list & the last be used to right*/
    /**
     * 自定义模板列表数组，首个模板应用于左侧，次模板应用于右侧
     * @type {(Array<TemplateRef<SafeAny> | null> | null)}
     * @memberof ThyTransferComponent
     */
    @Input() thyRenderList: Array<TemplateRef<SafeAny> | null> | null = null;

    /**
     * 自定义Transfer Item模板
     *
     * @type {TemplateRef<SafeAny>}
     * @memberof ThyTransferComponent
     */
    @Input() thyRenderItem: TemplateRef<SafeAny>;

    /** There must is the search callback when the list rendered by input thyRenderList */
    /**
     * 自定义搜索，当使用自定义模板时必填
     * @type {function}
     * @memberof ThyTransferComponent
     */
    @Input()
    set thyRenderSearch(fn: Function) {
        if (!this.thyRenderList?.length) {
            warnDeprecation(`The property thyRenderSearch is required If you want to enable thyRenderList`);
        }
        this.customSearch = fn;
    }

    /**
     * 左侧列表是否可以拖拽
     *
     * @type {boolean}
     * @memberof ThyTransferComponent
     * @default true
     */
    @Input() thyLeftDraggable: boolean = true;

    /**
     * 左侧列表是否可以拖拽
     *
     * @type {boolean}
     * @memberof ThyTransferComponent
     * @default true
     */
    @Input() thyRightDraggable: boolean = true;

    @Input() thyTitles: string[];

    /**
     * 穿梭时是否保留原数据
     *
     * @type {boolean}
     * @memberof ThyTransferComponent
     */
    @Input() thyKeepResource = true;

    @Input()
    set thyAutoMove(value: boolean) {
        this.autoMove = value;
    }

    /**
     * 右侧选择最大数量
     *
     * @type {number}
     * @memberof ThyTransferComponent
     */
    @Input() thyRightMax: number;

    /**
     * 自定义模板数据源数量
     *
     * @type {number[]}
     */
    @Input() thyRenderItemCount: number[] = [];

    public customSearch: Function;

    public virtualScroll = false;
    /**
     * 开启虚拟滚动
     * @type {boolean}
     * @memberof ThyTransferComponent
     * @default false
     */
    @Input()
    set thyVirtualScroll(value: boolean) {
        if (!this.thyKeepResource) {
            warnDeprecation(`The property thyKeepResource must be true If you want to enable virtualScroll`);
        }
        this.virtualScroll = value;
    }

    /** Event emitted when the data is transferred. */
    /**
     * Transfer变化的回调事件
     *
     * @type {EventEmitter<ThyTransferChangeEvent>}
     * @memberof ThyTransferComponent
     */
    @Output() thyChange: EventEmitter<ThyTransferChangeEvent> = new EventEmitter<ThyTransferChangeEvent>();

    /** Event emitted when the list is dragged. */
    /**
     * Transfer拖拽的回调事件
     *
     * @type {EventEmitter<ThyTransferChangeEvent>}
     * @memberof ThyTransferComponent
     */
    @Output() thyDraggableUpdate: EventEmitter<ThyTransferDragEvent> = new EventEmitter<ThyTransferDragEvent>();

    public leftDataSource: ThyTransferItem[] = [];

    public rightDataSource: ThyTransferItem[] = [];

    public allDataSource: ThyTransferItem[] = [];

    /** be used to data backup */
    public allDataSourceClone: ThyTransferItem[] = [];

    public rightDataSourceClone: ThyTransferItem[] = [];

    public leftDataSourceClone: ThyTransferItem[] = [];

    public selectionModel: SelectionModel<Id>;

    public autoMove = true;

    ngOnInit() {
        this.initializeSelectionModel();
        this.initializeModelValues();
    }

    private initializeSelectionModel() {
        const isMultiple = true;
        this.selectionModel = new SelectionModel(isMultiple);
    }
    private initializeModelValues() {
        if (this.selectionModel) {
            this.selectionModel.clear();
            this.selectionModel.select(...this.rightDataSource.map((item: ThyTransferItem) => item?._id));
        }
    }

    private initializeTransferData(data: ThyTransferItem[] = []) {
        this.allDataSource = [];
        this.leftDataSource = [];
        this.rightDataSource = [];
        data.forEach((item: ThyTransferItem) => {
            this.allDataSource.push(item);
            if (item.direction === TransferDirection.left) {
                this.leftDataSource.push(item);
            }
            if (item.direction === TransferDirection.right) {
                this.rightDataSource.push(item);
            }
        });
        this.allDataSourceClone = [...this.allDataSource];
        this.leftDataSourceClone = [...this.leftDataSource];
        this.rightDataSourceClone = [...this.rightDataSource];
    }

    private handleSelect(direction: Direction, item?: ThyTransferItem): void {
        if (direction === 'left') {
            if (item.disabled) return;
            if (!this.selectionModel.isSelected(item._id)) {
                // if (!this.canCheckLeftItemFn(item, this.rightDataSource) || this.selectionModel.selected.length >= this.thyRightMax)
                //     return;

                if (this.selectionModel.selected.length >= this.thyRightMax) return;
                this.selectionModel.select(item._id);
                if (!this.thyKeepResource) {
                    this.leftDataSource.splice(item.index, 1);
                }
                this.rightDataSource = produce(this.rightDataSource).add(item);
            } else {
                if (item.required) return;
                this.rightDataSource = produce(this.rightDataSource).remove(item._id);
                this.selectionModel.deselect(item._id);
            }
        } else {
            this.selectionModel.deselect(item._id);
            this.rightDataSource = produce(this.rightDataSource).remove(item._id);
            if (!this.thyKeepResource) {
                this.leftDataSource.push(item);
            }
        }
        const changeEvent: ThyTransferChangeEvent = {
            from: direction,
            to: direction === TransferDirection.right ? TransferDirection.left : TransferDirection.right,
            item
        };
        this.thyChange.emit({
            ...changeEvent,
            left: this.thyKeepResource ? this.allDataSource : this.leftDataSource,
            right: this.rightDataSource
        });
    }

    public handleLeftSelect = (item: ThyTransferItem): void => this.handleSelect('left', item);

    public handleRightSelect = (item: ThyTransferItem): void => this.handleSelect('right', item);

    public onDragUpdate(direction: Direction, event: InnerTransferDragEvent) {
        this.thyDraggableUpdate.emit({
            ...event.dragEvent,
            direction
        });
    }

    public search(direction: Direction, keyword: string) {
        if (this.customSearch) {
            this.customSearch(direction, keyword);
            return;
        }
        if (direction === 'left') {
            if (this.thyKeepResource) {
                this.allDataSource = this.allDataSourceClone.filter(k => k.title.includes(keyword));
            } else {
                this.leftDataSource = this.leftDataSourceClone.filter(k => k.title.includes(keyword));
            }
        } else {
            this.rightDataSource = this.rightDataSourceClone.filter(k => k.title.includes(keyword));
        }
    }
}
