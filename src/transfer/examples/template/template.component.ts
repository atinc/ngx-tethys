import { Component, OnInit } from '@angular/core';
import { Direction, ThyTransferItem, TransferDirection } from 'ngx-tethys/transfer';
interface ThyTransferTemplateItem {
    _id: string;
    name: string;
    color: string;
    order?: number;
    [key: string]: any;
}
@Component({
    selector: 'thy-transfer-template-example',
    templateUrl: './template.component.html'
})
export class ThyTransferTemplateExampleComponent implements OnInit {
    public selectedLeft: ThyTransferTemplateItem[] = [];
    public transferData: ThyTransferTemplateItem[] = [
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
            name: '【纯净】模版项目',
            color: '#F6C659',
            direction: TransferDirection.left
        }
    ];

    public transferDataBottom: ThyTransferTemplateItem[] = [
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
            name: '【纯净】模版项目',
            color: '#F6C659',
            direction: TransferDirection.left
        }
    ];

    public transferDataClone: ThyTransferTemplateItem[] = [];

    public transferDataBottomClone: ThyTransferTemplateItem[] = [];

    public selectRight: ThyTransferTemplateItem[] = [];

    constructor() {}

    ngOnInit() {
        this.transferDataClone = [...this.transferData];
        this.transferDataBottomClone = [...this.transferDataBottom];
    }

    search(direction: Direction, keyword: string) {
        this.transferData = this.transferDataClone.filter(k => k.name.includes(keyword));
    }

    bottomSearch(direction: Direction, keyword: string) {
        if (direction === 'left') {
            this.transferDataBottom = this.transferDataBottomClone.filter(k => k.name.includes(keyword));
        } else {
            this.transferData = this.transferDataClone.filter(k => k.name.includes(keyword));
        }
    }

    toggleSelect(property: ThyTransferItem) {}
}
