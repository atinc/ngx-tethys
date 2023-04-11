import { Component, DebugElement, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ThyAnchorComponent } from '../anchor.component';
import { ThyAnchorModule } from '../anchor.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyScrollService } from '../../core/scroll';
import { By } from '@angular/platform-browser';
import { dispatchFakeEvent } from 'ngx-tethys/testing';
import { getOffset } from '../../util/dom';
import { ThyAnchorLinkComponent } from '../anchor-link.component';

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

        it(`should do anything when thy-anchor-link's thyHref element is not found`, fakeAsync(() => {
            let invalidId = 'will-not-found-id';
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
            const top = Math.floor(getOffset(targetAnchor, window).top - component.thyOffsetTop);
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
        let fixture: ComponentFixture<TestThyAnchorLinkComponent>;
        let debugElement: DebugElement;
        let component: ThyAnchorComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThyAnchorModule, NoopAnimationsModule],
                declarations: [TestThyAnchorLinkComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestThyAnchorLinkComponent);
            component = fixture.componentInstance.thyAnchorComponent;
            debugElement = fixture.debugElement;

            fixture.detectChanges();
        });

        it('should set link title', () => {
            const comp = fixture.componentInstance;
            const anchorLinkComponent = fixture.debugElement.query(By.directive(ThyAnchorLinkComponent)).componentInstance;
            comp.title = 'Basic demo title';
            fixture.detectChanges();
            expect(anchorLinkComponent.title).toEqual(comp.title);
        });
    });
});

@Component({
    template: `
        <div class="demo-card">
            <thy-anchor #anchor [thyOffsetTop]="thyOffsetTop">
                <thy-anchor-link thyHref="#will-not-found-id" thyTitle="Basic demo"></thy-anchor-link>
                <thy-anchor-link thyHref="#components-anchor-demo-basic" thyTitle="Basic demo"></thy-anchor-link>
                <thy-anchor-link thyHref="#components-anchor-demo-static" thyTitle="Static demo"></thy-anchor-link>
                <thy-anchor-link thyHref="#API" thyTitle="API">
                    <thy-anchor-link thyHref="#anchor-props" thyTitle="thy-anchor"></thy-anchor-link>
                    <thy-anchor-link thyHref="#link-props" thyTitle="thy-anchor-link"></thy-anchor-link>
                </thy-anchor-link>
            </thy-anchor>
            <div>
                <h1 id="components-anchor-demo-basic">Basic demo</h1>
                <p *ngFor="let item of demos">this is a demo</p>
                <h1 id="components-anchor-demo-static">Static demo</h1>
                <p *ngFor="let item of demos">this is a static demo</p>
                <h1 id="API">API</h1>
                <p *ngFor="let item of demos">this is a api</p>
                <h1 id="anchor-props">API - thy-anchor</h1>
                <p *ngFor="let item of demos">this is a api-anchor</p>
                <h1 id="link-props">API - thy-anchor-link</h1>
                <p *ngFor="let item of demos">this is a api-link</p>
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
                <thy-anchor-link thyHref="#components-anchor-demo-basic" thyTitle="Basic demo"></thy-anchor-link>
            </thy-anchor>
            <div>
                <h1 id="components-anchor-demo-basic">Basic demo</h1>
                <p *ngFor="let item of demos">this is a demo</p>
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

@Component({
    template: `
        <div class="demo-card">
            <thy-anchor #anchor [thyOffsetTop]="thyOffsetTop">
                <thy-link thyHref="#components-anchor-demo-basic" [thyTitle]="title"></thy-link>
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
    `
})
class TestThyAnchorLinkComponent implements OnInit {
    @ViewChild(ThyAnchorComponent, { static: true })
    thyAnchorComponent: ThyAnchorComponent;

    @ViewChild('titleTemplate', { static: true })
    titleTemplate: TemplateRef<void>;

    thyOffsetTop = 60;

    title: string | TemplateRef<void>;

    ngOnInit(): void {
        this.title = this.titleTemplate;
    }
}
