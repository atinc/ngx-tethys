import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyTag } from 'ngx-tethys/tag';

@Component({
    selector: 'thy-tag-shape-example',
    templateUrl: './shape.component.html',
    styleUrls: ['./shape.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTag]
})
export class ThyTagShapeExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
