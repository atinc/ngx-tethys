import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-vertical-center-example',
    templateUrl: './vertical-center.component.html',
    styles: [
        `
            thy-select {
                width: 400px;
                margin-top: 15px;
            }
        `
    ],
    standalone: false
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
        this.listOfOption = listOfOption;
    }
}
