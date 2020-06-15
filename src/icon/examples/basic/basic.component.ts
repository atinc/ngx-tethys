import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-icon-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyIconBasicExampleComponent {
    @Input() colorClass = 'text-body';

    fontSizeClass = 'font-size-xlg';

    rotate = 0;

    rotate2 = 90;

    ttColor = '#22d7bb';

    changeColor() {
        this.ttColor = '#ff00ff';
    }
}
