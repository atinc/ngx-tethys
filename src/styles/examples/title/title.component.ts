import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'thy-styles-title-example',
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './title.component.html'
})
export class ThyStylesTitleExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
