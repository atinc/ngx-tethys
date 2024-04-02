import { ChangeDetectionStrategy, Component, ElementRef, Input, Optional, OnInit, Inject, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThyGridToken, THY_GRID_COMPONENT } from './grid.token';
import { ThyGridResponsiveDescription, THY_GRID_ITEM_DEFAULT_SPAN } from './thy-grid.component';
import { useHostRenderer } from '@tethys/cdk/dom';

/**
 * 栅格项组件
 * @name thy-grid-item,[thyGridItem]
 * @order 15
 */
@Component({
    selector: 'thy-grid-item,[thyGridItem]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-grid-item'
    },
    standalone: true
})
export class ThyGridItem implements OnInit {
    /**
     * 栅格项的占位列数，为 0 时会隐藏该栅格项
     * @default 1
     */
    @Input() thySpan: number | ThyGridResponsiveDescription = THY_GRID_ITEM_DEFAULT_SPAN;

    /**
     * 栅格项左侧的偏移列数
     */
    @Input() thyOffset: number | ThyGridResponsiveDescription = 0;

    private readonly destroyRef = inject(DestroyRef);

    private hostRenderer = useHostRenderer();

    public span: number = THY_GRID_ITEM_DEFAULT_SPAN;

    public offset: number = 0;

    constructor(public elementRef: ElementRef, @Optional() @Inject(THY_GRID_COMPONENT) private grid: ThyGridToken) {}

    ngOnInit(): void {
        this.grid.gridItemPropValueChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.setGridItemStyle();
        });
    }

    private setGridItemStyle() {
        const xGap: number = this.grid?.xGap || 0;

        this.hostRenderer.setStyle('display', this.span === 0 ? 'none' : '');

        this.hostRenderer.setStyle('grid-column', `span ${this.span}`);

        this.hostRenderer.setStyle(
            'margin-left',
            this.offset ? `calc(((100% - ${(this.span - 1) * xGap}px) / ${this.span} + ${xGap}px) * ${this.offset})` : ''
        );
    }
}
