import { Component, OnInit, HostBinding, HostListener, Input, Optional, ChangeDetectorRef } from '@angular/core';
import { ThyTranslate } from 'ngx-tethys/core';
import { ThyRadioGroupComponent } from './../group/radio-group.component';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyRadioComponent } from '../radio.component';

/**
 * @name [thy-radio-button],[thyRadioButton]
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[thy-radio-button],[thyRadioButton]',
    templateUrl: './radio-button.component.html',
    standalone: true,
    host: {
        '[attr.tabindex]': `tabIndex`
    }
})
export class ThyRadioButtonComponent extends ThyRadioComponent implements OnInit {
    @HostBinding('class.btn') isButton = true;
    @HostBinding('class.active') isActive = false;
    @HostBinding('class.disabled') get isDisabled() {
        return this._disabled;
    }

    name: string;

    @Input() thyValue: string;

    set thyChecked(value: boolean) {
        this.isActive = !!value;
        this.writeValue(coerceBooleanProperty(value));
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
        if (!this._disabled) {
            this.change();
        }
    }
}
