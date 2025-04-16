import { Component } from '@angular/core';
import { cssVariables } from './css-variables';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyDivider } from 'ngx-tethys/divider';

@Component({
    selector: 'thy-theme-color-example',
    templateUrl: './color.component.html',
    styles: [
        `
            .show-color,
            .color-variable {
                height: 30px;
                line-height: 30px;
                margin-bottom: 8px;
            }
            .show-color {
                display: flex;
                align-items: center;
                .color-block {
                    width: 100px;
                    height: 100%;
                    margin-right: 8px;
                    border: 1px solid var(--gray-200);
                }
            }
        `
    ],
    imports: [ThyColDirective, ThyRowDirective, ThyDivider]
})
export class ThyThemeColorExampleComponent {
    colorVariables = Object.keys(cssVariables.defaultThemeColorsMap);
    defaultThemeColorsMap = cssVariables.defaultThemeColorsMap;
    darkThemeColorsMap = cssVariables.darkThemeColorsMap;
}
