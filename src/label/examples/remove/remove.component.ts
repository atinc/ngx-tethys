import { Component } from '@angular/core';

@Component({
    selector: 'thy-label-remove-example',
    templateUrl: './remove.component.html'
})
export class ThyLabelRemoveExampleComponent {
    constructor() {}

    remove() {
        console.log('remove success');
    }
}
