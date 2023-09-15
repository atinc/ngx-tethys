import { Component, OnInit, ViewChild } from '@angular/core';
import {
    PropertyInfo,
    ThyFormCustomCascaderExampleComponent,
    ThyFormCustomCheckboxExampleComponent,
    ThyFormCustomColorExampleComponent,
    ThyFormCustomDateFullExampleComponent,
    ThyFormCustomDateRangeExampleComponent,
    ThyFormCustomInputExampleComponent,
    ThyFormCustomMultiSelectExampleComponent,
    ThyFormCustomNumberExampleComponent,
    ThyFormCustomRadioButtonExampleComponent,
    ThyFormCustomRadioExampleComponent,
    ThyFormCustomRateExampleComponent,
    ThyFormCustomSearchExampleComponent,
    ThyFormCustomSelectExampleComponent,
    ThyFormCustomSliderExampleComponent,
    ThyFormCustomSwitchExampleComponent,
    ThyFormCustomTextareaExampleComponent,
    ThyFormCustomTreeSelectExampleComponent,
    ThyFormCustomTreeSelectMultiExampleComponent
} from './custom.component';
import { createFormControl, ThyFormDirective, ThyFormValidatorConfig, ThyValidateOn } from 'ngx-tethys/form';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
    selector: 'thy-form-dynamic-view-reactive-example',
    templateUrl: './dynamic-view-reactive.component.html'
})
export class ThyFormDynamicViewReactiveExampleComponent implements OnInit {
    @ViewChild('reactiveThyForm') thyForm: ThyFormDirective;

    @ViewChild('reactiveForm') ngForm: FormGroupDirective;

    submitSuccess = false;

    updateOnList = [
        {
            value: 'change',
            text: 'change'
        },
        {
            value: 'blur',
            text: 'blur'
        },
        {
            value: 'submit',
            text: 'submit'
        }
    ];

    updateOn: ThyValidateOn = 'change';

    validateOn: ThyValidateOn = 'blur';

    loadingDone = true;

    validateConfig: ThyFormValidatorConfig = {
        validationMessages: {
            username: {
                required: '请输入用户名',
                pattern: '用户名格式不正确，以字母，数字，下划线组成，首字母不能为数字，必须是2-20个字符'
            },
            dateRange: {
                error: '该选项不能为空'
            },
            checkbox: {
                canNotBeFalsy: '该选项不能为空或是 false'
            },
            switch: {
                canNotBeFalsy: '该选项不能为空或是 false'
            }
        },
        validateOn: this.validateOn
    };

    formGroup: FormGroup;

    properties: PropertyInfo[];

    constructor() {}
    ngOnInit() {
        this.initFormGroup();
    }

    initFormGroup(updateOn: ThyValidateOn = 'change') {
        this.properties = [
            {
                key: 'input',
                name: 'Input',
                placeholder: '请输入',
                formControl: createFormControl('input', '', {
                    updateOn: updateOn,
                    validators: [Validators.required]
                }),
                schema: ThyFormCustomInputExampleComponent
            },
            {
                key: 'treeSelect',
                name: 'TreeSelect',
                placeholder: '请选择',
                formControl: createFormControl('treeSelect', '', {
                    updateOn: updateOn,
                    validators: [Validators.required]
                }),
                schema: ThyFormCustomTreeSelectExampleComponent
            },
            {
                key: 'username',
                name: 'Username',
                placeholder: '请输入用户名',
                formControl: createFormControl('username', '', {
                    updateOn: updateOn,
                    validators: [Validators.required, Validators.pattern('^[A-Za-z]{1}[0-9A-Za-z_]{1,19}')]
                }),
                schema: ThyFormCustomInputExampleComponent
            },
            {
                key: 'customSelect',
                name: 'CustomSelect',
                placeholder: '请选择',
                formControl: createFormControl('customSelect', '', {
                    updateOn: updateOn,
                    validators: [Validators.required]
                }),
                schema: ThyFormCustomSelectExampleComponent
            },
            {
                key: 'search',
                name: 'Search',
                placeholder: '请输入',
                formControl: createFormControl('search', '', {
                    updateOn: updateOn,
                    validators: [Validators.required]
                }),
                schema: ThyFormCustomSearchExampleComponent
            },
            {
                key: 'number',
                name: 'Number',
                placeholder: '请输入',
                formControl: createFormControl('number', '', {
                    updateOn: updateOn,
                    validators: [Validators.required]
                }),
                schema: ThyFormCustomNumberExampleComponent
            },
            {
                key: 'customMultiSelect',
                name: 'CustomMultiSelect',
                placeholder: '请选择',
                formControl: createFormControl('customMultiSelect', [], {
                    updateOn: updateOn,
                    validators: [Validators.required]
                }),
                schema: ThyFormCustomMultiSelectExampleComponent
            },
            {
                key: 'treeSelectMulti',
                name: 'TreeSelectMulti',
                placeholder: '请选择',
                formControl: createFormControl('treeSelectMulti', [], {
                    updateOn: updateOn,
                    validators: [Validators.required]
                }),
                schema: ThyFormCustomTreeSelectMultiExampleComponent
            },
            {
                key: 'switch',
                name: 'switch',
                formControl: createFormControl('switch', false, {
                    updateOn: updateOn,
                    validators: [this.canNotBeFalsyValidator]
                }),
                schema: ThyFormCustomSwitchExampleComponent
            },
            {
                key: 'radio',
                name: 'Radio',
                formControl: createFormControl('radio', '', {
                    updateOn: updateOn,
                    validators: [Validators.required]
                }),
                schema: ThyFormCustomRadioExampleComponent
            },
            {
                key: 'checkbox',
                name: 'Checkbox',
                formControl: createFormControl('checkbox', '', {
                    updateOn: updateOn,
                    validators: [this.canNotBeFalsyValidator]
                }),
                schema: ThyFormCustomCheckboxExampleComponent
            },
            {
                key: 'radioGroup',
                name: 'RadioGroup',
                formControl: createFormControl('radioGroup', '', {
                    updateOn: updateOn,
                    validators: [Validators.required]
                }),
                schema: ThyFormCustomRadioButtonExampleComponent
            },
            {
                key: 'color',
                name: 'Color',
                formControl: createFormControl('color', '', {
                    updateOn: updateOn,
                    validators: [Validators.required]
                }),
                schema: ThyFormCustomColorExampleComponent
            },
            {
                key: 'slider',
                name: 'Slider',
                formControl: createFormControl('slider', '', {
                    updateOn: updateOn,
                    validators: [Validators.min(10)]
                }),
                schema: ThyFormCustomSliderExampleComponent
            },
            {
                key: 'rate',
                name: 'Rate',
                placeholder: '请输入',
                formControl: createFormControl('rate', 0, {
                    updateOn: updateOn,
                    validators: [Validators.min(2)]
                }),
                schema: ThyFormCustomRateExampleComponent
            },
            {
                key: 'province',
                name: 'Province',
                placeholder: '请选择',
                formControl: createFormControl('province', '', {
                    updateOn: updateOn,
                    validators: [Validators.required]
                }),
                schema: ThyFormCustomCascaderExampleComponent
            },
            {
                key: 'textarea',
                name: 'Textarea',
                placeholder: '请输入',
                formControl: createFormControl('textarea', '', {
                    updateOn: updateOn,
                    validators: [Validators.required]
                }),
                schema: ThyFormCustomTextareaExampleComponent
            },
            {
                key: 'dateFull',
                name: 'DateFull',
                placeholder: '请选择日期',
                formControl: createFormControl('dateFull', '', {
                    updateOn: updateOn,
                    validators: [Validators.required]
                }),
                schema: ThyFormCustomDateFullExampleComponent
            },
            {
                key: 'dateRange',
                name: 'DateRange',
                formControl: createFormControl('dateRange', '', {
                    updateOn: updateOn,
                    validators: [this.dateRangeValidator]
                }),
                schema: ThyFormCustomDateRangeExampleComponent
            }
        ];

        /**
         * build group 两种方式
         */

        // 1. 对象方式
        const controls = {};
        this.properties.forEach(property => {
            controls[property.key] = property.formControl;
            property.formControl.valueChanges.subscribe(val => {
                console.log(`valur changed ${property.key}`, val, property.formControl);
            });
        });

        // 2. 数组方式
        // const controls: FormControl[] = [];
        // this.properties.forEach(property => {
        //     controls.push(property.formControl);
        // });

        this.formGroup = new FormGroup(controls);

        this.formGroup.valueChanges.subscribe(data => {
            console.log(`formGroup.valueChanges`, data);
        });
    }

    changeUpdateOn(value: string) {
        this.loadingDone = false;
        this.validateConfig.validateOn = this.validateOn;
        this.initFormGroup(this.updateOn);
        setTimeout(() => {
            this.loadingDone = true;
        }, 100);
    }

    dateRangeValidator = (control: any) => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (!control.value?.begin || !control.value?.end) {
            return { error: true, required: true };
        }
        return {};
    };

    canNotBeFalsyValidator = (control: any) => {
        if (!control.value) {
            return { canNotBeFalsy: true };
        }
        return {};
    };

    save() {
        console.log(`submit success!`, this.formGroup);
        this.submitSuccess = true;
    }
}
