import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-vertical-center-example',
    templateUrl: './vertical-center.component.html',
    styles: [
        `
            thy-custom-select {
                width: 400px;
                margin-top: 15px;
            }
        `
    ]
})
export class ThySelectVerticalCenterExampleComponent implements OnInit {
    listOfOption: { value: string; text: string }[];

    listOfSelectedValue = ['option1', 'option2'];

    avatarSrc = 'assets/images/one-avatar.jpg';

    selectSizes = [
        {
            name: 'sm',
            height: 28
        },
        {
            name: 'md',
            height: 32
        },
        {
            name: 'default',
            height: 36
        },
        {
            name: 'lg',
            height: 44
        }
    ];

    currentSize = this.selectSizes[2];

    ngOnInit() {
        listOfOption.unshift({
            value: 'option0',
            text: '一个好长好长好长好长的选项里面有好多好多好多好多个字'
        });
        this.listOfOption = listOfOption;
    }
}
