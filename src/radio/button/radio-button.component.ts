import {
    Component,
    forwardRef,
    OnInit,
    HostBinding,
    HostListener,
    Input,
    Optional
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyTranslate } from '../../shared';
import { ThyFormCheckBaseComponent } from '../../shared';
import { ThyRadioGroupComponent } from './../group/radio-group.component';
import { inputValueToBoolean } from '../../util/helpers';

@Component({
    selector: '[thy-radio-button],[thyRadioButton]',
    templateUrl: './radio-button.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyRadioButtonComponent),
            multi: true
        }
    ]
})
export class ThyRadioButtonComponent extends ThyFormCheckBaseComponent
    implements OnInit {
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
        @Optional() private thyRadioGroupComponent: ThyRadioGroupComponent
    ) {
        super(thyTranslate);
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

    change() {
        if (this.thyRadioGroupComponent) {
            this.thyRadioGroupComponent.updateValue(this.thyValue, true);
        } else {
            this.updateValue(!this._innerValue);
        }
    }
}
