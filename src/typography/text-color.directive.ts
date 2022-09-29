import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { isTextColor, isThemeColor, ThyTextColor, ThyThemeColor, UpdateHostClassService } from 'ngx-tethys/core';

@Directive({
    selector: '[thyTextColor]',
    exportAs: 'thyTextColor',
    providers: [UpdateHostClassService]
})
export class ThyTextColorDirective implements OnInit {
    private color: ThyThemeColor | ThyTextColor | string = '';

    private lastClass: string;

    /**
     * 文本颜色，支持设置主题色和自定义颜色值，主题色为 default、primary、success、info、warning、danger、light、secondary、muted、desc、placeholder
     */
    @Input() set thyTextColor(value: ThyThemeColor | ThyTextColor | string) {
        this.color = value;
        this.setColor();
    }

    constructor(private elementRef: ElementRef, private updateHostClassService: UpdateHostClassService) {
        this.updateHostClassService.initializeElement(this.elementRef);
    }

    ngOnInit(): void {}

    private setColor() {
        this.clearColor();
        if (isThemeColor(this.color) || isTextColor(this.color)) {
            this.updateHostClassService.addClass(`text-${this.color}`);
            this.lastClass = `text-${this.color}`;
        } else {
            this.elementRef.nativeElement.style.color = this.color;
        }
    }

    private clearColor() {
        this.elementRef.nativeElement.style.color = '';
        if (this.lastClass) {
            this.updateHostClassService.removeClass(this.lastClass);
        }
    }
}
