import { Component, OnInit } from '@angular/core';
import { ThyCardContent } from 'ngx-tethys/card';
import { ThyButtonIcon } from 'ngx-tethys/button';
import { ThyCard } from 'ngx-tethys/card';
import { ThyCardHeader } from 'ngx-tethys/card';

@Component({
    selector: 'thy-card-divided-example', // app-demo-card-divided
    templateUrl: './divided.component.html',
    imports: [ThyCard, ThyCardHeader, ThyButtonIcon, ThyCardContent]
})
export class ThyCardDividedExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
