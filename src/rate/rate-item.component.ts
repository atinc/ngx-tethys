import { Component, TemplateRef, input, output } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgTemplateOutlet } from '@angular/common';
import { ThyStopPropagationDirective } from 'ngx-tethys/shared';
import { coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';

/**
 * @private
 */
@Component({
    selector: 'thy-rate-item, [thy-rate-item]',
    template: `
        <div class="thy-rate-item-left" thyStopPropagation (mouseover)="hoverRateItem(true)" (click)="clickRateItem(true)">
            <ng-template [ngTemplateOutlet]="iconTemplate() || (iconValue() && character) || defaultTemplate"></ng-template>
        </div>
        <div class="thy-rate-item-all" thyStopPropagation (mouseover)="hoverRateItem(false)" (click)="clickRateItem(false)">
            <ng-template [ngTemplateOutlet]="iconTemplate() || (iconValue() && character) || defaultTemplate"></ng-template>
        </div>

        <ng-template #defaultTemplate>
            <thy-icon thyIconName="star-fill"></thy-icon>
        </ng-template>

        <ng-template #character>
            <thy-icon [thyIconName]="iconValue()"></thy-icon>
        </ng-template>
    `,
    imports: [ThyStopPropagationDirective, NgTemplateOutlet, ThyIcon]
})
export class ThyRateItem {
    readonly allowHalf = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    readonly iconValue = input<string>();

    readonly iconTemplate = input<TemplateRef<any>>();

    readonly itemHover = output<boolean>();

    readonly itemClick = output<boolean>();

    constructor() {}

    hoverRateItem(isHalf: boolean): void {
        this.itemHover.emit(isHalf && this.allowHalf());
    }

    clickRateItem(isHalf: boolean): void {
        this.itemClick.emit(isHalf && this.allowHalf());
    }
}
