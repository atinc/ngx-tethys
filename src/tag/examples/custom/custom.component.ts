import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-tag-custom-example',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.component.scss']
})
export class ThyTagCustomExampleComponent implements OnInit {
    themes = ['fill', 'outline', 'emboss'];

    theme = 'fill';

    constructor() {}

    ngOnInit(): void {}
}
