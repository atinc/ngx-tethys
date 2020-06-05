import { OnInit, Component, Input, HostBinding, ElementRef, TemplateRef, ContentChild, Renderer2 } from '@angular/core';
import { inputValueToBoolean, hexToRgb } from '../util/helpers';
import { UpdateHostClassService } from '../shared';

export type ThyStatisticColorType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export type ThyStatisticShape = 'card';

export type ThyStatisticSizes = 'default';

export type ThyStatisticTitlePosition = 'top' | 'bottom';

@Component({
    selector: 'thy-statistic',
    templateUrl: './statistic.component.html',
    providers: [UpdateHostClassService]
})
export class ThyStatisticComponent implements OnInit {
    _shape: ThyStatisticShape;

    _initialized = false;

    _size: ThyStatisticSizes;

    @HostBinding(`class.thy-statistic`) class = true;

    @Input() thyValueStyle = {};

    @Input() thyPrefix: string;
    @Input() @ContentChild('prefix', { static: true }) thyPrefixTemplate: TemplateRef<void>;

    @Input() thySuffix: string;
    @Input() @ContentChild('suffix', { static: true }) thySuffixTemplate: TemplateRef<void>;

    @Input() thyValue: number | string;
    @Input() @ContentChild('value', { static: true }) thyValueTemplate: TemplateRef<void>;

    @Input() thyTitle: string;
    @Input() @ContentChild('title', { static: true }) thyTitleTemplate: TemplateRef<void>;

    @Input() thyTitlePosition: ThyStatisticTitlePosition = 'bottom';

    @Input()
    set thyShape(value: ThyStatisticShape) {
        this._shape = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    @Input() thyColor: string | ThyStatisticColorType;

    @Input()
    set thySize(value: ThyStatisticSizes) {
        this._size = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    constructor(private elementRef: ElementRef, private updateHostClassService: UpdateHostClassService, private renderer: Renderer2) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        this._setClassesByType();
        this._initialized = true;
    }

    setColor(color: string) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'color', color);
        if (this._shape === 'card') {
            this.renderer.setStyle(this.elementRef.nativeElement, 'border-color', color);
            this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', hexToRgb(color, 0.05));
        }
    }

    _setClassesByType() {
        const classNames = [];
        if (this.thyColor) {
            if (RegExp(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/).test(this.thyColor)) {
                this.setColor(this.thyColor);
            } else {
                classNames.push(`thy-statistic-${this.thyColor}`);
            }
        }
        if (this._shape) {
            classNames.push(`thy-statistic-${this._shape}`);
        }
        if (!this._size) {
            this._size = 'default';
        }
        classNames.push(`thy-statistic-${this._size}`);

        this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', this.thySize);
        this.updateHostClassService.updateClass(classNames);
    }
}
