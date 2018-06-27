import {
    Component, forwardRef, HostBinding,
    Input, ElementRef, OnInit, Output, EventEmitter, ContentChild, TemplateRef, ViewChild, ContentChildren, QueryList
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThySelectCustomComponent } from './select-custom.component';
import { ThyInputSearchComponent } from '../input/input-search.component';

@Component({
    selector: 'thy-option,thy-option-group',
    templateUrl: './option.component.html'
})
export class ThyOptionComponent implements OnInit {

    @Input() thyGroupLabel: string;

    @Input() thyValue: any;

    @Input() thyLabelText: string;

    @Input() thyDisabled: boolean;

    @Input() thyShowOptionCustom: boolean;

    @Input() thySearchKey: string;

    @ViewChild(TemplateRef) template: TemplateRef<any>;

    @ContentChildren(ThyOptionComponent) listOfOptionComponent: QueryList<ThyOptionComponent>;

    selected = false;

    constructor(
    ) {
    }

    ngOnInit() {
    }
}

