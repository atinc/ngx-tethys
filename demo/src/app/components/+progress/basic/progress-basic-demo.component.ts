import { Component } from '@angular/core';

@Component({
    selector: 'app-progress-basic-demo',
    templateUrl: './progress-basic-demo.component.html'
})
export class ProgressBasicDemoComponent {
    value = 40;

    max = 100;

    size = 'md';
}
