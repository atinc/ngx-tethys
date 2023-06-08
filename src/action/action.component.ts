import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    AfterViewInit,
    OnChanges,
    ElementRef,
    Renderer2,
    SimpleChanges,
    ChangeDetectorRef,
    OnDestroy
} from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf } from '@angular/common';
import { Subscription, timer } from 'rxjs';

export type ThyActionType = 'primary' | 'success' | 'danger' | 'warning';

export type ThyActionFeedback = 'success' | 'error';

export interface ThyActionFeedbackOptions {
    duration?: number;
}

const defaultFeedbackOptions: ThyActionFeedbackOptions = {
    duration: 3000
};

const feedbackIcons = {
    success: 'check-circle-fill',
    error: 'close-circle-fill'
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
        '[class.active]': 'active',
        '[class.thy-action-hover-icon]': 'thyHoverIcon',
        '[class.disabled]': 'thyDisabled'
    },
    standalone: true,
    imports: [NgIf, ThyIconComponent]
})
export class ThyActionComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    icon: string;

    feedback: ThyActionFeedback = null;

    feedbackIcon: string;

    active = false;

    private type: string = 'primary';

    private hostRenderer = useHostRenderer();

    private feedbackTimer: Subscription;

    /**
     * 操作图标的类型
     * @type primary | success | danger | warning
     * @default primary
     */
    @Input()
    set thyType(value: ThyActionType) {
        this.setActionType(value || 'primary');
    }

    /**
     * 操作图标，支持传参同时也支持在投影中写 thy-icon 组件
     */
    @Input()
    set thyIcon(icon: string) {
        this.icon = icon;
    }

    /**
     * 操作图标，当 thyIcon 和其他指令参数名有冲突时使用 thyActionIcon
     */
    @Input()
    set thyActionIcon(icon: string) {
        this.icon = icon;
    }

    /**
     * 操作的图标 Active 状态，设置为 true 时会在 Item 上添加 active class
     * @default false
     */
    @Input()
    @InputBoolean()
    set thyActive(value: boolean) {
        this.active = value;
    }

    /**
     * 操作的图标 Active 状态，当 thyActive 和其他指令参数名有冲突时使用 thyActionActive
     * @default false
     */
    @Input()
    @InputBoolean()
    set thyActionActive(value: boolean) {
        this.active = value;
    }

    /**
     * 操作图标的主题
     * @type fill(背景色填充) | lite(简单文本颜色变化)
     */
    @Input() thyTheme: 'fill' | 'lite' = 'fill';

    /**
     * Hover 展示的图标
     */
    @Input() thyHoverIcon: string;

    /**
     * 是否处于禁用状态
     * @default false
     */
    @Input()
    @InputBoolean()
    thyDisabled: boolean;

    constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

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
        options = Object.assign({}, defaultFeedbackOptions, options);
        if (this.thyDisabled) {
            return;
        }
        this.feedback = feedback;
        this.feedbackIcon = feedbackIcons[this.feedback];
        this.updateClasses();
        this.cdr.markForCheck();
        if (options.duration) {
            if (this.feedbackTimer) {
                this.feedbackTimer.unsubscribe();
            }
            this.feedbackTimer = timer(options.duration).subscribe(() => {
                this.feedback = null;
                this.feedbackIcon = null;
                this.updateClasses();
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

    private setActionType(value: ThyActionType) {
        this.type = value;
    }

    private updateClasses() {
        let classNames: string[] = [];
        classNames.push(`action-${this.type}`);
        if (this.thyTheme === 'lite') {
            classNames.push('thy-action-lite');
        }
        if (this.feedback) {
            classNames.push(`action-feedback-${this.feedback}`);
        }
        this.hostRenderer.updateClass(classNames);
    }

    ngOnDestroy(): void {
        this.feedbackTimer?.unsubscribe();
    }
}
