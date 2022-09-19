import { Component, HostBinding, Input } from '@angular/core';
import Color from '../../helpers/color.class';

@Component({
    selector: 'thy-indicator',
    templateUrl: './indicator.component.html'
})
export class ThyIndicatorComponent {
    @HostBinding('class.thy-indicator') className = true;

    @Input()
    public color: Color;

    public get backgroundColor(): string {
        return this.color.displayValue;
    }
}
