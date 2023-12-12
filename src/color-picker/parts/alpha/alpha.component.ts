import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    Output,
    Renderer2,
    SimpleChanges,
    ViewChild
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
    standalone: true,
    imports: [ThyCoordinatesDirective]
})
export class ThyAlphaComponent implements OnChanges {
    @HostBinding('class.thy-alpha') className = true;

    @Input() color: ThyColor;

    constructor(private readonly renderer: Renderer2) {}

    @ViewChild('pointer', { static: true })
    public pointer: ElementRef;

    @ViewChild('gradient', { static: true })
    public gradient: ElementRef;

    @Output()
    public colorChange = new EventEmitter<ThyColor>(false);

    setBackground() {
        this.renderer.setStyle(
            this.gradient.nativeElement,
            'background',
            `linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(${this.color.rgba.red},
            ${this.color.rgba.green},
            ${this.color.rgba.blue},
            1) 100%)`
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.color && changes.color.previousValue !== changes.color.currentValue) {
            this.setBackground();
            this.changePointerPosition(this.color.alpha);
        }
    }

    private changePointerPosition(alpha: number): void {
        const x = alpha * 100;
        this.renderer.setStyle(this.pointer.nativeElement, 'left', `${x}%`);
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
        this.colorChange.emit(new ThyColor({ h: this.color.hue, s: this.color.saturation, v: this.color.value, alpha: x }));
    }
}
