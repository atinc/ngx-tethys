import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    forwardRef,
    ElementRef,
    ViewChild,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { helpers } from '../util';
import { UpdateHostClassService } from '../shared';
import { timingSafeEqual } from 'crypto';


@Component({
    selector: 'thy-switch',
    templateUrl: './switch.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySwitchComponent),
            multi: true
        }]
})
export class ThySwitchComponent implements OnInit, ControlValueAccessor, OnChanges {

    public model: any;

    public type?: String = 'primary';

    public size?: String = '';

    public disabled?: Boolean = false;

    public classNames: string[];

    public typeArray: any = ['primary', 'info', 'warning', 'danger'];

    public sizeArray: any = ['lg', '', 'sm'];

    @ViewChild('switch') switchElementRef: ElementRef;

    @Input()
    set thyType(value: string) {
        if (!this.typeArray.includes(value)) {
            value = 'primary';
        }
        this.type = value;
    }

    @Input()
    set thySize(value: string) {
        if (!this.sizeArray.includes(value)) {
            value = '';
        }
        this.size = value;
    }


    @Input() thyDisabled: boolean;

    @Output() thyChange: EventEmitter<Event> = new EventEmitter<Event>();

    constructor() {

    }

    ngOnInit() {
        this.setClassNames();
    }

    ngOnChanges(changes: SimpleChanges) {
        // 兼容降级后的Switch，使用onChanges
        if (changes.thyDisabled) {
            const value = changes.thyDisabled.currentValue;
            this.disabled = helpers.isBoolean(value) ? Boolean(value) : (value === 'true' || value === '1');
            this.setClassNames();
        }
    }

    public onModelChange: Function = () => { };

    public onModelTouched: Function = () => { };


    writeValue(value: any) {
        this.model = value;
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(isDisabled: Boolean) {
        this.disabled = isDisabled;
        this.setClassNames();
    }

    toggle(event: any) {
        this.model = !this.model;
        this.onModelChange(this.model);
        this.thyChange.emit(event);

    }

    setClassNames() {
        this.classNames = [`thy-switch-${this.type}`];
        if (this.size) {
            this.classNames.push(`thy-switch-${this.size}`);
        }
        if (this.disabled) {
            this.classNames.push(`thy-switch-disabled`);
        }
    }
}

