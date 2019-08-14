import { Component, Input, HostBinding } from '@angular/core';
@Component({
    selector: 'app-demo-title',
    templateUrl: './demo-title.component.html'
})
export class DemoTitleComponent {
    @Input() title: string;
    @Input() introduction: string;
}
