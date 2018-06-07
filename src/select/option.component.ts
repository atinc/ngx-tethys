import { Component, forwardRef, HostBinding, Input, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThySelectCustomComponent } from './select-custom.component';

@Component({
    selector: 'thy-option',
    templateUrl: './option.component.html'
})
export class ThyOptionComponent implements OnInit {

    @Input() value: any;

    @Input() selected: boolean;

    @Output() thySelectItem: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private parent: ThySelectCustomComponent
    ) { }

    selectItem(value: any) {
        this.thySelectItem.emit(value);
        this.parent._expandOptions = false;
    }

    ngOnInit() { }
}

