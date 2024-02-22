import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgTemplateOutlet } from '@angular/common';
import { ThyStopPropagationDirective } from 'ngx-tethys/shared';
import { InputBoolean } from 'ngx-tethys/core';

/**
 * @private
 */
@Component({
    selector: 'thy-rate-item, [thy-rate-item]',
    template: `
        <div class="thy-rate-item-left" thyStopPropagation (mouseover)="hoverRateItem(true)" (click)="clickRateItem(true)">
            <ng-template [ngTemplateOutlet]="iconTemplate || (iconValue && character) || defaultTemplate"></ng-template>
        </div>
        <div class="thy-rate-item-all" thyStopPropagation (mouseover)="hoverRateItem(false)" (click)="clickRateItem(false)">
            <ng-template [ngTemplateOutlet]="iconTemplate || (iconValue && character) || defaultTemplate"></ng-template>
        </div>

        <ng-template #defaultTemplate>
            <thy-icon thyIconName="star-fill"></thy-icon>
        </ng-template>

        <ng-template #character>
            <thy-icon [thyIconName]="iconValue"></thy-icon>
        </ng-template>
    `,
    standalone: true,
    imports: [ThyStopPropagationDirective, NgTemplateOutlet, ThyIcon]
})
export class ThyRateItem implements OnInit {
    @Input() @InputBoolean() allowHalf = false;

    @Input() iconValue: string;

    @Input() iconTemplate: TemplateRef<any>;

    @Output() readonly itemHover = new EventEmitter<boolean>();

    @Output() readonly itemClick = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit() {}

    hoverRateItem(isHalf: boolean): void {
        this.itemHover.next(isHalf && this.allowHalf);
    }

    clickRateItem(isHalf: boolean): void {
        this.itemClick.next(isHalf && this.allowHalf);
    }
}
