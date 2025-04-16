import { Component, ContentChild, EventEmitter, HostBinding, Input, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';

import {
    Direction,
    InnerTransferDragEvent,
    ThyTransferChangeEvent,
    ThyTransferDragEvent,
    ThyTransferItem,
    ThyTransferSelectEvent,
    TransferDirection
} from './transfer.interface';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ThyTransferList } from './transfer-list.component';

/**
 * 穿梭框组件
 * @name thy-transfer
 * @order 10
 */
@Component({
    selector: 'thy-transfer',
    templateUrl: './transfer.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [ThyTransferList, ThyIcon, NgClass, NgTemplateOutlet, ThyFlexibleText]
})
export class ThyTransfer implements OnInit {
    @HostBinding('class') hostClass = 'thy-transfer';

    public leftDataSource: ThyTransferItem[] = [];

    public rightDataSource: ThyTransferItem[] = [];

    public allDataSource: ThyTransferItem[] = [];

    public leftTitle: string;

    public rightTitle: string;

    public rightDraggable = false;

    private _autoMove = true;

    /**
     * 数据源
     * @type ThyTransferItem[]
     */
    @Input()
    set thyData(value: ThyTransferItem[]) {
        if (value) {
            this.initializeTransferData(value);
        }
    }

    @Input() thyrenderLeftTemplateRef: TemplateRef<any>;

    @Input() thyrenderRightTemplateRef: TemplateRef<any>;

    /**
     * title集合，title[0]为左标题，title[1]为右标题
     * @type string[]
     */
    @Input()
    set thyTitles(value: string[]) {
        this.leftTitle = value[0] || '';
        this.rightTitle = value[1] || '';
    }

    /**
     * 右侧列表是否可以锁定
     * @default false
     */
    @Input() thyRightCanLock: boolean;

    /**
     * 右侧锁定最大数量
     */
    @Input() thyRightLockMax: number;

    /**
     * 右侧选择最大数量
     */
    @Input() thyRightMax: number;

    /**
     * 设置是否自动移动
     * @description.en-us Currently not implemented, in order to support the selections move
     * @default true
     */
    @Input()
    set thyAutoMove(value: boolean) {
        this._autoMove = value;
    }

    /**
     * 左侧列表是否拖动
     * @default false
     */
    @Input() thyLeftDraggable: boolean;

    /**
     * 右侧列表是否拖动
     * @default false
     */
    @Input() thyRightDraggable: boolean;

    /**
     * @type EventEmitter<ThyTransferDragEvent>
     */
    @Output() thyDraggableUpdate: EventEmitter<ThyTransferDragEvent> = new EventEmitter<ThyTransferDragEvent>();

    /**
     * Transfer变化的回调事件
     * @type EventEmitter<ThyTransferChangeEvent>
     */
    @Output() thyChange: EventEmitter<ThyTransferChangeEvent> = new EventEmitter<ThyTransferChangeEvent>();

    /**
     * 设置自定义Item渲染数据模板
     * @type TemplateRef
     */
    @ContentChild('renderTemplate') templateRef: TemplateRef<any>;

    /**
     * 设置自定义左侧内容模板
     * @type TemplateRef
     */
    @ContentChild('renderLeftTemplate') leftContentRef: TemplateRef<any>;

    /**
     * 设置自定义右侧内容模板
     * @type TemplateRef
     */
    @ContentChild('renderRightTemplate') rightContentRef: TemplateRef<any>;

    ngOnInit() {}

    initializeTransferData(data: ThyTransferItem[] = []) {
        this.allDataSource = [];
        this.leftDataSource = [];
        this.rightDataSource = [];
        data.forEach(item => {
            this.allDataSource.push(item);
            if (item.direction === TransferDirection.left) {
                this.leftDataSource.push(item);
            }
            if (item.direction === TransferDirection.right) {
                this.rightDataSource.push(item);
            }
        });
    }

    onSelect(from: Direction, event: ThyTransferSelectEvent) {
        if (event.item.isFixed) {
            return;
        }
        if (this.thyRightMax <= this.rightDataSource.length && from === TransferDirection.left) {
            return;
        }
        const to = from === TransferDirection.left ? TransferDirection.right : TransferDirection.left;
        event.item.checked = !event.item.checked;
        if (this._autoMove) {
            this.onMove(to);
        }
    }

    selectItem(event: ThyTransferSelectEvent) {
        this.onSelect(TransferDirection.left, event);
    }

    unselectItem(event: ThyTransferSelectEvent) {
        this.onSelect(TransferDirection.right, event);
    }

    private groupListByIsLock(list: ThyTransferItem[] = []) {
        const lock: ThyTransferItem[] = [],
            unlock: ThyTransferItem[] = [];
        list.forEach(item => {
            if (item.isLock) {
                lock.push(item);
            } else {
                unlock.push(item);
            }
        });
        return { lock: lock, unlock: unlock };
    }

    onMove(to: Direction) {
        const fromDataSource = to === TransferDirection.right ? this.leftDataSource : this.rightDataSource;
        const toDataSource = to === TransferDirection.right ? this.rightDataSource : this.leftDataSource;
        const selections = fromDataSource.filter(item => item.checked);
        const changeEvent: ThyTransferChangeEvent = {
            from: to === TransferDirection.right ? TransferDirection.left : TransferDirection.right,
            to: to,
            items: [...selections]
        };
        selections.forEach(item => {
            const index = fromDataSource.indexOf(item);
            const removed = fromDataSource.splice(index, 1)[0];
            removed.checked = !removed.checked;
            removed.direction = to;
            toDataSource.push(removed);
        });
        this.thyChange.emit({
            ...changeEvent,
            left: this.groupListByIsLock(this.leftDataSource),
            right: this.groupListByIsLock(this.rightDataSource)
        });
    }

    onDragUpdate(direction: Direction, event: InnerTransferDragEvent) {
        const otherDirectionData = direction === TransferDirection.left ? this.rightDataSource : this.leftDataSource;
        const otherListData = this.groupListByIsLock(otherDirectionData);
        this.thyDraggableUpdate.emit({
            ...event.dragEvent,
            left: direction === TransferDirection.left ? event.listData : otherListData,
            right: direction === TransferDirection.right ? event.listData : otherListData
        });

        this.rightDataSource =
            direction === TransferDirection.right
                ? [...event.listData.lock, ...event.listData.unlock]
                : [...otherListData.lock, ...otherListData.unlock];
    }
}
