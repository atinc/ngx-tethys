import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyListItem, ThySelectionList, ThySelectionListChange } from 'ngx-tethys/list';
import { ThyListOption } from 'ngx-tethys/shared';
import { ThyTransfer, TransferDirection } from 'ngx-tethys/transfer';

interface ThyTransferTemplateItem {
    _id: string;
    name: string;
    color: string;
    order?: number;
}
@Component({
    selector: 'thy-transfer-template-example',
    templateUrl: './template.component.html',
    imports: [ThyTransfer, ThySelectionList, FormsModule, ThyListOption, ThyIcon, ThyListItem]
})
export class ThyTransferTemplateExampleComponent implements OnInit {
    public selectedLeft: ThyTransferTemplateItem[] = [];
    transferData = [
        {
            _id: '5dd26d805f901d13de2eb964',
            name: '十二风华鉴',
            color: '#FFA415',
            direction: TransferDirection.right
        },
        {
            _id: '5dd26e335f901df42e2eb965',
            name: 'I won not stop',
            color: '#2DBCFF',
            direction: TransferDirection.right
        },
        {
            _id: '5dd36749fee6ad489db4a37a',
            name: 'ice-test2',
            color: '#56ABFB',
            direction: TransferDirection.right
        },
        {
            _id: '5dd387fe31eaf54e818c4967',
            name: '归档',
            color: '#56ABFB',
            direction: TransferDirection.left
        },
        {
            _id: '5dd65f03a756db4c55df6484',
            name: 'wt-rd-portal',
            color: '#56ABFB',
            direction: TransferDirection.left
        },
        {
            _id: '5dd6663e861eb1d9983c9db0',
            name: '测试关联项目',
            color: '#F6C659',
            direction: TransferDirection.left
        },
        {
            _id: '5ddde3d4f6b332f7e0177cd9',
            name: '测试导入',
            color: '#56ABFB',
            direction: TransferDirection.left
        },
        {
            _id: '5ddf416faceb2f5bdcf90911',
            name: 'xxx',
            color: '#56ABFB',
            direction: TransferDirection.left
        },
        {
            _id: '5ddf42ebe9afd3b1bd80f85f',
            name: 'Sprint 04',
            color: '#56ABFB',
            direction: TransferDirection.left
        },
        {
            _id: '5ddf44afe9afd3ea1a80f896',
            name: '【纯净】模板项目',
            color: '#F6C659',
            direction: TransferDirection.left
        }
    ];

    addedProjectData = [
        {
            _id: '5dd26d805f901d13de2eb964',
            name: '十二风华鉴',
            color: '#FFA415'
        },
        {
            _id: '5dd26e335f901df42e2eb965',
            name: 'I won not stop',
            color: '#2DBCFF'
        },
        {
            _id: '5dd36749fee6ad489db4a37a',
            name: 'ice-test2',
            color: '#56ABFB'
        }
    ];

    public selectRight: ThyTransferTemplateItem[] = [];

    constructor() {}

    ngOnInit() {}

    selectionChange(event: ThySelectionListChange) {
        const selected = this.selectRight.filter(item => {
            return item._id === event.value._id;
        });
        if (event.selected && selected.length === 0) {
            this.transferData = (this.transferData || []).map(item => {
                if (item._id === event.value._id) {
                    return { ...item, direction: TransferDirection.right };
                } else {
                    return item;
                }
            });
            this.selectRight = [...this.selectRight, event.value];
        } else {
            this.remove(event.value);
        }
    }

    remove(removeItem: ThyTransferTemplateItem) {
        this.selectRight = this.selectRight.filter(item => {
            return item._id !== removeItem._id;
        });
        if (this.selectedLeft) {
            this.selectedLeft = this.selectedLeft.filter(item => {
                return item._id !== removeItem._id;
            });
        }

        this.transferData = (this.transferData || []).map(item => {
            if (item._id === removeItem._id) {
                return { ...item, direction: TransferDirection.left };
            } else {
                return item;
            }
        });
    }
}
