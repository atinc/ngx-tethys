import {
    Component, forwardRef, HostBinding,
    Input, ElementRef, OnInit, Output, EventEmitter, ContentChild, TemplateRef, ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThySelectCustomComponent } from './select-custom.component';

@Component({
    selector: 'thy-option',
    templateUrl: './option.component.html'
})
export class ThyOptionComponent implements OnInit {

    @Input() thyOptionValue: any;

    @Input() thyOptionLabel: string;

    @Input() thyDisabled: boolean;

    @Input() thyShowOptionCustom: boolean;

    @ViewChild(TemplateRef) template: TemplateRef<any>;

    constructor(
    ) {

    }

    ngOnInit() {

    }
}

