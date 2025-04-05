import { Component, OnInit } from '@angular/core';
import { ThyTag } from 'ngx-tethys/tag';

@Component({
    selector: 'thy-tag-custom-example',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.component.scss'],
    imports: [ThyTag]
})
export class ThyTagCustomExampleComponent implements OnInit {
    themes = ['fill', 'outline', 'weak-fill'];

    theme = 'fill';

    constructor() {}

    ngOnInit(): void {}
}
