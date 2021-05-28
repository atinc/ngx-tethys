import { InputBoolean, MixinBase, mixinUnsubscribe, UpdateHostClassService } from 'ngx-tethys/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { merge } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { ViewportRuler } from '@angular/cdk/overlay';
import {
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
    TemplateRef
} from '@angular/core';

import { ThyNavLinkDirective } from './nav-link.directive';

export type ThyNavType = 'primary' | 'secondary' | 'thirdly' | 'secondary-divider';
export type ThyNavSize = '' | 'sm';
export type ThyNavHorizontal = '' | 'left' | 'center' | 'right';

const navTypeClassesMap = {
    primary: ['nav-primary'],
    secondary: ['nav-secondary'],
    thirdly: ['nav-thirdly'],
    'secondary-divider': ['nav-secondary-divider']
};

const navSizeClassesMap = {
    sm: 'nav-sm'
};

const navHorizontalClassesMap = {
    left: '',
    center: 'justify-content-center',
    right: 'justify-content-end'
};

@Component({
    selector: 'thy-nav',
    templateUrl: './nav.component.html',
    host: {
        class: 'thy-nav'
    },
    providers: [UpdateHostClassService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyNavComponent extends mixinUnsubscribe(MixinBase) implements OnInit, AfterViewInit, OnDestroy {
    private _type: ThyNavType;
    private _size: ThyNavSize;
    private _horizontal: ThyNavHorizontal;
    private _initialized = false;

    private wrapperSize: { height: number; width: number };

    public hiddenItems: ThyNavLinkDirective[] = [];

    public moreActive: boolean;

    @ContentChildren(ThyNavLinkDirective, { descendants: true }) tabs: QueryList<ThyNavLinkDirective>;

    @ContentChild('more') moreOperation: TemplateRef<any>;

    @ContentChild('morePopover') morePopover: TemplateRef<any>;

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
        private viewportRuler: ViewportRuler,
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
                this.resetSizes();
                this.setHiddenItems();
            });

            this.ngZone.onStable.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
                this.calculateMoreIsActive();
            });

            merge(this.tabs.changes, this.viewportRuler.change(100))
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(() => {
                    this.resetSizes();
                    this.setHiddenItems();
                    this.calculateMoreIsActive();
                });
        }
    }

    private calculateMoreIsActive() {
        this.moreActive = this.hiddenItems.some(item => {
            return item.linkIsActive();
        });
        this.changeDetectorRef.detectChanges();
    }

    private setHiddenItems() {
        this.moreActive = false;
        const tabs = this.tabs.toArray();
        if (!tabs.length) {
            this.hiddenItems = [];
            return;
        }

        const len = tabs.length;
        let endIndex = len;
        for (let i = len - 1; i >= 0; i -= 1) {
            tabs[i].setNavLinkHidden(true);
            if (this.thyVertical) {
                if (tabs[i].top + tabs[i].height < this.wrapperSize.height + this.elementRef.nativeElement.offsetTop) {
                    endIndex = i;
                    break;
                }
            } else {
                if (tabs[i].left + tabs[i].width < this.wrapperSize.width + this.elementRef.nativeElement.offsetLeft) {
                    endIndex = i;
                    break;
                }
            }
        }

        const showItems = tabs.slice(0, endIndex);
        (showItems || []).forEach(item => {
            item.setNavLinkHidden(false);
        });

        this.hiddenItems = endIndex === len - 1 ? [] : [...tabs.slice(endIndex)];
    }

    private resetSizes() {
        this.wrapperSize = {
            height: this.elementRef.nativeElement.offsetHeight || 0,
            width: this.elementRef.nativeElement.offsetWidth || 0
        };
    }

    openMore(event: Event, template: TemplateRef<any>) {
        this.popover.open(template, {
            origin: event.currentTarget as HTMLElement,
            hasBackdrop: true,
            backdropClosable: true,
            insideClosable: true,
            placement: 'bottom'
        });
    }

    navItemClick(item: ThyNavLinkDirective) {
        item.elementRef.nativeElement.click();
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
