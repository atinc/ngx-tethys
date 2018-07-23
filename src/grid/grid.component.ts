import {
    Component, Input, Output,
    ViewEncapsulation, TemplateRef, OnInit, EventEmitter, DoCheck,
    IterableDiffers,
    IterableDiffer,
    IterableChanges,
    IterableChangeRecord,
    ContentChildren,
    QueryList,
    OnDestroy
} from '@angular/core';
import { get, set } from '../util/helpers';
import {
    ThyGridColumn, ThyMultiSelectEvent, ThyRadioSelectEvent, ThyPage,
    ThyGridEmptyOptions, ThySwitchEvent, ThyGridDraggableEvent, ThyGridRowEvent
} from './grid.interface';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';
import { SortablejsOptions } from 'angular-sortablejs/dist';
import { ThyGridColumnComponent } from './grid-column.component';

export type ThyGridTheme = 'default' | 'bordered';

const themeMap = {
    default: 'table-default',
    bordered: 'table-bordered'
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
    encapsulation: ViewEncapsulation.None
})
export class ThyGridComponent implements OnInit, OnDestroy, DoCheck {

    public customType = customType;

    public model: object[] = [];

    public rowKey = '_id';

    public columns: ThyGridColumn[] = [];

    public themeClass = themeMap['default'];

    public className = '';

    public loadingDone = true;

    public loadingText: string;

    public emptyOptions: ThyGridEmptyOptions = {};

    public draggable = false;

    public draggableOptions: SortablejsOptions = {
        disabled: true,
        onStart: this.onDraggableStart.bind(this),
        onUpdate: this.onDraggableUpdate.bind(this)
    };

    public selectedRadioRow: any = null;

    public pagination: ThyPage = { index: 1, size: 20, total: 0 };

    public trackByFn: any;

    public wholeRowSelect = false;

    private _filter: any = null;

    private _diff: IterableDiffer<any>;

    private _draggableModel: any;

    private _listOfColumnComponents: QueryList<ThyGridColumnComponent>;

    @Input()
    set thyModel(value: any) {
        this.model = value || [];
        this._diff = this._differs.find(this.model).create();
        this._initializeDataModel();
    }

    @Input()
    set thyRowKey(value: any) {
        this.rowKey = value || this.rowKey;
    }

    @Input()
    set thyTheme(value: ThyGridTheme) {
        this.themeClass = themeMap[value];
    }

    @Input()
    set thyClassName(value: string) {
        this.className = value || ' ';
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
        this.draggable = value;
        this.draggableOptions.disabled = !value;
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

    @Output() thyOnSwitchChange: EventEmitter<ThySwitchEvent> = new EventEmitter<ThySwitchEvent>();

    @Output() thyOnPageChange: EventEmitter<PageChangedEvent> = new EventEmitter<PageChangedEvent>();

    @Output() thyOnMultiSelectChange: EventEmitter<ThyMultiSelectEvent> = new EventEmitter<ThyMultiSelectEvent>();

    @Output() thyOnRadioSelectChange: EventEmitter<ThyRadioSelectEvent> = new EventEmitter<ThyRadioSelectEvent>();

    @Output() thyOnDraggableUpdate: EventEmitter<ThyGridDraggableEvent> = new EventEmitter<ThyGridDraggableEvent>();

    @Output() thyOnRowClick: EventEmitter<ThyGridRowEvent> = new EventEmitter<ThyGridRowEvent>();

    @ContentChildren(ThyGridColumnComponent)
    set listOfColumnComponents(components: QueryList<ThyGridColumnComponent>) {
        if (components) {
            this._listOfColumnComponents = components;
            this._initializeColumns();
            this._initializeDataModel();
        }
    }

    constructor(
        private _differs: IterableDiffers
    ) {
        this._bindTrackFn();
    }

    private _initializeColumns() {
        const components = this._listOfColumnComponents ? this._listOfColumnComponents.toArray() : [];
        this.columns = components.map<ThyGridColumn>((component) => {
            const selections = component.selections.map((item: any) => {
                if (typeof (item) === 'number' || typeof (item) === 'string') {
                    return item;
                } else {
                    return item[this.rowKey];
                }
            });
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
                templateRef: component.templateRef,
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

    private _initialSelections(row: object, column: ThyGridColumn, ) {
        if (column.selections && column.selections.length > 0) {
            if (column.type === 'checkbox') {
                row[column.key] = column.selections.includes(row[this.rowKey]);
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
        this.trackByFn = function (this: any, index: number, row: any): any {
            return this.rowKey ? row[this.rowKey] : index;
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

    private _filterModel() {
        if (this.model && this.model.length > 0) {
            if (this._filter) {
            }
        }
    }

    public isTemplateRef(ref: any) {
        return ref instanceof TemplateRef;
    }

    public getModelValue(row: any, path: string) {
        return get(row, path);
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

    public onDraggableStart(event: any) {
        this._draggableModel = this.model[event.oldIndex];
        const switchEvent: ThyGridDraggableEvent = {
        };
    }

    public onDraggableUpdate(event: any) {
        const dragEvent: ThyGridDraggableEvent = {
            model: this._draggableModel,
            models: this.model,
            oldIndex: event.oldIndex,
            newIndex: event.newIndex
        };
        this.thyOnDraggableUpdate.emit(dragEvent);
    }

    public onRowClick(event: Event, row: any) {
        if (this.wholeRowSelect) {
            const column = this.columns.find((item) => {
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

    ngOnInit() {
    }

    ngDoCheck() {
        const changes = this._diff.diff(this.model);
        this._applyDiffChanges(changes);
    }

    ngOnDestroy() {
        this._destroyInvalidAttribute();
    }
}
