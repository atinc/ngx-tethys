import { bypassSanitizeProvider, dispatchFakeEvent, injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { Subject } from 'rxjs';

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ThyIconModule } from '../../icon';
import { ThyNavItemDirective } from '../nav-item.directive';
import { ThyNav, ThyNavHorizontal, ThyNavSize, ThyNavType } from '../nav.component';
import { ThyNavModule } from '../nav.module';

const NAV_CLASS = `thy-nav`;
const NAV_LINK_CLASS = `thy-nav-item`;

@Component({
    selector: 'app-nav-basic',
    template: `
        <thy-nav
            [thyType]="type"
            [thySize]="size"
            [thyFill]="isFill"
            [thyVertical]="isVertical"
            [thyHorizontal]="horizontal"
            class="custom-nav"
            [thyExtra]="extra">
            <a thyNavLink thyNavLinkActive="true">Link1</a>
            <a thyNavLink><thy-icon thyIconName="filter"></thy-icon>Link2</a>
            <a thyNavLink thyNavItemDisabled="true" id="disabled">Link3</a>
        </thy-nav>
        <ng-template #extra>
            <a href="javascript:;">Extra</a>
        </ng-template>
    `
})
export class NavBasicComponent implements OnInit {
    type: ThyNavType;

    size: ThyNavSize;

    isFill = false;

    isVertical = false;

    horizontal: ThyNavHorizontal;

    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'app-nav-basic',
    template: `
        <thy-nav
            [thyType]="type"
            [thySize]="size"
            [thyFill]="isFill"
            [thyVertical]="isVertical"
            [thyHorizontal]="horizontal"
            [thyResponsive]="responsive"
            [thyInsideClosable]="insideClosable"
            class="custom-nav"
            style="width: 100px;height: 50px;display:block">
            @for (item of navLinks; track item; let i = $index) {
                <a class="test-link" thyNavLink [thyNavItemActive]="item.isActive" [routerLink]="[item.name]" routerLinkActive="active">{{
                    item.name
                }}</a>
            }
        </thy-nav>
    `,
    styles: [
        `
            .thy-nav--vertical .thy-nav-item {
                display: block;
            }
        `
    ]
})
export class NavResponsiveComponent implements OnInit {
    type: ThyNavType;

    size: ThyNavSize;

    isFill = false;

    isVertical = false;

    horizontal: ThyNavHorizontal;

    responsive = false;

    navLinks = [{ name: 'nav' }, { name: 'link2' }, { name: 'link3' }];

    insideClosable: boolean;

    @ViewChildren(ThyNavItemDirective) links: ThyNavItemDirective[];

    @ViewChildren(ThyNavItemDirective, { read: ElementRef }) linksElement: QueryList<ElementRef>;

    @ViewChild(ThyNav) nav: ThyNav;

    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'app-nav-basic',
    template: ``
})
export class NavRouteComponent {}

const routes: Routes = [
    {
        path: 'link2',
        component: NavRouteComponent,
        data: {
            path: 'two'
        }
    }
];

describe(`thy-nav`, () => {
    const fakeResizeObserver = new Subject<void>();

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NavBasicComponent, NavResponsiveComponent, NavRouteComponent],
            imports: [ThyNavModule, ThyIconModule, NoopAnimationsModule, RouterTestingModule.withRoutes(routes)],
            providers: [bypassSanitizeProvider]
        });
        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<NavBasicComponent>;
        let navDebugElement: DebugElement;
        let navElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(NavBasicComponent);
            fixture.detectChanges();
            navDebugElement = fixture.debugElement.query(By.directive(ThyNav));
            navElement = navDebugElement.nativeElement;
        });

        it(`should get correct class for default nav`, () => {
            expect(navDebugElement).toBeTruthy();
            expect(navElement).toBeTruthy();
            expect(navElement.classList.contains(NAV_CLASS)).toEqual(true);
            expect(navElement.classList.contains('thy-nav-pulled')).toEqual(true);
            expect(navElement.classList.contains('custom-nav')).toEqual(true);
        });

        it(`should get correct nav items`, () => {
            const links = navDebugElement.queryAll(By.directive(ThyNavItemDirective));
            expect(links).toBeTruthy();
            expect(links.length).toEqual(3);
            const activeLink: HTMLElement = links[0].nativeElement;
            const link2: HTMLElement = links[1].nativeElement;
            expect(activeLink.textContent).toContain('Link1');
            expect(activeLink.classList.contains(NAV_LINK_CLASS)).toEqual(true);
            expect(activeLink.classList.contains('active')).toEqual(true);

            expect(link2.textContent).toContain('Link2');
            expect(link2.classList.contains(NAV_LINK_CLASS)).toEqual(true);
            expect(link2.classList.contains('active')).toEqual(false);
        });

        it(`should set extra success`, () => {
            const extraElement = navElement.querySelector('.thy-nav-extra');
            expect(extraElement).toBeTruthy();
            expect(extraElement.textContent).toContain('Extra');
        });

        it(`should set disabled class when thyNavItemDisabled is true`, () => {
            const disabledLink = navDebugElement.query(By.css('#disabled')).nativeElement;

            expect(disabledLink.textContent).toContain('Link3');
            expect(disabledLink.classList.contains(NAV_LINK_CLASS)).toEqual(true);
            expect(disabledLink.classList.contains('disabled')).toEqual(true);
        });

        it(`should get correct class when input type`, () => {
            ['pulled', 'pills', 'tabs', 'lite', 'primary', 'secondary', 'thirdly', 'secondary-divider'].forEach(type => {
                fixture.debugElement.componentInstance.type = type;
                fixture.detectChanges();
                expect(navElement.classList.contains(NAV_CLASS)).toEqual(true);
                expect(navElement.classList.contains(`thy-nav-${type}`)).toEqual(true);
            });
        });

        it(`should get correct class when input size`, () => {
            ['lg', 'sm'].forEach(size => {
                fixture.debugElement.componentInstance.size = size;
                fixture.detectChanges();
                expect(navElement.classList.contains(NAV_CLASS)).toEqual(true);
                expect(navElement.classList.contains(`thy-nav-${size}`)).toEqual(true);
            });
        });

        it(`should get correct class when is fill`, () => {
            fixture.debugElement.componentInstance.isFill = true;
            fixture.detectChanges();
            expect(navElement.classList.contains(NAV_CLASS)).toEqual(true);
            expect(navElement.classList.contains(`thy-nav--fill`)).toEqual(true);
        });

        it(`should get correct class when is vertical`, () => {
            fixture.debugElement.componentInstance.isVertical = true;
            fixture.detectChanges();
            expect(navElement.classList.contains(NAV_CLASS)).toEqual(true);
            expect(navElement.classList.contains(`thy-nav--vertical`)).toEqual(true);
        });

        it(`should get correct class when input thyHorizontal`, () => {
            const navHorizontalClassesMap = {
                left: '',
                center: 'justify-content-center',
                end: 'justify-content-end'
            };

            ['center', 'end'].forEach(item => {
                fixture.debugElement.componentInstance.horizontal = item;
                fixture.detectChanges();
                const navListElement: HTMLElement = navDebugElement.nativeElement.querySelector('.thy-nav-list');
                expect(navDebugElement.nativeElement.classList.contains(NAV_CLASS)).toEqual(true);
                expect(navListElement.classList.contains(navHorizontalClassesMap[item])).toEqual(true);
            });
        });

        it('should get correct default value for thyInsideClosable', () => {
            expect(navDebugElement.componentInstance.thyInsideClosable).toBe(true);
        });
    });

    describe('responsive', () => {
        let overlayContainer: OverlayContainer;
        let fixture: ComponentFixture<NavResponsiveComponent>;

        beforeEach(() => {
            fixture = TestBed.createComponent(NavResponsiveComponent);
            overlayContainer = TestBed.inject(OverlayContainer);
        });

        afterEach(() => {
            overlayContainer.ngOnDestroy();
        });

        it('should show more when responsive and overflow in horizontal direction', fakeAsync(() => {
            fixture.debugElement.componentInstance.responsive = true;
            fixture.detectChanges();

            spyLinksAndNavOffset(fixture.componentInstance.links, fixture.componentInstance.nav);
            const createResizeSpy = spyOn(fixture.componentInstance.nav, 'createResizeObserver');
            createResizeSpy.and.returnValue(fakeResizeObserver);
            fakeResizeObserver.next();
            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();
            const moreBtn: DebugElement = fixture.debugElement.query(By.css('.thy-nav-more-container'));
            expect(moreBtn).toBeTruthy();
            expect(moreBtn.nativeElement.classList.contains('d-none')).toBeFalsy();
            expect(fixture.debugElement.queryAll(By.css('.thy-nav-item-hidden')).length).toEqual(2);
        }));

        it('should active moreBtn when hidden link is active', fakeAsync(() => {
            fixture.debugElement.componentInstance.responsive = true;
            fixture.debugElement.componentInstance.navLinks = [{ name: 'link1' }, { name: 'link2', isActive: true }, { name: 'link3' }];
            fixture.detectChanges();

            spyLinksAndNavOffset(fixture.componentInstance.links, fixture.componentInstance.nav);
            const createResizeSpy = spyOn(fixture.componentInstance.nav, 'createResizeObserver');
            createResizeSpy.and.returnValue(fakeResizeObserver);
            fakeResizeObserver.next();
            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();
            const moreBtn: DebugElement = fixture.debugElement.query(By.css('.thy-nav-more-container'));
            expect(moreBtn).toBeTruthy();
            expect(moreBtn.nativeElement.classList.contains('d-none')).toBeFalsy();
            expect(moreBtn.nativeElement.classList.contains('active')).toBeTruthy();
        }));

        it('should active moreBtn when hidden link router is active', fakeAsync(() => {
            fixture.debugElement.componentInstance.responsive = true;
            const router: Router = TestBed.inject(Router);
            router.initialNavigation();
            fixture.detectChanges();
            router.navigate(['.', 'link2']);
            spyLinksAndNavOffset(fixture.componentInstance.links, fixture.componentInstance.nav);
            const createResizeSpy = spyOn(fixture.componentInstance.nav, 'createResizeObserver');
            createResizeSpy.and.returnValue(fakeResizeObserver);
            fakeResizeObserver.next();
            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();

            const moreBtn: DebugElement = fixture.debugElement.query(By.css('.thy-nav-more-container'));
            expect(moreBtn).toBeTruthy();
            expect(moreBtn.nativeElement.classList.contains('d-none')).toBeFalsy();
            expect(moreBtn.nativeElement.classList.contains('active')).toBeTruthy();
        }));

        it('should show more when responsive and overflow in vertical direction', fakeAsync(() => {
            fixture.debugElement.componentInstance.responsive = true;
            fixture.debugElement.componentInstance.isVertical = true;
            fixture.detectChanges();
            spyLinksAndNavOffset(fixture.componentInstance.links, fixture.componentInstance.nav);
            const createResizeSpy = spyOn(fixture.componentInstance.nav, 'createResizeObserver');
            createResizeSpy.and.returnValue(fakeResizeObserver);
            fakeResizeObserver.next();
            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();
            const moreBtn: DebugElement = fixture.debugElement.query(By.css('.thy-nav-more-container'));
            expect(moreBtn).toBeTruthy();
            expect(moreBtn.nativeElement.classList.contains('d-none')).toBeFalsy();
            expect(fixture.debugElement.queryAll(By.css('.thy-nav-item-hidden')).length).toEqual(2);
        }));

        it('should hidden moreBtn when has not navLinks', fakeAsync(() => {
            fixture.debugElement.componentInstance.responsive = true;
            fixture.debugElement.componentInstance.navLinks = [];

            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();

            const moreBtn: DebugElement = fixture.debugElement.query(By.css('.thy-nav-more-container'));
            expect(moreBtn).toBeTruthy();
            expect(moreBtn.nativeElement.classList.contains('d-none')).toBeTruthy();
            expect(fixture.debugElement.queryAll(By.css('.test-link')).length).toEqual(0);
        }));

        it('should show all navLinks when change navLinks', fakeAsync(() => {
            fixture.debugElement.componentInstance.responsive = true;
            fixture.detectChanges();
            spyLinksAndNavOffset(fixture.componentInstance.links, fixture.componentInstance.nav);
            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();
            fixture.debugElement.componentInstance.navLinks = [...fixture.debugElement.componentInstance.navLinks, { name: 'link4' }];
            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();
            const moreBtn: DebugElement = fixture.debugElement.query(By.css('.thy-nav-more-container'));
            expect(moreBtn).toBeTruthy();
            expect(moreBtn.nativeElement.classList.contains('d-none')).toBeFalsy();
            expect(fixture.debugElement.queryAll(By.css('.test-link')).length).toEqual(
                fixture.debugElement.componentInstance.navLinks.length
            );
        }));

        it('should show hidden links when click moreBtn', fakeAsync(() => {
            fixture.debugElement.componentInstance.responsive = true;
            fixture.detectChanges();

            spyLinksAndNavOffset(fixture.componentInstance.links, fixture.componentInstance.nav);
            const createResizeSpy = spyOn(fixture.componentInstance.nav, 'createResizeObserver');
            createResizeSpy.and.returnValue(fakeResizeObserver);
            fakeResizeObserver.next();
            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();
            const moreBtn: DebugElement = fixture.debugElement.query(By.css('.thy-nav-more-container'));
            dispatchFakeEvent(moreBtn.nativeElement, 'click');

            const popover = overlayContainer.getContainerElement().querySelector('thy-popover-container');
            expect(popover).toBeTruthy();
            expect(popover.querySelectorAll('.thy-nav-item-more').length).toEqual(2);
        }));

        it('should support set thyInsideClosable', fakeAsync(() => {
            fixture.debugElement.componentInstance.insideClosable = false;
            fixture.detectChanges();
            const navDebugElement = fixture.debugElement.query(By.directive(ThyNav));
            expect(navDebugElement.componentInstance.thyInsideClosable).toBe(false);
        }));

        it('should call item event when click navLink in more popover', fakeAsync(() => {
            fixture.debugElement.componentInstance.responsive = true;
            fixture.detectChanges();

            spyLinksAndNavOffset(fixture.componentInstance.links, fixture.componentInstance.nav);
            const createResizeSpy = spyOn(fixture.componentInstance.nav, 'createResizeObserver');
            createResizeSpy.and.returnValue(fakeResizeObserver);
            fakeResizeObserver.next();
            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();
            const moreBtn: DebugElement = fixture.debugElement.query(By.css('.thy-nav-more-container'));
            dispatchFakeEvent(moreBtn.nativeElement, 'click');
            const popover = overlayContainer.getContainerElement().querySelector('thy-popover-container');
            const link = popover.querySelectorAll('.thy-nav-item-more')[0];
            const linkSpy = spyOn(fixture.componentInstance.linksElement.toArray()[1].nativeElement, 'click');
            dispatchFakeEvent(link, 'click');
            fixture.detectChanges();
            expect(linkSpy).toHaveBeenCalled();
        }));
    });
});

function spyLinksAndNavOffset(links: ThyNavItemDirective[], nav: ThyNav) {
    (links || []).forEach((link, index) => {
        link.offset = {
            width: 30,
            height: 30,
            left: 30 * index,
            top: 30 * index
        };
    });

    spyOnProperty(nav['elementRef'].nativeElement, 'offsetWidth', 'get').and.returnValue(70);
    spyOnProperty(nav['elementRef'].nativeElement, 'offsetHeight', 'get').and.returnValue(70);
    spyOnProperty(nav['elementRef'].nativeElement, 'offsetLeft', 'get').and.returnValue(0);
    spyOnProperty(nav['elementRef'].nativeElement, 'offsetTop', 'get').and.returnValue(0);
}
