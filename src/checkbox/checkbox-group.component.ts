import { Component, forwardRef, HostBinding, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyTranslate } from 'ngx-tethys/core';
import { ThyFormCheckBaseComponent } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-checkbox-group',
    templateUrl: './checkbox-group.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyCheckboxGroupComponent),
            multi: true
        }
    ]
})
export class ThyCheckboxGroupComponent extends ThyFormCheckBaseComponent {
    // The internal data model
    _innerValue: any = null;

    @HostBinding('class.form-check-group')
    @Input()
    thyLabelTextKey: string = 'name';

    constructor(private elementRef: ElementRef, thyTranslate: ThyTranslate) {
        super(thyTranslate);
    }
}
