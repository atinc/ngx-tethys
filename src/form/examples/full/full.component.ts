import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { FormsModule } from '@angular/forms';
import { ThyFormSubmitDirective, ThyFormGroupFooter, ThyFormDirective, ThyFormGroup } from 'ngx-tethys/form';
import { ThyRadioGroup, ThyRadioButton, ThyRadio } from 'ngx-tethys/radio';
import { ThyInputGroup, ThyInputDirective } from 'ngx-tethys/input';
import { ThyCascader } from 'ngx-tethys/cascader';
import { ThyRangePicker, DatePickerRequiredValidator, ThyDatePicker } from 'ngx-tethys/date-picker';
import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { ThyNativeSelect } from 'ngx-tethys/select';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyButton } from 'ngx-tethys/button';

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
    selector: 'thy-form-full-example',
    templateUrl: './full.component.html',
    imports: [
        FormsModule,
        ThyFormDirective,
        ThyFormGroup,
        ThyInputDirective,
        ThyNativeSelect,
        ThyCascader,
        ThyInputGroup,
        ThyIcon,
        ThyDatePicker,
        DatePickerRequiredValidator,
        ThyRangePicker,
        ThyCheckbox,
        ThyRadio,
        ThyRadioGroup,
        ThyRadioButton,
        ThyFormGroupFooter,
        ThyButton,
        ThyFormSubmitDirective
    ]
})
export class ThyFormFullExampleComponent implements OnInit {
    submitSuccess = false;

    provinceCities = provinceCities;

    /** ngModel value */
    values: string[] = null;

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

    date = { date: new TinyDate()?.nativeDate, with_time: 0 };

    dateNull: number = null;

    dateRange: any = null;

    constructor() {}

    ngOnInit(): void {}

    save(form: any) {
        console.log(`submit success!`);
        this.submitSuccess = true;
    }

    onChanges(event: Event) {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
