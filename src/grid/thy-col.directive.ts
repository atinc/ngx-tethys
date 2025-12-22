import { Directive, inject, input, computed, effect, afterNextRender } from '@angular/core';
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
    }
})
export class ThyColDirective {
    thyRowDirective = inject(ThyRowDirective, { optional: true, host: true })!;

    /**
     * 栅格项的占位列数，thySpan 如果传递了值，以 thySpan 为准
     */
    readonly thyCol = input<ThySpan>();

    /**
     * 栅格项的占位列数
     */
    readonly thySpan = input<ThySpan>();

    protected readonly span = computed(() => {
        const span = this.thySpan() ?? this.thyCol();
        return span || 24;
    });

    private hostRenderer = useHostRenderer();

    private takeUntilDestroyed = takeUntilDestroyed();

    constructor() {
        effect(() => {
            this.updateHostClass();
        });

        afterNextRender(() => {
            if (this.thyRowDirective) {
                this.thyRowDirective.actualGutter$.pipe(this.takeUntilDestroyed).subscribe(data => {
                    const [horizontalGutter, verticalGutter] = data as [number, number];
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
        });
    }

    private updateHostClass() {
        const span = this.span();
        this.hostRenderer.updateClassByMap({
            [`thy-col-${span}`]: true
        });
    }
}
