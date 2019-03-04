import {
    Component, HostBinding, Input, Output,
    ContentChild, TemplateRef, ElementRef,
    ViewEncapsulation, EventEmitter, forwardRef
} from '@angular/core';
import { ThyTranslate, UpdateHostClassService } from '../shared';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputSearchTheme = 'ellipse' | '';


export const CUSTOM_INPUT_SEARCH_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyInputSearchComponent),
    multi: true
};

const noop = () => { };

@Component({
    selector: 'thy-input-search',
    templateUrl: './input-search.component.html',
    providers: [
        UpdateHostClassService,
        CUSTOM_INPUT_SEARCH_CONTROL_VALUE_ACCESSOR
    ],
    encapsulation: ViewEncapsulation.None
})
export class ThyInputSearchComponent implements ControlValueAccessor {


    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    public disabled = false;

    public autoFocus = false;

    @HostBinding('class.input-search-container') _isSearchContainer = true;

    @HostBinding('class.input-search-ellipse') _isSearchEllipse = false;

    searchText: string;

    @Input() name = '';

    @Input() placeholder = '';

    @Input()
    set thyTheme(value: InputSearchTheme) {
        if (value === 'ellipse') {
            this._isSearchEllipse = true;
        }
    }


    @Input()
    set thySearchFocus(value: boolean) {
        this.autoFocus = value;
    }

    @Output() clear: EventEmitter<Event> = new EventEmitter<Event>();

    constructor() {

    }

    writeValue(value: any): void {
        this.searchText = value;
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    searchModelChange() {
        this.onChangeCallback(this.searchText);
    }

    clearSearchText(event: Event) {
        event.stopPropagation();
        if (this.disabled) {
            return;
        }
        this.searchText = '';
        this.onChangeCallback(this.searchText);
        this.clear.emit(event);
    }
}

