import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyDot } from 'ngx-tethys/dot';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-dot-color-example',
    templateUrl: './color.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDot, ThySpace, ThySpaceItemDirective]
})
export class ThyDotColorExampleComponent implements OnInit {
    ngOnInit() {}
}
