import { Component } from '@angular/core';

@Component({
    selector: 'thy-label-custom-example',
    templateUrl: './custom.component.html'
})
export class ThyLabelCustomExampleComponent {
    public color: string = '#7076fa';

    public backgroundOpacity = 0.3;

    constructor() {}
}
