import { Component, OnInit } from '@angular/core';
import { ThyDot } from 'ngx-tethys/dot';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-dot-color-example',
    templateUrl: './color.component.html',
    imports: [ThyDot, ThySpace, ThySpaceItemDirective]
})
export class ThyDotColorExampleComponent implements OnInit {
    ngOnInit() {}
}
