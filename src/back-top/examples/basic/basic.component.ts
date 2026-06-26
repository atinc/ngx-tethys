import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyBackTop } from 'ngx-tethys/back-top';

@Component({
    selector: 'thy-back-top-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyBackTop]
})
export class ThyBackTopBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
