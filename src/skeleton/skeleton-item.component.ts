import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'thy-skeleton-item',
    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="containerStyle()"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeletonItemComponent {
    @Input() styleClass: string;

    @Input() style: any;

    @Input() shape: string = 'rectangle';

    @Input() animated: boolean = true;

    @Input() borderRadius: string = null;

    @Input() size: string = null;

    @Input() width: string = '100%';

    @Input() height: string = '1rem';

    containerClass() {
        return {
            'thy-skeleton': true,
            'thy-skeleton-circle': this.shape === 'circle',
            'thy-skeleton-none': !this.animated && 'none'
        };
    }

    containerStyle() {
        if (this.size) return { ...this.style, width: this.size, height: this.size, borderRadius: this.borderRadius };
        else return { ...this.style, width: this.width, height: this.height, borderRadius: this.borderRadius };
    }
}
