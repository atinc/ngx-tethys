import { Component, OnInit } from '@angular/core';
import { ThyDot } from 'ngx-tethys/dot';
import { ThySpace } from 'ngx-tethys/space';
@Component({
    selector: 'thy-dot-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyDot, ThySpace]
})
export class ThyDotBasicExampleComponent implements OnInit {
    ngOnInit() {}
}
