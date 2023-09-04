import { ThyFormValidatorConfig, ThyValidateOn } from 'ngx-tethys/form';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const provinceCities = [
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

@Component({
    selector: 'thy-form-reactive-example',
    templateUrl: './reactive.component.html'
})
export class ThyFormReactiveExampleComponent implements OnInit {
    submitSuccess = false;

    provinceCities = provinceCities;

    /** ngModel value */
    values: string[] = null;

    color: '';

    slider = 0;

    model = {
        name: '',
        display_name: '',
        select: 1,
        checkbox: 0,
        group: 1
    };

    options = [
        {
            _id: 1,
            value: 'Option1'
        },
        {
            _id: 2,
            value: 'Option2'
        }
    ];

    date = { date: new Date(), with_time: 0 };

    dateNull: number = null;

    dateRange: any = null;

    formGroup: FormGroup;

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

    validateConfig: ThyFormValidatorConfig = {
        validationMessages: {
            username: {
                required: '请输入用户名',
                pattern: '用户名格式不正确，以字母，数字，下划线组成，首字母不能为数字，必须是2-20个字符'
            },
            dateRange: {
                error: '该选项不能为空'
            }
        },
        validateOn: this.validateOn
    };

    loadingDone = false;

    listOfOption = [
        { value: 'option1', text: '选项一' },
        { value: 'option2', text: '选项二' },
        { value: 'option3', text: '选项三' },
        { value: 'option4', text: '选项四' },
        { value: 'option5', text: '选项五' }
    ];

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
                            icon: 'user-story-square-fill',
                            children: []
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

    dateRangeValidator = (control: any) => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (!control.value?.begin || !control.value?.end) {
            return { error: true, required: true };
        }
        return {};
    };

    constructor(private formBuilder: FormBuilder) {
        this.initFormGroup();
        this.loadingDone = true;
    }

    initFormGroup(updateOn = 'change') {
        this.formGroup = this.formBuilder.group(
            {
                username: ['', [Validators.required, Validators.pattern('^[A-Za-z]{1}[0-9A-Za-z_]{1,19}')]],
                input: ['', [Validators.required]],
                search: ['', [Validators.required]],
                number: ['', [Validators.required]],
                customersSelect: ['', [Validators.required]],
                customersMultiSelect: [[], [Validators.required]],
                treeSelect: ['', [Validators.required]],
                treeSelectMulti: [[], [Validators.required]],
                rate: ['', [Validators.required]],
                switch: ['', [Validators.required]],
                textarea: ['', [Validators.required]],
                province: ['', [Validators.required]],
                dateFull: ['', [Validators.required]],
                dateRange: ['', [this.dateRangeValidator]],
                radioGroup: ['', [Validators.required]]
            },
            { updateOn }
        );
        this.formGroup.valueChanges.subscribe(data => {
            console.log(data);
        });
    }

    ngOnInit(): void {}

    changeUpdateOn(value: string) {
        this.loadingDone = false;
        this.validateConfig.validateOn = this.validateOn;
        this.initFormGroup(this.updateOn);
        setTimeout(() => {
            this.loadingDone = true;
        }, 100);
    }

    save() {
        console.log(`submit success!`, this.formGroup);
        this.submitSuccess = true;
    }

    onChanges(event: Event) {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
