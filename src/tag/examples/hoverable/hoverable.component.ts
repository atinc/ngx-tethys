import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyTag } from 'ngx-tethys/tag';

@Component({
    selector: 'thy-tag-hoverable-example',
    templateUrl: './hoverable.component.html',
    styleUrls: ['./hoverable.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTag]
})
export class ThyTagHoverableExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
