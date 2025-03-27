import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-tag-custom-example',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.component.scss'],
    standalone: false
})
export class ThyTagCustomExampleComponent implements OnInit {
    themes = ['fill', 'outline', 'weak-fill'];

    theme = 'fill';

    constructor() {}

    ngOnInit(): void {}
}
