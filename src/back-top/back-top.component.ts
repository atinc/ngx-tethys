import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  HostBinding,
  NgZone,
  ChangeDetectorRef,
  OnDestroy,
  OnChanges,
  ViewChild,
  ElementRef,
  numberAttribute,
  inject,
  input,
  output,
  effect,
  viewChild,
  Signal,
  computed,
  DOCUMENT
} from '@angular/core';
import { Subject, fromEvent, BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { throttleTime, takeUntil, switchMap } from 'rxjs/operators';
import { NgTemplateOutlet } from '@angular/common';
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
    imports: [ThyIcon, NgTemplateOutlet]
})
export class ThyBackTop implements OnInit, OnDestroy {
    private doc = inject(DOCUMENT);
    private thyScrollService = inject(ThyScrollService);
    private platform = inject(Platform);
    private cdr = inject(ChangeDetectorRef);
    private zone = inject(NgZone);

    @HostBinding('class.thy-back-top-container') classNames = true;

    /**
     * 自定义按钮显示模板
     */
    readonly thyTemplate = input<TemplateRef<void>>();

    /**
     * 指定对哪个 DOM 元素返回顶部
     * @type string | HTMLElement
     * @default window
     */
    readonly thyContainer = input<string | HTMLElement>();

    /**
     * 滚动高度达到此参数值才出现 thy-back-top
     * @type number
     */
    readonly thyVisibilityHeight = input(400, { transform: numberAttribute });

    /**
     * 点击按钮的回调函数
     */
    readonly thyClick = output<boolean>();

    /**
     * 监听按钮显示状态的回调函数
     */
    public readonly visibleChange = output<boolean>();

    /** The native `<div class="thy-back-top"></div>` element. */
    readonly backTop = viewChild<ElementRef<HTMLElement>>('backTop');

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

    private target: Signal<Element | Window> = computed(() => {
        const thyContainerValue = this.thyContainer();
        const target = typeof thyContainerValue === 'string' ? this.doc.querySelector(thyContainerValue) : thyContainerValue;
        return target || window;
    });

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
                this.thyScrollService.scrollTo(this.target(), 0);
                zone.run(() => this.thyClick.emit(true));
            });

        effect(() => {
            this.backTop$.next(this.backTop());
        });
    }

    ngOnInit(): void {
        this.registerScrollEvent();
    }

    private handleScroll(): void {
        if (this.visible === this.thyScrollService.getScroll(this.target()) > this.thyVisibilityHeight()) {
            return;
        }
        this.visible = !this.visible;
        this.cdr.detectChanges();
        this.zone.run(() => {
            this.visibleChange.emit(this.visible);
        });
    }

    private registerScrollEvent(): void {
        if (!this.platform.isBrowser) {
            return;
        }
        this.scrollListenerDestroy$.next();
        this.handleScroll();
        this.zone.runOutsideAngular(() => {
            fromEvent(this.target(), 'scroll', { passive: true })
                .pipe(throttleTime(50), takeUntil(this.scrollListenerDestroy$))
                .subscribe(() => this.handleScroll());
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.scrollListenerDestroy$.next();
    }
}
