import {
    Component,
    Input,
    Output,
    ViewEncapsulation,
    TemplateRef,
    OnInit,
    EventEmitter,
    DoCheck,
    IterableDiffers,
    IterableDiffer,
    IterableChanges,
    IterableChangeRecord,
    ContentChildren,
    QueryList,
    OnDestroy,
    HostBinding,
    ElementRef,
    ViewChild,
    Inject,
    ContentChild
} from '@angular/core';
import { Dictionary } from '../typings';
import { get, set, isString, coerceBooleanProperty, keyBy } from '../util/helpers';
import {
    ThyGridColumn,
    ThyMultiSelectEvent,
    ThyRadioSelectEvent,
    ThyPage,
    ThyGridEmptyOptions,
    ThySwitchEvent,
    ThyGridDraggableEvent,
    ThyGridRowEvent,
    ThyGridEvent
} from './grid.interface';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ThyGridColumnComponent, IThyGridColumnParentComponent, THY_GRID_COLUMN_PARENT_COMPONENT } from './grid-column.component';
import { ViewportRuler } from '@angular/cdk/overlay';
import { takeUntil, delay } from 'rxjs/operators';
import { mixinUnsubscribe, MixinBase } from '../core';
import { UpdateHostClassService } from '../shared';
import { of, merge } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';

export type ThyGridTheme = 'default' | 'bordered';

export type ThyGridMode = 'list' | 'group' | 'tree';

export type ThyGridSize = 'default' | 'sm';

interface ThyGridGroup<T = unknown> {
    id?: string;
    expand?: boolean;
    children?: object[];
    origin?: T;
}

const gridThemeMap = {
    default: 'table-default',
    bordered: 'table-bordered'
};

const gridSizeMap = {
    sm: 'table-sm'
};

const customType = {
    index: 'index',
    checkbox: 'checkbox',
    radio: 'radio',
    switch: 'switch'
};

@Component({
    selector: 'thy-grid',
    templateUrl: './grid.component.html',
    providers: [
        {
            provide: THY_GRID_COLUMN_PARENT_COMPONENT,
            useExisting: ThyGridComponent
        },
        UpdateHostClassService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ThyGridComponent extends mixinUnsubscribe(MixinBase) implements OnInit, OnDestroy, DoCheck, IThyGridColumnParentComponent {
    public customType = customType;

    public model: object[] = [];

    public groups: ThyGridGroup[] = [];

    public rowKey = '_id';

    public groupBy: string;

    public mode: ThyGridMode = 'list';

    public columns: ThyGridColumn[] = [];

    public theme: ThyGridTheme = 'default';

    public className = '';

    public size: ThyGridSize = 'default';

    public rowClassName: string | Function;

    public loadingDone = true;

    public loadingText: string;

    public emptyOptions: ThyGridEmptyOptions = {};

    public draggable = false;

    public selectedRadioRow: any = null;

    public pagination: ThyPage = { index: 1, size: 20, total: 0 };

    public trackByFn: any;

    public wholeRowSelect = false;

    private _filter: any = null;

    private _diff: IterableDiffer<any>;

    private _draggableModel: any;

    private _listOfColumnComponents: QueryList<ThyGridColumnComponent>;

    private initialized = false;

    @ViewChild('table', { static: true }) tableElementRef: ElementRef<any>;

    @Input()
    set thyMode(value: ThyGridMode) {
        this.mode = value || this.mode;
    }

    @Input()
    set thyGroupBy(value: string) {
        this.groupBy = value;
    }

    @Input()
    set thyRowKey(value: any) {
        this.rowKey = value || this.rowKey;
    }

    @Input()
    set thyGroups(value: any) {
        if (this.mode === 'group') {
            this.buildGroups(value);
        }
    }

    @Input()
    set thyModel(value: any) {
        this.model = value || [];
        this._diff = this._differs.find(this.model).create();
        this._initializeDataModel();

        if (this.mode === 'group') {
            this.buildModel();
        }
    }

    @Input()
    set thyTheme(value: ThyGridTheme) {
        this.theme = value || this.theme;
        this._setClass();
    }

    @Input()
    set thySize(value: ThyGridSize) {
        this.size = value || this.size;
        this._setClass();
    }

    @Input()
    set thyClassName(value: string) {
        this.className = value || ' ';
    }

    @Input()
    set thyRowClassName(value: string | Function) {
        this.rowClassName = value;
    }

    @Input()
    set thyLoadingDone(value: boolean) {
        this.loadingDone = value;
    }

    @Input()
    set thyLoadingText(value: string) {
        this.loadingText = value;
    }

    @Input()
    set thyEmptyOptions(value: ThyGridEmptyOptions) {
        this.emptyOptions = value;
    }

    @Input()
    set thyDraggable(value: boolean) {
        this.draggable = coerceBooleanProperty(value);
        if (this.mode !== 'list' && this.draggable) {
            throw new Error('Only list mode sorting is supported');
        }
    }

    @Input()
    set thyFilter(value: any) {
        this._filter = value;
    }

    @Input()
    set thyPageIndex(value: number) {
        this.pagination.index = value;
    }

    @Input()
    set thyPageSize(value: number) {
        this.pagination.size = value;
    }

    @Input()
    set thyPageTotal(value: number) {
        this.pagination.total = value;
    }

    @Input()
    set thyWholeRowSelect(value: boolean) {
        if (value) {
            this.className += ' table-hover';
        }
        this.wholeRowSelect = value;
    }

    @Input() thyShowHeader = true;

    @Input('thyShowTotal') showTotal = false;

    @Input() thyIndent = 20;

    @Input() thyChildrenKey = 'children';

    @HostBinding('class.thy-grid-hover-display-operation')
    @Input()
    thyHoverDisplayOperation: boolean;

    @Output() thyOnSwitchChange: EventEmitter<ThySwitchEvent> = new EventEmitter<ThySwitchEvent>();

    @Output() thyOnPageChange: EventEmitter<PageChangedEvent> = new EventEmitter<PageChangedEvent>();

    @Output() thyOnPageIndexChange: EventEmitter<number> = new EventEmitter<number>();

    @Output() thyOnMultiSelectChange: EventEmitter<ThyMultiSelectEvent> = new EventEmitter<ThyMultiSelectEvent>();

    @Output() thyOnRadioSelectChange: EventEmitter<ThyRadioSelectEvent> = new EventEmitter<ThyRadioSelectEvent>();

    @Output() thyOnDraggableChange: EventEmitter<ThyGridDraggableEvent> = new EventEmitter<ThyGridDraggableEvent>();

    @Output() thyOnRowClick: EventEmitter<ThyGridRowEvent> = new EventEmitter<ThyGridRowEvent>();

    @Output() thyOnRowContextMenu: EventEmitter<ThyGridEvent> = new EventEmitter<ThyGridEvent>();

    @ContentChild('group', { static: true }) groupTemplate: TemplateRef<any>;

    @ContentChildren(ThyGridColumnComponent)
    set listOfColumnComponents(components: QueryList<ThyGridColumnComponent>) {
        if (components) {
            this._listOfColumnComponents = components;
            this._initializeColumns();
            this._initializeDataModel();
        }
    }

    @HostBinding('class.thy-grid') isGridClass = true;

    // 数据的折叠展开状态
    public expandStatusMap: Dictionary<boolean> = {};

    constructor(
        public elementRef: ElementRef,
        private _differs: IterableDiffers,
        private viewportRuler: ViewportRuler,
        private updateHostClassService: UpdateHostClassService,
        @Inject(DOCUMENT) private document: any
    ) {
        super();
        this._bindTrackFn();
    }

    private _getSelectionKeys(selections: any) {
        return selections.map((item: any) => {
            if (typeof item === 'number' || typeof item === 'string') {
                return item;
            } else {
                return item[this.rowKey];
            }
        });
    }

    private _initializeColumns() {
        const components = this._listOfColumnComponents ? this._listOfColumnComponents.toArray() : [];
        const hasExpand = components.some(item => item.expand === true);
        this.columns = components.map<ThyGridColumn>((component, i) => {
            const selections = this._getSelectionKeys(component.selections);
            return {
                key: component.key,
                model: component.model,
                title: component.title,
                type: component.type,
                selections: selections,
                width: component.width,
                className: component.className,
                headerClassName: component.headerClassName,
                disabled: component.disabled,
                defaultText: component.defaultText,
                expand: hasExpand ? component.expand : i === 0,
                templateRef: component.cellTemplateRef,
                headerTemplateRef: component.headerTemplateRef
            };
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

    private _initialSelections(row: object, column: ThyGridColumn) {
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

    private _initialCustomModelValue(row: object, column: ThyGridColumn) {
        if (column.type === customType.switch) {
            row[column.key] = get(row, column.model);
        }
    }

    private _refreshCustomModelValue(row: any) {
        this.columns.forEach(column => {
            this._initialCustomModelValue(row, column);
        });
    }

    private _applyDiffChanges(changes: IterableChanges<any>) {
        if (changes) {
            changes.forEachAddedItem((record: IterableChangeRecord<any>) => {
                this._refreshCustomModelValue(record.item);
            });
        }
    }

    private _bindTrackFn() {
        this.trackByFn = function(this: any, index: number, row: any): any {
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
        if (gridSizeMap[this.size]) {
            classNames.push(gridSizeMap[this.size]);
        }
        if (gridThemeMap[this.theme]) {
            classNames.push(gridThemeMap[this.theme]);
        }
        if (gridSizeMap[this.size] === gridSizeMap['sm'] && gridThemeMap[this.theme] === gridThemeMap['default']) {
            classNames.push('table-default-sm-bottom-padding');
        }
        this.updateHostClassService.updateClass(classNames);
    }

    private _filterModel() {
        if (this.model && this.model.length > 0) {
            if (this._filter) {
            }
        }
    }

    public updateColumnSelections(key: string, selections: any): void {
        const column = this.columns.find(item => item.key === key);
        column.selections = this._getSelectionKeys(selections);
        this.model.forEach(row => {
            this._initialSelections(row, column);
        });
    }

    public isTemplateRef(ref: any) {
        return ref instanceof TemplateRef;
    }

    public getModelValue(row: any, path: string) {
        return get(row, path);
    }

    public renderRowClassName(row: any, index: number) {
        if (!this.rowClassName) {
            return null;
        }
        if (isString(this.rowClassName)) {
            return this.rowClassName;
        } else {
            return (this.rowClassName as Function)(row, index);
        }
    }

    public onModelChange(row: any, column: ThyGridColumn) {
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

    public onCheckboxChange(row: any, column: ThyGridColumn) {
        this.onModelChange(row, column);
        this.onMultiSelectChange(null, row, column);
    }

    public onMultiSelectChange(event: Event, row: any, column: ThyGridColumn) {
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

    public onRadioSelectChange(event: Event, row: any) {
        const radioSelectEvent: ThyRadioSelectEvent = {
            event: event,
            row: row
        };
        this.thyOnRadioSelectChange.emit(radioSelectEvent);
    }

    public onSwitchChange(event: Event, row: any, column: any) {
        const switchEvent: ThySwitchEvent = {
            event: event,
            row: row,
            refresh: (value: any) => {
                value = value || row;
                setTimeout(() => {
                    value[column.key] = get(value, column.model);
                });
            }
        };
        this.thyOnSwitchChange.emit(switchEvent);
    }

    showExpand(row: any) {
        return row[this.thyChildrenKey] && row[this.thyChildrenKey].length > 0;
    }

    isExpanded(row: any) {
        return this.expandStatusMap[row[this.rowKey]];
    }

    iconIndentComputed(level: number) {
        if (this.mode === 'tree') {
            return level * this.thyIndent - 23;
        }
    }

    tdIndentComputed(index: number, level: number) {
        if (this.mode === 'tree' && index === 0) {
            return {
                position: 'relative',
                paddingLeft: `${(level + 1) * this.thyIndent}px`
            };
        } else {
            return null;
        }
    }

    expandChildren(event: Event, row: any) {
        event.stopPropagation();
        if (this.isExpanded(row)) {
            this.expandStatusMap[row[this.rowKey]] = false;
        } else {
            this.expandStatusMap[row[this.rowKey]] = true;
        }
    }

    onDragStarted() {
        setTimeout(() => {
            const preview = this.document.getElementsByClassName('cdk-drag-preview')[0];
            if (preview) {
                preview.classList.add('thy-grid-drag-preview');
            }
        });
    }

    onDragDropped(event: CdkDragDrop<unknown>) {
        const dragEvent: ThyGridDraggableEvent = {
            model: event.item,
            models: this.model,
            oldIndex: event.previousIndex,
            newIndex: event.currentIndex
        };
        moveItemInArray(this.model, event.previousIndex, event.currentIndex);
        this.thyOnDraggableChange.emit(dragEvent);
    }

    public onRowClick(event: Event, row: any) {
        if (this.wholeRowSelect) {
            const column = this.columns.find(item => {
                return item.type === customType.checkbox || item.type === customType.radio;
            });
            if (!column.disabled) {
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

    public onRowContextMenu(event: Event, row: any) {
        const contextMenuEvent: ThyGridEvent = {
            event: event,
            row: row
        };
        this.thyOnRowContextMenu.emit(contextMenuEvent);
    }

    public draggableStopPropagation(event: Event) {
        if (!this.draggable) {
            event.stopPropagation();
        }
    }

    private _refreshColumns() {
        const components = this._listOfColumnComponents ? this._listOfColumnComponents.toArray() : [];
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

    private buildGroups(originGroups: any) {
        const collapsedIds = this.groups.filter(group => !group.expand).map(group => group.id);
        this.groups = [];
        originGroups.forEach((origin: any) => {
            const group: ThyGridGroup = { id: origin[this.rowKey], children: [], origin };
            group.expand = !collapsedIds.includes(group.id);
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

    public expandGroup(gridGroup: ThyGridGroup) {
        gridGroup.expand = !gridGroup.expand;
    }

    ngOnInit() {
        this.updateHostClassService.initializeElement(this.tableElementRef.nativeElement);
        this._setClass(true);
        this.initialized = true;

        merge(this.viewportRuler.change(200), of(null).pipe(delay(200)))
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(() => {
                this._refreshColumns();
            });
    }

    ngDoCheck() {
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
