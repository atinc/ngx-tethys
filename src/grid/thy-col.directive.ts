import { Directive, Input, OnChanges, Optional, Host, AfterViewInit, OnInit, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyRowDirective } from './thy-row.directive';

export interface ThyColEmbeddedProperty {
    span?: number;
    pull?: number;
    push?: number;
    offset?: number;
    order?: number;
}

export type ThySpan = number | null | 'auto';

/**
 * 栅格列指令
 * @name thyCol
 * @order 35
 */
@Directive({
    selector: '[thyCol]',
    host: {
        class: 'thy-col'
    },
    standalone: true
})
export class ThyColDirective implements OnInit, OnChanges, AfterViewInit {
    /**
     * 栅格项的占位列数，thySpan 如果传递了值，以 thySpan 为准
     */
    @Input() thyCol: ThySpan;

    /**
     * 栅格项的占位列数
     */
    @Input() thySpan: ThySpan;

    get span() {
        const span = this.thySpan ?? this.thyCol;
        return span || 24;
    }

    private hostRenderer = useHostRenderer();

    private takeUntilDestroyed = takeUntilDestroyed();

    constructor(@Optional() @Host() public thyRowDirective: ThyRowDirective) {}

    ngOnInit() {
        this.updateHostClass();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateHostClass();
    }

    ngAfterViewInit(): void {
        if (this.thyRowDirective) {
            this.thyRowDirective.actualGutter$.pipe(this.takeUntilDestroyed).subscribe(([horizontalGutter, verticalGutter]) => {
                const renderGutter = (name: string, gutter: number) => {
                    this.hostRenderer.setStyle(name, `${gutter / 2}px`);
                };
                if (horizontalGutter > 0) {
                    renderGutter('padding-left', horizontalGutter);
                    renderGutter('padding-right', horizontalGutter);
                }
                if (verticalGutter > 0) {
                    renderGutter('padding-top', verticalGutter);
                    renderGutter('padding-bottom', verticalGutter);
                }
            });
        }
    }

    private updateHostClass() {
        this.hostRenderer.updateClassByMap({
            [`thy-col-${this.span}`]: true
        });
    }
}
