import { Component } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-button-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyButton, ThySpace, ThySpaceItemDirective, ThyIcon]
})
export class ThyButtonDisabledExampleComponent {
    handleClick() {
        console.log('click');
    }
}
