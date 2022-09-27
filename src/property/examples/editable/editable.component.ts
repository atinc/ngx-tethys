import { ThyDialog } from 'ngx-tethys/dialog';
import { ThyTreeSelectNode } from 'ngx-tethys/tree-select';

import { Component, OnInit, TemplateRef } from '@angular/core';

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

    constructor(public thyDialog: ThyDialog) {}

    ngOnInit() {}

    openTemplateDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template);
    }
}
