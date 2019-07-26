import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-icon-basic-demo',
    templateUrl: './icon-basic-demo.component.html'
})
export class IconBasicDemoComponent {
    @Input() colorClass = 'text-body';

    fontSizeClass = 'font-size-xlg';

    rotate = 0;

    rotate2 = 90;

    ttColor = '#22d7bb';

    changeColor() {
        this.ttColor = '#ff00ff';
    }
}
