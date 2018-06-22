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


@Component({
    selector: 'thy-switch',
    templateUrl: './switch.component.html',
    providers: [
        UpdateHostClassService,
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

    public thyClassName = '';

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


    @Input() thyDisabled: boolean | string;

    @Output() thyChange: EventEmitter<Event> = new EventEmitter<Event>();

    constructor(private updateHostClassService: UpdateHostClassService) {

    }

    ngOnInit() {
        this.updateHostClassService.initializeElement(this.switchElementRef.nativeElement);
        this.setClassNames();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.thyDisabled) {
            const value = changes.thyDisabled.currentValue;
            this.disabled = helpers.isBoolean(value) ? Boolean(value) : value === 'true';
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
    }

    toggle(event: any) {
        this.model = !this.model;
        this.onModelChange(this.model);
        this.thyChange.emit(event);

    }

    setClassNames() {
        const classNames = [`thy-switch-${this.type}`];
        if (this.size) {
            classNames.push(`thy-switch-${this.size}`);
        }
        this.updateHostClassService.updateClass(classNames);
    }

}

