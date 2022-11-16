import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { dispatchFakeEvent, injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { ThyIconModule } from '../../icon';
import { ThyNavInkBarDirective } from '../nav-ink-bar.directive';
import { ThyNavType } from '../nav.component';
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
            expect(navInkBarElement.style.top).toEqual(rect.top + 'px');

            dispatchFakeEvent(items[1].nativeElement, 'click');
            flush();
            fixture.detectChanges();
            expect(navInkBarElement.style.top).toEqual(rect.top + firstItem.offsetHeight + 'px');
        }));
    });
});
