import { Component, OnInit } from '@angular/core';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';
import { ThyCard, ThyCardContent } from 'ngx-tethys/card';

@Component({
    selector: 'thy-nav-horizontal-example',
    templateUrl: './horizontal.component.html',
    imports: [ThyNav, ThyNavItemDirective, ThyCard, ThyCardContent]
})
export class ThyNavHorizontalExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
