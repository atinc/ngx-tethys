import { Component } from '@angular/core';
import { ThyEmpty } from 'ngx-tethys/empty';
import { ThyColDirective } from 'ngx-tethys/grid';
import { ThyRowDirective } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-empty-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyRowDirective, ThyColDirective, ThyEmpty]
})
export class ThyEmptyBasicExampleComponent {
    constructor() {}
}
