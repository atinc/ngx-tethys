import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyCascader } from 'ngx-tethys/cascader';
import { ThyFormControlAppearance } from 'ngx-tethys/core';
import { clone, options } from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-appearance-example',
    templateUrl: './appearance.component.html',
    styles: [
        `
            thy-cascader {
                display: block;
                width: 240px;
            }
        `
    ],
    imports: [ThyCascader, FormsModule, ThyButtonGroup, NgClass, ThyButton]
})
export class ThyCascaderAppearanceExampleComponent implements OnInit {
    appearances: ThyFormControlAppearance[] = ['outline', 'fill', 'subtle', 'ghost'];

    appearance: ThyFormControlAppearance = 'outline';

    areaCode: any[] = [];

    values: any[] = [];

    ngOnInit() {
        this.areaCode = clone(options);
    }
}
