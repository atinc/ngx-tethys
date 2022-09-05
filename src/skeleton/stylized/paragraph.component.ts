import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'thy-skeleton-paragraph',
    template: `
        <div *ngFor="let item of sectionCount" [ngClass]="thySectionClass">
            <ng-container *ngFor="let k of rowsCount; index as i">
                <thy-skeleton-rectangle
                    [ngClass]="thyItemClass"
                    [thyWidth]="i === 0 ? thyFirstWidth : i === rowsCount.length - 1 ? thyLastWidth : thyWidth"
                    [thyHeight]="thyHeight"
                    [thyAnimated]="thyAnimated"
                    [thyPrimaryColor]="thyPrimaryColor"
                    [thySecondaryColor]="thySecondaryColor"
                    [thyBorderRadius]="thyBorderRadius"
                    [thyAnimatedSpeed]="thyAnimatedSpeed"
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
    @Input() thyFirstWidth: string;
    /**
     * 尾行宽度
     */
    @Input() thyLastWidth: string;
    /**
     * 骨架宽度
     */
    @Input() thyWidth: string;
    /**
     * 骨架高度
     */
    @Input() thyHeight: string;
    /**
     * 骨架边框圆角
     */
    @Input() thyBorderRadius: string;
    /**
     * 是否开启动画
     */
    @Input() thyAnimated: boolean = true;
    /**
     * 动画速度
     */
    @Input() thyAnimatedSpeed: string;
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
    @Input() thySectionClass: string = 'mb-4';
    /**
     * 骨架段落样式
     */
    @Input() thyItemClass: string = 'mb-2';

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
