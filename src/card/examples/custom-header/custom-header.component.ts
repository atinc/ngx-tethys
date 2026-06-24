import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyCard, ThyCardContent, ThyCardHeader } from 'ngx-tethys/card';

@Component({
    selector: 'thy-card-custom-header-example', // app-demo-card-custom-header
    templateUrl: './custom-header.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCard, ThyCardHeader, ThyCardContent]
})
export class ThyCardCustomHeaderExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
