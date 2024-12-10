import { Component } from '@angular/core';

@Component({
    selector: 'thy-icon-twotone-example',
    templateUrl: './twotone.component.html',
    styleUrls: ['./twotone.component.scss'],
    standalone: false
})
export class ThyIconTwotoneExampleComponent {
    ttColor = '#52c41a';

    changeColor() {
        this.ttColor = '#ff5b57';
    }
}
