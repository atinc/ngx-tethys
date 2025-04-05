import { Component, OnInit } from '@angular/core';
import { ThyDot } from 'ngx-tethys/dot';
import { ThySpace } from 'ngx-tethys/space';

@Component({
    selector: 'thy-dot-color-example',
    templateUrl: './color.component.html',
    imports: [ThyDot, ThySpace]
})
export class ThyDotColorExampleComponent implements OnInit {
    ngOnInit() {}
}
