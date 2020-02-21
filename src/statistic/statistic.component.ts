import { OnInit, Component, Input, HostBinding, ElementRef, TemplateRef, ContentChild, Renderer2 } from '@angular/core';
import { inputValueToBoolean, hexToRgb } from '../util/helpers';
import { UpdateHostClassService } from '../shared';

export type ThyType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export type ThyShape = 'card';

export type ThySizes = 'default';

@Component({
    selector: 'thy-statistic',
    templateUrl: './statistic.component.html',
    providers: [UpdateHostClassService]
})
export class ThyStatisticComponent implements OnInit {
    _shape: ThyShape;

    _initialized = false;

    _size: ThySizes;

    @HostBinding(`class.thy-statistic`) class = true;

    @Input() thyValueStyle = {};

    @Input() thyPrefix: string;
    @Input() @ContentChild('thyPrefix') thyPrefixTemplate: TemplateRef<void>;

    @Input() thySuffix: string;
    @Input() @ContentChild('thySuffix') thySuffixTemplate: TemplateRef<void>;

    @Input() thyValue: number | string;
    @Input() @ContentChild('thyValue') thyValueTemplate: TemplateRef<void>;

    @Input() thyTitle: string;
    @Input() @ContentChild('thyTitle') thyTitleTemplate: TemplateRef<void>;

    @Input()
    set thyShape(value: ThyShape) {
        this._shape = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    @Input() thyColor: string | ThyType;

    @Input()
    set thySize(value: ThySizes) {
        this._size = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    constructor(
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService,
        private renderer: Renderer2
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        this._setClassesByType();
        this._initialized = true;
    }

    _setClassesByType() {
        const classNames = [];
        if (this.thyColor && RegExp(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/).test(this.thyColor)) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'color', this.thyColor);
            this.renderer.setStyle(this.elementRef.nativeElement, 'border-color', this.thyColor);
            this.renderer.setStyle(
                this.elementRef.nativeElement,
                'background-color',
                this._shape === 'card' ? hexToRgb(this.thyColor, 0.05) : 'none'
            );
        } else {
            classNames.push(`thy-statistic-${this.thyColor}`);
        }
        if (this._shape) {
            classNames.push(`thy-statistic-${this._shape}`);
        }

        if (this._size) {
            classNames.push(`thy-statistic-${this._size}`);
        }

        this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', this.thySize);
        this.updateHostClassService.updateClass(classNames);
    }
}
