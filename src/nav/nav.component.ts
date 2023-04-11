import { Constructor, InputBoolean, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { merge, Observable, of } from 'rxjs';
import { debounceTime, take, takeUntil, tap } from 'rxjs/operators';
import { useHostRenderer } from '@tethys/cdk/dom';
import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    HostBinding,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { RouterLinkActive } from '@angular/router';
import { ThyNavInkBarDirective } from './nav-ink-bar.directive';
import { ThyNavItemDirective } from './nav-item.directive';
import { BypassSecurityTrustHtmlPipe } from './nav.pipe';
import { ThyActionMenuComponent, ThyActionMenuItemDirective, ThyActionMenuItemActiveDirective } from 'ngx-tethys/action-menu';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgClass, NgTemplateOutlet, NgIf, NgFor } from '@angular/common';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

export type ThyNavType = 'pulled' | 'tabs' | 'pills' | 'lite' | 'primary' | 'secondary' | 'thirdly' | 'secondary-divider';
export type ThyNavSize = 'lg' | 'md' | 'sm';
export type ThyNavHorizontal = '' | 'start' | 'center' | 'end';

const navTypeClassesMap = {
    pulled: ['thy-nav-pulled'],
    tabs: ['thy-nav-tabs'],
    pills: ['thy-nav-pills'],
    lite: ['thy-nav-lite'],
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
 */
@Component({
    selector: 'thy-nav',
    templateUrl: './nav.component.html',
    host: {
        class: 'thy-nav'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgClass,
        NgTemplateOutlet,
        NgIf,
        ThyNavItemDirective,
        ThyIconComponent,
        ThyNavInkBarDirective,
        ThyActionMenuComponent,
        NgFor,
        ThyActionMenuItemDirective,
        ThyActionMenuItemActiveDirective,
        BypassSecurityTrustHtmlPipe
    ]
})
export class ThyNavComponent
    extends _MixinBase
    implements OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, OnChanges, OnDestroy
{
    private type: ThyNavType = 'pulled';
    private size: ThyNavSize = 'md';
    public initialized = false;

    public horizontal: ThyNavHorizontal;
    public wrapperOffset: { height: number; width: number; left: number; top: number } = {
        height: 0,
        width: 0,
        left: 0,
        top: 0
    };

    public hiddenItems: ThyNavItemDirective[] = [];

    public moreActive: boolean;

    public showMore = true;

    private moreBtnOffset: { height: number; width: number } = { height: 0, width: 0 };

    private hostRenderer = useHostRenderer();

    /**
     * 导航类型
     * @type pulled | tabs | pills | lite | primary | secondary | thirdly | secondary-divider
     * @default pulled
     */
    @Input()
    set thyType(type: ThyNavType) {
        this.type = type || 'pulled';
        if (this.initialized) {
            this.updateClasses();
        }
    }
    /**
     * 导航大小
     * @type lg | md | sm
     * @default md
     */
    @Input()
    set thySize(size: ThyNavSize) {
        this.size = size;
        if (this.initialized) {
            this.updateClasses();
        }
    }

    /**
     * 水平排列
     * @type '' | 'start' | 'center' | 'end'
     * @default false
     */
    @Input()
    set thyHorizontal(horizontal: ThyNavHorizontal) {
        this.horizontal = (horizontal as string) === 'right' ? 'end' : horizontal;
    }

    /**
     * 是否垂直排列
     * @default false
     */
    @HostBinding('class.thy-nav--vertical')
    @Input()
    @InputBoolean()
    thyVertical: boolean;

    /**
     * 是否是填充模式
     */
    @HostBinding('class.thy-nav--fill')
    @Input()
    @InputBoolean()
    thyFill: boolean = false;

    /**
     * 是否响应式，自动计算宽度存放 thyNavItem，并添加更多弹框
     * @default false
     */
    @Input()
    @InputBoolean()
    thyResponsive: boolean;

    /**
     * 右侧额外区域模板
     * @type TemplateRef
     */
    @Input() thyExtra: TemplateRef<unknown>;

    /**
     * @private
     */
    @ContentChildren(ThyNavItemDirective, { descendants: true }) links: QueryList<ThyNavItemDirective>;

    /**
     * @private
     */
    @ContentChildren(RouterLinkActive, { descendants: true }) routers: QueryList<RouterLinkActive>;

    /**
     * 响应式模式下更多操作模板
     * @type TemplateRef
     */
    @ContentChild('more') moreOperation: TemplateRef<unknown>;

    /**
     * 响应式模式下更多弹框模板
     * @type TemplateRef
     */
    @ContentChild('morePopover') morePopover: TemplateRef<unknown>;

    /**
     * 右侧额外区域模板，支持 thyExtra 传参和 <ng-template #extra></ng-template> 模板
     * @name extra
     * @type TemplateRef
     */
    @ContentChild('extra') extra: TemplateRef<unknown>;

    @ViewChild('moreOperationContainer') defaultMoreOperation: ElementRef<HTMLAnchorElement>;

    @ViewChild(ThyNavInkBarDirective, { static: true }) inkBar!: ThyNavInkBarDirective;

    get showInkBar(): boolean {
        const showTypes: ThyNavType[] = ['pulled', 'tabs'];
        return showTypes.includes(this.type);
    }

    private updateClasses() {
        let classNames: string[] = [];
        if (navTypeClassesMap[this.type]) {
            classNames = [...navTypeClassesMap[this.type]];
        }
        if (navSizeClassesMap[this.size]) {
            classNames.push(navSizeClassesMap[this.size]);
        }
        this.hostRenderer.updateClass(classNames);
    }

    private curActiveIndex: number;

    private prevActiveIndex: number = NaN;

    constructor(
        private elementRef: ElementRef,
        private ngZone: NgZone,
        private changeDetectorRef: ChangeDetectorRef,
        private popover: ThyPopover
    ) {
        super();
    }

    ngOnInit() {
        if (!this.thyResponsive) {
            this.initialized = true;
        }

        this.updateClasses();
    }

    ngAfterViewInit() {
        if (this.thyResponsive) {
            this.setMoreBtnOffset();
            this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                this.links.toArray().forEach(link => link.setOffset());
                this.setHiddenItems();
            });
        }
        this.ngZone.runOutsideAngular(() => {
            merge(
                this.links.changes,
                this.createResizeObserver(this.elementRef.nativeElement).pipe(debounceTime(100)),
                ...this.links.map(item => this.createResizeObserver(item.elementRef.nativeElement).pipe(debounceTime(100))),
                ...(this.routers || []).map(router => router?.isActiveChange)
            )
                .pipe(
                    takeUntil(this.ngUnsubscribe$),
                    tap(() => {
                        if (this.thyResponsive) {
                            this.resetSizes();
                            this.setHiddenItems();
                            this.calculateMoreIsActive();
                        }
                    })
                )
                .subscribe(() => {
                    this.alignInkBarToSelectedTab();
                });
        });
    }

    ngAfterContentInit(): void {
        if (this.thyResponsive) {
            this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                this.resetSizes();
            });
        }
    }

    ngAfterContentChecked() {
        this.calculateMoreIsActive();

        this.curActiveIndex = this.links && this.links.length ? this.links.toArray().findIndex(item => item.linkIsActive()) : -1;
        if (this.curActiveIndex < 0) {
            this.inkBar.hide();
        } else if (this.curActiveIndex !== this.prevActiveIndex) {
            this.alignInkBarToSelectedTab();
        }
    }

    private setMoreBtnOffset() {
        this.moreBtnOffset = {
            height: this.defaultMoreOperation?.nativeElement?.offsetHeight,
            width: this.defaultMoreOperation?.nativeElement?.offsetWidth
        };
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
            this.showMore = this.hiddenItems.length > 0;
            return;
        }

        const endIndex = this.thyVertical ? this.getShowItemsEndIndexWhenVertical(tabs) : this.getShowItemsEndIndexWhenHorizontal(tabs);

        const showItems = tabs.slice(0, endIndex + 1);
        (showItems || []).forEach(item => {
            item.setNavLinkHidden(false);
        });

        this.hiddenItems = endIndex === tabs.length - 1 ? [] : tabs.slice(endIndex + 1);
        (this.hiddenItems || []).forEach(item => {
            item.setNavLinkHidden(true);
        });

        this.showMore = this.hiddenItems.length > 0;
        this.initialized = true;
    }

    private getShowItemsEndIndexWhenHorizontal(tabs: ThyNavItemDirective[]) {
        const tabsLength = tabs.length;
        let endIndex = tabsLength;
        let totalWidth = 0;

        for (let i = 0; i < tabsLength; i += 1) {
            const _totalWidth = i === tabsLength - 1 ? totalWidth + tabs[i].offset.width : totalWidth + tabs[i].offset.width + tabItemRight;
            if (_totalWidth > this.wrapperOffset.width) {
                let moreOperationWidth = this.moreBtnOffset.width;
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
                let moreOperationHeight = this.moreBtnOffset.height;
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

    openMore(event: Event, template: TemplateRef<any>) {
        this.popover.open(template, {
            origin: event.currentTarget as HTMLElement,
            hasBackdrop: true,
            backdropClosable: true,
            insideClosable: true,
            placement: 'bottom',
            panelClass: 'thy-nav-list-popover',
            originActiveClass: 'thy-nav-origin-active'
        });
    }

    navItemClick(item: ThyNavItemDirective) {
        item.elementRef.nativeElement.click();
    }

    private alignInkBarToSelectedTab(): void {
        if (!this.showInkBar) {
            this.inkBar.hide();
            return;
        }
        const tabs = this.links?.toArray() ?? [];
        const selectedItem = tabs.find(item => item.linkIsActive());
        let selectedItemElement: HTMLElement = selectedItem && selectedItem.elementRef.nativeElement;

        if (selectedItem && this.moreActive) {
            selectedItemElement = this.defaultMoreOperation.nativeElement;
        }
        if (selectedItemElement) {
            this.prevActiveIndex = this.curActiveIndex;
            this.inkBar.alignToElement(selectedItemElement);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thyVertical, thyType } = changes;

        if (thyType?.currentValue !== thyType?.previousValue || thyVertical?.currentValue !== thyVertical?.previousValue) {
            this.alignInkBarToSelectedTab();
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
