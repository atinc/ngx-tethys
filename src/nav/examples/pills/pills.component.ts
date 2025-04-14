import { Component, OnInit } from '@angular/core';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-nav-pills-example',
    templateUrl: './pills.component.html',
    styleUrls: ['./pills.component.scss'],
    imports: [ThyNav, ThyNavItemDirective]
})
export class ThyNavPillsExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
