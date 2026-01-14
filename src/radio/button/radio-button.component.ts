import { Component, OnInit, HostBinding, HostListener, input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ThyRadio } from '../radio.component';
import { IThyRadioComponent } from '../radio.token';

/**
 * @name [thy-radio-button],[thyRadioButton]
 */
@Component({
    selector: '[thy-radio-button],[thyRadioButton]',
    templateUrl: './radio-button.component.html',
    host: {
        '[attr.tabindex]': `tabIndex`
    }
})
export class ThyRadioButton extends ThyRadio implements OnInit {
    @HostBinding('class.btn') isButton = true;
    @HostBinding('class.active') isActive = false;
    @HostBinding('class.disabled') get isDisabled() {
        return this._disabled;
    }

    name!: string;

    readonly thyValue = input<string>();

    set thyChecked(value: boolean) {
        this.isActive = !!value;
        this.writeValue(coerceBooleanProperty(value));
    }

    ngOnInit() {
        this._isFormCheck = false;
        if (this.thyRadioGroupComponent) {
            this.thyRadioGroupComponent.addRadio(this as IThyRadioComponent);
            this.thyRadioGroupComponent.setGroup();
        }
    }

    @HostListener('click', ['$event'])
    click($event: MouseEvent) {
        if (!this._disabled) {
            this.change();
        }
    }
}
