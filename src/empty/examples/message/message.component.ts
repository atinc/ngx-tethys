import { Component } from '@angular/core';
import { ThyEmpty } from 'ngx-tethys/empty';

@Component({
    selector: 'thy-empty-message-example',
    templateUrl: './message.component.html',
    imports: [ThyEmpty]
})
export class ThyEmptyMessageExampleComponent {
    constructor() {}
}
