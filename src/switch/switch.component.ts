import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    forwardRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
    selector: 'thy-switch',
    templateUrl: './switch.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ThySwitchComponent),
        multi: true
    }]
})
export class ThySwitchComponent implements OnInit, ControlValueAccessor {

    public model: any;

    public type?: String = 'primary';

    public size?: String = '';

    public thyClassName = '';

    public typeArray: any = ['primary', 'info', 'warning', 'danger'];

    public sizeArray: any = ['lg', '', 'sm'];

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

    @Output() thyChange: EventEmitter<any> = new EventEmitter<any>();


    constructor() {

    }

    public onModelChange: Function = () => {

    }

    public onModelTouched: Function = () => {

    }

    writeValue(value: any) {
        this.model = value;
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    toggle() {
        this.model = !this.model;
        this.onModelChange(this.model);
        this.thyChange.emit({
            'checked': this.model
        });

    }

    setClass() {
        this.thyClassName = this.thyClassName + ' ' + 'switch-' + this.size;
        this.thyClassName = this.thyClassName + ' ' + 'switch-' + this.type;
    }

    ngOnInit() {
        this.setClass();
    }

}

