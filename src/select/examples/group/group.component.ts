import { Component } from '@angular/core';

@Component({
    selector: 'thy-select-group-example',
    templateUrl: './group.component.html',
    standalone: false
})
export class ThySelectGroupExampleComponent {
    productGroups = [
        {
            id: 'product1',
            name: '食物',
            options: [
                {
                    value: '001',
                    text: '鸡腿'
                },
                {
                    value: '002',
                    text: '蔬菜'
                },
                {
                    value: '003',
                    text: '水果'
                }
            ]
        },
        {
            id: 'product2',
            name: '衣服',
            options: [
                {
                    value: '004',
                    text: '上衣'
                },
                {
                    value: '005',
                    text: '裤子'
                }
            ]
        }
    ];

    labelGroups = [
        {
            id: 'organize',
            name: '组织',
            options: [
                {
                    value: '001',
                    text: '标签1',
                    color: 'primary'
                },
                {
                    value: '002',
                    text: '标签2',
                    color: 'success'
                }
            ]
        },
        {
            id: 'space',
            name: '空间',
            options: [
                {
                    value: '003',
                    text: '标签3',
                    color: 'info'
                },
                {
                    value: '004',
                    text: '标签4',
                    color: 'warning'
                },
                {
                    value: '005',
                    text: '标签5',
                    color: 'danger'
                }
            ]
        }
    ];

    userGroups = [
        {
            id: 'user1',
            name: '产品成员',
            options: [
                {
                    uid: '001',
                    name: '张三'
                },
                {
                    uid: '002',
                    name: '李四'
                }
            ]
        },
        {
            id: 'user2',
            name: '非产品成员',
            options: [
                {
                    uid: '003',
                    name: '王五'
                },
                {
                    uid: '004',
                    name: '赵六'
                }
            ]
        }
    ];

    selectedValue1 = this.productGroups[0].options[0].value;

    selectedValue2 = this.labelGroups[0].options[0].value;

    selectedValue3 = this.userGroups[0].options[0].uid;
}
