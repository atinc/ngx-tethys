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

    @Input() thyModelKey = '';
    @Input() thyTitle = '';
    @Input() thyType = '';
    @Input() thyWidth: string | number = '';
    @Input() thyClassName = '';
    @Input() thyHeaderClassName = '';
    @Input() thyDisabled = false;

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

    private _column: ThyGridColumn;

    constructor(private root: ThyGridComponent, private el: ElementRef) {

    }

    ngOnInit() {
        this._column = {
            key: this.generateKey(),
            model: this.thyModelKey,
            title: this.thyTitle,
            type: this.thyType,
            width: this.thyWidth,
            className: this.thyClassName,
            headerClassName: this.thyHeaderClassName,
            disabled: this.thyDisabled,
            templateRef: this.templateRef
        };
        this.root.updateColumn(this._column);
    }

    generateKey() {
        return 'column' + Math.random().toString(16).substr(2, 8);
    }
}
