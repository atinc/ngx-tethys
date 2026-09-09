import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyEmpty } from 'ngx-tethys/empty';

@Component({
    selector: 'thy-empty-img-example',
    templateUrl: './img.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyEmpty]
})
export class ThyEmptyImgExampleComponent {
    constructor() {}
}
