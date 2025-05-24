import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    NgZone,
    Renderer2,
    afterNextRender,
    inject,
    input,
    signal
} from '@angular/core';
import { IThySegmentItemComponent, THY_SEGMENTED_COMPONENT } from './segment.token';
import { assertIconOnly, coerceBooleanProperty } from 'ngx-tethys/util';
import { fromEvent } from 'rxjs';
import { SafeAny } from 'ngx-tethys/types';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * 分段控制器的选项组件
 * @name thy-segment-item,[thy-segment-item]
 */
@Component({
    selector: 'thy-segment-item,[thy-segment-item]',
    templateUrl: './segment-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-segment-item',
        '[class.disabled]': 'thyDisabled()'
    },
    imports: [NgClass, ThyIcon]
})
export class ThySegmentItem implements IThySegmentItemComponent {
    elementRef = inject(ElementRef);
    private ngZone = inject(NgZone);
    private renderer = inject(Renderer2);
    private parent = inject(THY_SEGMENTED_COMPONENT, { optional: true })!;

    /**
     * 选项的值
     */
    readonly thyValue = input<SafeAny>();

    /**
     * 选项的图标
     */
    readonly thyIcon = input<string>();

    /**
     * 是否禁用该选项
     */
    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    public isOnlyIcon = signal(false);

    public isWithText = signal(false);

    private destroyRef = inject(DestroyRef);

    constructor() {
        const elementRef = this.elementRef;
        const ngZone = this.ngZone;

        ngZone.runOutsideAngular(() =>
            fromEvent(elementRef.nativeElement, 'click')
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((event: Event) => {
                    if (
                        !this.thyDisabled() &&
                        !this.parent.thyDisabled() &&
                        this.parent.selectedItem &&
                        this.parent.selectedItem !== this
                    ) {
                        ngZone.run(() => {
                            this.parent.selectedItem.unselect();
                            this.parent.changeSelectedItem(this, event);
                        });
                    }
                })
        );

        afterNextRender(() => {
            const labelDiv = this.elementRef.nativeElement.children[0];
            this.isOnlyIcon.set(assertIconOnly(labelDiv) && this.parent.thyMode() === 'inline');
            this.wrapSpanForText(labelDiv.childNodes);
        });
    }

    public select(): void {
        this.elementRef.nativeElement.classList.add('active');
    }

    public unselect(): void {
        this.elementRef.nativeElement.classList.remove('active');
    }

    private wrapSpanForText(nodes: NodeList): void {
        nodes.forEach(node => {
            if (node.nodeName === '#text') {
                const span = this.renderer.createElement('span');
                const parent = this.renderer.parentNode(node);
                this.renderer.insertBefore(parent, span, node);
                this.renderer.appendChild(span, node);
            }

            if (node.nodeName === '#text' || node.nodeName === 'SPAN') {
                this.isWithText.set(true);
            }
        });
    }
}
