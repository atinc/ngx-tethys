import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyWatermarkDirective } from 'ngx-tethys/watermark';

@Component({
    selector: 'thy-watermark-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyWatermarkDirective, FormsModule, ThyInputDirective]
})
export class ThyWatermarkBasicExampleComponent implements OnInit {
    value: string = 'worktile\npingcode';

    get getValue() {
        return JSON.stringify(this.value);
    }

    constructor() {}

    ngOnInit() {}
}
