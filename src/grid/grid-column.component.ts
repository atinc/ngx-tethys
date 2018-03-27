import { Component, Directive, Input, ElementRef, Renderer2, ViewEncapsulation, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { AfterContentInit, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { inputValueToBoolean, isUndefined } from '../util/helpers';
import { ThyGridComponent } from './grid.component'
import { GridColumn } from './grid.interface';

@Component({
    selector: 'thy-grid-column',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class ThyGridColumnComponent implements OnInit, OnChanges, AfterContentInit {

    @Input() model: string = '';
    @Input() label: string = '';
    @Input() type: string = '';
    @Input() width: string | number = '';
    @Input() className: string = '';
    @Input() headerClassName: string = '';
    @Input() disabled: boolean = false;

    @ContentChild('tpl') content: TemplateRef<any>;

    constructor(private root: ThyGridComponent, private el: ElementRef) {

    }

    ngOnInit() {

    }

    ngAfterContentInit() {
        console.log(this.content);
    }

    ngOnChanges(changes: SimpleChanges) {
        const gridColumn: GridColumn = {
            model: this.model,
            label: this.label,
            type: this.type,
            width: this.width,
            className: this.className,
            headerClassName: this.headerClassName,
            disabled: this.disabled
        };

        this.root.appendGridColumn(gridColumn);
    }
}
