import { Component } from '@angular/core';

@Component({
    selector: 'thy-theme-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    standalone: false
})
export class ThyThemeBasicExampleComponent {
    color = 'var(--gray-100)';
}
