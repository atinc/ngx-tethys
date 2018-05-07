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
import { ThyTranslate } from '../shared';

const internalIconMap = {
    date: 'wtf wtf-schedule-o'
};

@Component({
    selector: 'thy-form-group',
    templateUrl: './form-group.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyFormGroupComponent implements OnInit {

    public labelText: string;

    public labelRequired: boolean;

    public feedbackIcon: string;

    @HostBinding('class.form-group') _isFormGroup = true;

    @HostBinding('class.row') _isRow = true;

    @HostBinding('class.has-feedback') hasFeedback = false;

    @Input()
    set thyLabelText(value: string) {
        this.labelText = value;
    }

    @Input()
    set thyLabelTranslateKey(value: string) {
        if (value) {
            this.labelText = this.thyTranslate.instant(value);
        } else {
            this.labelText = '';
        }
    }

    @Input()
    set thyLabelRequired(value: string) {
        this.labelRequired = inputValueToBoolean(value);
    }

    @Input()
    set thyFeedbackIcon(value: string) {
        this.hasFeedback = true;
        if (internalIconMap[value]) {
            this.feedbackIcon = internalIconMap[value];
        } else {
            this.feedbackIcon = value;
        }
    }

    @Input() thyTips: string;

    @ContentChild('formGroup')
    public contentTemplateRef: TemplateRef<any>;

    constructor(
        @Optional() private thyFormDirective: ThyFormDirective,
        private thyTranslate: ThyTranslate
    ) {
    }

    ngOnInit() {
    }
}
