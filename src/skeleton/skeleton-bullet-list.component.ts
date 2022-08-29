import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'thy-skeleton-bullet-list',
    template: `
        <div *ngFor="let item of sectionCount" [ngClass]="thySectionClass">
            <ng-container *ngFor="let item of rowsCount">
                <div class="d-flex" [ngClass]="thyItemClass">
                    <thy-skeleton-circle
                        [thyAnimated]="thyAnimated"
                        [thyAnimatedSpeed]="thyAnimatedSpeed"
                        [thySize]="thySize"
                        [ngClass]="thyCircleClass"
                        [thyPrimaryColor]="thyPrimaryColor"
                        [thySecondaryColor]="thySecondaryColor"
                    >
                    </thy-skeleton-circle>
                    <div [ngClass]="thyGutter"></div>
                    <thy-skeleton-rectangle
                        [ngClass]="thyRectangleClass"
                        [thyWidth]="thyWidth"
                        [thyHeight]="thyHeight"
                        [thyAnimated]="thyAnimated"
                        [thyPrimaryColor]="thyPrimaryColor"
                        [thySecondaryColor]="thySecondaryColor"
                        [thyBorderRadius]="thyBorderRadius"
                        [thyAnimatedSpeed]="thyAnimatedSpeed"
                    ></thy-skeleton-rectangle>
                </div>
            </ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeletonBulletListComponent {
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
     * 圆形骨架样式
     */
    @Input() thyCircleClass: string;

    /**
     * 矩形骨架样式
     */
    @Input() thyRectangleClass: string;

    /**
     * 骨架原点尺寸
     */
    @Input() thySize: string;

    /**
     * 骨架段落样式
     */
    @Input() thyItemClass: string = 'mb-2';

    /**
     * 左右骨架间距
     */
    @Input() thyGutter: string = 'mr-2';

    sectionCount: number[] = [1];
    /**
     * 段落数
     */
    @Input()
    set thyCount(value: number | string) {
        this.sectionCount = Array.from({ length: +value });
    }

    rowsCount: number[] = [1];
    /**
     * 行数
     */
    @Input()
    set thyRows(value: number | string) {
        this.rowsCount = Array.from({ length: +value });
    }
}
