import { Component, Directive, Input, ElementRef, Renderer2, ViewEncapsulation, TemplateRef, OnInit } from '@angular/core';
import { AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { inputValueToBoolean, isUndefined, get, set } from '../util/helpers';
import { GridColumn } from './grid.interface';

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
export class ThyGridComponent implements OnInit, AfterContentInit {

    public models: any[] = [];
    public columns: GridColumn[] = [];
    public themeClass = '';

    private _filter: any = null;

    @Input()
    set data(value: any) {
        this.models = value;
        this._formatModels();
    }

    @Input()
    set theme(value: ThyGridTheme) {
        this.themeClass = themeMap[value];
    }

    @Input() className: string;

    @Input()
    set filter(value: any) {
        this._filter = value;
    }

    private _formatModels() {
        this.models.forEach(row => {
            this.columns.forEach(column => {
                if (column.type === 'checkbox' || column.type === 'radio') {
                    if (column.model) {
                        row[column.key] = get(row, column.model);
                    }
                }
            });
        });
    }

    private _filterModels() {
        if (this.models && this.models.length > 0) {
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

    public onModelChange(row: any, column: GridColumn) {
        if (column.model) {
            set(row, column.model, row[column.key]);
        }
    }

    public updateColumn(column: GridColumn) {
        let old = this.columns.find(item => item.key === column.key);
        if (old) {
            old = column;
        } else {
            this.columns.push(column);
        }
    }

    ngOnInit() {

    }

    ngAfterContentInit() {
        this._formatModels();
    }
}
