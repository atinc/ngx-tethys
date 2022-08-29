import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'thy-skeleton-list',
    template: `
        <div *ngFor="let item of sectionCount" [ngClass]="thySectionClass">
            <ng-container *ngFor="let k of rowsCount; index as i">
                <thy-skeleton-rectangle
                    [ngClass]="thyItemClass"
                    [thyWidth]="thyWidth"
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
export class ThySkeletonListComponent {
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
    @Input('thyCount')
    set sectionChange(value: number | string) {
        this.sectionCount = Array.from({ length: +value });
    }

    rowsCount: number[] = [1];
    @Input('thyRows')
    set rowsChange(value: number | string) {
        this.rowsCount = Array.from({ length: +value });
    }
}
