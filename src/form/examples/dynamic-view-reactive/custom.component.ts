import { Component, Directive, Input, TemplateRef, Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SafeAny } from 'ngx-tethys/types';

export interface PropertyInfo {
    key?: string;
    name?: string;
    placeholder?: string;
    formControl?: FormControl;
    schema?: Type<SafeAny> | TemplateRef<SafeAny>;
}

@Directive()
export class ThyFormCustomBaseExample {
    protected _property: PropertyInfo;

    @Input()
    set property(val: PropertyInfo) {
        this._property = val;
    }

    get property() {
        return this._property;
    }
}

@Component({
    selector: 'thy-form-custom-input-example',
    template: ` <input
        thyInput
        [attr.name]="property.key"
        [formControl]="property.formControl"
        [placeholder]="property.placeholder || ''" />`
})
export class ThyFormCustomInputExampleComponent extends ThyFormCustomBaseExample {}

@Component({
    selector: 'thy-form-custom-tree-select-example',
    template: ` <thy-tree-select
        [thyTreeNodes]="basicTreeSelectData"
        [attr.name]="property.key"
        [formControl]="property.formControl"
        [thyShowSearch]="true"
        [thyAllowClear]="true">
    </thy-tree-select>`
})
export class ThyFormCustomTreeSelectExampleComponent extends ThyFormCustomBaseExample {
    basicTreeSelectData = [
        {
            _id: 'epic-001',
            name: '史诗',
            level: 0,
            icon: 'epic-square-fill',
            children: [
                {
                    _id: 'feature-001',
                    name: '特性',
                    level: 1,
                    icon: 'feature-square-fill',
                    children: [
                        {
                            _id: 'user-story-001',
                            name: '用户故事',
                            level: 2,
                            icon: 'user-story-square-fill'
                        }
                    ]
                }
            ]
        },
        {
            _id: 'epic-002',
            name: '另一个史诗',
            level: 0,
            icon: 'epic-square-fill',
            children: []
        }
    ];
}

@Component({
    selector: 'thy-form-custom-tree-select-multi-example',
    template: `<thy-tree-select
        [thyTreeNodes]="basicTreeSelectData"
        [attr.name]="property.key"
        [formControl]="property.formControl"
        [thyMultiple]="true"
        [thyShowSearch]="true"
        [thyAllowClear]="true">
    </thy-tree-select>`
})
export class ThyFormCustomTreeSelectMultiExampleComponent extends ThyFormCustomBaseExample {
    basicTreeSelectData = [
        {
            _id: 'epic-001',
            name: '史诗',
            level: 0,
            icon: 'epic-square-fill',
            children: [
                {
                    _id: 'feature-001',
                    name: '特性',
                    level: 1,
                    icon: 'feature-square-fill',
                    children: [
                        {
                            _id: 'user-story-001',
                            name: '用户故事',
                            level: 2,
                            icon: 'user-story-square-fill'
                        }
                    ]
                }
            ]
        },
        {
            _id: 'epic-002',
            name: '另一个史诗',
            level: 0,
            icon: 'epic-square-fill',
            children: []
        }
    ];
}

@Component({
    selector: 'thy-form-custom-multi-select-example',
    template: ` <thy-custom-select
        [attr.name]="property.key"
        [formControl]="property.formControl"
        [thyPlaceHolder]="property.placeholder || ''"
        [thyMode]="'multiple'"
        [thyShowSearch]="true"
        [thyAllowClear]="true">
        <thy-option *ngFor="let option of listOfOption" [thyValue]="option.value" [thyLabelText]="option.text"> </thy-option
    ></thy-custom-select>`
})
export class ThyFormCustomMultiSelectExampleComponent extends ThyFormCustomBaseExample {
    listOfOption = [
        { value: 'option1', text: '选项一' },
        { value: 'option2', text: '选项二' },
        { value: 'option3', text: '选项三' },
        { value: 'option4', text: '选项四' },
        { value: 'option5', text: '选项五' }
    ];
}

@Component({
    selector: 'thy-form-custom-select-example',
    template: ` <thy-custom-select
        [attr.name]="property.key"
        [formControl]="property.formControl"
        [thyPlaceHolder]="property.placeholder || ''"
        [thyShowSearch]="true"
        [thyAllowClear]="true">
        <thy-option *ngFor="let option of listOfOption" [thyValue]="option.value" [thyLabelText]="option.text"> </thy-option
    ></thy-custom-select>`
})
export class ThyFormCustomSelectExampleComponent extends ThyFormCustomBaseExample {
    listOfOption = [
        { value: 'option1', text: '选项一' },
        { value: 'option2', text: '选项二' },
        { value: 'option3', text: '选项三' },
        { value: 'option4', text: '选项四' },
        { value: 'option5', text: '选项五' }
    ];
}

@Component({
    selector: 'thy-form-custom-search-example',
    template: `
        <thy-input-search
            [attr.name]="property.key"
            [formControl]="property.formControl"
            [placeholder]="property.placeholder || ''"></thy-input-search>
    `
})
export class ThyFormCustomSearchExampleComponent extends ThyFormCustomBaseExample {}

@Component({
    selector: 'thy-form-custom-number-example',
    template: `<thy-input-number
        [attr.name]="property.key"
        [formControl]="property.formControl"
        [thyPlaceholder]="property.placeholder || ''"></thy-input-number>`
})
export class ThyFormCustomNumberExampleComponent extends ThyFormCustomBaseExample {}

@Component({
    selector: 'thy-form-custom-switch-example',
    template: `<thy-switch [attr.name]="property.key" [formControl]="property.formControl"></thy-switch>`
})
export class ThyFormCustomSwitchExampleComponent extends ThyFormCustomBaseExample {}

@Component({
    selector: 'thy-form-custom-radio-example',
    template: `<thy-radio-group [attr.name]="property.key" [formControl]="property.formControl" thyLayout="flex">
        <label thyRadio thyLabelText="Option1" thyValue="1"></label>
        <label thyRadio thyLabelText="Option2" thyValue="2"></label>
        <label thyRadio thyLabelText="Option3" thyValue="3"></label>
    </thy-radio-group>`
})
export class ThyFormCustomRadioExampleComponent extends ThyFormCustomBaseExample {}

@Component({
    selector: 'thy-form-custom-radio-button-example',
    template: `<thy-radio-group [attr.name]="property.key" [formControl]="property.formControl" thyLayout="flex">
        <label thyRadioButton thyLabelText="Option1" thyValue="1"></label>
        <label thyRadioButton thyLabelText="Option2" thyValue="2"></label>
        <label thyRadioButton thyLabelText="Option3" thyValue="3"></label>
    </thy-radio-group>`
})
export class ThyFormCustomRadioButtonExampleComponent extends ThyFormCustomBaseExample {}

@Component({
    selector: 'thy-form-custom-checkbox-example',
    template: ` <label thyCheckbox [attr.name]="property.key" [formControl]="property.formControl" thyLabelText="Option1"></label>`
})
export class ThyFormCustomCheckboxExampleComponent extends ThyFormCustomBaseExample {}

@Component({
    selector: 'thy-form-custom-color-example',
    template: ` <div
        style="border: 1px solid #ccc; width: 30px; height: 30px; border-radius: 4px; vertical-align: center"
        thyColorPicker
        [ngStyle]="{ background: property.formControl.value }"
        [thyOffset]="10"
        [attr.name]="property.key"
        [formControl]="property.formControl"></div>`
})
export class ThyFormCustomColorExampleComponent extends ThyFormCustomBaseExample {}

@Component({
    selector: 'thy-form-custom-slider-example',
    template: ` <thy-slider [attr.name]="property.key" [formControl]="property.formControl"></thy-slider> `
})
export class ThyFormCustomSliderExampleComponent extends ThyFormCustomBaseExample {}

@Component({
    selector: 'thy-form-custom-cascader-example',
    template: ` <thy-cascader
        [thyOptions]="provinceCities"
        [attr.name]="property.key"
        [formControl]="property.formControl"
        style="width: 200px">
    </thy-cascader>`
})
export class ThyFormCustomCascaderExampleComponent extends ThyFormCustomBaseExample {
    provinceCities = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                        {
                            value: 'xihu',
                            label: 'West Lake',
                            isLeaf: true
                        }
                    ]
                },
                {
                    value: 'ningbo',
                    label: 'Ningbo',
                    isLeaf: true
                }
            ]
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    disabled: true,
                    children: [
                        {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                            isLeaf: true
                        }
                    ]
                }
            ]
        },
        {
            value: 'henan',
            label: 'Henan',
            disabled: true,
            children: [
                {
                    value: 'zhengzhou',
                    label: 'Zhengzhou',
                    children: [
                        {
                            value: 'zhoukou',
                            label: 'Zoukou',
                            isLeaf: true
                        }
                    ]
                }
            ]
        }
    ];
}

@Component({
    selector: 'thy-form-custom-textarea-example',
    template: `
        <textarea
            [attr.name]="property.key"
            rows="3"
            class="form-control"
            [placeholder]="property.placeholder"
            [formControl]="property.formControl"></textarea>
    `
})
export class ThyFormCustomTextareaExampleComponent extends ThyFormCustomBaseExample {}

@Component({
    selector: 'thy-form-custom-date-full-example',
    template: ` <thy-date-picker [attr.name]="property.key" [formControl]="property.formControl"></thy-date-picker> `
})
export class ThyFormCustomDateFullExampleComponent extends ThyFormCustomBaseExample {}

@Component({
    selector: 'thy-form-custom-date-range-example',
    template: ` <thy-range-picker [attr.name]="property.key" [formControl]="property.formControl"></thy-range-picker> `
})
export class ThyFormCustomDateRangeExampleComponent extends ThyFormCustomBaseExample {}

@Component({
    selector: 'thy-form-custom-rate-example',
    template: ` <thy-rate [attr.name]="property.key" [formControl]="property.formControl"></thy-rate> `
})
export class ThyFormCustomRateExampleComponent extends ThyFormCustomBaseExample {}

export const THY_FORM_CUSTOM_EXAMPLE_COMPONENTS = [
    ThyFormCustomInputExampleComponent,
    ThyFormCustomTreeSelectExampleComponent,
    ThyFormCustomTreeSelectMultiExampleComponent,
    ThyFormCustomSelectExampleComponent,
    ThyFormCustomMultiSelectExampleComponent,
    ThyFormCustomSearchExampleComponent,
    ThyFormCustomNumberExampleComponent,
    ThyFormCustomSwitchExampleComponent,
    ThyFormCustomRadioExampleComponent,
    ThyFormCustomRadioButtonExampleComponent,
    ThyFormCustomCheckboxExampleComponent,
    ThyFormCustomColorExampleComponent,
    ThyFormCustomSliderExampleComponent,
    ThyFormCustomCascaderExampleComponent,
    ThyFormCustomTextareaExampleComponent,
    ThyFormCustomDateFullExampleComponent,
    ThyFormCustomDateRangeExampleComponent,
    ThyFormCustomRateExampleComponent
];
