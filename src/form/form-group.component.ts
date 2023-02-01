import { ThyTranslate } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    HostBinding,
    Input,
    OnInit,
    Optional,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';

import { ThyFormDirective } from './form.directive';

const internalIconMap = {
    date: 'wtf wtf-schedule-o'
};

type TipsMode = 'default' | 'label';

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
    feedbackSvgIconName: string;
    tips: string;
    tipMode: TipsMode = 'default';

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
        this.labelRequired = coerceBooleanProperty(value);
    }

    @Input()
    set thyLabelPaddingTopClear(value: string) {
        this.labelPaddingTopClear = coerceBooleanProperty(value);
    }

    @Input()
    set thyFeedbackIcon(value: string) {
        this.hasFeedback = true;
        if (internalIconMap[value]) {
            this.feedbackIcon = internalIconMap[value];
            this.feedbackSvgIconName = null;
        } else {
            this.feedbackSvgIconName = value;
            this.feedbackIcon = null;
        }
    }

    @Input()
    set thyTipsMode(mode: TipsMode) {
        this.tipMode = mode;
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
        this._rowFill = coerceBooleanProperty(value);
    }

    /**
     * @deprecated please use content because formGroup is same name with angular formGroup directive
     */
    @ContentChild('formGroup')
    public contentTemplateRef: TemplateRef<any>;

    @ContentChild('content')
    public contentTemplate: TemplateRef<any>;

    constructor(@Optional() private thyParentForm: ThyFormDirective, private thyTranslate: ThyTranslate) {}

    ngOnInit() {
        this.isHorizontal = this.thyParentForm ? this.thyParentForm.isHorizontal : true;
    }
}
