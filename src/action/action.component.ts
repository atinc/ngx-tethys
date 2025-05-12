import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnChanges,
    OnDestroy,
    OnInit,
    Renderer2,
    Signal,
    SimpleChanges,
    computed,
    inject,
    input
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIcon } from 'ngx-tethys/icon';

import { coerceBooleanProperty } from 'ngx-tethys/util';
import { Subscription, timer } from 'rxjs';

export type ThyActionType = 'primary' | 'success' | 'danger' | 'warning';

export type ThyActionFeedback = 'success' | 'error';

export interface ThyActionFeedbackOptions {
    icon?: string;
    class?: string;
    duration?: number;
}

const defaultFeedbackOptions: Record<ThyActionFeedback, ThyActionFeedbackOptions> = {
    success: {
        icon: 'check-circle-fill',
        class: 'text-success',
        duration: 3000
    },
    error: {
        icon: 'close-circle-fill',
        class: 'text-danger',
        duration: 3000
    }
};
/**
 * 立即操作组件
 * @name thy-action,[thyAction]
 */
@Component({
    selector: 'thy-action, [thyAction]',
    templateUrl: './action.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-action',
        '[class.active]': 'active()',
        '[class.thy-action-hover-icon]': 'thyHoverIcon()',
        '[class.thy-action-has-feedback]': '!!feedback',
        '[class.disabled]': 'thyDisabled()'
    },
    imports: [ThyIcon]
})
export class ThyAction implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private renderer = inject(Renderer2);
    private cdr = inject(ChangeDetectorRef);

    public icon: Signal<string> = computed(() => this.thyActionIcon() || this.thyIcon());

    feedback: ThyActionFeedback = null;

    feedbackOptions: ThyActionFeedbackOptions;

    active: Signal<boolean> = computed(() => this.thyActionActive() || this.thyActive());

    private type: Signal<string> = computed(() => this.thyType());

    private hostRenderer = useHostRenderer();

    private feedbackTimer: Subscription;

    /**
     * 操作图标的类型
     * @type primary | success | danger | warning
     */
    readonly thyType = input<ThyActionType>('primary');

    /**
     * 操作图标，支持传参同时也支持在投影中写 thy-icon 组件
     */
    readonly thyIcon = input<string>('');

    /**
     * 操作图标，当 thyIcon 和其他指令参数名有冲突时使用 thyActionIcon
     */
    readonly thyActionIcon = input<string>('');

    /**
     * 操作的图标 Active 状态，设置为 true 时会在 Item 上添加 active class
     */
    readonly thyActive = input<boolean>(false);

    /**
     * 操作的图标 Active 状态，当 thyActive 和其他指令参数名有冲突时使用 thyActionActive
     */
    readonly thyActionActive = input<boolean>(false);

    /**
     * 操作图标的主题
     * @type fill(背景色填充) | lite(简单文本颜色变化)
     */
    readonly thyTheme = input<'fill' | 'lite'>('fill');

    /**
     * Hover 展示的图标
     */
    readonly thyHoverIcon = input<string>(undefined);

    /**
     * 是否处于禁用状态
     * @default false
     */
    readonly thyDisabled = input<boolean, boolean | string | number>(undefined, { transform: coerceBooleanProperty });

    ngOnInit(): void {
        this.updateClasses();
    }

    ngAfterViewInit() {
        this.wrapSpanForText(this.elementRef.nativeElement.childNodes);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes.thyType && !changes.thyType.firstChange) || (changes.thyTheme && !changes.thyTheme.firstChange)) {
            this.updateClasses();
        }
    }

    setMarginRight(marginRight: string) {
        this.elementRef.nativeElement.style.marginRight = marginRight;
    }

    /**
     * 触发成功反馈操作
     */
    success(options?: ThyActionFeedbackOptions) {
        this.setFeedback('success', options);
    }

    /**
     * 触发失败反馈操作
     */
    error(options?: ThyActionFeedbackOptions) {
        this.setFeedback('error', options);
    }

    private setFeedback(feedback: ThyActionFeedback, options: ThyActionFeedbackOptions) {
        if (this.thyDisabled()) {
            return;
        }
        options = Object.assign({}, defaultFeedbackOptions[feedback], options);
        this.feedback = feedback;
        this.feedbackOptions = options;
        this.cdr.markForCheck();
        if (options.duration) {
            if (this.feedbackTimer) {
                this.feedbackTimer.unsubscribe();
            }
            this.feedbackTimer = timer(options.duration).subscribe(() => {
                this.feedback = null;
                this.feedbackOptions = null;
                this.cdr.markForCheck();
            });
        }
    }

    private wrapSpanForText(nodes: NodeList): void {
        nodes.forEach(node => {
            if (node.nodeName === '#text') {
                const span = this.renderer.createElement('span');
                const parent = this.renderer.parentNode(node);
                // this.renderer.addClass(span, 'thy-action-wrap-span');
                this.renderer.insertBefore(parent, span, node);
                this.renderer.appendChild(span, node);
            }
        });
    }

    private updateClasses() {
        let classNames: string[] = [];
        classNames.push(`action-${this.type()}`);
        if (this.thyTheme() === 'lite') {
            classNames.push('thy-action-lite');
        }
        this.hostRenderer.updateClass(classNames);
    }

    ngOnDestroy(): void {
        this.feedbackTimer?.unsubscribe();
    }
}
