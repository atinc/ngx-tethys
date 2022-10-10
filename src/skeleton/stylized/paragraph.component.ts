import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';

@Component({
    selector: 'thy-skeleton-paragraph',
    template: `
        <div *ngFor="let item of sectionCount" [ngClass]="thySectionClass || 'mb-4'">
            <ng-container *ngFor="let k of rowsCount; index as i">
                <thy-skeleton-rectangle
                    [ngClass]="thyItemClass || 'mb-2'"
                    [thyWidth]="i === 0 ? thyFirstWidth : i === rowsCount.length - 1 ? thyLastWidth : thyWidth"
                    [thyHeight]="thyHeight"
                    [thyAnimated]="thyAnimated"
                    [thyPrimaryColor]="thyPrimaryColor"
                    [thySecondaryColor]="thySecondaryColor"
                    [thyBorderRadius]="thyBorderRadius"
                    [thyAnimatedInterval]="thyAnimatedInterval"
                ></thy-skeleton-rectangle>
            </ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
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
    thyWidth: string | number;
    /**
     * 骨架高度
     */
    @Input()
    @InputCssPixel()
    thyHeight: string | number;
    /**
     * 骨架边框圆角
     */
    @Input()
    @InputCssPixel()
    thyBorderRadius: string | number;
    /**
     * 是否开启动画
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
    /**
     * 骨架分段样式
     */
    @Input() thySectionClass: string = null;
    /**
     * 骨架段落样式
     */
    @Input() thyItemClass: string = null;

    sectionCount: number[] = [1];
    /**
     * 段落数
     */
    @Input('thySections')
    set sectionChange(value: number | string) {
        this.sectionCount = Array.from({ length: +value });
    }

    rowsCount: number[] = [1];
    /**
     * 行数
     */
    @Input('thyRows')
    set rowsChange(value: number | string) {
        this.rowsCount = Array.from({ length: +value });
    }
}
