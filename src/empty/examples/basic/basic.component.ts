import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyEmpty } from 'ngx-tethys/empty';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-empty-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyRowDirective, ThyColDirective, ThyEmpty]
})
export class ThyEmptyBasicExampleComponent {
    constructor() {}
}
