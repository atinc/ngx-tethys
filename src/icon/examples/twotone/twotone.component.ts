import { Component } from '@angular/core';

@Component({
    selector: 'thy-icon-twotone-example',
    templateUrl: './twotone.component.html'
})
export class ThyIconTwotoneExampleComponent {
    ttColor = '#348fe4';

    changeColor() {
        this.ttColor = '#B43235';
    }
}
