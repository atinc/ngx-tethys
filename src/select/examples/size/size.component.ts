import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-size-example',
    templateUrl: './size.component.html',
    styles: [
        `
            thy-custom-select {
                width: 400px;
                margin-top: 15px;
            }
        `
    ]
})
export class ThySelectSizeExampleComponent implements OnInit {
    listOfOption = listOfOption;

    listOfSelectedValue = ['option1', 'option2'];

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

    avatarSrc = 'assets/images/one-avatar.jpg';

    currentSize = this.selectSizes[2];

    ngOnInit() {}
}
