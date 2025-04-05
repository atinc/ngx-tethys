import { Component, OnInit } from '@angular/core';
import { ThyDot } from 'ngx-tethys/dot';
import { ThySpace } from 'ngx-tethys/space';

@Component({
    selector: 'thy-dot-size-example',
    templateUrl: './size.component.html',
    imports: [ThyDot, ThySpace]
})
export class ThyDotSizeExampleComponent implements OnInit {
    ngOnInit() {}
}
