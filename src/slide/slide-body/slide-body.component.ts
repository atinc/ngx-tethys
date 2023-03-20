import { Component, HostBinding } from '@angular/core';

/**
 * 滑动弹出框的主体组件
 * @name thy-slide-body
 */
@Component({
    selector: 'thy-slide-body',
    template: `
        <ng-content></ng-content>
    `,
    standalone: true
})
export class ThySlideBodyComponent {
    @HostBinding('class.thy-slide-body') slideLayoutBody = true;
}
