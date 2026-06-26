import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-link-active-example',
    templateUrl: './active.component.html',
    styleUrls: ['./active.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyIcon]
})
export class ThyLinkActiveExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
