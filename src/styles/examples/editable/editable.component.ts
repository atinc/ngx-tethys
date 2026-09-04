import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'thy-styles-editable-example',
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './editable.component.html'
})
export class ThyStylesEditableExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
