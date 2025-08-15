import {
    Component,
    OnInit,
    TemplateRef,
    ViewEncapsulation,
    computed,
    input,
    output,
    contentChild,
    numberAttribute,
    effect
} from '@angular/core';

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
import { coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';

/**
 * 穿梭框组件
 * @name thy-transfer
 * @order 10
 */
@Component({
    selector: 'thy-transfer',
    templateUrl: './transfer.component.html',
    host: {
        class: 'thy-transfer'
    },
    encapsulation: ViewEncapsulation.None,
    imports: [ThyTransferList, ThyIcon, NgClass, NgTemplateOutlet, ThyFlexibleText]
})
export class ThyTransfer implements OnInit {
    public leftDataSource: ThyTransferItem[] = [];

    public rightDataSource: ThyTransferItem[] = [];
    /**
     * 数据源
     * @type ThyTransferItem[]
     */
    readonly thyData = input<ThyTransferItem[]>([]);

    readonly thyRenderLeftTemplateRef = input<TemplateRef<any>>();

    readonly thyRenderRightTemplateRef = input<TemplateRef<any>>();

    /**
     * title集合，title[0]为左标题，title[1]为右标题
     * @type string[]
     */
    readonly thyTitles = input<string[]>([]);

    /**
     * 右侧列表是否可以锁定
     * @default false
     */
    readonly thyRightCanLock = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * 右侧锁定最大数量
     */
    readonly thyRightLockMax = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 右侧选择最大数量
     */
    readonly thyRightMax = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 设置是否自动移动
     * @description.en-us Currently not implemented, in order to support the selections move
     * @default true
     */
    readonly thyAutoMove = input<boolean, ThyBooleanInput>(true, { transform: coerceBooleanProperty });

    /**
     * 左侧列表是否拖动
     * @default false
     */
    readonly thyLeftDraggable = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * 右侧列表是否拖动
     * @default false
     */
    readonly thyRightDraggable = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * @type EventEmitter<ThyTransferDragEvent>
     */
    readonly thyDraggableUpdate = output<ThyTransferDragEvent>();

    /**
     * Transfer变化的回调事件
     * @type EventEmitter<ThyTransferChangeEvent>
     */
    readonly thyChange = output<ThyTransferChangeEvent>();

    /**
     * 设置自定义Item渲染数据模板
     * @type TemplateRef
     */
    readonly templateRef = contentChild<TemplateRef<any>>('renderTemplate');

    /**
     * 设置自定义左侧内容模板
     * @type TemplateRef
     */
    readonly leftContentRef = contentChild<TemplateRef<any>>('renderLeftTemplate');

    /**
     * 设置自定义右侧内容模板
     * @type TemplateRef
     */
    readonly rightContentRef = contentChild<TemplateRef<any>>('renderRightTemplate');

    readonly leftTitle = computed(() => this.thyTitles()[0] || '');

    readonly rightTitle = computed(() => this.thyTitles()[1] || '');

    constructor() {
        effect(() => {
            this.initializeTransferData();
        });
    }

    ngOnInit() {}

    initializeTransferData(data: ThyTransferItem[] = []) {
        this.leftDataSource = [];
        this.rightDataSource = [];
        this.thyData().forEach(item => {
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
        if (this.thyRightMax() <= this.rightDataSource.length && from === TransferDirection.left) {
            return;
        }
        const to = from === TransferDirection.left ? TransferDirection.right : TransferDirection.left;
        event.item.checked = !event.item.checked;
        if (this.thyAutoMove()) {
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
