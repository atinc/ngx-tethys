import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-collapse-custom-example',
    templateUrl: './custom.component.html'
})
export class ThyCollapseCustomExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    panels = [
        {
            active: true,
            key: Math.random(),
            name: '这是头部标题 1',
            customStyle: {
                background: '#f7f7f7',
                'border-radius': '4px',
                'margin-bottom': '28px',
                border: '0px'
            }
        },
        {
            active: false,
            key: Math.random(),
            name: '这是头部标题  2',
            icon: 'caret-right',
            customStyle: {
                background: '#f7f7f7',
                'border-radius': '4px',
                'margin-bottom': '28px',
                border: '0px'
            }
        },
        {
            active: false,
            key: Math.random(),
            name: '这是头部标题 3',
            icon: 'arrow-right',
            customStyle: {
                background: '#f7f7f7',
                'border-radius': '4px',
                'margin-bottom': '28px',
                border: '0px'
            }
        }
    ];
}
