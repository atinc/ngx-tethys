import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-nav-lite-example',
    templateUrl: './lite.component.html',
    styleUrls: ['./lite.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyNav, ThyNavItemDirective]
})
export class ThyNavLiteExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
