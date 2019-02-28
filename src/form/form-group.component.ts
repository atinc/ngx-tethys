import {
    Component,
    HostBinding,
    Optional,
    Input,
    ViewEncapsulation,
    ContentChild,
    OnInit,
    ChangeDetectionStrategy
} from '@angular/core';
import { ThyFormDirective } from './form.directive';
import { inputValueToBoolean } from '../util/helpers';
import { TemplateRef } from '@angular/core';
import { ThyTranslate } from '../shared';
import { ThyFormLayout } from './form.class';
import { NgModel } from '@angular/forms';

const internalIconMap = {
    date: 'wtf wtf-schedule-o'
};

@Component({
    selector: 'thy-form-group',
    templateUrl: './form-group.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyFormGroupComponent implements OnInit {
    labelText: string;
    labelRequired = false;
    labelPaddingTopClear = false;
    feedbackIcon: string;
    tips: string;

    @HostBinding('class.row-fill') _rowFill = false;

    @HostBinding('class.form-group') _isFormGroup = true;

    @HostBinding('class.row') isHorizontal = true;

    @HostBinding('class.has-feedback') hasFeedback = false;

    @Input()
    set thyLabelText(value: string) {
        this.labelText = value;
    }

    @Input()
    set thyLabelTextTranslateKey(value: string) {
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
    set thyLabelPaddingTopClear(value: string) {
        this.labelPaddingTopClear = inputValueToBoolean(value);
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

    @Input()
    set thyTips(value: string) {
        this.tips = value;
    }

    @Input()
    set thyTipsTranslateKey(value: string) {
        this.tips = this.thyTranslate.instant(value);
    }

    @Input()
    set thyRowFill(value: boolean) {
        this._rowFill = inputValueToBoolean(value);
    }

    @ContentChild('formGroup')
    public contentTemplateRef: TemplateRef<any>;

    constructor(
        @Optional() private thyParentForm: ThyFormDirective,
        private thyTranslate: ThyTranslate
    ) {}

    ngOnInit() {
        this.isHorizontal = this.thyParentForm
            ? this.thyParentForm.isHorizontal
            : true;
    }
}
