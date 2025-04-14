import { Component, OnInit } from '@angular/core';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-nav-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyNav, ThyNavItemDirective]
})
export class ThyNavDisabledExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
