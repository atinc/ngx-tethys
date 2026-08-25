import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyTag, ThyTags } from 'ngx-tethys/tag';

@Component({
    selector: 'thy-tags-example',
    templateUrl: './tags.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTag, ThyColDirective, ThyRowDirective, ThyTags]
})
export class ThyTagTagsExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
