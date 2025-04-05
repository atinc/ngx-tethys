import { Component, OnInit } from '@angular/core';
import { ThyCardContent } from 'ngx-tethys/card';
import { ThyButton } from 'ngx-tethys/button';
import { ThyCardHeader } from 'ngx-tethys/card';
import { ThyCard } from 'ngx-tethys/card';

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
