import { Component, Input, ElementRef, ViewEncapsulation, ContentChild, ContentChildren, TemplateRef, ViewChild } from '@angular/core';
import { AfterContentInit, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { inputValueToBoolean, isUndefined } from '../util/helpers';
import { ThyGridComponent } from './grid.component';
import { ThyGridColumn } from './grid.interface';

@Component({
    selector: 'thy-grid-column',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class ThyGridColumnComponent implements OnInit {

    private _selections: any = [];

    @Input() thyModelKey = '';

    @Input() thyTitle = '';

    @Input() thyType = '';

    @Input() thyWidth: string | number = '';

    @Input() thyClassName = '';

    @Input() thyHeaderClassName = '';

    @Input() thyDisabled = false;

    @Input()
    set thySelections(value: any) {
        if (value) {
            if (Array.isArray(value)) {
                this._selections = value;
            } else {
                this._selections = [value];
            }
        }
    }

    @Input() thyDefaultText = '';

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

    private _column: ThyGridColumn;

    constructor(private root: ThyGridComponent, private el: ElementRef) {

    }

    ngOnInit() {
        const selections = this._selections.map((item: any) => {
            if (typeof (item) === 'number' || typeof (item) === 'string') {
                return item;
            } else {
                return item[this.root.rowKey];
            }
        });

        this._column = {
            key: this._generateKey(),
            model: this.thyModelKey,
            title: this.thyTitle,
            type: this.thyType,
            selections: selections,
            width: this.thyWidth,
            className: this.thyClassName,
            headerClassName: this.thyHeaderClassName,
            disabled: this.thyDisabled,
            defaultText: this.thyDefaultText,
            templateRef: this.templateRef
        };
        this.root.updateColumn(this._column);
    }

    private _generateKey() {
        return '[$$column]' + Math.random().toString(16).substr(2, 8);
    }
}
