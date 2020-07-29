import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dropdown-size-example',
    templateUrl: './size.component.html'
})
export class ThyDropdownSizeExampleComponent implements OnInit {
    public datePickerSizes = [
        { identifier: 'xs', value: '24px' },
        { identifier: 'sm', value: '28px' },
        { identifier: 'md', value: '32px' },
        { identifier: 'default', value: '36px' },
        { identifier: 'lg', value: '44px' }
    ];

    public activeSize = this.datePickerSizes[3].identifier;

    constructor() {}

    ngOnInit() {}
}
