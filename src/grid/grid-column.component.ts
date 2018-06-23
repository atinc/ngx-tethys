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

    @Input()
    set thySelections(value: any) {
        if (value) {
            if (Array.isArray(value)) {
                this.selections = value;
            } else {
                this.selections = [value];
            }
        }
    }

    @Input() thyDefaultText = '';

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

    @ContentChild('cell') cellTemplateRef: TemplateRef<any>;

    public key?: string;

    public model: string;

    public title: string;

    public type: string;

    public selections: any = [];

    public width: string | number;

    public className: string;

    public headerClassName: string;

    public disabled: boolean;

    public defaultText: string;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.key = this._generateKey();
        this.model = this.thyModelKey;
        this.title = this.thyTitle;
        this.type = this.thyType;
        this.width = this.thyWidth;
        this.className = this.thyClassName;
        this.headerClassName = this.thyHeaderClassName;
        this.disabled = this.thyDisabled;
        this.defaultText = this.thyDefaultText;
        this.templateRef = this.templateRef || this.cellTemplateRef;
    }

    private _generateKey() {
        return '[$$column]' + Math.random().toString(16).substr(2, 8);
    }
}
