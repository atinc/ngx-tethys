import { Component, DebugElement, OnInit, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchFakeEvent } from 'ngx-tethys/testing';
import { ThyScrollService } from 'ngx-tethys/core';
import { getOffset } from 'ngx-tethys/util';
import { ThyAnchorModule, ThyAnchor, ThyAnchorLink } from 'ngx-tethys/anchor';

describe('thy-anchor', () => {
    describe('default', () => {
        let fixture: ComponentFixture<TestAnchorComponent> | undefined = undefined;
        let debugElement: DebugElement | undefined = undefined;
        let component: ThyAnchor | undefined = undefined;
        let scrollService: ThyScrollService | undefined = undefined;
        const id = 'components-anchor-demo-basic';

        beforeEach(() => {
            TestBed.configureTestingModule({}).compileComponents();

            fixture = TestBed.createComponent(TestAnchorComponent);
            component = fixture.componentInstance.thyAnchorComponent();
            debugElement = fixture.debugElement;
            scrollService = TestBed.get(ThyScrollService);
            fixture.detectChanges();
        });

        afterEach(() => {
            window.scrollTo(0, 0);
        });

        it('should create thy-anchor component', fakeAsync(() => {
            expect(component).toBeTruthy();
            expect(debugElement.query(By.css('.thy-anchor'))).toBeTruthy();
            expect(debugElement.query(By.css(`[href="#${id}"]`))).toBeTruthy();
        }));

        it(`should do anything when thy-anchor-link's thyHref element is not found`, fakeAsync(() => {
            const invalidId = 'will-not-found-id';
            const beforeClickScrollTop = scrollService.getScroll();
            const staticLink: HTMLElement = debugElement.query(By.css(`[href="#${invalidId}"]`)).nativeElement;
            dispatchFakeEvent(staticLink, 'click');
            fixture.detectChanges();
            tick(2000);
            const currentScrollTop = scrollService.getScroll();
            expect(Math.floor(currentScrollTop)).toEqual(beforeClickScrollTop);
        }));

        it('should scroll to associated anchor when click thy-anchor-link', fakeAsync(() => {
            const staticLink: HTMLElement = debugElement.query(By.css(`[href="#${id}"]`)).nativeElement;
            const targetAnchor: HTMLElement = debugElement.query(By.css(`[id="${id}"]`)).nativeElement;
            const top = Math.floor(getOffset(targetAnchor, window).top - component.thyOffsetTop());
            dispatchFakeEvent(staticLink, 'click');
            fixture.detectChanges();
            tick(2000);
            const scrollTop = scrollService.getScroll();
            expect(Math.floor(scrollTop)).toEqual(top);
        }));

        it('should active associated thy-anchor-link when scrolling to anchor', (done: () => void) => {
            const targetAnchor: HTMLElement = debugElement.query(By.css(`[id="${id}"]`)).nativeElement;
            targetAnchor.scrollIntoView();
            fixture.detectChanges();
            setTimeout(() => {
                const staticLink: HTMLElement = debugElement.query(By.css(`[thyhref="#${id}"]`)).nativeElement;
                expect(staticLink.classList).toContain('thy-anchor-link-active');
                done();
            });
        });
    });

    describe('thyContainer', () => {
        let fixture: ComponentFixture<TestContainerAnchorComponent> | undefined = undefined;
        let debugElement: DebugElement | undefined = undefined;
        const id = 'components-anchor-demo-basic';
        const containerClass = '.demo-card';

        beforeEach(() => {
            TestBed.configureTestingModule({});
            TestBed.compileComponents();

            fixture = TestBed.createComponent(TestContainerAnchorComponent);
            debugElement = fixture.debugElement;
            fixture.detectChanges();
        });

        it('should active associated thy-anchor-link when scrolling to anchor', (done: () => void) => {
            const container: HTMLElement = debugElement.query(By.css(containerClass)).nativeElement;
            const targetAnchor: HTMLElement = container.querySelector(`#${id}`);
            targetAnchor.scrollIntoView();
            fixture.detectChanges();
            setTimeout(() => {
                const staticLink: HTMLElement = debugElement.query(By.css(`[thyhref="#${id}"]`)).nativeElement;
                expect(staticLink.classList).toContain('thy-anchor-link-active');
                done();
            });
        });
    });

    describe('thyAnchorLink', () => {
        let fixture: ComponentFixture<TestThyAnchorLinkComponent> | undefined = undefined;

        beforeEach(() => {
            TestBed.configureTestingModule({});
            TestBed.compileComponents();

            fixture = TestBed.createComponent(TestThyAnchorLinkComponent);

            fixture.detectChanges();
        });

        it('should set link title', () => {
            const comp = fixture.componentInstance;
            const anchorLinkComponent = fixture.debugElement.query(By.directive(ThyAnchorLink)).componentInstance;
            comp.title = 'Basic demo title';
            fixture.detectChanges();
            expect(anchorLinkComponent.title()).toEqual(comp.title);
        });
    });

    describe('horizontal anchor', () => {
        let fixture: ComponentFixture<TestAnchorComponent> | undefined = undefined;
        let debugElement: DebugElement | undefined = undefined;
        let component: ThyAnchor | undefined = undefined;
        let scrollService: ThyScrollService | undefined = undefined;
        const id = 'components-anchor-demo-basic';

        beforeEach(() => {
            TestBed.configureTestingModule({});
            TestBed.compileComponents();

            fixture = TestBed.createComponent(TestAnchorComponent);
            component = fixture.componentInstance.thyAnchorComponent();
            debugElement = fixture.debugElement;
            scrollService = TestBed.get(ThyScrollService);
        });

        afterEach(() => {
            window.scrollTo(0, 0);
        });

        it('should warn when thyDirection is horizontal and thy-anchor-link is nested', () => {
            const warnSpy = spyOn(console, 'warn');
            fixture.componentInstance.thyDirection = 'horizontal';
            fixture.componentInstance.showChildren = true;
            fixture.detectChanges();

            expect(warnSpy).toHaveBeenCalled();
            expect(warnSpy).toHaveBeenCalledWith("Anchor link nesting is not supported when 'Anchor' direction is horizontal.");
        });

        it('should not warn when thyDirection is horizontal and thy-anchor-link is nested', () => {
            const warnSpy = spyOn(console, 'warn');
            fixture.componentInstance.thyDirection = 'horizontal';
            fixture.componentInstance.showChildren = false;
            fixture.detectChanges();

            expect(warnSpy).not.toHaveBeenCalled();
            expect(warnSpy).not.toHaveBeenCalledWith("Anchor link nesting is not supported when 'Anchor' direction is horizontal.");
        });

        it('should add the correct class', () => {
            fixture.componentInstance.thyDirection = 'horizontal';
            fixture.componentInstance.showChildren = false;
            fixture.detectChanges();

            expect(
                fixture.elementRef.nativeElement?.querySelector('.thy-anchor-wrapper')?.classList.contains('thy-anchor-wrapper-horizontal')
            ).toBeTruthy();
        });

        it('should scroll to associated anchor when click thy-anchor-link', fakeAsync(() => {
            fixture.componentInstance.thyDirection = 'horizontal';
            fixture.componentInstance.showChildren = false;
            fixture.detectChanges();

            const staticLink: HTMLElement = debugElement.query(By.css(`[href="#${id}"]`)).nativeElement;
            const targetAnchor: HTMLElement = debugElement.query(By.css(`[id="${id}"]`)).nativeElement;
            const top = Math.floor(getOffset(targetAnchor, window).top - component.thyOffsetTop());
            dispatchFakeEvent(staticLink, 'click');
            fixture.detectChanges();
            tick(2000);
            const scrollTop = scrollService.getScroll();
            expect(Math.floor(scrollTop)).toEqual(top);
        }));

        it('should active associated thy-anchor-link when scrolling to anchor', (done: () => void) => {
            fixture.componentInstance.thyDirection = 'horizontal';
            fixture.componentInstance.showChildren = false;
            fixture.detectChanges();

            const targetAnchor: HTMLElement = debugElement.query(By.css(`[id="${id}"]`)).nativeElement;
            targetAnchor.scrollIntoView();
            fixture.detectChanges();
            setTimeout(() => {
                const staticLink: HTMLElement = debugElement.query(By.css(`[thyhref="#${id}"]`)).nativeElement;
                expect(staticLink.classList).toContain('thy-anchor-link-active');
                done();
            });
        });
    });
});

@Component({
    template: `
        <div class="demo-card">
            <thy-anchor #anchor [thyDirection]="thyDirection" [thyOffsetTop]="thyOffsetTop">
                <thy-anchor-link thyHref="#will-not-found-id" thyTitle="Basic demo"></thy-anchor-link>
                <thy-anchor-link thyHref="#components-anchor-demo-basic" thyTitle="Basic demo"></thy-anchor-link>
                <thy-anchor-link thyHref="#components-anchor-demo-static" thyTitle="Static demo"></thy-anchor-link>
                <thy-anchor-link thyHref="#API" thyTitle="API">
                    @if (showChildren) {
                        <thy-anchor-link thyHref="#anchor-props" thyTitle="thy-anchor"></thy-anchor-link>
                        <thy-anchor-link thyHref="#link-props" thyTitle="thy-anchor-link"></thy-anchor-link>
                    }
                </thy-anchor-link>
            </thy-anchor>
            <div>
                <h1 id="components-anchor-demo-basic">Basic demo</h1>
                @for (item of demos; track $index) {
                    <p>this is a demo</p>
                }
                <h1 id="components-anchor-demo-static">Static demo</h1>
                @for (item of demos; track $index) {
                    <p>this is a static demo</p>
                }
                <h1 id="API">API</h1>
                @for (item of demos; track $index) {
                    <p>this is a api</p>
                }
                <h1 id="anchor-props">API - thy-anchor</h1>
                @for (item of demos; track $index) {
                    <p>this is a api-anchor</p>
                }
                <h1 id="link-props">API - thy-anchor-link</h1>
                @for (item of demos; track $index) {
                    <p>this is a api-link</p>
                }
            </div>
        </div>
    `,
    imports: [ThyAnchorModule]
})
class TestAnchorComponent implements OnInit {
    demos: number[] = [];

    readonly thyAnchorComponent = viewChild(ThyAnchor);

    thyOffsetTop = 60;

    thyDirection = 'vertical';

    showChildren = true;

    ngOnInit(): void {
        for (let index = 0; index < 20; index++) {
            this.demos.push(index);
        }
    }
}

@Component({
    template: `
        <h1 id="components-anchor-demo-basic" style="position: absolute;top: 1000px;">outside</h1>
        <div class="demo-card">
            <thy-anchor #anchor [thyOffsetTop]="thyOffsetTop" thyContainer=".demo-card">
                <thy-anchor-link thyHref="#components-anchor-demo-basic" thyTitle="Basic demo"></thy-anchor-link>
            </thy-anchor>
            <div>
                <h1 id="components-anchor-demo-basic">Basic demo</h1>
                @for (item of demos; track $index) {
                    <p>this is a demo</p>
                }
            </div>
        </div>
    `,
    imports: [ThyAnchorModule]
})
class TestContainerAnchorComponent implements OnInit {
    demos: number[] = [];

    readonly thyAnchorComponent = viewChild(ThyAnchor);

    thyOffsetTop = 60;

    ngOnInit(): void {
        for (let index = 0; index < 20; index++) {
            this.demos.push(index);
        }
    }
}

@Component({
    template: `
        <div class="demo-card">
            <thy-anchor #anchor [thyOffsetTop]="thyOffsetTop">
                <thy-anchor-link thyHref="#components-anchor-demo-basic" [thyTitle]="title"></thy-anchor-link>
            </thy-anchor>
            <div>
                <h1 id="components-anchor-demo-basic">Basic demo</h1>
                <p>this is a demo</p>
                <p>this is a demo</p>
                <p>this is a demo</p>
                <p>this is a demo</p>
                <p>this is a demo</p>
            </div>
            <ng-template #titleTemplate>
                <span>Basic Demo Title</span>
            </ng-template>
        </div>
    `,
    imports: [ThyAnchorModule]
})
class TestThyAnchorLinkComponent implements OnInit {
    readonly thyAnchorComponent = viewChild(ThyAnchor);

    readonly titleTemplate = viewChild<TemplateRef<void>>('titleTemplate');

    thyOffsetTop = 60;

    title: string | TemplateRef<void>;

    ngOnInit(): void {
        this.title = this.titleTemplate();
    }
}
