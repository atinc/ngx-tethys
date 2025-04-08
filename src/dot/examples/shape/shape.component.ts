import { Component, OnInit } from '@angular/core';
import { ThyDot } from 'ngx-tethys/dot';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-dot-shape-example',
    templateUrl: './shape.component.html',
    imports: [ThyDot, ThySpace, ThySpaceItemDirective]
})
export class ThyDotShapeExampleComponent implements OnInit {
    ngOnInit() {}
}
