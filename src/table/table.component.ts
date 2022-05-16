/* eslint-disable @angular-eslint/no-conflicting-lifecycle */
import { Constructor, MixinBase, mixinUnsubscribe, ThyUnsubscribe, UpdateHostClassService } from 'ngx-tethys/core';
import { Dictionary } from 'ngx-tethys/types';
import { coerceBooleanProperty, get, helpers, isString, keyBy, set } from 'ngx-tethys/util';
import { EMPTY, fromEvent, merge, Observable, of } from 'rxjs';
import { delay, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { CdkDragDrop, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    DoCheck,
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
    ThyTableColumn,
    ThyTableDraggableEvent,
    ThyTableEmptyOptions,
    ThyTableEvent,
    ThyTableRowEvent
} from './table.interface';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';

export type ThyTableTheme = 'default' | 'bordered';

export type ThyTableMode = 'list' | 'group' | 'tree';

export type ThyTableSize = 'default' | 'sm';

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
    bordered: 'table-bordered'
};

const tableSizeMap = {
    sm: 'table-sm'
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

@Component({
    selector: 'thy-grid,thy-table',
    templateUrl: './table.component.html',
    providers: [
        {
            provide: THY_TABLE_COLUMN_PARENT_COMPONENT,
            useExisting: ThyTableComponent
        },
        UpdateHostClassService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ThyTableComponent extends _MixinBase
    implements OnInit, OnChanges, AfterViewInit, OnDestroy, DoCheck, IThyTableColumnParentComponent {
    public customType = customType;

    public model: object[] = [];

    public groups: ThyTableGroup[] = [];

    public rowKey = '_id';

    public groupBy: string;

    public mode: ThyTableMode = 'list';

    public columns: ThyTableColumn[] = [];

    public theme: ThyTableTheme = 'default';

    public className = '';

    public size: ThyTableSize = 'default';

    public rowClassName: string | Function;

    public loadingDone = true;

    public loadingText: string;

    public emptyOptions: ThyTableEmptyOptions = {};

    public draggable = false;

    public selectedRadioRow: any = null;

    public pagination: ThyPage = { index: 1, size: 20, total: 0 };

    public trackByFn: any;

    public wholeRowSelect = false;

    public fixedDirection = ThyFixedDirection;

    public hasFixed = false;

    private _diff: IterableDiffer<any>;

    private _listOfColumnComponents: QueryList<ThyTableColumnComponent>;

    private initialized = false;
    private _oldThyClassName = '';

    private scrollClassName = css.tableScrollLeft;

    private get tableScrollElement(): HTMLElement {
        return this.elementRef.nativeElement.getElementsByClassName(css.tableBody)[0] as HTMLElement;
    }

    private get scroll$() {
        return merge<MouseEvent>(this.tableScrollElement ? fromEvent<MouseEvent>(this.tableScrollElement, 'scroll') : EMPTY);
    }

    @ContentChild('empty') emptyTemplate: TemplateRef<any>;

    @ViewChild('table', { static: true }) tableElementRef: ElementRef<any>;

    @ViewChildren('rows', { read: ElementRef }) rows: QueryList<ElementRef<HTMLElement>>;

    @Input()
    set thyMode(value: ThyTableMode) {
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
    set thyTheme(value: ThyTableTheme) {
        this.theme = value || this.theme;
        this._setClass();
    }

    @Input()
    set thySize(value: ThyTableSize) {
        this.size = value || this.size;
        this._setClass();
    }
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
    set thyEmptyOptions(value: ThyTableEmptyOptions) {
        this.emptyOptions = value;
    }

    @Input()
    set thyDraggable(value: boolean) {
        this.draggable = coerceBooleanProperty(value);
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && this.mode !== 'list' && this.draggable) {
            throw new Error('Only list mode sorting is supported');
        }
    }

    // coming soon
    // @Input()
    // set thyFilter(value: any) {
    //     this._filter = value;
    // }

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

    @HostBinding('class.thy-table-hover-display-operation')
    @Input()
    thyHoverDisplayOperation: boolean;

    @Output() thyOnSwitchChange: EventEmitter<ThySwitchEvent> = new EventEmitter<ThySwitchEvent>();

    @Output() thyOnPageChange: EventEmitter<PageChangedEvent> = new EventEmitter<PageChangedEvent>();

    @Output() thyOnPageIndexChange: EventEmitter<number> = new EventEmitter<number>();

    @Output() thyOnMultiSelectChange: EventEmitter<ThyMultiSelectEvent> = new EventEmitter<ThyMultiSelectEvent>();

    @Output() thyOnRadioSelectChange: EventEmitter<ThyRadioSelectEvent> = new EventEmitter<ThyRadioSelectEvent>();

    @Output() thyOnDraggableChange: EventEmitter<ThyTableDraggableEvent> = new EventEmitter<ThyTableDraggableEvent>();

    @Output() thyOnRowClick: EventEmitter<ThyTableRowEvent> = new EventEmitter<ThyTableRowEvent>();

    @Output() thyOnRowContextMenu: EventEmitter<ThyTableEvent> = new EventEmitter<ThyTableEvent>();

    @ContentChild('group', { static: true }) groupTemplate: TemplateRef<any>;

    @ContentChildren(ThyTableColumnComponent)
    set listOfColumnComponents(components: QueryList<ThyTableColumnComponent>) {
        if (components) {
            this._listOfColumnComponents = components;
            this.hasFixed = !!this._listOfColumnComponents.find(item => {
                return item.fixed === this.fixedDirection.left || item.fixed === this.fixedDirection.right;
            });
            this._initializeColumns();
            this._initializeDataModel();
        }
    }

    @HostBinding('class.thy-table') isTableClass = true;

    // 数据的折叠展开状态
    public expandStatusMap: Dictionary<boolean> = {};

    dragPreviewClass = 'thy-table-drag-preview';

    public buildColumnWidth = (width: string | number) => {
        return Number(width.toString().split('px')[0]);
    };

    constructor(
        public elementRef: ElementRef,
        private _differs: IterableDiffers,
        private viewportRuler: ViewportRuler,
        private updateHostClassService: UpdateHostClassService,
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: string,
        private ngZone: NgZone,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef
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
        const leftColumnsWidth: number[] = [];
        const rightColumns: ThyTableColumnComponent[] = [];
        this.columns = components.map<ThyTableColumn>((component, i) => {
            const selections = this._getSelectionKeys(component.selections);
            if (component.fixed === this.fixedDirection.left) {
                leftColumnsWidth.push(this.buildColumnWidth(component.width));
            } else if (component.fixed === this.fixedDirection.right) {
                rightColumns.push(component);
            }
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
                headerTemplateRef: component.headerTemplateRef,
                fixed: component.fixed,
                left:
                    component.fixed === this.fixedDirection.left
                        ? leftColumnsWidth.reduce((result, currentWidth) => {
                              return result + currentWidth;
                          }, 0) - this.buildColumnWidth(component.width)
                        : null,
                right: component.fixed === this.fixedDirection.right ? 0 : null
            };
        });

        const columnsMap = helpers.keyBy(this.columns, 'key');
        let rightIncrease = 0;
        rightColumns.reverse().forEach(value => {
            columnsMap[value.key].right = rightIncrease;
            rightIncrease = rightIncrease + this.buildColumnWidth(value.width);
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

    private _initialSelections(row: object, column: ThyTableColumn) {
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

    private _initialCustomModelValue(row: object, column: ThyTableColumn) {
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
        if (tableSizeMap[this.size]) {
            classNames.push(tableSizeMap[this.size]);
        }
        if (tableThemeMap[this.theme]) {
            classNames.push(tableThemeMap[this.theme]);
        }
        if (tableSizeMap[this.size] === tableSizeMap['sm'] && tableThemeMap[this.theme] === tableThemeMap['default']) {
            classNames.push('table-default-sm-bottom-padding');
        }
        this.updateHostClassService.updateClass(classNames);
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

    public onModelChange(row: any, column: ThyTableColumn) {
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

    public onCheckboxChange(row: any, column: ThyTableColumn) {
        this.onModelChange(row, column);
        this.onMultiSelectChange(null, row, column);
    }

    public onMultiSelectChange(event: Event, row: any, column: ThyTableColumn) {
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
            return level * this.thyIndent - 5;
        }
    }

    tdIndentComputed(level: number) {
        return {
            position: 'relative',
            paddingLeft: `${(level + 1) * this.thyIndent - 5}px`
        };
    }

    expandChildren(event: Event, row: any) {
        event.stopPropagation();
        if (this.isExpanded(row)) {
            this.expandStatusMap[row[this.rowKey]] = false;
        } else {
            this.expandStatusMap[row[this.rowKey]] = true;
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

    onDragDropped(event: CdkDragDrop<unknown>) {
        const dragEvent: ThyTableDraggableEvent = {
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
        const contextMenuEvent: ThyTableEvent = {
            event: event,
            row: row
        };
        this.thyOnRowContextMenu.emit(contextMenuEvent);
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
            const group: ThyTableGroup = { id: origin[this.rowKey], children: [], origin };
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

    public expandGroup(group: ThyTableGroup) {
        group.expand = !group.expand;
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

    ngOnChanges(simpleChangs: SimpleChanges) {
        const modeChange = simpleChangs.thyMode;
        const thyGroupsChange = simpleChangs.thyGroups;
        const isGroupMode = modeChange && modeChange.currentValue === 'group';
        if (isGroupMode && thyGroupsChange && thyGroupsChange.firstChange) {
            this.buildGroups(thyGroupsChange.currentValue);
            this.buildModel();
        }
    }

    ngDoCheck() {
        if (this._diff) {
            const changes = this._diff.diff(this.model);
            this._applyDiffChanges(changes);
        }
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
                                merge<Event>(
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

    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
    ngOnDestroy() {
        super.ngOnDestroy();
        this._destroyInvalidAttribute();
    }
}
