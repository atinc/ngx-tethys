import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Renderer2,
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
    selector: 'thy-alpha',
    templateUrl: './alpha.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyCoordinatesDirective]
})
export class ThyAlpha {
    private readonly renderer = inject(Renderer2);

    @HostBinding('class.thy-alpha') className = true;

    readonly color = input.required<ThyColor>();

    readonly pointer = viewChild.required<ElementRef>('pointer');

    readonly gradient = viewChild.required<ElementRef>('gradient');

    readonly colorChange = output<ThyColor>();

    constructor() {
        effect(() => {
            this.setBackground();
            this.changePointerPosition();
        });
    }

    setBackground() {
        this.renderer.setStyle(
            this.gradient().nativeElement,
            'background',
            `linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(${this.color().rgba.red},
            ${this.color().rgba.green},
            ${this.color().rgba.blue},
            1) 100%)`
        );
    }

    private changePointerPosition(alpha?: number): void {
        const x = (alpha ?? this.color().alpha) * 100;
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
        this.changePointerPosition(x);
        this.colorChange.emit(new ThyColor({ h: this.color().hue, s: this.color().saturation, v: this.color().value, alpha: x }));
    }
}
