import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyEmpty } from 'ngx-tethys/empty';

@Component({
    selector: 'thy-empty-icon-example',
    templateUrl: './icon.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyEmpty]
})
export class ThyEmptyIconExampleComponent {
    constructor() {}
}
