import {
    Component,
    forwardRef,
    OnInit,
    HostBinding,
    HostListener,
    Input,
    Optional,
    ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyTranslate } from '../../shared';
import { ThyFormCheckBaseComponent } from '../../shared';
import { ThyRadioGroupComponent } from './../group/radio-group.component';
import { inputValueToBoolean } from '../../util/helpers';
import { ThyRadioComponent } from '../radio.component';

@Component({
    selector: '[thy-radio-button],[thyRadioButton]',
    templateUrl: './radio-button.component.html'
})
export class ThyRadioButtonComponent extends ThyRadioComponent implements OnInit {
    @HostBinding('class.btn') isButton = true;
    @HostBinding('class.active') isActive = false;

    name: string;

    @Input() thyValue: string;

    set thyChecked(value: boolean) {
        this.isActive = !!value;
        this.writeValue(inputValueToBoolean(value));
    }

    constructor(
        thyTranslate: ThyTranslate,
        @Optional() thyRadioGroupComponent: ThyRadioGroupComponent,
        changeDetectorRef: ChangeDetectorRef
    ) {
        super(thyTranslate, thyRadioGroupComponent, changeDetectorRef);
    }

    ngOnInit() {
        this._isFormCheck = false;
        if (this.thyRadioGroupComponent) {
            this.thyRadioGroupComponent.addRadio(this);
            this.thyRadioGroupComponent.setGroup();
        }
    }

    @HostListener('click', ['$event'])
    click($event: MouseEvent) {
        this.change();
    }
}
