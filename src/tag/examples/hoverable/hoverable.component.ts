import { Component, OnInit } from '@angular/core';
import { ThyTag } from 'ngx-tethys/tag';

@Component({
    selector: 'thy-tag-hoverable-example',
    templateUrl: './hoverable.component.html',
    styleUrls: ['./hoverable.component.scss'],
    imports: [ThyTag]
})
export class ThyTagHoverableExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
