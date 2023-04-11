import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';
import { ThySkeletonRectangleComponent } from '../skeleton-rectangle.component';

@Component({
    selector: 'thy-skeleton-paragraph',
    template: `
        <ng-container *ngFor="let k of rowCount; index as i">
            <thy-skeleton-rectangle
                class="vertical-gap"
                [thyRowWidth]="i === 0 ? thyFirstWidth : i === rowCount.length - 1 ? thyLastWidth : thyRowWidth"
                [thyRowHeight]="thyRowHeight"
                [thyAnimated]="thyAnimated"
                [thyPrimaryColor]="thyPrimaryColor"
                [thySecondaryColor]="thySecondaryColor"
                [thyBorderRadius]="thyBorderRadius"
                [thyAnimatedInterval]="thyAnimatedInterval"></thy-skeleton-rectangle>
        </ng-container>
    `,
    host: {
        '[class.thy-skeleton-paragraph]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgFor, ThySkeletonRectangleComponent]
})
export class ThySkeletonParagraphComponent {
    /**
     * 首行宽度
     */
    @Input()
    @InputCssPixel()
    thyFirstWidth: string | number;

    /**
     * 尾行宽度
     */
    @Input()
    @InputCssPixel()
    thyLastWidth: string | number;

    /**
     * 骨架宽度
     */
    @Input()
    @InputCssPixel()
    thyRowWidth: string | number;

    /**
     * 骨架高度
     */
    @Input()
    @InputCssPixel()
    thyRowHeight: string | number;

    /**
     * 骨架边框圆角
     */
    @Input()
    @InputCssPixel()
    thyBorderRadius: string | number;

    /**
     * 是否开启动画
     * @default false
     */
    @Input()
    @InputBoolean()
    thyAnimated: boolean;

    /**
     * 动画速度
     */
    @Input() thyAnimatedInterval: string | number;

    /**
     * 骨架主色
     */
    @Input() thyPrimaryColor: string;

    /**
     * 骨架次色
     */
    @Input() thySecondaryColor: string;

    rowCount: number[] = [];

    /**
     * 行数
     */
    @Input()
    set thyRowCount(value: number | string) {
        this.rowCount = Array.from({ length: +value });
    }
    get thyRowCount() {
        return this.rowCount.length;
    }
}
