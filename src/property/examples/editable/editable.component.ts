import { ThyDialog } from 'ngx-tethys/dialog';
import { ThySelectCustomComponent } from 'ngx-tethys/select';
import { ThyTreeSelectNode } from 'ngx-tethys/tree-select';

import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'thy-property-editable-example',
    templateUrl: './editable.component.html',
    styleUrls: ['./editable.component.scss'],
    host: {}
})
export class ThyPropertyEditableExampleComponent implements OnInit {
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

    @ViewChild('text', { read: ElementRef }) text: ElementRef;

    @ViewChild('number', { read: ElementRef }) number: ElementRef;

    @ViewChild('selectSex', { read: ThySelectCustomComponent }) selectSex: ThySelectCustomComponent;

    @ViewChild('selectProfession', { read: ThySelectCustomComponent }) selectProfession: ThySelectCustomComponent;

    constructor(public thyDialog: ThyDialog, private cdr: ChangeDetectorRef) {}

    ngOnInit() {}

    openTemplateDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template);
    }

    changeEditing(event: boolean, option?: { isSex?: boolean; isProfession?: boolean; type?: string }) {
        if (event && option && this.thyEditTrigger === 'click') {
            if (option.isSex) {
                setTimeout(() => {
                    this.selectSex.open();
                });
            }
            if (option.isProfession) {
                setTimeout(() => {
                    this.selectProfession.open();
                });
            }
            if (option.type === 'text') {
                setTimeout(() => {
                    this.text.nativeElement.focus();
                });
            }
            if (option.type === 'number') {
                setTimeout(() => {
                    this.number.nativeElement.focus();
                });
            }
            this.cdr.markForCheck();
        }
    }

    thyOnExpandStatusChange(event: boolean) {
        console.log('thyOnExpandStatusChange', event);
    }
}
