import {
    Component,
    ElementRef,
    OnInit,
    NgZone,
    inject,
    output,
    viewChild,
    input,
    computed,
    effect,
    DestroyRef,
    TemplateRef,
    contentChild,
    Output,
    EventEmitter
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyTranslate } from 'ngx-tethys/core';
import { coerceBooleanProperty, htmlElementIsEmpty } from 'ngx-tethys/util';
import { fromEvent } from 'rxjs';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';
import { ThyButtonIcon } from 'ngx-tethys/button';
import { NgTemplateOutlet, NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type ThyPropertyOperationTypes = 'primary' | 'success' | 'warning' | 'danger';

/**
 * 属性操作组件
 * @name thy-property-operation
 * @order 10
 */
@Component({
    selector: 'thy-property-operation',
    templateUrl: './property-operation.component.html',
    host: {
        '[class.thy-property-operation]': 'true',
        '[class.active]': 'thyActive()',
        '[class.thy-property-operation-disabled]': 'thyDisabled()'
    },
    imports: [NgTemplateOutlet, NgClass, ThyButtonIcon, ThyFlexibleText, ThyIcon]
})
export class ThyPropertyOperation implements OnInit {
    private destroyRef = inject(DestroyRef);

    private thyTranslate = inject(ThyTranslate);

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    private ngZone = inject(NgZone);

    private hostRenderer = useHostRenderer();

    readonly onlyHasTips = computed<boolean>(() => {
        if (htmlElementIsEmpty(this.contentElement().nativeElement)) {
            return true;
        }
        return false;
    });

    /**
     * 点击移除图标时的事件回调，此函数只有在thyShowClose为true时才会发生
     */
    readonly thyOnRemove = output<Event>();

    /**
     * 点击事件回调
     */
    readonly thyClick = output<Event>();

    readonly contentElement = viewChild<ElementRef<HTMLElement>>('contentElement');

    readonly operationIcon = contentChild<TemplateRef<any>>('operationIcon');

    /**
     * 属性的 Label 文本
     */
    readonly thyLabelText = input<string>();

    /**
     * 属性的 Label Translate Key
     */
    readonly thyLabelTextTranslateKey = input<string>();

    readonly labelText = computed(() => this.thyTranslate.instant(this.thyLabelTextTranslateKey()) || this.thyLabelText());

    /**
     * 属性的值
     */
    readonly thyValue = input<string>();

    /**
     * 图标
     */
    readonly thyIcon = input<string>();

    /**
     * 当有属性值时是否展示移除图标
     */
    readonly thyShowClose = input(false, { transform: coerceBooleanProperty });

    // 支持有值时，label不显示

    readonly thyLabelHasValue = input(false, { transform: coerceBooleanProperty });

    /**
     * 有值时隐藏 label
     */
    readonly thyLabelHideWhenHasValue = input(false, { transform: coerceBooleanProperty });

    /**
     * 属性类型
     * @type  danger | primary | success | warning | null
     */
    readonly thyType = input<ThyPropertyOperationTypes>();

    /**
     * 激活状态
     */
    readonly thyActive = input(false, { transform: coerceBooleanProperty });

    /**
     * 禁用操作，添加后property operation中thyClick和thyOnRemove事件将会被禁用
     */
    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    constructor() {
        effect(() => {
            this.setHostClass();
        });
    }

    ngOnInit() {
        this.ngZone.runOutsideAngular(() =>
            fromEvent<Event>(this.elementRef.nativeElement, 'click')
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(event => {
                    if (this.thyDisabled()) {
                        return;
                    }

                    this.ngZone.run(() => this.thyClick.emit(event));
                })
        );
    }

    private setHostClass() {
        const type = this.thyType();
        this.hostRenderer.updateClass(type ? [`thy-property-operation-${type}`] : []);
    }

    remove($event: Event) {
        $event.stopPropagation();
        this.thyOnRemove.emit($event);
    }
}
