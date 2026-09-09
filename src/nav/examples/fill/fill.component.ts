import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-nav-fill-example',
    templateUrl: './fill.component.html',
    styleUrls: ['./fill.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyNav, ThyNavItemDirective]
})
export class ThyNavFillExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
