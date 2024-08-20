import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-watermark-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyWatermarkBasicExampleComponent implements OnInit {
    value: string = 'worktile\npingcode';

    get getValue() {
        return JSON.stringify(this.value);
    }

    constructor() {}

    ngOnInit() {}
}
