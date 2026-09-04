import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'thy-link-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./basic.component.scss']
})
export class ThyLinkBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
