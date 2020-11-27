import { OnInit, Component, Input, HostBinding, ElementRef, TemplateRef, ContentChild, Renderer2 } from '@angular/core';
import { coerceBooleanProperty, hexToRgb } from 'ngx-tethys/util';
import { UpdateHostClassService } from 'ngx-tethys/shared';

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

    prefixTemplate: TemplateRef<void>;

    suffixTemplate: TemplateRef<void>;

    valueTemplate: TemplateRef<void>;

    titleTemplate: TemplateRef<void>;

    @HostBinding(`class.thy-statistic`) class = true;

    @Input() thyValueStyle = {};

    @Input() thyPrefix: string;

    @ContentChild('prefix', { static: true }) set prefix(value: TemplateRef<void>) {
        this.prefixTemplate = value;
    }

    @Input() set thyPrefixTemplate(value: TemplateRef<void>) {
        this.prefixTemplate = value;
    }

    @Input() thyValue: number | string;

    @ContentChild('value', { static: true }) set value(value: TemplateRef<void>) {
        this.valueTemplate = value;
    }

    @Input() set thyValueTemplate(value: TemplateRef<void>) {
        this.valueTemplate = value;
    }

    @Input() thyTitle: string;

    @ContentChild('title', { static: true }) set title(value: TemplateRef<void>) {
        this.titleTemplate = value;
    }

    @Input() set thyTitleTemplate(value: TemplateRef<void>) {
        this.titleTemplate = value;
    }

    @Input() thySuffix: string;

    @ContentChild('suffix', { static: true }) set suffix(value: TemplateRef<void>) {
        this.suffixTemplate = value;
    }

    @Input() set thySuffixTemplate(value: TemplateRef<void>) {
        this.suffixTemplate = value;
    }

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
