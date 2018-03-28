import { Component, Input, ElementRef, ViewEncapsulation, ContentChild, ContentChildren, TemplateRef, ViewChild } from '@angular/core';
import { AfterContentInit, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { inputValueToBoolean, isUndefined } from '../util/helpers';
import { ThyGridComponent } from './grid.component';
import { GridColumn } from './grid.interface';

@Component({
    selector: 'thy-grid-column',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class ThyGridColumnComponent implements OnInit {

    @Input() model = '';
    @Input() label = '';
    @Input() type = '';
    @Input() width: string | number = '';
    @Input() className = '';
    @Input() headerClassName = '';
    @Input() disabled = false;

    @ContentChild('template') template: TemplateRef<any>;

    private _column: GridColumn;

    constructor(private root: ThyGridComponent, private el: ElementRef) {

    }

    ngOnInit() {
        this._column = {
            key: this.generateKey(),
            model: this.model,
            label: this.label,
            type: this.type,
            width: this.width,
            className: this.className,
            headerClassName: this.headerClassName,
            disabled: this.disabled,
            template: this.template
        };
        this.root.updateColumn(this._column);
    }

    generateKey() {
        return Math.random().toString(16).substr(2, 8);
    }
}
