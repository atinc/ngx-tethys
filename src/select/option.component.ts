import {
    Component, forwardRef, HostBinding,
    Input, ElementRef, OnInit, Output, EventEmitter, ContentChild, TemplateRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThySelectCustomComponent } from './select-custom.component';

@Component({
    selector: 'thy-option',
    templateUrl: './option.component.html'
})
export class ThyOptionComponent implements OnInit {

    @Input() value: any;

    @Input() label: string;

    @Input() selected: boolean;

    @Input() disabled: boolean;

    @ContentChild(TemplateRef) template: TemplateRef<any>;

    constructor(
    ) {

    }

    ngOnInit() {

    }
}

