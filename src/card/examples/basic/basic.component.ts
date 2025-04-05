import { Component, OnInit } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyCardContent } from 'ngx-tethys/card';
import { ThyCardHeader } from 'ngx-tethys/card';
import { ThyCard } from 'ngx-tethys/card';

@Component({
    selector: 'thy-card-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyCard, ThyCardHeader, ThyCardContent, ThyButton]
})
export class ThyCardBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
