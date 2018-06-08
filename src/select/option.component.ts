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

    @Input() value: any;

    @Input() label: string;

    @Input() disabled: boolean;

    @Input() custom: boolean;

    @Input() icon: string;

    @Input() hasSelectedIcon: boolean;

    @ViewChild(TemplateRef) template: TemplateRef<any>;

    constructor(
    ) {

    }

    ngOnInit() {

    }
}

