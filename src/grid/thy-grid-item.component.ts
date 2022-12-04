import { ChangeDetectionStrategy, Component, ElementRef, Input, Optional, Renderer2, OnDestroy, OnInit, Inject } from '@angular/core';
import { InputBoolean, MixinBase, mixinUnsubscribe } from 'ngx-tethys/core';
import { takeUntil } from 'rxjs/operators';
import { ThyGridToken, THY_GRID_COMPONENT } from './grid.token';
import { ThyGridResponsiveDescription, THY_GRID_ITEM_DEFAULT_SPAN } from './thy-grid.component';

/**
 * 栅格项组件
 */
@Component({
    selector: 'thy-grid-item,[thyGridItem]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-grid-item'
    }
})
export class ThyGridItemComponent extends mixinUnsubscribe(MixinBase) implements OnInit, OnDestroy {
    /**
     * 栅格项的占位列数，为 0 时会隐藏该栅格项
     * @default 1
     */
    @Input() thySpan: number | ThyGridResponsiveDescription = THY_GRID_ITEM_DEFAULT_SPAN;

    /**
     * 栅格项左侧的偏移列数
     * @default 0
     */
    @Input() thyOffset: number | ThyGridResponsiveDescription = 0;

    /**
     * 是否是栅格的后缀节点
     * @default false
     */
    @Input() @InputBoolean() thySuffix: boolean;

    /**
     * 设置栅格项的 grid-colum 样式
     */
    @Input() thyGridColumn: number | string;

    /**
     * 设置栅格项的 grid-row 样式
     */
    @Input() thyGridRow: number | string;

    public isShow: boolean = true;

    public span: number = THY_GRID_ITEM_DEFAULT_SPAN;

    public offset: number = 0;

    public suffixColStart: number;

    constructor(
        public elementRef: ElementRef,
        private renderer: Renderer2,
        @Optional() @Inject(THY_GRID_COMPONENT) private grid: ThyGridToken
    ) {
        super();
    }

    ngOnInit(): void {
        this.grid.gridItemPropValueChange$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
            this.setGridItemStyle();
        });
    }

    private setGridItemStyle() {
        if (this.useStyleValue()) {
            return;
        }

        const gridItemElement = this.elementRef.nativeElement;
        const xGap: number = this.grid?.xGap || 0;

        this.renderer.setStyle(gridItemElement, 'display', this.isShow ? '' : 'none');

        this.renderer.setStyle(
            gridItemElement,
            'grid-column',
            this.thySuffix && this.suffixColStart ? `${this.suffixColStart} / span ${this.span}` : `span ${this.span}`
        );

        this.renderer.setStyle(
            gridItemElement,
            'margin-left',
            this.offset ? `calc(((100% - ${(this.span - 1) * xGap}px) / ${this.span} + ${xGap}px) * ${this.offset})` : ''
        );
    }

    private useStyleValue(): boolean {
        const gridItemElement = this.elementRef.nativeElement;

        const regex = /(span\s*)?\d+\s*(\/\s*(span\s*)?\d+)?/;
        const isGridColumn = regex.test(this.thyGridColumn?.toString().trim());
        const isGridRow = regex.test(this.thyGridRow?.toString().trim());

        if (isGridColumn || isGridRow) {
            isGridColumn ? this.renderer.setStyle(gridItemElement, 'grid-column', `${this.thyGridColumn}`) : null;
            isGridRow ? this.renderer.setStyle(gridItemElement, 'grid-row', `${this.thyGridRow}`) : null;
            return true;
        }
        return false;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
