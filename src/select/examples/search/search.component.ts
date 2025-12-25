import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyAvatar } from 'ngx-tethys/avatar';

@Component({
    selector: 'thy-select-search-example',
    templateUrl: './search.component.html',
    styles: [
        `
            .search-container {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
            }
            thy-select {
                flex: 0 0 auto;
                width: 120px;
                margin-right: 20px;
                margin-bottom: 20px;
            }
        `
    ],
    imports: [ThySelect, ThyOption, FormsModule, CommonModule, ThyAvatar]
})
export class ThySelectSearchExampleComponent implements OnInit {
    listOfOption = listOfOption;

    users = [
        {
            uid: '001',
            name: '张三'
        },
        {
            uid: '002',
            name: '李四'
        },
        {
            uid: '003',
            name: '王五'
        },
        {
            uid: '004',
            name: '赵六'
        }
    ];

    selectedUser = this.users[0].uid;

    ngOnInit() {}
}
