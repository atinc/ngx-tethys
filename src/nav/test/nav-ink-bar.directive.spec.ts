import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterLinkActive, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { dispatchFakeEvent, injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { ThyBadgeModule } from '../../badge';
import { ThyIconModule } from '../../icon';
import { ThyNavInkBarDirective } from '../nav-ink-bar.directive';
import { ThyNavSize, ThyNavType } from '../nav.component';
import { ThyNavModule } from '../nav.module';

@Component({
    selector: 'app-nav-ink-bar',
    template: `
        <thy-nav [thyType]="type" [thyVertical]="isVertical" [thyResponsive]="responsive">
            <a
                *ngFor="let item of navLinks; index as i"
                thyNavItem
                [thyNavItemActive]="activeName === item.name"
                (click)="activeName = item.name"
                >{{ item.name }}</a
            >
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
export class NavInkBarComponent implements OnInit {
    activeName: string = 'Item1';
    type: ThyNavType;
    isVertical = false;
    responsive = false;
    navLinks = [{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }];

    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'test-link1',
    template: ``
})
export class Link1Component {}

@Component({
    selector: 'test-link2',
    template: ``
})
export class Link2Component {}

@Component({
    selector: 'test-link3',
    template: ``
})
export class Link3Component {}

@Component({
    selector: 'test-link-none',
    template: ``
})
export class LinkNoneComponent {}

const routes: Routes = [
    {
        path: 'link1',
        component: Link1Component
    },
    {
        path: 'link2',
        component: Link2Component
    },
    {
        path: 'link3',
        component: Link3Component
    },
    {
        path: 'link-none',
        component: LinkNoneComponent
    }
];

@Component({
    selector: 'app-nav-router-link-active-mode',
    template: `
        <div style="width: 400px;height: 50px;">
            <thy-nav [thyType]="type" [thySize]="size">
                <a thyNavItem *ngFor="let item of navLinks" [routerLink]="[item.name]" routerLinkActive="active"
                    >{{ item.name }} <thy-badge *ngIf="item.count" [thyCount]="item.count"> </thy-badge>
                </a>
            </thy-nav>
        </div>
    `
})
export class NavInkBarRouterLinkActiveModeComponent implements OnInit {
    type: ThyNavType = 'pulled';

    size: ThyNavSize = 'md';

    navLinks = [
        { name: 'link1', count: 0 },
        { name: 'link2', count: 0 },
        { name: 'link3', count: 3 }
    ];

    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'app-nav-have-badge-mode',
    template: `
        <div style="width: 400px;">
            <thy-nav [thyType]="type" [thySize]="size">
                <a thyNavItem *ngFor="let item of navLinks" [thyNavItemActive]="item.name === activeName"
                    >{{ item.name }} <thy-badge *ngIf="item.count" [thyCount]="item.count"> </thy-badge>
                </a>
            </thy-nav>
        </div>
    `
})
export class NavInkBarHaveBadgeModeComponent implements OnInit {
    type: ThyNavType = 'pulled';

    size: ThyNavSize = 'md';

    activeName = 'link1';

    navLinks = [
        { name: 'link1', count: 0 },
        { name: 'link2', count: 0 },
        { name: 'link3', count: 3 }
    ];

    constructor() {}

    ngOnInit(): void {}
}

describe(`thy-nav-ink-bar`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NavInkBarComponent],
            imports: [ThyNavModule, ThyIconModule, NoopAnimationsModule],
            providers: []
        });
        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    });

    describe('basic', () => {
        let overlayContainer: OverlayContainer;
        let fixture: ComponentFixture<NavInkBarComponent>;
        let navInkBarDebugElement: DebugElement;
        let navInkBarElement: HTMLElement;
        beforeEach(() => {
            fixture = TestBed.createComponent(NavInkBarComponent);
            overlayContainer = TestBed.inject(OverlayContainer);
            fixture.detectChanges();
            navInkBarDebugElement = fixture.debugElement.query(By.directive(ThyNavInkBarDirective));
            navInkBarElement = navInkBarDebugElement.nativeElement;
        });

        afterEach(() => {
            overlayContainer.ngOnDestroy();
        });
        it(`should get correct ink bar style when change input type`, fakeAsync(() => {
            ['pulled', 'pills', 'tabs', 'lite', 'primary', 'secondary', 'thirdly', 'secondary-divider'].forEach(type => {
                fixture.debugElement.componentInstance.type = type;
                flush();
                fixture.detectChanges();

                if (['pulled', 'tabs'].includes(type)) {
                    expect(navInkBarElement.style.visibility).toEqual('visible');
                } else {
                    expect(navInkBarElement.style.visibility).toEqual('hidden');
                }
            });
        }));

        it(`should move to right position when active other item`, fakeAsync(() => {
            const type = 'pulled';
            fixture.debugElement.componentInstance.type = type;
            fixture.detectChanges();

            const items: DebugElement[] = fixture.debugElement.queryAll(By.css('.thy-nav-item'));
            const firstItem: HTMLElement = items[0].nativeElement;
            const rect = firstItem.getBoundingClientRect();
            expect(navInkBarElement.style.left).toEqual(rect.left + 'px');
            dispatchFakeEvent(items[1].nativeElement, 'click');
            flush();
            fixture.detectChanges();
            expect(navInkBarElement.style.left).toEqual(rect.left + firstItem.offsetWidth + 'px');
        }));

        it(`should move to right position when active other item in vertical mode`, fakeAsync(() => {
            const type = 'tabs';

            fixture.debugElement.componentInstance.type = type;
            fixture.debugElement.componentInstance.isVertical = true;
            flush();
            fixture.detectChanges();

            const items: DebugElement[] = fixture.debugElement.queryAll(By.css('.thy-nav-item'));
            const firstItem: HTMLElement = items[0].nativeElement;
            const rect = firstItem.getBoundingClientRect();
            expect(navInkBarElement.style.top).toEqual(Math.round(rect.top) + 'px');

            dispatchFakeEvent(items[1].nativeElement, 'click');
            flush();
            fixture.detectChanges();
            const activeItem: DebugElement = fixture.debugElement.query(By.css('.active'));
            const firstActiveItem: HTMLElement = activeItem.nativeElement;
            const updateRect = firstActiveItem.getBoundingClientRect();
            expect(navInkBarElement.style.top).toEqual(Math.round(updateRect.top) + 'px');
        }));
    });
});

describe(`thy-nav-ink-bar-router-link-active-mode`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NavInkBarRouterLinkActiveModeComponent, Link1Component, Link2Component, Link3Component, LinkNoneComponent],
            imports: [ThyBadgeModule, ThyNavModule, NoopAnimationsModule, RouterTestingModule.withRoutes(routes)],
            providers: []
        });
        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    });

    describe('basic', () => {
        let overlayContainer: OverlayContainer;
        let fixture: ComponentFixture<NavInkBarRouterLinkActiveModeComponent>;
        let navInkBarDebugElement: DebugElement;
        let navInkBarElement: HTMLElement;
        let router: Router;
        beforeEach(() => {
            fixture = TestBed.createComponent(NavInkBarRouterLinkActiveModeComponent);
            router = TestBed.inject(Router);

            overlayContainer = TestBed.inject(OverlayContainer);
            fixture.detectChanges();
            navInkBarDebugElement = fixture.debugElement.query(By.directive(ThyNavInkBarDirective));
            navInkBarElement = navInkBarDebugElement.nativeElement;
        });

        afterEach(() => {
            overlayContainer.ngOnDestroy();
        });

        it('should show right count active links', () => {
            const linkElements = fixture.debugElement.queryAll(By.directive(RouterLinkActive));
            const links = linkElements.map(element => element.injector.get(RouterLinkActive) as RouterLinkActive);

            expect(links.length).toBe(3);
        });

        it('should show the active link and right ink bar', fakeAsync(() => {
            router.navigate(['link2']);
            flush();
            fixture.detectChanges();
            let activeLinks = fixture.debugElement
                .queryAll(By.css('.active'))
                .map(element => element.injector.get(RouterLinkActive) as RouterLinkActive);
            expect(activeLinks.length).toBe(1);
            expect(activeLinks[0]['link'].href).toBe('/link2');
            let activeEle: HTMLElement = activeLinks[0]['element'].nativeElement;
            let rect = activeEle.getBoundingClientRect();

            expect(navInkBarElement.style.left).toEqual(Math.round(rect.left) + 'px');
            router.navigate(['link1']);
            flush();
            fixture.detectChanges();

            activeLinks = fixture.debugElement
                .queryAll(By.css('.active'))
                .map(element => element.injector.get(RouterLinkActive) as RouterLinkActive);
            expect(activeLinks.length).toBe(1);
            expect(activeLinks[0]['link'].href).toBe('/link1');
            activeEle = activeLinks[0]['element'].nativeElement;
            rect = activeEle.getBoundingClientRect();

            expect(navInkBarElement.style.left).toEqual(rect.left + 'px');
        }));
    });
});

describe(`thy-nav-ink-bar-have-badge-mode`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NavInkBarHaveBadgeModeComponent],
            imports: [ThyBadgeModule, ThyNavModule, NoopAnimationsModule],
            providers: []
        });
        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    });

    describe('basic', () => {
        let overlayContainer: OverlayContainer;
        let fixture: ComponentFixture<NavInkBarHaveBadgeModeComponent>;
        let navInkBarDebugElement: DebugElement;
        let navInkBarElement: HTMLElement;
        beforeEach(() => {
            fixture = TestBed.createComponent(NavInkBarHaveBadgeModeComponent);

            overlayContainer = TestBed.inject(OverlayContainer);
            fixture.detectChanges();
            navInkBarDebugElement = fixture.debugElement.query(By.directive(ThyNavInkBarDirective));
            navInkBarElement = navInkBarDebugElement.nativeElement;
        });

        afterEach(() => {
            overlayContainer.ngOnDestroy();
        });

        it('should update width after item width changed', fakeAsync(() => {
            let activeLinks = fixture.debugElement.queryAll(By.css('.active'));
            let activeEle = activeLinks[0].nativeElement;
            let rect = activeEle.getBoundingClientRect();
            const originWidthBeforeHaveBadge = Math.round(rect.width);

            expect(navInkBarElement.style.width).toEqual(originWidthBeforeHaveBadge + 'px');

            // active item have badge
            fixture.componentInstance.navLinks = fixture.componentInstance.navLinks.map(item => {
                if (item.name === fixture.componentInstance.activeName) {
                    item.count += 2;
                    return { ...item };
                } else {
                    return { ...item };
                }
            });
            flush();
            fixture.detectChanges();
            activeLinks = fixture.debugElement.queryAll(By.css('.active'));
            activeEle = activeLinks[0].nativeElement;
            rect = activeEle.getBoundingClientRect();
            const firstUpdateWidth = Math.round(rect.width);
            expect(firstUpdateWidth).not.toEqual(originWidthBeforeHaveBadge);
            expect(navInkBarElement.style.width).toEqual(firstUpdateWidth + 'px');

            // active item remove badge
            fixture.componentInstance.navLinks = fixture.componentInstance.navLinks.map(item => {
                if (item.name === fixture.componentInstance.activeName) {
                    item.count = 0;
                    return { ...item };
                } else {
                    return { ...item };
                }
            });
            flush();
            fixture.detectChanges();
            activeLinks = fixture.debugElement.queryAll(By.css('.active'));
            activeEle = activeLinks[0].nativeElement;
            rect = activeEle.getBoundingClientRect();
            const updatedWidth = Math.round(rect.width);
            expect(updatedWidth).not.toEqual(firstUpdateWidth);
            expect(navInkBarElement.style.width).toEqual(updatedWidth + 'px');
        }));
    });
});
