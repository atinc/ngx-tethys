import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyBackTop } from 'ngx-tethys/back-top';

@Component({
    selector: 'thy-back-top-custom-example',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyBackTop]
})
export class ThyBackTopCustomExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    notify(): void {
        console.log('notify');
    }
}
