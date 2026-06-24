import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyCard, ThyCardHeader, ThyCardContent } from 'ngx-tethys/card';

@Component({
    selector: 'thy-card-content-scroll-example', // app-demo-card-content-scroll
    templateUrl: './content-scroll.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCard, ThyCardHeader, ThyCardContent]
})
export class ThyCardContentScrollExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
