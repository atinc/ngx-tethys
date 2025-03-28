import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    Output,
    Renderer2,
    SimpleChanges,
    ViewChild,
    inject
} from '@angular/core';
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
export class ThySaturation implements OnChanges {
    private readonly renderer = inject(Renderer2);

    @HostBinding('class.thy-saturation') className = true;

    @ViewChild('panel', { static: true })
    public panel: ElementRef;

    @ViewChild('pointer', { static: true })
    public pointer: ElementRef;

    @Output()
    public colorChange = new EventEmitter<ThyColor>(false);

    @Input()
    public color: ThyColor;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.color && changes.color.previousValue !== changes.color.currentValue) {
            this.setBackground();
            this.changePointerPosition(this.color.saturation, this.color.value);
        }
    }

    setBackground() {
        this.renderer.setStyle(this.panel.nativeElement, 'background', `hsl(${this.color.hue},100%,50%)`);
    }

    changePointerPosition(s: number, v: number) {
        this.renderer.setStyle(this.pointer.nativeElement, 'left', `${s}%`);
        this.renderer.setStyle(this.pointer.nativeElement, 'top', `${100 - v}%`);
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

        this.colorChange.emit(new ThyColor({ h: this.color.hue, s: s * 100, v: v * 100, alpha: this.color.alpha }));
    }
}
