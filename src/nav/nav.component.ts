import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    contentChild,
    ContentChildren,
    contentChildren,
    DestroyRef,
    effect,
    ElementRef,
    inject,
    input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    signal,
    Signal,
    SimpleChanges,
    TemplateRef,
    viewChild,
    WritableSignal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyPopover, ThyPopoverConfig } from 'ngx-tethys/popover';
import { merge, Observable, of } from 'rxjs';
import { startWith, take, tap } from 'rxjs/operators';

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
export class ThyNav implements OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, OnChanges, OnDestroy {
    private elementRef = inject(ElementRef);
    private ngZone = inject(NgZone);
    private changeDetectorRef = inject(ChangeDetectorRef);
    private popover = inject(ThyPopover);

    private readonly destroyRef = inject(DestroyRef);

    public initialized = false;
    public wrapperOffset: { height: number; width: number; left: number; top: number } = {
        height: 0,
        width: 0,
        left: 0,
        top: 0
    };

    public hiddenItems: ThyNavItemDirective[] = [];

    public moreActive?: boolean;

    readonly showMore: WritableSignal<boolean> = signal(false);

    private moreBtnOffset: { height: number; width: number } = { height: 0, width: 0 };

    private hostRenderer = useHostRenderer();

    private innerLinks!: QueryList<ThyNavItemDirective>;

    locale: Signal<ThyNavLocale> = injectLocale('nav');

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
    thyPauseReCalculate = input<boolean>(false);

    /**
     * 更多操作的菜单点击内部是否可关闭
     * @deprecated please use thyPopoverOptions
     */
    readonly thyInsideClosable = input(true, { transform: coerceBooleanProperty });

    /**
     * 更多菜单弹出框的参数，底层使用 Popover 组件
     * @type ThyPopoverConfig
     */
    thyPopoverOptions = input<ThyPopoverConfig<unknown> | null>(null);

    /**
     * 右侧额外区域模板
     * @type TemplateRef
     */
    readonly thyExtra = input<TemplateRef<unknown>>();

    /**
     * @private
     */
    @ContentChildren(ThyNavItemDirective, { descendants: true })
    set links(value) {
        this.innerLinks = value;
        this.prevActiveIndex = NaN;
    }
    get links(): QueryList<ThyNavItemDirective> {
        return this.innerLinks;
    }

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

    get showInkBar(): boolean {
        const showTypes: ThyNavType[] = ['pulled', 'tabs'];
        return showTypes.includes(this.type());
    }

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

    private prevActiveIndex: number = NaN;

    private navSubscription: { unsubscribe: () => void } | null = null;

    readonly type = computed(() => this.thyType() || 'pulled');

    constructor() {
        effect(() => {
            this.updateClasses();
        });
    }

    ngOnInit() {
        if (!this.thyResponsive()) {
            this.initialized = true;
        }
    }

    ngAfterViewInit() {
        if (this.thyResponsive()) {
            this.setMoreBtnOffset();
            this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                this.setMoreBtnOffset();
                this.links.toArray().forEach(link => link.setOffset());
                this.setHiddenItems();
            });
        }

        this.ngZone.runOutsideAngular(() => {
            this.links.changes.pipe(startWith(this.links), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
                if (this.navSubscription) {
                    this.navSubscription.unsubscribe();
                }

                this.navSubscription = merge(
                    this.createResizeObserver(this.elementRef.nativeElement),
                    ...this.links.map(item => this.createResizeObserver(item.elementRef.nativeElement).pipe(tap(() => item.setOffset()))),
                    ...(this.routers() || []).map(router => router?.isActiveChange)
                )
                    .pipe(
                        takeUntilDestroyed(this.destroyRef),
                        tap(() => {
                            if (this.thyPauseReCalculate()) {
                                return;
                            }

                            if (this.thyResponsive()) {
                                this.setMoreBtnOffset();
                                this.resetSizes();
                                this.setHiddenItems();
                                this.calculateMoreIsActive();
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
    }

    ngAfterContentInit(): void {
        if (this.thyResponsive()) {
            this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                this.resetSizes();
            });
        }
    }

    ngAfterContentChecked() {
        this.calculateMoreIsActive();

        this.curActiveIndex = this.links && this.links.length ? this.links.toArray().findIndex(item => item.linkIsActive()) : -1;
        if (this.curActiveIndex < 0) {
            this.inkBar().hide();
        } else if (this.curActiveIndex !== this.prevActiveIndex) {
            this.alignInkBarToSelectedTab();
        }
    }

    private setMoreBtnOffset() {
        const defaultMoreOperation = this.defaultMoreOperation();
        const computedStyle = window.getComputedStyle(defaultMoreOperation?.nativeElement!);
        this.moreBtnOffset = {
            height: defaultMoreOperation?.nativeElement?.offsetHeight! + parseFloat(computedStyle?.marginBottom) || 0,
            width: defaultMoreOperation?.nativeElement?.offsetWidth! + parseFloat(computedStyle?.marginRight) || 0
        };
    }

    private setNavItemDivider() {
        const tabs = this.links.toArray();
        const activeIndex = tabs.findIndex(item => item.linkIsActive());

        for (let i = 0; i < tabs.length; i++) {
            if ((i !== activeIndex && i !== activeIndex - 1 && i !== tabs.length - 1) || (i === activeIndex - 1 && this.moreActive)) {
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
        this.moreActive = this.hiddenItems.some(item => {
            return item.linkIsActive();
        });
        this.changeDetectorRef.detectChanges();
    }

    private setHiddenItems() {
        this.moreActive = false;
        const tabs = this.links.toArray();
        if (!tabs.length) {
            this.hiddenItems = [];
            this.showMore.set(false);
            return;
        }

        const endIndex = this.thyVertical() ? this.getShowItemsEndIndexWhenVertical(tabs) : this.getShowItemsEndIndexWhenHorizontal(tabs);

        const showItems = tabs.slice(0, endIndex + 1);
        (showItems || []).forEach(item => {
            item.setNavLinkHidden(false);
        });

        this.hiddenItems = endIndex === tabs.length - 1 ? [] : tabs.slice(endIndex + 1);
        (this.hiddenItems || []).forEach(item => {
            item.setNavLinkHidden(true);
        });

        this.showMore.set(this.hiddenItems.length > 0);
        this.initialized = true;
    }

    private getShowItemsEndIndexWhenHorizontal(tabs: ThyNavItemDirective[]) {
        const tabsLength = tabs.length;
        let endIndex = tabsLength;
        let totalWidth = 0;

        for (let i = 0; i < tabsLength; i += 1) {
            const _totalWidth = i === tabsLength - 1 ? totalWidth + tabs[i].offset.width : totalWidth + tabs[i].offset.width + tabItemRight;
            if (_totalWidth > this.wrapperOffset.width) {
                const moreOperationWidth = this.moreBtnOffset.width;
                if (totalWidth + moreOperationWidth <= this.wrapperOffset.width) {
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
            const _totalHeight = totalHeight + tabs[i].offset.height;
            if (_totalHeight > this.wrapperOffset.height) {
                const moreOperationHeight = this.moreBtnOffset.height;
                if (totalHeight + moreOperationHeight <= this.wrapperOffset.height) {
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
        this.wrapperOffset = {
            height: this.elementRef.nativeElement.offsetHeight || 0,
            width: this.elementRef.nativeElement.offsetWidth || 0,
            left: this.elementRef.nativeElement.offsetLeft || 0,
            top: this.elementRef.nativeElement.offsetTop || 0
        };
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
        if (!this.showInkBar) {
            this.inkBar().hide();
            return;
        }
        const tabs = this.links.toArray() ?? [];
        const selectedItem = tabs.find(item => item.linkIsActive());
        let selectedItemElement: HTMLElement = selectedItem && selectedItem.elementRef.nativeElement;

        if (selectedItem && this.moreActive) {
            selectedItemElement = this.defaultMoreOperation()!.nativeElement;
        }
        if (selectedItemElement) {
            this.prevActiveIndex = this.curActiveIndex!;
            this.inkBar().alignToElement(selectedItemElement);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thyVertical, thyType } = changes;

        if (thyType?.currentValue !== thyType?.previousValue || thyVertical?.currentValue !== thyVertical?.previousValue) {
            this.alignInkBarToSelectedTab();
        }
    }

    ngOnDestroy() {
        if (this.navSubscription) {
            this.navSubscription.unsubscribe();
        }
    }
}
