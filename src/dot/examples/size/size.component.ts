import { Component, OnInit } from '@angular/core';
import { ThyDot } from 'ngx-tethys/dot';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-dot-size-example',
    templateUrl: './size.component.html',
    imports: [ThyDot, ThySpace, ThySpaceItemDirective]
})
export class ThyDotSizeExampleComponent implements OnInit {
    ngOnInit() {}
}
