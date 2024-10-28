import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Input, TemplateRef, EventEmitter, Output, HostBinding, NgZone, ChangeDetectorRef, OnDestroy, OnChanges, ViewChild, ElementRef, numberAttribute, inject } from '@angular/core';
import { Subject, fromEvent, BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { throttleTime, takeUntil, switchMap } from 'rxjs/operators';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { fadeMotion, ThyScrollService } from 'ngx-tethys/core';
import { ThyIcon } from 'ngx-tethys/icon';

/**
 * 回到顶部组件
 * @name thy-back-top
 */
@Component({
    selector: 'thy-back-top,[thyBackTop]',
    templateUrl: './back-top.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [fadeMotion],
    standalone: true,
    imports: [ThyIcon, NgTemplateOutlet]
})
export class ThyBackTop implements OnInit, OnDestroy, OnChanges {
    private doc = inject(DOCUMENT);
    private thyScrollService = inject(ThyScrollService);
    private platform = inject(Platform);
    private cdr = inject(ChangeDetectorRef);
    private zone = inject(NgZone);

    @HostBinding('class.thy-back-top-container') classNames = true;

    /**
     * 自定义按钮显示模板
     */
    @Input() thyTemplate?: TemplateRef<void>;

    /**
     * 指定对哪个 DOM 元素返回顶部
     * @type string | HTMLElement
     * @default window
     */
    @Input() thyContainer?: string | HTMLElement;

    /**
     * 滚动高度达到此参数值才出现 thy-back-top
     * @type number
     */
    @Input({ transform: numberAttribute }) thyVisibilityHeight = 400;

    /**
     * 点击按钮的回调函数
     */
    @Output() readonly thyClick: EventEmitter<boolean> = new EventEmitter();

    /**
     * 监听按钮显示状态的回调函数
     */
    @Output() public visibleChange: EventEmitter<boolean> = new EventEmitter();

    /** The native `<div class="thy-back-top"></div>` element. */
    @ViewChild('backTop', { static: false })
    set backTop(backTop: ElementRef<HTMLElement> | undefined) {
        this.backTop$.next(backTop);
    }

    public visible = false;

    /**
     * The subject used to store the native `<div class="thy-back-top"></div>` since
     * it's located within the `ngIf` directive. It might be set asynchronously whenever the condition
     * is met. Having subject makes the code reactive and cancellable (e.g. event listeners will be
     * automatically removed and re-added through the `switchMap` below).
     */
    private backTop$ = new BehaviorSubject<ElementRef<HTMLElement> | undefined>(undefined);

    private destroy$ = new Subject<void>();
    private scrollListenerDestroy$ = new Subject<void>();

    private target: HTMLElement | null = null;

    constructor() {
        const zone = this.zone;

        this.backTop$
            .pipe(
                switchMap(backTop =>
                    backTop
                        ? new Observable(subscriber =>
                              zone.runOutsideAngular(() => fromEvent(backTop.nativeElement, 'click').subscribe(subscriber))
                          )
                        : EMPTY
                ),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.thyScrollService.scrollTo(this.getTarget(), 0);
                if (this.thyClick.observers.length) {
                    zone.run(() => this.thyClick.emit(true));
                }
            });
    }

    ngOnInit(): void {
        this.registerScrollEvent();
    }

    private getTarget(): HTMLElement | Window {
        return this.target || window;
    }

    private handleScroll(): void {
        if (this.visible === this.thyScrollService.getScroll(this.getTarget()) > this.thyVisibilityHeight) {
            return;
        }
        this.visible = !this.visible;
        this.cdr.detectChanges();
        if (this.visibleChange.observers.length > 0) {
            this.zone.run(() => {
                this.visibleChange.emit(this.visible);
            });
        }
    }

    private registerScrollEvent(): void {
        if (!this.platform.isBrowser) {
            return;
        }
        this.scrollListenerDestroy$.next();
        this.handleScroll();
        this.zone.runOutsideAngular(() => {
            fromEvent(this.getTarget(), 'scroll', { passive: true })
                .pipe(throttleTime(50), takeUntil(this.scrollListenerDestroy$))
                .subscribe(() => this.handleScroll());
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.scrollListenerDestroy$.next();
    }

    ngOnChanges(changes: any): void {
        const { thyContainer } = changes;
        if (thyContainer) {
            this.target = typeof this.thyContainer === 'string' ? this.doc.querySelector(this.thyContainer) : this.thyContainer;
            this.registerScrollEvent();
        }
    }
}
