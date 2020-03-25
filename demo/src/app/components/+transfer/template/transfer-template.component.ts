import { Component, OnInit } from '@angular/core';
import { ThyTransferItem, ThySelectionListChange } from 'ngx-tethys';
import { ThyOptionSelectionChangeEvent } from '../../../../../../src/select/custom-select/option.component';
import { TransferDirection } from '../../../../../../src/transfer/transfer.interface';

@Component({
    selector: 'demo-transfer-template',
    templateUrl: './transfer-template.component.html'
})
export class TransferTemplateComponent implements OnInit {
    selectedLeft;
    transferData = [
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
        },
        {
            _id: '5dd387fe31eaf54e818c4967',
            name: '归档',
            color: '#56ABFB'
        },
        {
            _id: '5dd65f03a756db4c55df6484',
            name: 'wt-rd-portal',
            color: '#56ABFB'
        },
        {
            _id: '5dd6663e861eb1d9983c9db0',
            name: '测试关联项目',
            color: '#F6C659'
        },
        {
            _id: '5ddde3d4f6b332f7e0177cd9',
            name: '测试导入',
            color: '#56ABFB'
        },
        {
            _id: '5ddf416faceb2f5bdcf90911',
            name: 'xxx',
            color: '#56ABFB'
        },
        {
            _id: '5ddf42ebe9afd3b1bd80f85f',
            name: 'Sprint 04',
            color: '#56ABFB'
        },
        {
            _id: '5ddf44afe9afd3ea1a80f896',
            name: '【纯净】模版项目',
            color: '#F6C659'
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

    selectRight = [];

    constructor() {}

    ngOnInit() {}

    selectionChange(
        event: ThySelectionListChange,
        selectItem: (item: ThyTransferItem) => void,
        unselectItem: (item: ThyTransferItem) => void
    ) {
        if (event.selected) {
            this.selectRight = [...this.selectRight, event.value];
        }
    }

    remove(removeItem) {
        this.selectRight = this.selectRight.filter(item => {
            return item._id !== removeItem._id;
        });
        if (this.selectedLeft) {
            this.selectedLeft = this.selectedLeft.filter(item => {
                return item._id !== removeItem._id;
            });
        }
    }
}
