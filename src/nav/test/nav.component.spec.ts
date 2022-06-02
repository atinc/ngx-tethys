import { bypassSanitizeProvider, dispatchFakeEvent, injectDefaultSvgIconSet } from 'ngx-tethys/testing';

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ThyIconModule } from '../../icon';
import { ThyNavItemDirective } from '../nav-item.directive';
import { ThyNavComponent, ThyNavHorizontal, ThyNavSize, ThyNavType } from '../nav.component';
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
        >
            <a thyNavLink thyNavLinkActive="true">Link1</a>
            <a thyNavLink><thy-icon thyIconName="filter"></thy-icon>Link2</a>
        </thy-nav>
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
            class="custom-nav"
        >
            <a
                *ngFor="let item of navLinks; index as i"
                class="test-link"
                thyNavLink
                [thyNavLinkActive]="item.isActive"
                [routerLink]="[item.name]"
                routerLinkActive="active"
                >{{ item.name }}</a
            >
        </thy-nav>
    `
})
export class NavResponsiveComponent implements OnInit {
    type: ThyNavType;

    size: ThyNavSize;

    isFill = false;

    isVertical = false;

    horizontal: ThyNavHorizontal;

    navLinks = [{ name: 'link1' }, { name: 'link2' }, { name: 'link3' }];

    @ViewChildren(ThyNavItemDirective) links: ThyNavItemDirective[];

    @ViewChildren(ThyNavItemDirective, { read: ElementRef }) linksElement: QueryList<ElementRef>;

    @ViewChild(ThyNavComponent) nav: ThyNavComponent;

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
        beforeEach(() => {
            fixture = TestBed.createComponent(NavBasicComponent);
            fixture.detectChanges();
        });

        it(`should get correct class for default nav`, () => {
            const navDebugElement = fixture.debugElement.query(By.directive(ThyNavComponent));
            const navElement: HTMLElement = navDebugElement.nativeElement;
            expect(navDebugElement).toBeTruthy();
            expect(navElement).toBeTruthy();
            expect(navElement.classList.contains(NAV_CLASS)).toEqual(true);
            expect(navElement.classList.contains('thy-nav-primary')).toEqual(true);
            expect(navElement.classList.contains('custom-nav')).toEqual(true);
        });

        it(`should get correct nav items`, () => {
            const navDebugElement = fixture.debugElement.query(By.directive(ThyNavComponent));
            const links = navDebugElement.queryAll(By.directive(ThyNavItemDirective));
            expect(links).toBeTruthy();
            expect(links.length).toEqual(2);
            const activeLink: HTMLElement = links[0].nativeElement;
            const link2: HTMLElement = links[1].nativeElement;
            expect(activeLink.textContent).toContain('Link1');
            expect(activeLink.classList.contains(NAV_LINK_CLASS)).toEqual(true);
            expect(activeLink.classList.contains('active')).toEqual(true);

            expect(link2.textContent).toContain('Link2');
            expect(link2.classList.contains(NAV_LINK_CLASS)).toEqual(true);
            expect(link2.classList.contains('active')).toEqual(false);
        });

        it(`should get correct class when input type`, () => {
            ['primary', 'secondary', 'thirdly', 'secondary-divider'].forEach(type => {
                fixture.debugElement.componentInstance.type = type;
                fixture.detectChanges();
                const navDebugElement = fixture.debugElement.query(By.directive(ThyNavComponent));
                const navElement: HTMLElement = navDebugElement.nativeElement;
                expect(navElement.classList.contains(NAV_CLASS)).toEqual(true);
                expect(navElement.classList.contains(`thy-nav-${type}`)).toEqual(true);
            });
        });

        it(`should get correct class when input size`, () => {
            ['lg', 'sm'].forEach(size => {
                fixture.debugElement.componentInstance.size = size;
                fixture.detectChanges();
                const navDebugElement = fixture.debugElement.query(By.directive(ThyNavComponent));
                const navElement: HTMLElement = navDebugElement.nativeElement;
                expect(navElement.classList.contains(NAV_CLASS)).toEqual(true);
                expect(navElement.classList.contains(`thy-nav-${size}`)).toEqual(true);
            });
        });

        it(`should get correct class when is fill`, () => {
            fixture.debugElement.componentInstance.isFill = true;
            fixture.detectChanges();
            const navDebugElement = fixture.debugElement.query(By.directive(ThyNavComponent));
            const navElement: HTMLElement = navDebugElement.nativeElement;
            expect(navElement.classList.contains(NAV_CLASS)).toEqual(true);
            expect(navElement.classList.contains(`thy-nav--fill`)).toEqual(true);
        });

        it(`should get correct class when is vertical`, () => {
            fixture.debugElement.componentInstance.isVertical = true;
            fixture.detectChanges();
            const navDebugElement = fixture.debugElement.query(By.directive(ThyNavComponent));
            const navElement: HTMLElement = navDebugElement.nativeElement;
            expect(navElement.classList.contains(NAV_CLASS)).toEqual(true);
            expect(navElement.classList.contains(`thy-nav--vertical`)).toEqual(true);
        });

        it(`should get correct class when input thyHorizontal`, () => {
            const navHorizontalClassesMap = {
                left: '',
                center: 'justify-content-center',
                right: 'justify-content-end'
            };

            ['center', 'right'].forEach(item => {
                fixture.debugElement.componentInstance.horizontal = item;
                fixture.detectChanges();
                const navDebugElement = fixture.debugElement.query(By.directive(ThyNavComponent));
                const navElement: HTMLElement = navDebugElement.nativeElement;
                expect(navElement.classList.contains(NAV_CLASS)).toEqual(true);
                expect(navElement.classList.contains(navHorizontalClassesMap[item])).toEqual(true);
            });
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
            dispatchFakeEvent(window, 'resize');
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
            dispatchFakeEvent(window, 'resize');
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
            dispatchFakeEvent(window, 'resize');
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
            dispatchFakeEvent(window, 'resize');
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
            dispatchFakeEvent(window, 'resize');
            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();
            const moreBtn: DebugElement = fixture.debugElement.query(By.css('.thy-nav-more-container'));
            dispatchFakeEvent(moreBtn.nativeElement, 'click');

            const popover = overlayContainer.getContainerElement().querySelector('thy-popover-container');
            expect(popover).toBeTruthy();
            expect(popover.querySelectorAll('.thy-nav-item-more').length).toEqual(2);
        }));

        it('should call item event when click navLink in more popover', fakeAsync(() => {
            fixture.debugElement.componentInstance.responsive = true;
            fixture.detectChanges();

            spyLinksAndNavOffset(fixture.componentInstance.links, fixture.componentInstance.nav);
            dispatchFakeEvent(window, 'resize');
            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();
            const moreBtn: DebugElement = fixture.debugElement.query(By.css('.thy-nav-more-container'));
            dispatchFakeEvent(moreBtn.nativeElement, 'click');
            const popover = overlayContainer.getContainerElement().querySelector('thy-popover-container');
            const link = popover.querySelectorAll('.thy-nav-item-more')[0];
            const linkSpy = spyOn(fixture.componentInstance.linksElement.toArray()[1].nativeElement, 'click');
            dispatchFakeEvent(link, 'click');
            expect(linkSpy).toHaveBeenCalled();
        }));
    });
});

function spyLinksAndNavOffset(links: ThyNavItemDirective[], nav: ThyNavComponent) {
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
