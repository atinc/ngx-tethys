import { Component, Directive, Input, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { inputValueToBoolean, isUndefined } from '../util/helpers';
import { GridColumn } from './grid.interface';
import { GridProps } from './grid.props';

@Component({
    selector: 'thy-grid',
    templateUrl: './grid.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyGridComponent extends GridProps implements OnChanges {

    private columns: GridColumn[] = [];

    ngOnChanges(changes: SimpleChanges) {

    }

    appendGridColumn(column: GridColumn) {
        this.columns.push(column);
    }
}
