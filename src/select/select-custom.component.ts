import {
    Component, forwardRef, HostBinding, Input,
    ElementRef, OnInit, HostListener, ContentChildren, QueryList, AfterViewInit, Output, EventEmitter
} from '@angular/core';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { inputValueToBoolean } from '../util/helpers';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyOptionComponent } from './option.component';
import { ThyOptionGroupComponent } from './option-group.component';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

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


    _innerValue: any = null;

    _disabled = false;

    _size: InputSize;

    _expandOptions = false;

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    @HostBinding('class.thy-select-custom') _isSelectCustom = true;

    @Output() thyOnSearch: EventEmitter<any> = new EventEmitter<any>();

    @Input() thyShowSearch: boolean;

    @Input() thyPlaceHolder: string;

    @Input() thyServerSearch:boolean;

    @Input()
    set thySize(value: InputSize) {
        this._size = value;
    }

    @ContentChildren(ThyOptionComponent) listOfOptionComponent: QueryList<any>;

    @ContentChildren(ThyOptionGroupComponent) listOfOptionGroupComponent: QueryList<any>;

    constructor(
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: any): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this._expandOptions = false;
            this._removeClass();
        }
    }

    ngOnInit() {
        const classes = this._size ? [`thy-select-custom-${this._size}`] : [];
        this.updateHostClassService.updateClass(classes);
    }

    ngAfterViewInit(): void {
    }

    writeValue(obj: any): void {
        if (obj !== this._innerValue) {
            this._innerValue = obj;
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    _addClass() {
        const classes =
            this._size ? [`thy-select-custom-${this._size}`, 'thy-select-custom-show-option'] : ['thy-select-custom-show-option'];
        this.updateHostClassService.updateClass(classes);
    }

    _removeClass() {
        const classes =
            this._size ? [`thy-select-custom-${this._size}`] : [];
        this.updateHostClassService.updateClass(classes);
    }

    dropDownMenuToggle() {
        this._expandOptions = !this._expandOptions;
        if (this._expandOptions) {
            this._addClass();
        } else {
            this._removeClass();
        }
    }

}
