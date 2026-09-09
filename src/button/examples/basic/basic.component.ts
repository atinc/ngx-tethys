import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-button-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyButton, ThySpace, ThySpaceItemDirective]
})
export class ThyButtonBasicExampleComponent {}
