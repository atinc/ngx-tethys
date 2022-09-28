import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { isBgColor, isThemeColor, ThyBgColor, ThyThemeColor, UpdateHostClassService } from 'ngx-tethys/core';

@Directive({
    selector: '[thyBgColor]',
    exportAs: 'thyBgColor',
    providers: [UpdateHostClassService]
})
export class ThyBackgroundColorDirective {
    private bgColor: ThyThemeColor | ThyBgColor | string = '';

    /**
     * 背景颜色，支持设置主题色和自定义颜色值，主题色为 default、primary、success、info、warning、danger、light、secondary、muted、desc、placeholder
     */
    @Input() set thyBgColor(value: ThyThemeColor | ThyBgColor | string) {
        this.bgColor = value;
        this.setBgColor();
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2, private updateHostClassService: UpdateHostClassService) {
        this.updateHostClassService.initializeElement(this.elementRef);
    }

    private setBgColor() {
        if (isThemeColor(this.bgColor) || isBgColor(this.bgColor)) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'background', '');
            this.updateHostClassService.updateClass([`bg-${this.bgColor}`]);
        } else {
            this.renderer.setStyle(this.elementRef.nativeElement, 'background', this.bgColor);
        }
    }
}
