import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyFlex, ThyFlexComponent, ThyFlexItem, ThyFlexItemComponent } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-grid-flex-example',
    templateUrl: './flex.component.html',
    styleUrls: ['./flex.component.scss'],
    hostDirectives: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDivider, ThyFlex, ThyFlexComponent, ThyFlexItem, ThyFlexItemComponent]
})
export class ThyGridFlexExampleComponent {}
