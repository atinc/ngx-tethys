import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Renderer2,
    ViewChild,
    effect,
    inject,
    input,
    output,
    viewChild
} from '@angular/core';
import { ThyCoordinatesDirective } from '../../coordinates.directive';
import { ThyColor } from '../../helpers/color.class';

/**
 * @internal
 */
@Component({
    selector: 'thy-hue',
    templateUrl: './hue.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyCoordinatesDirective]
})
export class ThyHue {
    private readonly renderer = inject(Renderer2);

    @HostBinding('class.thy-hue') className = true;

    readonly color = input.required<ThyColor>();

    readonly colorChange = output<ThyColor>();

    public pointer = viewChild.required<ElementRef>('pointer');

    constructor() {
        effect(() => {
            this.changePointerPosition();
        });
    }

    private changePointerPosition(hue?: number): void {
        const newHue = hue ?? this.color().hue;
        const x = (newHue / 360) * 100;
        this.renderer.setStyle(this.pointer().nativeElement, 'left', `${x}%`);
    }

    handleChange(event: {
        x: number;
        y: number;
        top: number;
        left: number;
        containerHeight: number;
        containerWidth: number;
        $event: Event;
    }) {
        let x;
        if (event.left < 0) {
            x = 0;
        } else if (event.left > event.containerWidth) {
            x = 1;
        } else {
            x = Math.round((event.left * 100) / event.containerWidth) / 100;
        }
        this.changePointerPosition(x * 360);
        this.colorChange.emit(new ThyColor({ h: x * 360, s: this.color().saturation, v: this.color().value, alpha: this.color().alpha }));
    }
}
