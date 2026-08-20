import { Component, OnInit } from '@angular/core';
import { ThyTag, ThyTagAppearance } from 'ngx-tethys/tag';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { NgClass } from '@angular/common';

@Component({
    selector: 'thy-tag-appearance-example',
    templateUrl: './appearance.component.html',
    styleUrls: ['./appearance.component.scss'],
    imports: [ThyTag, ThyButtonGroup, NgClass, ThyButton]
})
export class ThyTagAppearanceExampleComponent implements OnInit {
    appearances: ThyTagAppearance[] = ['fill', 'outline', 'weak-fill'];

    appearance: ThyTagAppearance = 'fill';

    constructor() {}

    ngOnInit(): void {}
}
