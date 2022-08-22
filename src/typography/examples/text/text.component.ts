import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'thy-typography-text-example',
    templateUrl: './text.component.html'
})
export class ThyTypographyTextExampleComponent implements OnInit {
    presetColors = ['primary', 'success', 'info', 'warning', 'danger', 'default', 'light', 'secondary', 'muted', 'desc', 'placeholder'];

    color: string = 'primary';

    constructor() {}

    ngOnInit(): void {}
}
