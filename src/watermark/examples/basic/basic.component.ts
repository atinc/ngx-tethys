import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyWatermarkDirective } from 'ngx-tethys/watermark';

@Component({
    selector: 'thy-watermark-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyWatermarkDirective, FormsModule]
})
export class ThyWatermarkBasicExampleComponent implements OnInit {
    value: string = 'worktile\npingcode';

    get getValue() {
        return JSON.stringify(this.value);
    }

    constructor() {}

    ngOnInit() {}
}
