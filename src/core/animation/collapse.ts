import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, requestAnimationFrame, cancelAnimationFrame } from './animation-consts';
import { Directive, effect, ElementRef, inject, input, signal } from '@angular/core';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @deprecated Use `thyAnimationCollapse` directive instead.
 */
export const collapseMotion: AnimationTriggerMetadata = trigger('collapseMotion', [
    state('expanded', style({ height: '*' })),
    state('collapsed', style({ height: 0, overflow: 'hidden' })),
    state('hidden', style({ height: 0, overflow: 'hidden', borderTopWidth: '0' })),
    transition('expanded => collapsed', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
    transition('expanded => hidden', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
    transition('collapsed => expanded', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
    transition('hidden => expanded', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`))
]);

const THY_ANIMATION_COLLAPSE_CLASS = 'thy-animation-collapse';

/**
 * 折叠动画指令
 */
@Directive({
    selector: '[thyAnimationCollapse]',
    host: {
        '(transitionend)': 'transitionEnd($event)'
    }
})
export class ThyAnimationCollapseDirective {
    private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /**
     * 是否展开
     */
    readonly thyOpen = input(false, { transform: coerceBooleanProperty });

    /**
     * 折叠时的类名，用于隐藏元素
     */
    readonly thyLeavedClassName = input<string>('');

    private firstRender = signal(true);

    constructor() {
        effect(cleanup => {
            const open = this.thyOpen();
            const element = this.elementRef.nativeElement;
            const leavedClassName = this.thyLeavedClassName();

            if (open && leavedClassName) {
                element.classList.remove(leavedClassName);
            }

            if (this.firstRender()) {
                // Avoid using animations on the first load to prevent page flickering or bouncing.
                if (open) {
                    element.style.height = 'auto';
                } else {
                    element.style.height = coerceCssPixelValue(0);
                    if (leavedClassName) {
                        element.classList.add(leavedClassName);
                    }
                }
            } else {
                /**
                 * | open  | animation stage | height       |
                 * | ----  | --------------- | ------------ |
                 * | true  | before          | 0            |
                 * | true  | active          | scrollHeight |
                 * | true  | end             | auto         |
                 *
                 * | false | before          | scrollHeight |
                 * | false | active          | 0            |
                 * | false | end             | 0            |
                 */
                element.classList.add(THY_ANIMATION_COLLAPSE_CLASS);

                if (open) {
                    // Wait for next frame to get correct scrollHeight after removing hidden class
                    const requestAnimationFrameId = requestAnimationFrame(() => {
                        if (!element) return;
                        const scrollHeight = this.calculateScrollHeight(element);
                        element.style.height = coerceCssPixelValue(scrollHeight);
                    });

                    cleanup(() => {
                        cancelAnimationFrame(requestAnimationFrameId);
                    });
                } else {
                    // Used for setting height to actual height when transition start
                    const scrollHeight = this.calculateScrollHeight(element);
                    element.style.height = coerceCssPixelValue(scrollHeight);
                    const requestAnimationFrameId = requestAnimationFrame(() => {
                        if (!element) return;
                        element.style.height = coerceCssPixelValue(0);
                    });

                    cleanup(() => {
                        cancelAnimationFrame(requestAnimationFrameId);
                    });
                }
            }

            this.firstRender.set(false);
        });
    }

    // Calculate height by summing up direct children's offsetHeight
    // This naturally excludes collapsed nested submenus since they have height: 0
    private calculateScrollHeight(element: HTMLElement): number {
        return Array.from(element.children).reduce((acc, child) => {
            if (child instanceof HTMLElement) {
                return acc + child.offsetHeight;
            }
            return acc;
        }, 0);
    }

    protected transitionEnd(event: TransitionEvent): void {
        if (this.firstRender() || event.target !== this.elementRef.nativeElement) {
            return;
        }

        // Set height to auto after transition end, so that it's height can be changed along with content.
        if (this.thyOpen()) {
            this.elementRef.nativeElement.style.height = 'auto';
        } else if (this.thyLeavedClassName()) {
            this.elementRef.nativeElement.classList.add(this.thyLeavedClassName());
        }

        this.elementRef.nativeElement.classList.remove(THY_ANIMATION_COLLAPSE_CLASS);
    }
}
