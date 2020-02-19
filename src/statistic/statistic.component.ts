import { OnInit, Component, Input, HostBinding, ElementRef, TemplateRef, ContentChild, Renderer2 } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';
import { UpdateHostClassService } from '../shared';
import { NONAME } from 'dns';

export type ThyType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

@Component({
    selector: 'thy-statistic',
    templateUrl: './statistic.component.html',
    providers: [UpdateHostClassService]
})
export class ThyStatisticComponent implements OnInit {
    _type: string;

    _initialized = false;

    @HostBinding(`class.thy-statistic`) class = true;

    @HostBinding(`class.thy-statistic-card`) _hasCard = false;

    @Input() thyPrefix: string;
    @Input() thyPrefixTemplate: TemplateRef<void>;

    @Input() thySuffix: string;
    @Input() thySuffixTemplate: TemplateRef<void>;

    @Input() thyValue: number | string;
    @Input() thyValueTemplate: TemplateRef<void>;

    @Input() thyTitle: string;
    @Input() thyTitleTemplate: string | TemplateRef<void>;

    @Input()
    set thyHasCard(value: boolean) {
        this._hasCard = inputValueToBoolean(value);
    }

    @Input() thyColor: string;

    @Input() thySize = '30px';

    @Input()
    set thyType(value: ThyType) {
        this._type = value;
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

    _setClassesByType() {
        const classNames = [];
        classNames.push(`thy-statistic-${this._type}`);
        this.renderer.setStyle(this.elementRef.nativeElement, 'color', this.thyColor);
        this.renderer.setStyle(this.elementRef.nativeElement, 'border-color', this.thyColor);
        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'background-color',
            this._hasCard ? 'rgba(' + this.hexToRgb(this.thyColor) + ', 0.05)' : 'none'
        );
        this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', this.thySize);
        this.updateHostClassService.updateClass(classNames);
    }

    hexToRgb(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) : null;
    }

    ngOnInit() {
        this._setClassesByType();
        this._initialized = true;
    }
}
