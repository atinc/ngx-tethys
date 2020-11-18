import {
    AfterViewInit,
    Component,
    ContentChild,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    Output,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    NgZone,
    OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UpdateHostClassService } from '../shared';
import { take } from 'rxjs/operators';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyInputComponent),
    multi: true
};

const noop = () => {};

const password = 'password';

@Component({
    selector: 'thy-input',
    templateUrl: './input.component.html',
    providers: [UpdateHostClassService, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class ThyInputComponent implements ControlValueAccessor, OnInit {
    @Input() placeholder = '';

    @Input() thySize: string;

    @Input() thyAutofocus = false;

    @Input() type: string;

    @Input()
    set thyType(value: string) {
        this.type = value;
    }

    @Input() thyLabelText: string;

    @Input() readonly = false;

    @Input()
    set thyAutocomplete(value: boolean) {
        this.autocomplete = value;
    }

    @Output() focus: EventEmitter<Event> = new EventEmitter<Event>();

    @Output() blur: EventEmitter<Event> = new EventEmitter<Event>();

    @ContentChild('append') appendTemplate: TemplateRef<any>;

    @ContentChild('prepend') prependTemplate: TemplateRef<any>;

    @ViewChild('eye', { static: true }) eyeTemplate: TemplateRef<any>;

    public _type = 'text';

    public value: string;

    public disabled = false;

    public autocomplete: boolean;

    public showLabel: boolean;

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    @HostBinding('class.thy-input') _isSearchContainer = true;

    @HostBinding('class.form-control') _isFormControl = true;

    @HostBinding('class.form-control-active') _isFocus = false;

    constructor(private ngZone: NgZone) {}

    ngOnInit() {
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            if (this.isPassword(this.type)) {
                this.appendTemplate = this.eyeTemplate;
            }
        });
    }

    writeValue(value: any): void {
        this.value = value;
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

    onModelChange() {
        this.onChangeCallback(this.value);
    }

    onInputFocus(event: Event) {
        this._isFocus = true;
        this.showLabel = true;
        this.focus.emit(event);
    }

    onInputBlur(event: Event) {
        this._isFocus = false;
        this.showLabel = false;
        this.blur.emit(event);
    }

    isPassword(value: string) {
        return value === password;
    }

    togglePasswordType() {
        this.type = this.isPassword(this.type) ? 'text' : 'password';
    }
}
