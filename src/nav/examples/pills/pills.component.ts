import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-nav-pills-example',
    templateUrl: './pills.component.html',
    styleUrls: ['./pills.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyNav, ThyNavItemDirective]
})
export class ThyNavPillsExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
