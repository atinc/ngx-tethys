import { ThyNavLinkDirective } from './../nav-link.directive';
import { ThyNavHorizontal } from './../nav.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ThyNavModule } from '../nav.module';
import { ThyIconModule } from '../../icon';
import { injectDefaultSvgIconSet, bypassSanitizeProvider } from 'ngx-tethys/testing';
import { By } from '@angular/platform-browser';
import { ThyNavComponent, ThyNavSize, ThyNavType } from '../nav.component';

const NAV_CLASS = `thy-nav`;
const NAV_LINK_CLASS = `nav-link`;

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

describe(`thy-nav`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NavBasicComponent],
            imports: [ThyNavModule, ThyIconModule],
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
            expect(navElement.classList.contains('nav-primary')).toEqual(true);
            expect(navElement.classList.contains('custom-nav')).toEqual(true);
        });

        it(`should get correct nav links`, () => {
            const navDebugElement = fixture.debugElement.query(By.directive(ThyNavComponent));
            const links = navDebugElement.queryAll(By.directive(ThyNavLinkDirective));
            expect(links).toBeTruthy();
            expect(links.length).toEqual(2);
            const activeLink: HTMLElement = links[0].nativeElement;
            const link2: HTMLElement = links[1].nativeElement;
            expect(activeLink.classList.contains(NAV_LINK_CLASS)).toEqual(true);
            expect(activeLink.classList.contains('active')).toEqual(true);
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
                expect(navElement.classList.contains(`nav-${type}`)).toEqual(true);
            });
        });

        it(`should get correct class when input size`, () => {
            ['sm'].forEach(size => {
                fixture.debugElement.componentInstance.size = size;
                fixture.detectChanges();
                const navDebugElement = fixture.debugElement.query(By.directive(ThyNavComponent));
                const navElement: HTMLElement = navDebugElement.nativeElement;
                expect(navElement.classList.contains(NAV_CLASS)).toEqual(true);
                expect(navElement.classList.contains(`nav-${size}`)).toEqual(true);
            });
        });

        it(`should get correct class when input size`, () => {
            ['sm'].forEach(size => {
                fixture.debugElement.componentInstance.size = size;
                fixture.detectChanges();
                const navDebugElement = fixture.debugElement.query(By.directive(ThyNavComponent));
                const navElement: HTMLElement = navDebugElement.nativeElement;
                expect(navElement.classList.contains(NAV_CLASS)).toEqual(true);
                expect(navElement.classList.contains(`nav-${size}`)).toEqual(true);
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
});
