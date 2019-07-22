import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-icon-basic-demo',
    templateUrl: './icon-basic-demo.component.html'
})
export class IconBasicDemoComponent {
    @Input() colorClass = 'text-body';

    fontSizeClass = 'font-size-xlg';

    rotate = 90;

    ttColor = ['inherit', '#22d7bb'];

    sortChange() {
        this.ttColor = [...this.ttColor.reverse()];
    }
}
