import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyTag } from 'ngx-tethys/tag';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-tag-icon-example',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTag, ThyIcon]
})
export class ThyTagIconExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
