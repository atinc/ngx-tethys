import { Component, forwardRef, OnInit, Input, Optional, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyTranslate } from 'ngx-tethys/core';
import { ThyFormCheckBaseComponent } from 'ngx-tethys/shared';
import { ThyRadioGroup } from './group/radio-group.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgClass, NgIf } from '@angular/common';

/**
 * 单选框组件
 * @name thy-radio,[thyRadio]
 * @order 10
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[thy-radio],[thyRadio]',
    templateUrl: './radio.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyRadio),
            multi: true
        }
    ],
    host: {
        '[attr.tabindex]': `-1`
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, NgIf]
})
export class ThyRadio extends ThyFormCheckBaseComponent implements OnInit {
    name: string;

    /**
     * 当和 thy-radio-group 配合使用时的值，选中后的 NgModel 值
     */
    @Input() thyValue: string;

    set thyChecked(value: boolean) {
        this.writeValue(coerceBooleanProperty(value));
        this.changeDetectorRef.markForCheck();
    }

    constructor(
        public thyTranslate: ThyTranslate,
        @Optional() public thyRadioGroupComponent: ThyRadioGroup,
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
