import { Component } from '@angular/core';

@Component({
    selector: 'app-progress-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyProgressBasicExampleComponent {
    value = 40;

    max = 100;

    size = 'md';
}
