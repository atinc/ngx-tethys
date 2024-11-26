import { Component } from '@angular/core';

@Component({
    selector: 'thy-styles-theme-example',
    templateUrl: './theme.component.html',
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
    ]
})
export class ThyStylesThemeExampleComponent {
    colorVariables = [
        '$gray-10',
        '$gray-70',
        '$gray-80',
        '$gray-100',
        '$gray-200',
        '$gray-300',
        '$gray-400',
        '$gray-500',
        '$gray-600',
        '$gray-700',
        '$gray-800',
        '$white',
        '$primary',
        '$success',
        '$info',
        '$warning',
        '$danger',
        '$black'
    ];

    defaultThemeColorsMap = {
        '$gray-10': '#fff',
        '$gray-70': '#f7f7f7',
        '$gray-80': '#fafafa',
        '$gray-100': '#f5f5f5',
        '$gray-200': '#eee',
        '$gray-300': '#ddd',
        '$gray-400': '#cacaca',
        '$gray-500': '#aaa',
        '$gray-600': '#999',
        '$gray-700': '#666',
        '$gray-800': '#333',
        $white: '#fff',
        $primary: '#6698ff',
        $success: '#73d897',
        $info: '#5dcfff',
        $warning: '#ffcd5d',
        $danger: '#ff7575',
        $black: '#000'
    };

    darkThemeColorsMap = {
        '$gray-10': '#2a2e34',
        '$gray-70': '#32363d',
        '$gray-80': '#30353c',
        '$gray-100': '#393e46',
        '$gray-200': '#3c414a',
        '$gray-300': '#464c57',
        '$gray-400': '#5b6370',
        '$gray-500': '#666e7d',
        '$gray-600': '#6f7a8a',
        '$gray-700': '#87909e',
        '$gray-800': '#bcc4d1',
        $white: '#fff',
        $primary: '#6698ff',
        $success: '#73d897',
        $info: '#5dcfff',
        $warning: '#ffcd5d',
        $danger: '#ff7575',
        $black: '#000'
    };
}
