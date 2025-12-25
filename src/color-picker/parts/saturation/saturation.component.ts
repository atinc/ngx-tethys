import { Component, ElementRef, HostBinding, Renderer2, effect, inject, input, output, viewChild } from '@angular/core';
import { ThyCoordinatesDirective } from '../../coordinates.directive';
import { ThyColor } from '../../helpers/color.class';

/**
 * @internal
 */
@Component({
    selector: 'thy-saturation',
    templateUrl: './saturation.component.html',
    imports: [ThyCoordinatesDirective]
})
export class ThySaturation {
    private readonly renderer = inject(Renderer2);

    @HostBinding('class.thy-saturation') className = true;

    readonly panel = viewChild.required<ElementRef>('panel');

    readonly pointer = viewChild.required<ElementRef>('pointer');

    readonly colorChange = output<ThyColor>();

    readonly color = input.required<ThyColor>();

    constructor() {
        effect(() => {
            this.setBackground();
            this.changePointerPosition();
        });
    }

    setBackground() {
        this.renderer.setStyle(this.panel().nativeElement, 'background', `hsl(${this.color().hue},100%,50%)`);
    }

    changePointerPosition(s?: number, v?: number) {
        const saturation = s ?? this.color().saturation;
        const value = v ?? this.color().value;
        const pointer = this.pointer();
        this.renderer.setStyle(pointer.nativeElement, 'left', `${saturation}%`);
        this.renderer.setStyle(pointer.nativeElement, 'top', `${100 - value}%`);
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
        let x = event.left,
            y = event.top;
        if (event.left < 0) {
            x = 0;
        } else if (event.left > event.containerWidth) {
            x = event.containerWidth;
        }
        if (event.top < 0) {
            y = 0;
        } else if (event.top > event.containerHeight) {
            y = event.containerHeight;
        }

        const s = x / event.containerWidth;
        let v = 1 - y / event.containerHeight;
        v = v > 0 ? v : 0;
        v = v > 1 ? 1 : v;

        this.changePointerPosition(s * 100, v * 100);

        this.colorChange.emit(new ThyColor({ h: this.color().hue, s: s * 100, v: v * 100, alpha: this.color().alpha }));
    }
}
