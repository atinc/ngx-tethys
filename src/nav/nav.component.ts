import { Constructor, InputBoolean, MixinBase, mixinUnsubscribe, ThyUnsubscribe, UpdateHostClassService } from 'ngx-tethys/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { merge, Observable, of } from 'rxjs';
import { debounceTime, take, takeUntil } from 'rxjs/operators';

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
    OnDestroy,
    OnInit,
    QueryList,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { ThyNavItemDirective } from './nav-item.directive';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

export type ThyNavType = 'pulled' | 'tabs' | 'lite' | 'primary' | 'secondary' | 'thirdly' | 'secondary-divider';
export type ThyNavSize = 'lg' | 'md' | 'sm';
export type ThyNavHorizontal = '' | 'left' | 'center' | 'right';

const navTypeClassesMap = {
    pulled: ['thy-nav-pulled'],
    tabs: ['thy-nav-tabs'],
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

const navHorizontalClassesMap = {
    left: '',
    center: 'justify-content-center',
    right: 'justify-content-end'
};

const tabItemRight = 20;

@Component({
    selector: 'thy-nav',
    templateUrl: './nav.component.html',
    host: {
        class: 'thy-nav'
    },
    providers: [UpdateHostClassService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyNavComponent extends _MixinBase implements OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, OnDestroy {
    private _type: ThyNavType = 'pulled';
    private _size: ThyNavSize;
    private _horizontal: ThyNavHorizontal;
    private _initialized = false;

    public wrapperOffset: { height: number; width: number; left: number; top: number } = {
        height: 0,
        width: 0,
        left: 0,
        top: 0
    };

    public hiddenItems: ThyNavItemDirective[] = [];

    public moreActive: boolean;

    public showMore = true;

    @ContentChildren(ThyNavItemDirective, { descendants: true }) links: QueryList<ThyNavItemDirective>;

    @ContentChild('more') moreOperation: TemplateRef<unknown>;

    @ContentChild('morePopover') morePopover: TemplateRef<unknown>;

    @ViewChild('moreOperationContainer') defaultMoreOperation: ElementRef<HTMLAnchorElement>;

    @Input()
    set thyType(type: ThyNavType) {
        this._type = type || 'primary';
        if (this._initialized) {
            this._updateClasses();
        }
    }

    @Input()
    set thySize(size: ThyNavSize) {
        this._size = size;
        if (this._initialized) {
            this._updateClasses();
        }
    }

    @Input()
    set thyHorizontal(horizontal: ThyNavHorizontal) {
        this._horizontal = horizontal;
        if (this._initialized) {
            this._updateClasses();
        }
    }

    @HostBinding('class.thy-nav--vertical')
    @Input()
    @InputBoolean()
    thyVertical: boolean;

    @HostBinding('class.thy-nav--fill')
    @Input()
    @InputBoolean()
    thyFill: boolean;

    @Input()
    @InputBoolean()
    thyResponsive: boolean;

    private _updateClasses() {
        let classNames: string[] = [];
        if (navTypeClassesMap[this._type]) {
            classNames = [...navTypeClassesMap[this._type]];
        }
        if (navSizeClassesMap[this._size]) {
            classNames.push(navSizeClassesMap[this._size]);
        }
        if (navHorizontalClassesMap[this._horizontal]) {
            classNames.push(navHorizontalClassesMap[this._horizontal]);
        }
        this.updateHostClass.updateClass(classNames);
    }

    constructor(
        private updateHostClass: UpdateHostClassService,
        private elementRef: ElementRef,
        private ngZone: NgZone,
        private changeDetectorRef: ChangeDetectorRef,
        private popover: ThyPopover
    ) {
        super();
        this.updateHostClass.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        this._initialized = true;
        this._updateClasses();
    }

    ngAfterViewInit() {
        if (this.thyResponsive) {
            this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                this.links.toArray().forEach(link => link.setOffset());
                this.setHiddenItems();
            });

            this.ngZone.runOutsideAngular(() => {
                merge(this.links.changes, this.createResizeObserver(this.elementRef.nativeElement).pipe(debounceTime(100)))
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {
                        this.resetSizes();
                        this.setHiddenItems();
                        this.calculateMoreIsActive();
                    });
            });
        }
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
    }

    private getShowItemsEndIndexWhenHorizontal(tabs: ThyNavItemDirective[]) {
        const tabsLength = tabs.length;
        let endIndex = tabsLength;
        let totalWidth = 0;

        for (let i = 0; i < tabsLength; i += 1) {
            const _totalWidth = i === tabsLength - 1 ? totalWidth + tabs[i].offset.width : totalWidth + tabs[i].offset.width + tabItemRight;
            if (_totalWidth > this.wrapperOffset.width) {
                let moreOperationWidth = this.defaultMoreOperation.nativeElement.offsetWidth;
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
                let moreOperationHeight = this.defaultMoreOperation.nativeElement.offsetHeight;
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
            panelClass: 'thy-nav-list-popover'
        });
    }

    navItemClick(item: ThyNavItemDirective) {
        item.elementRef.nativeElement.click();
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
