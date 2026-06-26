import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyDot } from 'ngx-tethys/dot';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-dot-shape-example',
    templateUrl: './shape.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDot, ThySpace, ThySpaceItemDirective]
})
export class ThyDotShapeExampleComponent implements OnInit {
    ngOnInit() {}
}
