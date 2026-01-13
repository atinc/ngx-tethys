import {
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    contentChildren,
    DestroyRef,
    effect,
    ElementRef,
    inject,
    input,
    OnDestroy,
    OnInit,
    signal,
    Signal,
    TemplateRef,
    viewChild,
    WritableSignal,
    afterNextRender,
    afterEveryRender,
    untracked
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyPopover, ThyPopoverConfig } from 'ngx-tethys/popover';
import { from, merge, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { ThyPlacement } from 'ngx-tethys/core';
import { ThyDropdownMenuComponent, ThyDropdownMenuItemActiveDirective, ThyDropdownMenuItemDirective } from 'ngx-tethys/dropdown';
import { injectLocale, ThyNavLocale } from 'ngx-tethys/i18n';
import { ThyIcon } from 'ngx-tethys/icon';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyNavInkBarDirective } from './nav-ink-bar.directive';
import { ThyNavItemDirective } from './nav-item.directive';
import { BypassSecurityTrustHtmlPipe } from './nav.pipe';

export type ThyNavType = 'pulled' | 'tabs' | 'pills' | 'lite' | 'card' | 'primary' | 'secondary' | 'thirdly' | 'secondary-divider';
export type ThyNavSize = 'lg' | 'md' | 'sm';
export type ThyNavHorizontal = '' | 'start' | 'center' | 'end';

const navTypeClassesMap = {
    pulled: ['thy-nav-pulled'],
    tabs: ['thy-nav-tabs'],
    pills: ['thy-nav-pills'],
    lite: ['thy-nav-lite'],
    card: ['thy-nav-card'],
    //如下类型已经废弃
    primary: ['thy-nav-primary'],
    secondary: ['thy-nav-secondary'],
    thirdly: ['thy-nav-thirdly'],
    'secondary-divider': ['thy-nav-secondary-divider']
};

const navSizeClassesMap = {
    lg: 'thy-nav-lg',
    md: 'thy-nav-md',
    sm: 'thy-nav-sm'
};

const tabItemRight = 20;

/**
 * 导航组件
 * @name thy-nav
 * @order 10
 */
@Component({
    selector: 'thy-nav',
    templateUrl: './nav.component.html',
    host: {
        '[class.thy-nav]': 'true',
        '[class.thy-nav--vertical]': 'thyVertical()',
        '[class.thy-nav--fill]': 'thyFill()'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        NgTemplateOutlet,
        ThyNavItemDirective,
        ThyIcon,
        ThyNavInkBarDirective,
        ThyDropdownMenuComponent,
        ThyDropdownMenuItemDirective,
        ThyDropdownMenuItemActiveDirective,
        BypassSecurityTrustHtmlPipe
    ]
})
export class ThyNav implements OnDestroy, OnInit {
    public elementRef = inject(ElementRef);

    private popover = inject(ThyPopover);

    private readonly destroyRef = inject(DestroyRef);

    private hostRenderer = useHostRenderer();

    public readonly locale: Signal<ThyNavLocale> = injectLocale('nav');

    public readonly initialized: WritableSignal<boolean> = signal(false);

    private wrapperOffset: WritableSignal<{ height: number; width: number; left: number; top: number }> = signal({
        height: 0,
        width: 0,
        left: 0,
        top: 0
    });

    public readonly hiddenItems: WritableSignal<ThyNavItemDirective[]> = signal([]);

    public readonly moreActive = computed(() => {
        return this.calculateMoreIsActive();
    });

    public readonly showMore = computed(() => {
        return this.hiddenItems().length > 0;
    });

    private moreBtnOffset: WritableSignal<{ height: number; width: number }> = signal({ height: 0, width: 0 });

    /**
     * 导航类型
     * @type pulled | tabs | pills | lite | primary | secondary | thirdly | secondary-divider
     * @default pulled
     */
    readonly thyType = input<ThyNavType>();

    /**
     * 导航大小
     * @type lg | md | sm
     * @default md
     */
    readonly thySize = input<ThyNavSize>('md');

    /**
     * 水平排列
     * @type '' | 'start' | 'center' | 'end'
     * @default false
     */
    readonly thyHorizontal = input<ThyNavHorizontal>('');

    /**
     * 是否垂直排列
     * @default false
     */
    readonly thyVertical = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否是填充模式
     */
    readonly thyFill = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否响应式，自动计算宽度存放 thyNavItem，并添加更多弹框
     * @default false
     */
    readonly thyResponsive = input(undefined, { transform: coerceBooleanProperty });

    /**
     * 支持暂停自适应计算
     */
    readonly thyPauseReCalculate = input<boolean>(false);

    /**
     * 更多操作的菜单点击内部是否可关闭
     * @deprecated please use thyPopoverOptions
     */
    readonly thyInsideClosable = input(true, { transform: coerceBooleanProperty });

    /**
     * 更多菜单弹出框的参数，底层使用 Popover 组件
     * @type ThyPopoverConfig
     */
    readonly thyPopoverOptions = input<ThyPopoverConfig<unknown> | null>(null);

    /**
     * 右侧额外区域模板
     * @type TemplateRef
     */
    readonly thyExtra = input<TemplateRef<unknown>>();

    /**
     * @private
     */
    public links = contentChildren(ThyNavItemDirective, { descendants: true });

    /**
     * @private
     */
    readonly routers = contentChildren(RouterLinkActive, { descendants: true });

    /**
     * 响应式模式下更多操作模板
     * @type TemplateRef
     */
    readonly moreOperation = contentChild<TemplateRef<unknown>>('more');

    /**
     * 响应式模式下更多弹框模板
     * @type TemplateRef
     */
    readonly morePopover = contentChild<TemplateRef<unknown>>('morePopover');

    /**
     * 右侧额外区域模板，支持 thyExtra 传参和 <ng-template #extra></ng-template> 模板
     * @name extra
     * @type TemplateRef
     */
    readonly extra = contentChild<TemplateRef<unknown>>('extra');

    readonly defaultMoreOperation = viewChild<ElementRef<HTMLAnchorElement>>('moreOperationContainer');

    readonly inkBar = viewChild.required(ThyNavInkBarDirective);

    readonly horizontal = computed(() => {
        const horizontalValue = this.thyHorizontal() as string;
        return horizontalValue === 'right' ? 'end' : horizontalValue;
    });

    readonly type = computed(() => this.thyType() || 'pulled');

    readonly showInkBar = computed(() => {
        const showTypes: ThyNavType[] = ['pulled', 'tabs'];
        return showTypes.includes(this.type());
    });

    private updateClasses() {
        let classNames: string[] = [];
        if (navTypeClassesMap[this.type()]) {
            classNames = [...navTypeClassesMap[this.type()]];
        }
        if (navSizeClassesMap[this.thySize()]) {
            classNames.push(navSizeClassesMap[this.thySize()]);
        }
        this.hostRenderer.updateClass(classNames);
    }

    private curActiveIndex?: number;

    private prevActiveIndex: WritableSignal<number> = signal(NaN);

    private navSubscription: { unsubscribe: () => void } | null = null;

    constructor() {
        effect(() => {
            this.updateClasses();
        });

        effect(() => {
            (this.hiddenItems() || []).forEach(item => {
                item.setNavLinkHidden(true);
            });
        });

        effect(() => {
            const thyVertical = this.thyVertical();
            const thyType = this.thyType();

            untracked(() => {
                this.alignInkBarToSelectedTab();
            });
        });

        effect(() => {
            const links = this.links();
            this.prevActiveIndex.set(NaN);
            const responsive = this.thyResponsive();

            untracked(() => {
                if (this.navSubscription) {
                    this.navSubscription.unsubscribe();
                }

                this.navSubscription = merge(
                    this.createResizeObserver(this.elementRef.nativeElement),
                    ...links.map(item =>
                        this.createResizeObserver(item.elementRef.nativeElement).pipe(
                            tap(() => {
                                item.setOffset();
                            })
                        )
                    ),
                    ...(this.routers() || []).map(router => router?.isActiveChange)
                )
                    .pipe(
                        takeUntilDestroyed(this.destroyRef),
                        tap(() => {
                            if (this.thyPauseReCalculate()) {
                                return;
                            }

                            if (responsive) {
                                this.setMoreBtnOffset();
                                this.resetSizes();
                                this.setHiddenItems();
                            }

                            if (this.type() === 'card') {
                                this.setNavItemDivider();
                            }
                        })
                    )
                    .subscribe(() => {
                        this.alignInkBarToSelectedTab();
                    });
            });
        });

        afterNextRender(() => {
            if (this.thyResponsive()) {
                from(Promise.resolve()).subscribe(() => {
                    this.setMoreBtnOffset();
                    this.links().forEach(link => link.setOffset());
                    this.setHiddenItems();
                    this.resetSizes();
                    this.initialized.set(true);
                });
            } else {
                this.initialized.set(true);
            }
        });

        afterEveryRender(() => {
            this.curActiveIndex = this.links() && this.links().length ? this.links().findIndex(item => item.linkIsActive()) : -1;
            if (this.curActiveIndex < 0) {
                this.inkBar().hide();
            } else if (this.curActiveIndex !== this.prevActiveIndex()) {
                this.alignInkBarToSelectedTab();
            }
        });
    }

    ngOnInit(): void {}

    private setMoreBtnOffset() {
        const defaultMoreOperation = this.defaultMoreOperation();
        const computedStyle = window.getComputedStyle(defaultMoreOperation!.nativeElement!);
        this.moreBtnOffset.set({
            height: defaultMoreOperation!.nativeElement!.offsetHeight! + parseFloat(computedStyle?.marginBottom) || 0,
            width: defaultMoreOperation!.nativeElement!.offsetWidth! + parseFloat(computedStyle?.marginRight) || 0
        });
    }

    private setNavItemDivider() {
        const tabs = this.links();
        const activeIndex = tabs.findIndex(item => item.linkIsActive());

        for (let i = 0; i < tabs.length; i++) {
            if ((i !== activeIndex && i !== activeIndex - 1 && i !== tabs.length - 1) || (i === activeIndex - 1 && this.moreActive())) {
                tabs[i].addClass('has-right-divider');
            } else {
                tabs[i].removeClass('has-right-divider');
            }
        }
    }

    createResizeObserver(element: HTMLElement) {
        return typeof ResizeObserver === 'undefined'
            ? of(null)
            : new Observable(observer => {
                  const resize = new ResizeObserver(entries => {
                      observer.next(entries);
                  });
                  resize.observe(element);
                  return () => {
                      resize.disconnect();
                  };
              });
    }

    private calculateMoreIsActive() {
        const moreActive = this.hiddenItems().some(item => {
            return item.linkIsActive();
        });
        return moreActive;
    }

    private setHiddenItems() {
        const tabs = this.links();
        if (!tabs.length) {
            this.hiddenItems.set([]);
            return;
        }

        const endIndex = this.thyVertical()
            ? this.getShowItemsEndIndexWhenVertical(tabs as ThyNavItemDirective[])
            : this.getShowItemsEndIndexWhenHorizontal(tabs as ThyNavItemDirective[]);

        const showItems = tabs.slice(0, endIndex + 1);
        (showItems || []).forEach(item => {
            item.setNavLinkHidden(false);
        });

        this.hiddenItems.set(endIndex === tabs.length - 1 ? [] : tabs.slice(endIndex + 1));
    }

    private getShowItemsEndIndexWhenHorizontal(tabs: ThyNavItemDirective[]) {
        const tabsLength = tabs.length;
        let endIndex = tabsLength;
        let totalWidth = 0;

        for (let i = 0; i < tabsLength; i += 1) {
            const _totalWidth = i === tabsLength - 1 ? totalWidth + tabs[i].offset().width : totalWidth + tabs[i].offset().width + tabItemRight;
            if (_totalWidth > this.wrapperOffset().width) {
                const moreOperationWidth = this.moreBtnOffset().width;
                if (totalWidth + moreOperationWidth <= this.wrapperOffset().width) {
                    endIndex = i - 1;
                } else {
                    endIndex = i - 2;
                }
                break;
            } else {
                totalWidth = _totalWidth;
                endIndex = i;
            }
        }
        return endIndex;
    }

    private getShowItemsEndIndexWhenVertical(tabs: ThyNavItemDirective[]) {
        const tabsLength = tabs.length;
        let endIndex = tabsLength;
        let totalHeight = 0;
        for (let i = 0; i < tabsLength; i += 1) {
            const _totalHeight = totalHeight + tabs[i].offset().height;
            if (_totalHeight > this.wrapperOffset().height) {
                const moreOperationHeight = this.moreBtnOffset().height;
                if (totalHeight + moreOperationHeight <= this.wrapperOffset().height) {
                    endIndex = i - 1;
                } else {
                    endIndex = i - 2;
                }
                break;
            } else {
                totalHeight = _totalHeight;
                endIndex = i;
            }
        }
        return endIndex;
    }

    private resetSizes() {
        this.wrapperOffset.set({
            height: this.elementRef.nativeElement.clientHeight || 0,
            width: this.elementRef.nativeElement.clientWidth || 0,
            left: this.elementRef.nativeElement.offsetLeft || 0,
            top: this.elementRef.nativeElement.offsetTop || 0
        });
    }

    openMoreMenu(event: Event, template: TemplateRef<any>) {
        this.popover.open(
            template,
            Object.assign(
                {
                    origin: event.currentTarget as HTMLElement,
                    hasBackdrop: true,
                    backdropClosable: true,
                    insideClosable: true,
                    placement: 'bottom' as ThyPlacement,
                    panelClass: 'thy-nav-list-popover',
                    originActiveClass: 'thy-nav-origin-active'
                },
                this.thyPopoverOptions() ? this.thyPopoverOptions() : {}
            )
        );
    }

    navItemClick(item: ThyNavItemDirective) {
        item.elementRef.nativeElement.click();
    }

    private alignInkBarToSelectedTab(): void {
        if (!this.showInkBar()) {
            this.inkBar().hide();
            return;
        }
        const tabs = this.links() ?? [];
        const selectedItem = tabs.find(item => item.linkIsActive());
        let selectedItemElement: HTMLElement = selectedItem && selectedItem.elementRef.nativeElement;

        if (selectedItem && this.moreActive()) {
            selectedItemElement = this.defaultMoreOperation()!.nativeElement;
        }
        if (selectedItemElement) {
            this.prevActiveIndex.set(this.curActiveIndex!);
            this.inkBar().alignToElement(selectedItemElement);
        }
    }

    ngOnDestroy() {
        if (this.navSubscription) {
            this.navSubscription.unsubscribe();
        }
    }
}
