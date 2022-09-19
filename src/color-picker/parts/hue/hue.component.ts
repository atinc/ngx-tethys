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
import Color from '../../helpers/color.class';

@Component({
    selector: 'thy-hue',
    templateUrl: './hue.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyHueComponent implements OnChanges {
    @HostBinding('class.thy-hue') className = true;

    @Input() color: Color;

    @Output()
    public colorChange = new EventEmitter<Color>(false);

    constructor(private readonly renderer: Renderer2) {}

    @ViewChild('pointer', { static: true })
    public pointer: ElementRef;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.color && changes.color.previousValue !== changes.color.currentValue) {
            this.changePointerPosition(this.color.hue);
        }
    }

    private changePointerPosition(hue: number): void {
        const x = (hue / 360) * 100;
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
        this.changePointerPosition(x * 360);
        this.colorChange.emit(new Color({ h: x * 360, s: this.color.saturation, v: this.color.value, alpha: this.color.alpha }));
    }
}
