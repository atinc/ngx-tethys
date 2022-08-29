import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-time-picker-size-example',
    templateUrl: './size.component.html'
})
export class ThyTimePickerSizeExampleComponent implements OnInit {
    date: Date;

    sizes: string[] = ['default', 'xs', 'sm', 'md', 'lg'];

    size: string = 'default';

    constructor() {}

    ngOnInit() {}
}
