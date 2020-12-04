import { Component, DebugElement, ViewChild, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { ThyAnchorComponent } from '../anchor.component';
import { ThyAnchorModule } from '../anchor.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyScrollService } from '../../core/scroll';
import { By } from '@angular/platform-browser';
import { dispatchFakeEvent } from 'ngx-tethys/testing';
import { getOffset } from '../../util/dom';

describe('thy-anchor', () => {
    describe('default', () => {
        let fixture: ComponentFixture<TestAnchorComponent>;
        let debugElement: DebugElement;
        let component: ThyAnchorComponent;
        let scrollService: ThyScrollService;
        const id = 'components-anchor-demo-basic';
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThyAnchorModule, NoopAnimationsModule],
                declarations: [TestAnchorComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestAnchorComponent);
            component = fixture.componentInstance.thyAnchorComponent;
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

        it('should scroll to associated anchor when click thy-link', fakeAsync(() => {
            const staticLink: HTMLElement = debugElement.query(By.css(`[href="#${id}"]`)).nativeElement;
            const targetAnchor: HTMLElement = debugElement.query(By.css(`[id="${id}"]`)).nativeElement;
            const top = Math.floor(getOffset(targetAnchor, window).top - component.thyOffsetTop);
            dispatchFakeEvent(staticLink, 'click');
            fixture.detectChanges();
            tick(2000);
            const scrollTop = scrollService.getScroll();
            expect(scrollTop).toEqual(top);
        }));

        it('should active associated thy-link when scrolling to anchor', (done: () => void) => {
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
        let fixture: ComponentFixture<TestAnchorComponent>;
        let debugElement: DebugElement;
        let component: ThyAnchorComponent;
        let scrollService: ThyScrollService;
        const id = 'components-anchor-demo-basic';
        const containerClass = '.demo-card';
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThyAnchorModule, NoopAnimationsModule],
                declarations: [TestContainerAnchorComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestContainerAnchorComponent);
            component = fixture.componentInstance.thyAnchorComponent;
            debugElement = fixture.debugElement;
            scrollService = TestBed.get(ThyScrollService);
            fixture.detectChanges();
        });
        it('should active associated thy-link when scrolling to anchor', (done: () => void) => {
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
});

@Component({
    template: `
        <div class="demo-card">
            <thy-anchor #anchor [thyOffsetTop]="thyOffsetTop">
                <thy-link thyHref="#components-anchor-demo-basic" thyTitle="Basic demo"></thy-link>
                <thy-link thyHref="#components-anchor-demo-static" thyTitle="Static demo"></thy-link>
                <thy-link thyHref="#API" thyTitle="API">
                    <thy-link thyHref="#anchor-props" thyTitle="thy-anchor"></thy-link>
                    <thy-link thyHref="#link-props" thyTitle="thy-link"></thy-link>
                </thy-link>
            </thy-anchor>
            <div>
                <h1 id="components-anchor-demo-basic">Basic demo</h1>
                <p *ngFor="let item of demos">
                    this is a demo
                </p>
                <h1 id="components-anchor-demo-static">Static demo</h1>
                <p *ngFor="let item of demos">
                    this is a static demo
                </p>
                <h1 id="API">
                    API
                </h1>
                <p *ngFor="let item of demos">
                    this is a api
                </p>
                <h1 id="anchor-props">
                    API - thy-anchor
                </h1>
                <p *ngFor="let item of demos">
                    this is a api-anchor
                </p>
                <h1 id="link-props">
                    API - thy-link
                </h1>
                <p *ngFor="let item of demos">
                    this is a api-link
                </p>
            </div>
        </div>
    `
})
class TestAnchorComponent implements OnInit {
    demos: number[] = [];

    @ViewChild(ThyAnchorComponent, { static: true })
    thyAnchorComponent: ThyAnchorComponent;

    thyOffsetTop = 60;

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
                <thy-link thyHref="#components-anchor-demo-basic" thyTitle="Basic demo"></thy-link>
            </thy-anchor>
            <div>
                <h1 id="components-anchor-demo-basic">Basic demo</h1>
                <p *ngFor="let item of demos">
                    this is a demo
                </p>
            </div>
        </div>
    `
})
class TestContainerAnchorComponent implements OnInit {
    demos: number[] = [];

    @ViewChild(ThyAnchorComponent, { static: true })
    thyAnchorComponent: ThyAnchorComponent;

    thyOffsetTop = 60;

    ngOnInit(): void {
        for (let index = 0; index < 20; index++) {
            this.demos.push(index);
        }
    }
}
