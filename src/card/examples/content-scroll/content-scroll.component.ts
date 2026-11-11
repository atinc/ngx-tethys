import { Component, OnInit } from '@angular/core';
import { ThyCard, ThyCardHeader, ThyCardContent } from 'ngx-tethys/card';

@Component({
    selector: 'thy-card-content-scroll-example', // app-demo-card-content-scroll
    templateUrl: './content-scroll.component.html',
    imports: [ThyCard, ThyCardHeader, ThyCardContent]
})
export class ThyCardContentScrollExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
