import {
    Component, forwardRef, HostBinding, Input, Optional,
    ElementRef, OnInit, HostListener, ContentChildren, QueryList, AfterViewInit, Output, EventEmitter, TemplateRef
} from '@angular/core';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyOptionComponent } from './option.component';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

export type SelectMode = 'multiple' | '';

export interface OptionValue {
    thyLabelText?: string;
    thyValue?: string;
    thyDisabled?: boolean;
    thyShowOptionCustom?: boolean;
    thySearchKey?: string;
}

const noop = () => {
};

@Component({
    selector: 'thy-custom-select',
    templateUrl: './select-custom.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySelectCustomComponent),
            multi: true
        },
        UpdateHostClassService
    ]
})
export class ThySelectCustomComponent implements ControlValueAccessor, OnInit, AfterViewInit {


    _innerValue: any;

    _innerValues: any = [];

    _disabled = false;

    _size: InputSize;

    _expandOptions = false;

    _mode: SelectMode;

    _classNames: any = [];

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    @HostBinding('class.thy-select-custom') _isSelectCustom = true;

    @Output() thyOnSearch: EventEmitter<any> = new EventEmitter<any>();

    @Input() thyShowSearch: boolean;

    @Input() thyPlaceHolder: string;

    @Input() thyServerSearch: boolean;

    @Input() thyShowOptionMenu: boolean;

    @Input()
    set thyMode(value: SelectMode) {
        this._mode = value;
    }

    @Input()
    set thySize(value: InputSize) {
        this._size = value;
    }

    @ContentChildren(ThyOptionComponent) listOfOptionComponent: QueryList<any>;

    constructor(
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService,
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        event.stopPropagation();
        if (!this.elementRef.nativeElement.contains(event.target)) {
            if (this.thyShowOptionMenu) {
                this._expandOptions = true;
            } else {
                this._expandOptions = false;
            }
        }
    }

    ngOnInit() {
        if (this._size) {
            this._classNames.push(`thy-select-custom-${this._size}`);
        }
        if (this._mode === 'multiple') {
            this._classNames.push(`thy-select-custom--multiple`);
        }
        this.updateHostClassService.updateClass(this._classNames);
    }

    ngAfterViewInit(): void {
    }

    writeValue(value: any): void {
        // if (obj !== this._innerValue) {
        //     this._innerValue = obj;
        // }
        if (value) {
            if (this._mode === 'multiple') {
                this._innerValues = value;
            } else {
                this._innerValue = value;
            }
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    valueOnChange(value: any) {
        this.onChangeCallback(value);
    }

    dropDownMenuToggle(event: Event, templateRef: any) {
        this._expandOptions = !this._expandOptions;
    }

    remove(event: Event, item: any, index: number) {
        event.stopPropagation();
        this._innerValues.splice(index, 1);
        this._expandOptions = true;
        this.listOfOptionComponent.forEach(i => {
            if (i.thyValue === item.thyValue) {
                i.selected = false;
            }
        });
    }



}
