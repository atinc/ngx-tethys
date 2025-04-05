import { Component, OnInit } from '@angular/core';
import { ThyDot } from 'ngx-tethys/dot';
import { ThySpace } from 'ngx-tethys/space';

@Component({
    selector: 'thy-dot-theme-example',
    templateUrl: './theme.component.html',
    imports: [ThyDot, ThySpace]
})
export class ThyDotThemeExampleComponent implements OnInit {
    ngOnInit() {}
}
