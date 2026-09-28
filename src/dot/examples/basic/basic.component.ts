import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyDot } from 'ngx-tethys/dot';

@Component({
    selector: 'thy-dot-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDot]
})
export class ThyDotBasicExampleComponent {}
