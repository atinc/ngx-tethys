import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ThyIconNav, ThyIconNavLink, ThyNavModule } from 'ngx-tethys/nav';
import { injectDefaultSvgIconSet, bypassSanitizeProvider } from 'ngx-tethys/testing';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ThyIconModule } from 'ngx-tethys/icon';

const ICON_NAV_CLASS = `thy-icon-nav`;
const ICON_NAV_LINK_CLASS = `thy-icon-nav-link`;

@Component({
    selector: 'app-icon-nav-basic',
    template: `
        <thy-icon-nav [thyType]="type">
            <a thyIconNavLink thyIconNavLinkActive="true" thyIconNavLinkIcon="inbox"></a>
            <a thyIconNavLink><thy-icon thyIconName="filter"></thy-icon></a>
        </thy-icon-nav>
    `,
    imports: [ThyNavModule, ThyIconModule]
})
export class IconNavBasicComponent implements OnInit {
    type = '';

    constructor() {}

    ngOnInit(): void {}
}

describe(`icon-nav`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [bypassSanitizeProvider, provideHttpClient()]
        });
        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<IconNavBasicComponent>;

        beforeEach(() => {
            fixture = TestBed.createComponent(IconNavBasicComponent);
            fixture.detectChanges();
        });

        it(`should get correct class thy-icon-nav`, () => {
            const iconNavDebugElement = fixture.debugElement.query(By.directive(ThyIconNav));
            const iconNavElement: HTMLElement = iconNavDebugElement.nativeElement;
            expect(iconNavDebugElement).toBeTruthy();
            expect(iconNavElement).toBeTruthy();
            expect(iconNavElement.classList.contains(ICON_NAV_CLASS)).toEqual(true);
        });

        it(`should get correct class thy-icon-nav-secondary when type is secondary`, async () => {
            fixture.componentInstance.type = 'secondary';
            fixture.detectChanges();
            const iconNavDebugElement = fixture.debugElement.query(By.directive(ThyIconNav));
            const iconNavElement: HTMLElement = iconNavDebugElement.nativeElement;
            expect(iconNavDebugElement).toBeTruthy();
            expect(iconNavElement).toBeTruthy();
            expect(iconNavElement.classList.contains(`${ICON_NAV_CLASS}-secondary`)).toEqual(true);
        });

        it(`should get correct class 'thy-icon-nav-link' for icon nav link`, async () => {
            const iconNavLinkDebugElements = fixture.debugElement.queryAll(By.directive(ThyIconNavLink));
            expect(iconNavLinkDebugElements).toBeTruthy();
            expect(iconNavLinkDebugElements.length).toEqual(2);
            const inboxIconNavLinkDebugElement = iconNavLinkDebugElements[0];
            const filterIconNavLinkDebugElement = iconNavLinkDebugElements[1];
            expect(inboxIconNavLinkDebugElement.nativeElement.classList.contains(ICON_NAV_LINK_CLASS)).toEqual(true);
            expect(inboxIconNavLinkDebugElement.nativeElement.classList.contains(`active`)).toEqual(true);
            expect(filterIconNavLinkDebugElement.nativeElement.classList.contains(ICON_NAV_LINK_CLASS)).toEqual(true);
        });

        it(`should get correct icon for icon nav link when use thyIconNavLinkIcon and custom content`, async () => {
            const iconNavLinkDebugElements = fixture.debugElement.queryAll(By.directive(ThyIconNavLink));
            expect(iconNavLinkDebugElements).toBeTruthy();
            expect(iconNavLinkDebugElements.length).toEqual(2);
            const inboxIconNavLinkDebugElement = iconNavLinkDebugElements[0];
            const filterIconNavLinkDebugElement = iconNavLinkDebugElements[1];
            expect(inboxIconNavLinkDebugElement.query(By.css('.thy-icon-inbox'))).toBeTruthy();
            expect(filterIconNavLinkDebugElement.query(By.css('.thy-icon-filter'))).toBeTruthy();
        });
    });
});
