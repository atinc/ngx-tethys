import {
    Component, Directive, Input, Output, ElementRef, Renderer2,
    ViewEncapsulation, TemplateRef, OnInit, EventEmitter
} from '@angular/core';
import { AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { inputValueToBoolean, isUndefined, get, set } from '../util/helpers';
import { ThyGridColumn, ThyMultiSelectEvent, ThyRadioSelectEvent, ThyPage } from './grid.interface';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';

export type ThyGridTheme = 'default' | 'bordered';

const themeMap: any = {
    default: 'table-default',
    bordered: 'table-bordered'
};

@Component({
    selector: 'thy-grid',
    templateUrl: './grid.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyGridComponent implements OnInit, AfterContentInit, OnDestroy {

    public model: any[] = [];
    public columns: ThyGridColumn[] = [];
    public themeClass = themeMap['default'];
    public className = '';
    public selectedRadioRow: any = null;
    public pagination: ThyPage = { index: 1, size: 20, total: 0 };

    private _filter: any = null;


    @Input()
    set thyModel(value: any) {
        this.model = value || [];
        this._formatModel();
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

    @Output() thyOnPageChange: EventEmitter<PageChangedEvent> = new EventEmitter<PageChangedEvent>();

    @Output() thyOnMultiSelectChange: EventEmitter<ThyMultiSelectEvent> = new EventEmitter<ThyMultiSelectEvent>();

    @Output() thyOnRadioSelectChange: EventEmitter<ThyRadioSelectEvent> = new EventEmitter<ThyRadioSelectEvent>();

    private _formatModel() {
        this.model.forEach(row => {
            this.columns.forEach(column => {
                if (column.type === 'checkbox') {
                    if (column.model) {
                        row[column.key] = get(row, column.model);
                    }
                }
            });
        });
    }

    private _filterModel() {
        if (this.model && this.model.length > 0) {
            if (this._filter) {
            }
        }
    }

    private _destroyInvalidAttribute() {
        this.model.forEach(row => {
            for (const key in row) {
                if (key.includes('column')) {
                    delete row[key];
                }
            }
        });
    }

    public updateColumn(column: ThyGridColumn) {
        let old = this.columns.find(item => item.key === column.key);
        if (old) {
            old = column;
        } else {
            this.columns.push(column);
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

    public onPageChange(event: PageChangedEvent) {
        this.thyOnPageChange.emit(event);
    }

    public onMultiSelectChange(event: Event, row: any, column: ThyGridColumn) {
        const rows = this.model.filter(item => {
            return !!get(item, column.model);
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

    ngOnInit() {

    }

    ngAfterContentInit() {
        this._formatModel();
    }

    ngOnDestroy() {
        this._destroyInvalidAttribute();
    }
}
