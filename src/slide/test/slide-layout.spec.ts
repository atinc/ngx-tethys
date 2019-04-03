import { TestBed, ComponentFixture, fakeAsync, flushMicrotasks, inject, flush, tick } from '@angular/core/testing';
import { NgModule, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ThySlideService, ThySlideModule } from '../index';
import { ThySlideLayoutComponent } from '../slide-layout/slide-layout.component';
import { ThySlideHeaderComponent } from '../slide-header/slide-header.component';
import { ThySlideBodyComponent } from '../slide-body/slide-body.component';
import { ThySlideBodySectionComponent } from '../slide-body/slide-body-section.component';
import { ThySlideFooterComponent } from '../slide-footer/slide-footer.component';

describe('ThySlide', () => {
    describe('ThySlideLayout', () => {
        let fixture: ComponentFixture<SlideLayoutTestComponent>;
        let layouts: DebugElement[];
        let headers: DebugElement[];
        let bodys: DebugElement[];
        let bodySections: DebugElement[];
        let footers: DebugElement[];

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySlideModule],
                declarations: [SlideLayoutTestComponent],
                providers: [{ provide: ThySlideService, useValue: ThySlideService }]
            });

            TestBed.compileComponents();
        }));

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(SlideLayoutTestComponent);
            layouts = fixture.debugElement.queryAll(By.directive(ThySlideLayoutComponent));
            headers = fixture.debugElement.queryAll(By.directive(ThySlideHeaderComponent));
            bodys = fixture.debugElement.queryAll(By.directive(ThySlideBodyComponent));
            bodySections = fixture.debugElement.queryAll(By.directive(ThySlideBodySectionComponent));
            footers = fixture.debugElement.queryAll(By.directive(ThySlideFooterComponent));
        }));

        it('should have correct class', fakeAsync(() => {
            fixture.detectChanges();
            expect(layouts.every(layout => layout.nativeElement.classList.contains('thy-slide-layout'))).toBe(true);
            expect(headers.every(header => header.nativeElement.classList.contains('thy-slide-header'))).toBe(true);
            expect(bodys.every(body => body.nativeElement.classList.contains('thy-slide-body'))).toBe(true);
            expect(
                bodySections.every(bodySection =>
                    bodySection.nativeElement.classList.contains('thy-slide-body-section')
                )
            ).toBe(true);
            expect(footers.every(footer => footer.nativeElement.classList.contains('thy-slide-footer'))).toBe(true);
        }));

        it('should have corrent header title icon', fakeAsync(() => {
            fixture.detectChanges();
            const headerIconElement: DebugElement = fixture.debugElement.query(By.css('.thy-slide-header-title .wtf-task-o'));

            expect(headerIconElement.nativeElement.classList.contains(`wtf-task-o`)).toBe(true);
        }));

        it('should have correct header main text', fakeAsync(() => {
            fixture.detectChanges();
            expect(
                fixture.debugElement.query(By.css('.thy-slide-header-main .header-main-custom')).nativeElement.innerText
            ).toBe('自定义头部操作区');
        }));

        it('should have correct body content', fakeAsync(() => {
            fixture.detectChanges();
            const bodyElement: DebugElement = fixture.debugElement.query(By.css('.thy-slide-body'));
            expect(bodyElement.children.every(child => child.nativeElement.innerText === '测试body')).toBe(true);
        }));

        it('should hava correct footer content', fakeAsync(() => {
            fixture.detectChanges();
            const footerButton: DebugElement = fixture.debugElement.query(
                By.css('.thy-slide-footer .btn-block')
            );
            footerButton.triggerEventHandler('click', null);

            expect(footerButton.nativeElement.classList.contains('btn-block')).toBe(true);
            expect(footerButton.nativeElement.innerText).toBe('确认');
            expect(fixture.componentInstance.data).toBe(1);
        }));
    });

    describe('ThySlideHeader', () => {
        let slideHeaderFixture: ComponentFixture<SlideHeaderTestComponent>;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySlideModule],
                declarations: [SlideHeaderTestComponent],
                providers: [{ provide: ThySlideService, useValue: ThySlideService }]
            });

            TestBed.compileComponents();
        }));

        beforeEach(fakeAsync(() => {
            slideHeaderFixture = TestBed.createComponent(SlideHeaderTestComponent);
        }));

        it('should create a slide header main by template', fakeAsync(() => {
            slideHeaderFixture.detectChanges();
            const headerElement: DebugElement = slideHeaderFixture.debugElement.query(By.css('.thy-slide-header .custom-slide-title'));
            expect(headerElement).not.toBeNull();
            expect(headerElement.nativeElement.innerText).toBe('头部');
        }));
    });
});

@Component({
    selector: 'with-layout-view-component',
    template: `
        <thy-slide-layout>
            <thy-slide-header [thyTitle]="'测试title'" thyIcon="wtf-task-o">
                <ng-template #thyHeaderMain>
                    <a thyShape="circle-thick-dashed" class="header-main-custom" href="javascript:;">
                        自定义头部操作区
                    </a>
                </ng-template>
            </thy-slide-header>
            <thy-slide-body>
                <thy-slide-body-section>测试body</thy-slide-body-section>
            </thy-slide-body>
            <thy-slide-footer>
                <button thyButton="primary-square" (click)="save($event)" class="btn-block">确认</button>
            </thy-slide-footer>
        </thy-slide-layout>
    `
})
class SlideLayoutTestComponent {
    public data: number;

    save() {
        this.data = 1;
    }
}

@Component({
    selector: 'with-header-view-component',
    template: `
        <thy-slide-header>
            <ng-template #thyHeader>
                <div class="custom-slide-title">头部</div>
            </ng-template>
        </thy-slide-header>
    `
})
class SlideHeaderTestComponent {}
