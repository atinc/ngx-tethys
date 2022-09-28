import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { isBgColor, isTextColor, isThemeColor, ThyBgColor, ThyTextColor, ThyThemeColor, UpdateHostClassService } from 'ngx-tethys/core';

@Directive({
    selector: '[thyTextColor], [thyBgColor]',
    exportAs: 'thyTextColor',
    providers: [UpdateHostClassService]
})
export class ThyTextColorDirective implements OnInit {
    private color: ThyThemeColor | ThyTextColor | string = '';

    private bgColor: ThyThemeColor | ThyBgColor | string = '';

    private colorClasses = new Array<string>(2);

    /**
     * 文本颜色，支持设置主题色和自定义颜色值，主题色为 default、primary、success、info、warning、danger、light、secondary、muted、desc、placeholder
     */
    @Input() set thyTextColor(value: ThyThemeColor | ThyTextColor | string) {
        this.color = value;
        this.setColor();
    }
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

    ngOnInit(): void {}

    private setColor() {
        if (isThemeColor(this.color) || isTextColor(this.color)) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'color', '');
            this.colorClasses[0] = `text-${this.color}`;
            this.updateClass();
        } else {
            this.colorClasses[0] = '';
            this.renderer.setStyle(this.elementRef.nativeElement, 'color', this.color);
        }
    }

    private setBgColor() {
        if (isThemeColor(this.bgColor) || isBgColor(this.bgColor)) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'background', '');
            this.colorClasses[1] = `bg-${this.color}`;
            this.updateClass();
        } else {
            this.colorClasses[1] = '';
            this.renderer.setStyle(this.elementRef.nativeElement, 'background', this.bgColor);
        }
    }

    updateClass() {
        this.updateHostClassService.updateClass(this.colorClasses);
    }
}
