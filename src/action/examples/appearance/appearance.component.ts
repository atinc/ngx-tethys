import { Component, OnInit } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-appearance-example',
    templateUrl: './appearance.component.html',
    styleUrls: ['./appearance.component.scss'],
    imports: [ThyAction]
})
export class ThyActionAppearanceExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
