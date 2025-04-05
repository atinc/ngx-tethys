import { Component, OnInit } from '@angular/core';
import { ThyTag } from 'ngx-tethys/tag';

@Component({
    selector: 'thy-tag-shape-example',
    templateUrl: './shape.component.html',
    styleUrls: ['./shape.component.scss'],
    imports: [ThyTag]
})
export class ThyTagShapeExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
