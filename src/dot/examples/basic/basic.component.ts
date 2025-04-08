import { Component, OnInit } from '@angular/core';
import { ThyDot } from 'ngx-tethys/dot';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-dot-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyDot, ThySpace, ThySpaceItemDirective]
})
export class ThyDotBasicExampleComponent implements OnInit {
    ngOnInit() {}
}
