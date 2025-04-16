import { Component, OnInit } from '@angular/core';
import { ThyTag } from 'ngx-tethys/tag';

@Component({
    selector: 'thy-tag-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyTag]
})
export class ThyTagBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
