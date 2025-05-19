import { ThyDialog, ThyDialogBody, ThyDialogHeader } from 'ngx-tethys/dialog';
import { ThySelect } from 'ngx-tethys/select';
import { ThyTreeSelect, ThyTreeSelectNode } from 'ngx-tethys/tree-select';
import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, inject, viewChild } from '@angular/core';
import { ThyProperties, ThyPropertyItem } from 'ngx-tethys/property';
import { NgClass, NgTemplateOutlet, CommonModule } from '@angular/common';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { FormsModule } from '@angular/forms';
import { ThyPropertyEditableDateInnerComponent } from './date.component';
import { ThyOption } from 'ngx-tethys/shared';
import { ThyTag } from 'ngx-tethys/tag';
import { ThyCascader } from 'ngx-tethys/cascader';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyTimePicker } from 'ngx-tethys/time-picker';

@Component({
    selector: 'thy-property-editable-example',
    templateUrl: './editable.component.html',
    styleUrls: ['./editable.component.scss'],
    imports: [
        ThyProperties,
        ThyPropertyItem,
        ThyButtonGroup,
        ThySelect,
        ThyDialogHeader,
        ThyDialogBody,
        ThyTreeSelect,
        NgTemplateOutlet,
        ThyButton,
        NgClass,
        FormsModule,
        ThyPropertyEditableDateInnerComponent,
        ThyOption,
        ThyTag,
        ThyCascader,
        ThyInputNumber,
        ThyInputDirective,
        CommonModule,
        ThyTimePicker
    ]
})
export class ThyPropertyEditableExampleComponent implements OnInit {
    thyDialog = inject(ThyDialog);
    private cdr = inject(ChangeDetectorRef);

    user = {
        name: '张萌',
        phone: 18800010001,
        age: 24,
        department: {
            _id: '1-1',
            name: '研发团队1'
        },
        birth_date: 1234567890,
        address: '北京市朝阳区十八里店小区26号10001',
        likes: ['羽毛球'],
        sex: '女',
        profession: '教师',
        punch_time: 1234567890
    };

    departments: ThyTreeSelectNode[] = [
        {
            _id: '1',
            name: '研发',
            children: [
                {
                    _id: '1-1',
                    name: '研发团队1'
                }
            ]
        },
        {
            _id: '2',
            name: '销售',
            children: [
                {
                    _id: '2-1',
                    name: '销售团队1'
                }
            ]
        }
    ];

    public areaCode: any[] = [];

    public values: any[] = ['12', '1201', '120102'];

    public thyEditTrigger: 'click' | 'hover' = 'hover';

    readonly text = viewChild('text', { read: ElementRef });

    readonly number = viewChild('number', { read: ElementRef });

    readonly selectSex = viewChild('selectSex', { read: ThySelect });

    readonly selectProfession = viewChild('selectProfession', { read: ThySelect });

    ngOnInit() {}

    openTemplateDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template);
    }

    changeEditing(event: boolean, option?: { isSex?: boolean; isProfession?: boolean; type?: string }) {
        if (event && option && this.thyEditTrigger === 'click') {
            if (option.isSex) {
                setTimeout(() => {
                    this.selectSex().open();
                });
            }
            if (option.isProfession) {
                setTimeout(() => {
                    this.selectProfession().open();
                });
            }
            if (option.type === 'text') {
                setTimeout(() => {
                    this.text().nativeElement.focus();
                });
            }
            if (option.type === 'number') {
                setTimeout(() => {
                    this.number().nativeElement.focus();
                });
            }
            this.cdr.markForCheck();
        }
    }

    thyOnExpandStatusChange(event: boolean) {
        console.log('thyOnExpandStatusChange', event);
    }
}
