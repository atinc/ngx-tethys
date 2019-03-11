import {
    Component,
    forwardRef,
    OnInit,
    HostBinding,
    HostListener,
    Input,
    ElementRef,
    Optional,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyTranslate } from '../shared';
import { ThyFormCheckBaseComponent } from '../shared';
import { ThyRadioGroupComponent } from './group/radio-group.component';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: '[thy-radio],[thyRadio]',
    templateUrl: './radio.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyRadioComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyRadioComponent extends ThyFormCheckBaseComponent implements OnInit {
    name: string;

    @Input() thyValue: string;

    set thyChecked(value: boolean) {
        this.writeValue(inputValueToBoolean(value));
        this.changeDetectorRef.markForCheck();
    }

    constructor(
        public thyTranslate: ThyTranslate,
        @Optional() public thyRadioGroupComponent: ThyRadioGroupComponent,
        changeDetectorRef: ChangeDetectorRef
    ) {
        super(thyTranslate, changeDetectorRef);
    }

    ngOnInit() {
        if (this.thyRadioGroupComponent) {
            this.thyRadioGroupComponent.addRadio(this);
        }
    }

    change() {
        if (this.thyRadioGroupComponent) {
            this.thyRadioGroupComponent.updateValue(this.thyValue, true);
        } else {
            this.updateValue(!this._innerValue);
        }
    }
}
