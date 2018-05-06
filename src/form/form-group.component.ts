import {
    Component,
    HostBinding,
    Optional,
    Input,
    ViewEncapsulation,
    ContentChild,
    OnInit
} from '@angular/core';
import { ThyFormDirective } from './form.directive';
import { inputValueToBoolean } from '../util/helpers';
import { TemplateRef } from '@angular/core';

@Component({
    selector: 'thy-form-group',
    templateUrl: './form-group.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyFormGroupComponent implements OnInit {

    public labelRequired: boolean;

    @HostBinding('class.form-group') _isFormGroup = true;

    @Input() thyLabelText: string;

    @Input() thyLabelTranslateKey: string;

    @Input()
    set thyLabelRequired(value: string) {
        this.labelRequired = inputValueToBoolean(value);
    }

    @Input() thyTips: string;

    @ContentChild('formGroup')
    public contentTemplateRef: TemplateRef<any>;

    constructor(
        @Optional() thyFormDirective: ThyFormDirective
    ) {
    }

    ngOnInit() {
    }
}
