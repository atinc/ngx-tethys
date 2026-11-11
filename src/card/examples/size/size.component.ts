import { Component, OnInit } from '@angular/core';
import { ThyCard, ThyCardContent, ThyCardHeader } from 'ngx-tethys/card';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-card-size-example',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss'],
    imports: [ThyCard, ThyCardHeader, ThyButton, ThyCardContent]
})
export class ThyCardSizeExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
