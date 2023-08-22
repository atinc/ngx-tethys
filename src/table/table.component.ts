import {
    Constructor,
    InputBoolean,
    InputCssPixel,
    InputNumber,
    MixinBase,
    mixinUnsubscribe,
    ThyUnsubscribe,
    UpdateHostClassService
} from 'ngx-tethys/core';
import { Dictionary, SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty, get, helpers, isString, keyBy, set } from 'ngx-tethys/util';
import { EMPTY, fromEvent, merge, Observable, of } from 'rxjs';
import { delay, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { DOCUMENT, isPlatformServer, NgClass, NgFor, NgIf, NgTemplateOutlet, NgStyle } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    IterableChangeRecord,
    IterableChanges,
    IterableDiffer,
    IterableDiffers,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';

import { IThyTableColumnParentComponent, THY_TABLE_COLUMN_PARENT_COMPONENT, ThyTableColumnComponent } from './table-column.component';
import {
    PageChangedEvent,
    ThyMultiSelectEvent,
    ThyPage,
    ThyRadioSelectEvent,
    ThySwitchEvent,
    ThyTableColumnSkeletonConfig,
    ThyTableDraggableEvent,
    ThyTableEmptyOptions,
    ThyTableEvent,
    ThyTableRowEvent,
    ThyTableSortDirection,
    ThyTableSortEvent
} from './table.interface';
import { TableRowDragDisabledPipe } from './pipes/drag.pipe';
import { TableIsValidModelValuePipe } from './pipes/table.pipe';
import { ThyPaginationComponent } from 'ngx-tethys/pagination';
import { ThyTableSkeletonComponent } from './table-skeleton.component';
import { ThyEmptyComponent } from 'ngx-tethys/empty';
import { ThySwitchComponent } from 'ngx-tethys/switch';
import { FormsModule } from '@angular/forms';
import { ThyDragDropDirective, ThyContextMenuDirective } from 'ngx-tethys/shared';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { CdkScrollable } from '@angular/cdk/scrolling';

export type ThyTableTheme = 'default' | 'bordered' | 'boxed';

export type ThyTableMode = 'list' | 'group' | 'tree';

export type ThyTableSize = 'md' | 'sm' | 'xs' | 'lg' | 'xlg' | 'default';

export enum ThyFixedDirection {
    left = 'left',
    right = 'right'
}

interface ThyTableGroup<T = unknown> {
    id?: string;
    expand?: boolean;
    children?: object[];
    origin?: T;
}

const tableThemeMap = {
    default: 'table-default',
    bordered: 'table-bordered',
    boxed: 'table-boxed'
};

const customType = {
    index: 'index',
    checkbox: 'checkbox',
    radio: 'radio',
    switch: 'switch'
};

const css = {
    tableBody: 'thy-table-body',
    tableScrollLeft: 'thy-table-scroll-left',
    tableScrollRight: 'thy-table-scroll-right',
    tableScrollMiddle: 'thy-table-scroll-middle'
};

const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

/**
 * 表格组件
 * @name thy-table
 * @order 10
 */
@Component({
    selector: 'thy-table',
    templateUrl: './table.component.html',
    providers: [
        {
            provide: THY_TABLE_COLUMN_PARENT_COMPONENT,
            useExisting: ThyTableComponent
        },
        UpdateHostClassService
    ],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'thy-table',
        '[class.thy-table-bordered]': `theme === 'bordered'`,
        '[class.thy-table-boxed]': `theme === 'boxed'`,
        '[class.thy-table-fixed-header]': 'thyHeaderFixed'
    },
    standalone: true,
    imports: [
        CdkScrollable,
        NgClass,
        NgFor,
        NgIf,
        NgTemplateOutlet,
        ThyIconComponent,
        ThyDragDropDirective,
        CdkDropList,
        CdkDrag,
        ThyContextMenuDirective,
        NgStyle,
        FormsModule,
        ThySwitchComponent,
        ThyEmptyComponent,
        ThyTableSkeletonComponent,
        ThyPaginationComponent,
        TableIsValidModelValuePipe,
        TableRowDragDisabledPipe
    ]
})
export class ThyTableComponent extends _MixinBase implements OnInit, OnChanges, AfterViewInit, OnDestroy, IThyTableColumnParentComponent {
    public customType = customType;

    public model: object[] = [];

    public groups: ThyTableGroup[] = [];

    public rowKey = '_id';

    public groupBy: string;

    public mode: ThyTableMode = 'list';

    public theme: ThyTableTheme = 'default';

    public className = '';

    public size: ThyTableSize = 'md';

    public rowClassName: string | Function;

    public loadingDone = true;

    public loadingText: string;

    public emptyOptions: ThyTableEmptyOptions = {};

    public draggable = false;

    public selectedRadioRow: SafeAny = null;

    public pagination: ThyPage = { index: 1, size: 20, total: 0, sizeOptions: [20, 50, 100] };

    public trackByFn: SafeAny;

    public wholeRowSelect = false;

    public fixedDirection = ThyFixedDirection;

    public hasFixed = false;

    public columns: ThyTableColumnComponent[] = [];

    private _diff: IterableDiffer<SafeAny>;

    private initialized = false;

    private _oldThyClassName = '';

    private scrollClassName = css.tableScrollLeft;

    private get tableScrollElement(): HTMLElement {
        return this.elementRef.nativeElement.getElementsByClassName(css.tableBody)[0] as HTMLElement;
    }

    private get scroll$() {
        return merge(this.tableScrollElement ? fromEvent<MouseEvent>(this.tableScrollElement, 'scroll') : EMPTY);
    }

    /**
     * 设置数据为空时展示的模板
     * @type TemplateRef
     */
    @ContentChild('empty') emptyTemplate: TemplateRef<SafeAny>;

    @ViewChild('table', { static: true }) tableElementRef: ElementRef<SafeAny>;

    @ViewChildren('rows', { read: ElementRef }) rows: QueryList<ElementRef<HTMLElement>>;

    /**
     * 表格展示方式，列表/分组/树
     * @type list | group | tree
     * @default list
     */
    @Input()
    set thyMode(value: ThyTableMode) {
        this.mode = value || this.mode;
    }

    /**
     * thyMode的值为 `group` 时分组的 Key
     */
    @Input()
    set thyGroupBy(value: string) {
        this.groupBy = value;
    }

    /**
     * 设置每行数据的唯一标识属性名
     * @default _id
     */
    @Input()
    set thyRowKey(value: SafeAny) {
        this.rowKey = value || this.rowKey;
    }

    /**
     * 分组数据源
     */
    @Input()
    set thyGroups(value: SafeAny) {
        if (this.mode === 'group') {
            this.buildGroups(value);
        }
    }

    /**
     * 数据源
     */
    @Input()
    set thyModel(value: SafeAny) {
        this.model = value || [];
        this._diff = this._differs.find(this.model).create();
        this._initializeDataModel();

        if (this.mode === 'group') {
            this.buildModel();
        }
    }

    /**
     * 表格的显示风格，`bordered` 时头部有背景色且分割线区别明显
     * @type default | bordered | boxed
     * @default default
     */
    @Input()
    set thyTheme(value: ThyTableTheme) {
        this.theme = value || this.theme;
        this._setClass();
    }

    /**
     * 表格的大小
     * @type md | sm | xs | lg | xlg | default
     * @default md
     */
    @Input()
    set thySize(value: ThyTableSize) {
        this.size = value || this.size;
        this._setClass();
    }

    /**
     * 设置表格最小宽度，一般是适用于设置列宽为百分之或auto时限制表格最小宽度'
     */
    @Input()
    @InputCssPixel()
    thyMinWidth: string | number;

    /**
     * 设置为 fixed 布局表格，设置 fixed 后，列宽将严格按照设置宽度展示，列宽将不会根据表格内容自动调整
     * @default false
     */
    @Input() @InputBoolean() thyLayoutFixed: boolean;

    /**
     * 是否表头固定，若设置为 true， 需要同步设置 thyHeight
     * @default false
     */
    @Input() @InputBoolean() thyHeaderFixed: boolean;

    /**
     * 表格的高度
     */
    @HostBinding('style.height')
    @Input()
    @InputCssPixel()
    thyHeight: string;

    /**
     * 设置表格的样式
     */
    @Input()
    set thyClassName(value: string) {
        const list = this.className.split(' ').filter(a => a.trim());
        const index: number = list.findIndex(item => item === this._oldThyClassName);
        if (index !== -1) {
            list.splice(index, 1, value);
        } else {
            list.push(value);
        }
        this._oldThyClassName = value;
        this.className = list.join(' ');
    }

    /**
     * 设置表格行的样式，传入函数，支持 row、index
     * @type string | (row, index) => string
     */
    @Input()
    set thyRowClassName(value: string | Function) {
        this.rowClassName = value;
    }

    /**
     * 设置加载状态
     * @default true
     */
    @Input()
    @InputBoolean()
    set thyLoadingDone(value: boolean) {
        this.loadingDone = value;
    }

    /**
     * 设置加载时显示的文本
     */
    @Input()
    set thyLoadingText(value: string) {
        this.loadingText = value;
    }

    /**
     * 配置空状态组件
     */
    @Input()
    set thyEmptyOptions(value: ThyTableEmptyOptions) {
        this.emptyOptions = value;
    }

    /**
     * 是否开启行拖拽
     * @default false
     */
    @Input()
    @InputBoolean()
    set thyDraggable(value: boolean) {
        this.draggable = coerceBooleanProperty(value);
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && this.draggable && this.mode === 'tree') {
            throw new Error('Tree mode sorting is not supported');
        }
    }

    /**
     * 设置当前页码
     * @default 1
     */
    @Input()
    @InputNumber()
    set thyPageIndex(value: number) {
        this.pagination.index = value;
    }

    /**
     * 设置每页显示数量
     * @default 20
     */
    @Input()
    @InputNumber()
    set thyPageSize(value: number) {
        this.pagination.size = value;
    }

    /**
     * 设置总页数
     */
    @Input()
    @InputNumber()
    set thyPageTotal(value: number) {
        this.pagination.total = value;
    }

    /**
     * 选中当前行是否自动选中 Checkbox，不开启时只有点击 Checkbox 列时才会触发选中
     * @default false
     */
    @Input()
    @InputBoolean()
    set thyWholeRowSelect(value: boolean) {
        if (value) {
            this.className += ' table-hover';
        }
        this.wholeRowSelect = value;
    }

    /**
     * 是否显示表格头
     */
    @Input() @InputBoolean() thyShowHeader = true;

    /**
     * 是否显示左侧 Total
     */
    @Input('thyShowTotal') @InputBoolean() showTotal = false;

    /**
     * 是否显示调整每页显示条数下拉框
     */
    @Input('thyShowSizeChanger') @InputBoolean() showSizeChanger = false;

    /**
     * 每页显示条数下拉框可选项
     * @type number[]
     */
    @Input('thyPageSizeOptions')
    set pageSizeOptions(value: number[]) {
        this.pagination.sizeOptions = value;
    }

    /**
     * thyMode 为 tree 时，设置 Tree 树状数据展示时的缩进
     */
    @Input() @InputNumber() thyIndent = 20;

    /**
     * thyMode 为 tree 时，设置 Tree 树状数据对象中的子节点 Key
     * @type string
     */
    @Input() thyChildrenKey = 'children';

    /**
     * 开启 Hover 后显示操作，默认不显示操作区内容，鼠标 Hover 时展示
     * @default false
     */
    @HostBinding('class.thy-table-hover-display-operation')
    @Input()
    @InputBoolean()
    thyHoverDisplayOperation: boolean;

    @Input() thyDragDisabledPredicate: (item: SafeAny) => boolean = () => false;

    /**
     * 表格列骨架的配置项：列宽、骨架类型
     * @type {Array<ThyTableColumnSkeletonConfig>}
     */
    @Input() thySkeletonColumnConfigs: ThyTableColumnSkeletonConfig[];

    /**
     * 切换组件回调事件
     */
    @Output() thyOnSwitchChange: EventEmitter<ThySwitchEvent> = new EventEmitter<ThySwitchEvent>();

    /**
     * 表格分页回调事件
     */
    @Output() thyOnPageChange: EventEmitter<PageChangedEvent> = new EventEmitter<PageChangedEvent>();

    /**
     * 表格分页当前页改变回调事件
     */
    @Output() thyOnPageIndexChange: EventEmitter<number> = new EventEmitter<number>();

    @Output() thyOnPageSizeChange: EventEmitter<number> = new EventEmitter<number>();

    /**
     * 多选回调事件
     */
    @Output() thyOnMultiSelectChange: EventEmitter<ThyMultiSelectEvent> = new EventEmitter<ThyMultiSelectEvent>();

    /**
     * 单选回调事件
     */
    @Output() thyOnRadioSelectChange: EventEmitter<ThyRadioSelectEvent> = new EventEmitter<ThyRadioSelectEvent>();

    /**
     * 拖动修改事件
     */
    @Output() thyOnDraggableChange: EventEmitter<ThyTableDraggableEvent> = new EventEmitter<ThyTableDraggableEvent>();

    /**
     * 表格行点击触发事件
     */
    @Output() thyOnRowClick: EventEmitter<ThyTableRowEvent> = new EventEmitter<ThyTableRowEvent>();

    /**
     * 列排序修改事件
     */
    @Output() thySortChange: EventEmitter<ThyTableSortEvent> = new EventEmitter<ThyTableSortEvent>();

    @Output() thyOnRowContextMenu: EventEmitter<ThyTableEvent> = new EventEmitter<ThyTableEvent>();

    @ContentChild('group', { static: true }) groupTemplate: TemplateRef<SafeAny>;

    @ContentChildren(ThyTableColumnComponent)
    set listOfColumnComponents(components: QueryList<ThyTableColumnComponent>) {
        if (components) {
            this.columns = components.toArray();
            this.hasFixed = !!this.columns.find(item => {
                return item.fixed === this.fixedDirection.left || item.fixed === this.fixedDirection.right;
            });
            this._initializeColumns();
            this._initializeDataModel();
        }
    }

    // 数据的折叠展开状态
    public expandStatusMap: Dictionary<boolean> = {};

    public expandStatusMapOfGroup: Dictionary<boolean> = {};

    private expandStatusMapOfGroupBeforeDrag: Dictionary<boolean> = {};

    dragPreviewClass = 'thy-table-drag-preview';

    constructor(
        public elementRef: ElementRef,
        private _differs: IterableDiffers,
        private viewportRuler: ViewportRuler,
        private updateHostClassService: UpdateHostClassService,
        @Inject(DOCUMENT) private document: SafeAny,
        @Inject(PLATFORM_ID) private platformId: string,
        private ngZone: NgZone,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef
    ) {
        super();
        this._bindTrackFn();
    }

    private _initializeColumns() {
        if (!this.columns.some(item => item.expand === true) && this.columns.length > 0) {
            this.columns[0].expand = true;
        }
        this._initializeColumnFixedPositions();
    }

    private _initializeColumnFixedPositions() {
        const leftFixedColumns = this.columns.filter(item => item.fixed === ThyFixedDirection.left);
        leftFixedColumns.forEach((item, index) => {
            const previous = leftFixedColumns[index - 1];
            item.left = previous ? previous.left + parseInt(previous.width.toString(), 10) : 0;
        });
        const rightFixedColumns = this.columns.filter(item => item.fixed === ThyFixedDirection.right).reverse();
        rightFixedColumns.forEach((item, index) => {
            const previous = rightFixedColumns[index - 1];
            item.right = previous ? previous.right + parseInt(previous.width.toString(), 10) : 0;
        });
    }

    private _initializeDataModel() {
        this.model.forEach(row => {
            this.columns.forEach(column => {
                this._initialSelections(row, column);
                this._initialCustomModelValue(row, column);
            });
        });
    }

    private _initialSelections(row: object, column: ThyTableColumnComponent) {
        if (column.selections) {
            if (column.type === 'checkbox') {
                row[column.key] = column.selections.includes(row[this.rowKey]);
                this.onModelChange(row, column);
            }
            if (column.type === 'radio') {
                if (column.selections.includes(row[this.rowKey])) {
                    this.selectedRadioRow = row;
                }
            }
        }
    }

    private _initialCustomModelValue(row: object, column: ThyTableColumnComponent) {
        if (column.type === customType.switch) {
            row[column.key] = get(row, column.model);
        }
    }

    private _refreshCustomModelValue(row: SafeAny) {
        this.columns.forEach(column => {
            this._initialCustomModelValue(row, column);
        });
    }

    private _applyDiffChanges(changes: IterableChanges<SafeAny>) {
        if (changes) {
            changes.forEachAddedItem((record: IterableChangeRecord<SafeAny>) => {
                this._refreshCustomModelValue(record.item);
            });
        }
    }

    private _bindTrackFn() {
        this.trackByFn = function (this: SafeAny, index: number, row: SafeAny): SafeAny {
            return row && this.rowKey ? row[this.rowKey] : index;
        }.bind(this);
    }

    private _destroyInvalidAttribute() {
        this.model.forEach(row => {
            for (const key in row) {
                if (key.includes('[$$column]')) {
                    delete row[key];
                }
            }
        });
    }

    private _setClass(first = false) {
        if (!first && !this.initialized) {
            return;
        }
        const classNames: string[] = [];
        if (this.size) {
            classNames.push(`table-${this.size}`);
        }
        if (tableThemeMap[this.theme]) {
            classNames.push(tableThemeMap[this.theme]);
        }

        this.updateHostClassService.updateClass(classNames);
    }

    public updateColumnSelections(key: string, selections: SafeAny): void {
        const column = this.columns.find(item => item.key === key);
        this.model.forEach(row => {
            this._initialSelections(row, column);
        });
    }

    public isTemplateRef(ref: SafeAny) {
        return ref instanceof TemplateRef;
    }

    public getModelValue(row: SafeAny, path: string) {
        return get(row, path);
    }

    public renderRowClassName(row: SafeAny, index: number) {
        if (!this.rowClassName) {
            return null;
        }
        if (isString(this.rowClassName)) {
            return this.rowClassName;
        } else {
            return (this.rowClassName as Function)(row, index);
        }
    }

    public onModelChange(row: SafeAny, column: ThyTableColumnComponent) {
        if (column.model) {
            set(row, column.model, row[column.key]);
        }
    }

    public onStopPropagation(event: Event) {
        if (this.wholeRowSelect) {
            event.stopPropagation();
        }
    }

    public onPageChange(event: PageChangedEvent) {
        this.thyOnPageChange.emit(event);
    }

    public onPageIndexChange(event: number) {
        this.thyOnPageIndexChange.emit(event);
    }

    public onPageSizeChange(event: number) {
        this.thyOnPageSizeChange.emit(event);
    }

    public onCheckboxChange(row: SafeAny, column: ThyTableColumnComponent) {
        this.onModelChange(row, column);
        this.onMultiSelectChange(null, row, column);
    }

    public onMultiSelectChange(event: Event, row: SafeAny, column: ThyTableColumnComponent) {
        const rows = this.model.filter(item => {
            return item[column.key];
        });
        const multiSelectEvent: ThyMultiSelectEvent = {
            event: event,
            row: row,
            rows: rows
        };
        this.thyOnMultiSelectChange.emit(multiSelectEvent);
    }

    public onRadioSelectChange(event: Event, row: SafeAny) {
        const radioSelectEvent: ThyRadioSelectEvent = {
            event: event,
            row: row
        };
        this.thyOnRadioSelectChange.emit(radioSelectEvent);
    }

    public onSwitchChange(event: Event, row: SafeAny, column: SafeAny) {
        const switchEvent: ThySwitchEvent = {
            event: event,
            row: row,
            refresh: (value: SafeAny) => {
                value = value || row;
                setTimeout(() => {
                    value[column.key] = get(value, column.model);
                });
            }
        };
        this.thyOnSwitchChange.emit(switchEvent);
    }

    showExpand(row: SafeAny) {
        return row[this.thyChildrenKey] && row[this.thyChildrenKey].length > 0;
    }

    isExpanded(row: SafeAny) {
        return this.expandStatusMap[row[this.rowKey]];
    }

    iconIndentComputed(level: number) {
        if (this.mode === 'tree') {
            return level * this.thyIndent - 5;
        }
    }

    tdIndentComputed(level: number) {
        return {
            position: 'relative',
            paddingLeft: `${(level + 1) * this.thyIndent - 5}px`
        };
    }

    expandChildren(row: SafeAny) {
        if (this.isExpanded(row)) {
            this.expandStatusMap[row[this.rowKey]] = false;
        } else {
            this.expandStatusMap[row[this.rowKey]] = true;
        }
    }

    onDragGroupStarted(event: CdkDragStart<unknown>) {
        this.expandStatusMapOfGroupBeforeDrag = { ...this.expandStatusMapOfGroup };
        const groups = this.groups.filter(group => group.expand);
        this.foldGroups(groups);
        this.onDragStarted(event);
        this.cdr.detectChanges();
    }

    onDragGroupEnd(event: CdkDragEnd<unknown>) {
        const groups = this.groups.filter(group => this.expandStatusMapOfGroupBeforeDrag[group.id]);
        this.expandGroups(groups);
        this.cdr.detectChanges();
    }

    private onDragGroupDropped(event: CdkDragDrop<unknown>) {
        const group = this.groups.find(group => {
            return event.item.data.id === group.id;
        });
        if (group) {
            // drag group
            const dragEvent: ThyTableDraggableEvent = {
                model: event.item,
                models: this.groups,
                oldIndex: event.previousIndex,
                newIndex: event.currentIndex
            };
            moveItemInArray(this.groups, event.previousIndex, event.currentIndex);
            this.thyOnDraggableChange.emit(dragEvent);
        } else {
            // drag group children
            const group = this.groups.find(group => {
                return event.item.data[this.groupBy] === group.id;
            });
            const groupIndex =
                event.container.getSortedItems().findIndex(item => {
                    return item.data.id === event.item.data[this.groupBy];
                }) + 1;
            const dragEvent: ThyTableDraggableEvent = {
                model: event.item,
                models: group.children,
                oldIndex: event.previousIndex - groupIndex,
                newIndex: event.currentIndex - groupIndex
            };
            moveItemInArray(group.children, dragEvent.oldIndex, dragEvent.newIndex);
            this.thyOnDraggableChange.emit(dragEvent);
        }
    }

    onDragStarted(event: CdkDragStart<unknown>) {
        this.ngZone.runOutsideAngular(() =>
            setTimeout(() => {
                const preview = this.document.getElementsByClassName(this.dragPreviewClass)[0];
                const originalTds: HTMLCollection = event.source._dragRef.getPlaceholderElement()?.children;
                if (preview) {
                    Array.from(preview?.children).forEach((element: HTMLElement, index: number) => {
                        element.style.width = `${originalTds[index]?.clientWidth}px`;
                    });
                }
            })
        );
    }

    dropListEnterPredicate = (index: number, drag: CdkDrag, drop: CdkDropList) => {
        return drop.getSortedItems()[index].data.group_id === drag.data.group_id;
    };

    private onDragModelDropped(event: CdkDragDrop<unknown>) {
        const dragEvent: ThyTableDraggableEvent = {
            model: event.item,
            models: this.model,
            oldIndex: event.previousIndex,
            newIndex: event.currentIndex
        };
        moveItemInArray(this.model, event.previousIndex, event.currentIndex);
        this.thyOnDraggableChange.emit(dragEvent);
    }

    onDragDropped(event: CdkDragDrop<unknown>) {
        if (this.mode === 'group') {
            this.onDragGroupDropped(event);
        } else if (this.mode === 'list') {
            this.onDragModelDropped(event);
        }
    }

    onColumnHeaderClick(event: Event, column: ThyTableColumnComponent) {
        if (column.sortable) {
            const { sortDirection, model, sortChange } = column;
            let direction;
            if (sortDirection === ThyTableSortDirection.default) {
                direction = ThyTableSortDirection.asc;
            } else if (sortDirection === ThyTableSortDirection.asc) {
                direction = ThyTableSortDirection.desc;
            } else {
                direction = ThyTableSortDirection.default;
            }
            column.sortDirection = direction;
            const sortEvent = { event, key: model, direction };
            sortChange.emit(sortEvent);
            this.thySortChange.emit(sortEvent);
        }
    }

    public onRowClick(event: Event, row: SafeAny) {
        const next = this.onRowClickPropagationEventHandler(event, row);
        if (next) {
            if (this.wholeRowSelect) {
                const column = this.columns.find(item => {
                    return item.type === customType.checkbox || item.type === customType.radio;
                });
                if (column && !column.disabled) {
                    if (column.type === customType.checkbox) {
                        row[column.key] = !row[column.key];
                        this.onModelChange(row, column);
                        this.onMultiSelectChange(event, row, column);
                    }
                    if (column.type === customType.radio) {
                        this.selectedRadioRow = row;
                        this.onRadioSelectChange(event, row);
                    }
                }
            }
            const rowEvent = {
                event: event,
                row: row
            };
            this.thyOnRowClick.emit(rowEvent);
        }
    }

    private onRowClickPropagationEventHandler(event: Event, row: SafeAny): boolean {
        if ((event.target as Element).closest('.tree-expand-icon')) {
            this.expandChildren(row);
            return false;
        }
        return true;
    }

    public onRowContextMenu(event: Event, row: SafeAny) {
        const contextMenuEvent: ThyTableEvent = {
            event: event,
            row: row
        };
        this.thyOnRowContextMenu.emit(contextMenuEvent);
    }

    private _refreshColumns() {
        const components = this.columns || [];
        const _columns = components.map(component => {
            return {
                width: component.width,
                className: component.className
            };
        });

        this.columns.forEach((n, i) => {
            Object.assign(n, _columns[i]);
        });
    }

    private buildGroups(originGroups: SafeAny) {
        const originGroupsMap = helpers.keyBy(originGroups, 'id');
        this.groups = [];
        originGroups.forEach((origin: SafeAny) => {
            const group: ThyTableGroup = { id: origin[this.rowKey], children: [], origin };

            if (this.expandStatusMapOfGroup.hasOwnProperty(group.id)) {
                group.expand = this.expandStatusMapOfGroup[group.id];
            } else {
                group.expand = !!(originGroupsMap[group.id] as SafeAny).expand;
            }

            this.groups.push(group);
        });
    }

    private buildModel() {
        const groupsMap = keyBy(this.groups, 'id');
        this.model.forEach(row => {
            const group = groupsMap[row[this.groupBy]];
            if (group) {
                group.children.push(row);
            }
        });
    }

    public expandGroup(group: ThyTableGroup) {
        group.expand = !group.expand;
        this.expandStatusMapOfGroup[group.id] = group.expand;
    }

    private expandGroups(groups: ThyTableGroup[]) {
        groups.forEach(group => {
            this.expandGroup(group);
        });
    }

    private foldGroups(groups: ThyTableGroup[]) {
        groups.forEach(group => {
            this.expandGroup(group);
        });
    }

    private updateScrollClass() {
        const scrollElement = this.tableScrollElement;
        const maxScrollLeft = scrollElement.scrollWidth - scrollElement.offsetWidth;
        const scrollX = scrollElement.scrollLeft;
        const lastScrollClassName = this.scrollClassName;
        this.scrollClassName = '';
        if (scrollElement.scrollWidth > scrollElement.clientWidth) {
            if (scrollX >= maxScrollLeft) {
                this.scrollClassName = css.tableScrollRight;
            } else if (scrollX === 0) {
                this.scrollClassName = css.tableScrollLeft;
            } else {
                this.scrollClassName = css.tableScrollMiddle;
            }
        }
        if (lastScrollClassName) {
            this.renderer.removeClass(this.tableScrollElement, lastScrollClassName);
        }
        if (this.scrollClassName) {
            this.renderer.addClass(this.tableScrollElement, this.scrollClassName);
        }
    }

    ngOnInit() {
        this.updateHostClassService.initializeElement(this.tableElementRef.nativeElement);
        this._setClass(true);
        this.initialized = true;

        merge(this.viewportRuler.change(200), of(null).pipe(delay(200)))
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(() => {
                this._refreshColumns();
                this.updateScrollClass();
                this.cdr.detectChanges();
            });

        this.ngZone.runOutsideAngular(() => {
            this.scroll$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
                this.updateScrollClass();
            });
        });
    }

    ngAfterViewInit(): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        this.rows.changes
            .pipe(
                startWith(this.rows),
                switchMap(
                    () =>
                        new Observable<Event>(subscriber =>
                            this.ngZone.runOutsideAngular(() =>
                                merge(
                                    ...this.rows.map(row =>
                                        fromEvent(
                                            row.nativeElement,
                                            // Note: there's no need to add touch, pointer and mouse event listeners together.
                                            // There can be any number of rows, which will lead to adding N * 3 event listeners.
                                            // According to the spec (https://www.w3.org/TR/pointerevents/#examples), we can use feature detection
                                            // to determine if pointer events are available. If pointer events are available, we have to listen only
                                            // to the `pointerdown` event. Otherwise, we have to determine if we're on a touch device or not.
                                            // Touch events are handled earlier than mouse events, tho not all user agents dispatch mouse events
                                            // after touch events. See the spec: https://www.w3.org/TR/touch-events/#mouse-events.
                                            window.PointerEvent
                                                ? 'pointerdown'
                                                : 'ontouchstart' in row.nativeElement
                                                ? 'touchstart'
                                                : 'mousedown',
                                            // Note: since Chrome 56 defaults document level `touchstart` listener to passive.
                                            // The element `touchstart` listener is not passive by default
                                            // We never call `preventDefault()` on it, so we're safe making it passive too.
                                            <AddEventListenerOptions>passiveEventListenerOptions
                                        )
                                    )
                                ).subscribe(subscriber)
                            )
                        )
                ),
                takeUntil(this.ngUnsubscribe$)
            )
            .subscribe(event => {
                if (!this.draggable) {
                    event.stopPropagation();
                }
            });
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        const modeChange = simpleChanges.thyMode;
        const thyGroupsChange = simpleChanges.thyGroups;
        const isGroupMode = modeChange && modeChange.currentValue === 'group';
        if (isGroupMode && thyGroupsChange && thyGroupsChange.firstChange) {
            this.buildGroups(thyGroupsChange.currentValue);
            this.buildModel();
        }

        if (this._diff) {
            const changes = this._diff.diff(this.model);
            this._applyDiffChanges(changes);
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._destroyInvalidAttribute();
    }
}
