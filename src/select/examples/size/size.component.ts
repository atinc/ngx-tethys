import { Component, OnInit } from '@angular/core';

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
    listOfOption: Array<{ label: string; value: string }> = [];

    listOfSelectedValue = ['a10', 'b11'];

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
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 10; i < 36; i++) {
            children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.listOfOption = children;
    }
}
