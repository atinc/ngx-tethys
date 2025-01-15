import { ThyFormValidatorConfig, ThyValidateOn } from 'ngx-tethys/form';

import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TinyDate } from 'ngx-tethys/util';

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
    private formBuilder = inject(FormBuilder);

    submitSuccess = false;

    provinceCities = provinceCities;

    /** ngModel value */
    values: string[] = null;

    model = {
        name: '',
        display_name: '',
        select: 1,
        group: 1,
        switch: '',
        color: '',
        slider: 0,
        radio: '',
        radioButton: '',
        checkbox: false
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

    date = { date: new TinyDate().nativeDate, with_time: 0 };

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
                required: 'Please enter the username',
                pattern:
                    'It must be composed of letters, numbers, and underscores. The first letter cannot be a number. It must be 2-20 characters.'
            },
            dateRange: {
                error: 'This option is required'
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

    constructor() {
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
                rate: [0, [Validators.min(2)]],
                switch: [false, [Validators.required]],
                color: ['', [Validators.required]],
                textarea: ['', [Validators.required]],
                province: ['', [Validators.required]],
                dateFull: ['', [Validators.required]],
                dateRange: ['', [this.dateRangeValidator]],
                radioGroup: ['', [Validators.required]],
                radio: ['', [Validators.required]],
                slider: [0, [Validators.min(10)]],
                checkbox: ['', [Validators.requiredTrue]]
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
        console.log(this.model);
        console.log(`submit success!`, this.formGroup);
        this.submitSuccess = true;
    }

    onChanges(event: Event) {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
