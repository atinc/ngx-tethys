import { OverlayContainer, ViewportRuler } from '@angular/cdk/overlay';
import { Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    ThySlideBody,
    ThySlideFooter,
    ThySlideHeader,
    ThySlideLayout,
    ThySlideBodySection,
    THY_SLIDE_DEFAULT_CONFIG,
    ThySlideConfig,
    ThySlideModule,
    ThySlideRef,
    ThySlideService,
    slideDefaultConfigValue
} from 'ngx-tethys/slide';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ThySlide', () => {
    describe('ThySlideService', () => {
        let thySlideService!: ThySlideService;
        let overlayContainer!: OverlayContainer;
        let overlayContainerElement!: HTMLElement;
        let viewContainerFixture!: ComponentFixture<SlideLayoutTestComponent>;
        let viewportRuler!: ViewportRuler;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySlideModule],
                providers: [provideHttpClient(), provideNoopAnimations()]
            });
            TestBed.compileComponents();
        }));

        beforeEach(inject(
            [ThySlideService, OverlayContainer, ViewportRuler],
            (_thySlideService: ThySlideService, _overlayContainer: OverlayContainer, _viewportRuler: ViewportRuler) => {
                thySlideService = _thySlideService;
                overlayContainer = _overlayContainer;
                viewportRuler = _viewportRuler;
                overlayContainerElement = _overlayContainer.getContainerElement();
            }
        ));

        afterEach(() => {
            overlayContainer.ngOnDestroy();
        });

        beforeEach(() => {
            viewContainerFixture = TestBed.createComponent(SlideLayoutTestComponent);
            viewContainerFixture.detectChanges();
        });

        function getSlideContainerElement() {
            return overlayContainerElement.querySelector(`thy-slide-container`);
        }

        function assertSlideSimpleContentComponent(slideRef: ThySlideRef<SlideLayoutTestComponent>) {
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);

            viewContainerFixture.detectChanges();
            const containerElement = getSlideContainerElement();
            expect(containerElement.getAttribute('role')).toBe('slide');
        }

        it('should open a slide with a component when mode is none', () => {
            const querySelectorSpy = spyOn(document, 'querySelector');
            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right'
            });
            assertSlideSimpleContentComponent(slideRef);
            expect(querySelectorSpy).not.toHaveBeenCalled();
        });

        it('should open a slide and close latest slideRef', fakeAsync(() => {
            const element = document.createElement('div');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                mode: 'side',
                drawerContainer: '#demo-host'
            });
            const slideCloseSpy = spyOn(slideRef, 'close');
            assertSlideSimpleContentComponent(slideRef);
            viewContainerFixture.detectChanges();

            const anotherSlideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '2',
                from: 'right',
                mode: 'side',
                drawerContainer: '#demo-host'
            });
            assertSlideSimpleContentComponent(anotherSlideRef);
            viewContainerFixture.detectChanges();
            expect(slideCloseSpy).toHaveBeenCalled();
        }));

        it('should open a slide but not close latest slideRef', fakeAsync(() => {
            const element = document.createElement('div');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                mode: 'side',
                drawerContainer: '#demo-host'
            });
            const slideCloseSpy = spyOn(slideRef, 'close');
            assertSlideSimpleContentComponent(slideRef);
            viewContainerFixture.detectChanges();

            const anotherSlideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '2',
                from: 'right',
                mode: 'side',
                drawerContainer: '#demo-host',
                disableCloseLatest: true
            });
            const anotherCloseSpy = spyOn(anotherSlideRef, 'close');
            assertSlideSimpleContentComponent(anotherSlideRef);
            viewContainerFixture.detectChanges();

            expect(slideCloseSpy).not.toHaveBeenCalled();

            const thirdSlideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '3',
                from: 'right',
                mode: 'side',
                drawerContainer: '#demo-host'
            });
            assertSlideSimpleContentComponent(thirdSlideRef);
            viewContainerFixture.detectChanges();

            expect(anotherCloseSpy).toHaveBeenCalled();
        }));

        it('should open a slide with "side" mode when mode="side" and have drawerContainer', fakeAsync(() => {
            const element = document.createElement('div');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                mode: 'side',
                drawerContainer: '#demo-host'
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            expect(element.classList).toContain('thy-slide-side-drawer-container');
            expect(element.style).toContain('margin-right');
            slideRef.close();
            viewContainerFixture.detectChanges();
            flush();
            expect(element.classList).not.toContain('thy-slide-side-drawer-container');
            expect(element.style).not.toContain('margin-right');
        }));

        it('should open a slide with "side" mode when mode="side" and not drawerContainer', fakeAsync(() => {
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(null);

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                mode: 'side',
                drawerContainer: '#demo-host'
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            const containerElement = getSlideContainerElement();
            expect(containerElement.classList).toContain('thy-slide-over');
        }));

        it('should open a slide with "push" mode when mode="push" and have drawerContainer', fakeAsync(() => {
            const element = document.createElement('div');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                mode: 'push',
                drawerContainer: '#demo-host'
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            expect(element.classList).toContain('thy-slide-push-drawer-container');
            expect(element.style).toContain('transform');
            slideRef.close();
            viewContainerFixture.detectChanges();
            flush();
            expect(element.classList).not.toContain('thy-slide-push-drawer-container');
            expect(element.style).not.toContain('transform');
        }));

        it('should open a slide with "push" mode when mode="push" and have drawerContainer when drawerContainer is ElementRef', fakeAsync(() => {
            const element = document.createElement('div');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);

            const drawerContainerElement: ElementRef<HTMLDivElement> = new ElementRef(document.querySelector('#demo-host'));

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                mode: 'push',
                drawerContainer: drawerContainerElement
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            expect(element.style).toContain('transform');
            slideRef.close();
            viewContainerFixture.detectChanges();
            flush();
            expect(element.classList).not.toContain('thy-slide-push-drawer-container');
            expect(element.style).not.toContain('transform');
        }));

        it('should open a slide with "push" mode when mode="push" and have drawerContainer when drawerContainer is HTMLElement', fakeAsync(() => {
            const element = document.createElement('div');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);

            const drawerContainerElement: HTMLElement = document.querySelector('#demo-host');

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                mode: 'push',
                drawerContainer: drawerContainerElement
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            expect(element.style).toContain('transform');
            slideRef.close();
            viewContainerFixture.detectChanges();
            flush();
            expect(element.classList).not.toContain('thy-slide-push-drawer-container');
            expect(element.style).not.toContain('transform');
        }));

        it('drawerContainerElement transform style should correct', fakeAsync(() => {
            const element = document.createElement('div');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'left',
                mode: 'push',
                drawerContainer: '#demo-host'
            });
            viewContainerFixture.detectChanges();
            const drawerContainerElement = document.querySelector('#demo-host');
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            expect(element.classList).toContain('thy-slide-push-drawer-container');
            expect(element.style).toContain('transform');
            expect((drawerContainerElement as HTMLDivElement).style.transform).toEqual(
                `translateX(${document.querySelector('.thy-slide-container').clientWidth}px)`
            );
        }));

        it('drawerContainerElement transform style should correct when from is top', fakeAsync(() => {
            const element = document.createElement('div');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'top',
                mode: 'push',
                drawerContainer: '#demo-host'
            });
            viewContainerFixture.detectChanges();
            const drawerContainerElement = document.querySelector('#demo-host');
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            expect(element.classList).toContain('thy-slide-push-drawer-container');
            expect(element.style).toContain('transform');
            expect((drawerContainerElement as HTMLDivElement).style.transform).toEqual(
                `translateY(${document.querySelector('.thy-slide-container').clientHeight}px)`
            );
        }));

        it('drawerContainerElement transform style should correct when from is bottom', fakeAsync(() => {
            const element = document.createElement('div');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'bottom',
                mode: 'push',
                drawerContainer: '#demo-host'
            });
            viewContainerFixture.detectChanges();
            const drawerContainerElement = document.querySelector('#demo-host');
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            expect(element.classList).toContain('thy-slide-push-drawer-container');
            expect(element.style).toContain('transform');
            expect((drawerContainerElement as HTMLDivElement).style.transform).toEqual(
                `translateY(${document.querySelector('.thy-slide-container').clientHeight}px)`
            );
        }));

        it('should open a slide with "side" mode when mode="side" and not drawerContainer', fakeAsync(() => {
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(null);

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                mode: 'push',
                drawerContainer: '#demo-host'
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            const containerElement = getSlideContainerElement();
            expect(containerElement.classList).toContain('thy-slide-over');
        }));

        it('should open a slide with width="300px" when width="300px"', fakeAsync(() => {
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(null);

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                mode: 'push',
                drawerContainer: '#demo-host',
                width: '300px'
            });
            viewContainerFixture.detectChanges();
            const panelElement = overlayContainerElement.querySelector('.thy-slide-overlay-pane') as HTMLElement;
            expect(panelElement.style.width).toBe('300px');
        }));

        it('should open a slide with width="300px" when width="300px" and panelClass="thy-slide"', fakeAsync(() => {
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(null);

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                mode: 'push',
                drawerContainer: '#demo-host',
                width: '300px',
                panelClass: 'thy-slide'
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.thy-slide')).toBeTruthy();
            const panelElement = overlayContainerElement.querySelector('.thy-slide-overlay-pane') as HTMLElement;
            expect(panelElement.style.width).toBe('300px');
        }));

        it('should open a slide with width="350px" when width is null and panelClass="thy-slide"', fakeAsync(() => {
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(null);

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                mode: 'push',
                drawerContainer: '#demo-host',
                panelClass: 'thy-slide'
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.thy-slide')).toBeTruthy();
            const panelElement = overlayContainerElement.querySelector('.thy-slide-overlay-pane') as HTMLElement;
            expect(panelElement.style.width).toBe('');
        }));

        it('should has left: 60px when open slide from left offset=60', fakeAsync(() => {
            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'left',
                offset: 60
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            const containerElement = getSlideContainerElement();
            expect((containerElement as HTMLElement).style.left).toBe('60px');
        }));

        it('should has right: 60px when open slide from right offset=60', fakeAsync(() => {
            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                offset: 60
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            const containerElement = getSlideContainerElement();
            expect((containerElement as HTMLElement).style.right).toBe('60px');
        }));

        it('should has top: 60px when open slide from top offset=60', fakeAsync(() => {
            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'top',
                offset: 60
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            const containerElement = getSlideContainerElement();
            expect((containerElement as HTMLElement).style.top).toBe('60px');
        }));

        it('should has bottom: 60px when open slide from bottom offset=60', fakeAsync(() => {
            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'bottom',
                offset: 60
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            const containerElement = getSlideContainerElement();
            expect((containerElement as HTMLElement).style.bottom).toBe('60px');
        }));

        it('should has bottom: 60px when open slide from bottom offset=60, drawerContainer="#container" ', fakeAsync(() => {
            const element = document.createElement('div');
            const getBoundingClientRect = spyOn(element, 'getBoundingClientRect');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);
            getBoundingClientRect.and.returnValue({
                top: 40,
                left: 50
            });

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'bottom',
                offset: 60,
                drawerContainer: '#container'
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            const containerElement = getSlideContainerElement();
            expect((containerElement as HTMLElement).style.bottom).toBe('60px');
            expect((containerElement as HTMLElement).style.left).toBe('50px');
        }));

        it('should has top: 60px when open slide from top offset=60, drawerContainer="#container" ', fakeAsync(() => {
            const element = document.createElement('div');
            const getBoundingClientRect = spyOn(element, 'getBoundingClientRect');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);
            getBoundingClientRect.and.returnValue({
                top: 40,
                left: 50
            });

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'top',
                offset: 60,
                drawerContainer: '#container'
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            const containerElement = getSlideContainerElement();
            expect((containerElement as HTMLElement).style.top).toBe('60px');
        }));

        it('should has left: 60px when open slide from left offset=60, drawerContainer="#container" ', fakeAsync(() => {
            const element = document.createElement('div');
            const getBoundingClientRect = spyOn(element, 'getBoundingClientRect');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);
            getBoundingClientRect.and.returnValue({
                top: 40,
                left: 50
            });

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'left',
                offset: 60,
                drawerContainer: '#container'
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            const containerElement = getSlideContainerElement();
            expect((containerElement as HTMLElement).style.left).toBe('60px');
        }));

        it('should has right: 60px when open slide from right offset=60, drawerContainer="#container" ', fakeAsync(() => {
            const element = document.createElement('div');
            const getBoundingClientRect = spyOn(element, 'getBoundingClientRect');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);
            getBoundingClientRect.and.returnValue({
                top: 40,
                left: 50
            });

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                offset: 60,
                drawerContainer: '#container'
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            const containerElement = getSlideContainerElement();
            expect((containerElement as HTMLElement).style.right).toBe('60px');
        }));

        it('should change height when the window is resized', fakeAsync(() => {
            const element = document.createElement('div');
            const getBoundingClientRect = spyOn(element, 'getBoundingClientRect');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);
            getBoundingClientRect.and.returnValues(
                {
                    height: 10,
                    width: 20,
                    top: 30,
                    left: 40
                },
                {
                    height: 50,
                    width: 60,
                    top: 70,
                    left: 80
                }
            );

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'right',
                drawerContainer: '#container'
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            let containerElement = getSlideContainerElement();
            expect((containerElement as HTMLElement).style.height).toBe('10px');
            expect((containerElement as HTMLElement).style.top).toBe('30px');

            const event = new Event('resize');
            window.dispatchEvent(event);
            tick(100);
            viewContainerFixture.detectChanges();
            containerElement = getSlideContainerElement();
            expect((containerElement as HTMLElement).style.height).toBe('50px');
            expect((containerElement as HTMLElement).style.top).toBe('70px');
        }));

        it('should change width when the window is resized', fakeAsync(() => {
            const element = document.createElement('div');
            const getBoundingClientRect = spyOn(element, 'getBoundingClientRect');
            const querySelectorSpy = spyOn(document, 'querySelector');
            querySelectorSpy.and.returnValue(element as Element);
            getBoundingClientRect.and.returnValues(
                {
                    height: 10,
                    width: 20,
                    top: 30,
                    left: 40
                },
                {
                    height: 50,
                    width: 60,
                    top: 70,
                    left: 80
                }
            );

            const slideRef = thySlideService.open(SlideLayoutTestComponent, {
                id: '1',
                from: 'top',
                drawerContainer: '#container'
            });
            viewContainerFixture.detectChanges();
            expect(slideRef.componentInstance instanceof SlideLayoutTestComponent).toBe(true);
            let containerElement = getSlideContainerElement();
            expect((containerElement as HTMLElement).style.width).toBe('20px');
            expect((containerElement as HTMLElement).style.left).toBe('40px');

            const event = new Event('resize');
            window.dispatchEvent(event);
            tick(100);
            viewContainerFixture.detectChanges();
            containerElement = getSlideContainerElement();
            expect((containerElement as HTMLElement).style.width).toBe('60px');
            expect((containerElement as HTMLElement).style.left).toBe('80px');
        }));
    });

    describe('ThySlideLayout', () => {
        let fixture!: ComponentFixture<SlideLayoutTestComponent>;
        let layouts!: DebugElement[];
        let headers!: DebugElement[];
        let bodys!: DebugElement[];
        let bodySections!: DebugElement[];
        let footers!: DebugElement[];

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySlideModule],
                providers: [provideHttpClient(), provideNoopAnimations(), { provide: ThySlideService, useValue: ThySlideService }]
            });

            TestBed.compileComponents();
        }));

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(SlideLayoutTestComponent);
            layouts = fixture.debugElement.queryAll(By.directive(ThySlideLayout));
            headers = fixture.debugElement.queryAll(By.directive(ThySlideHeader));
            bodys = fixture.debugElement.queryAll(By.directive(ThySlideBody));
            bodySections = fixture.debugElement.queryAll(By.directive(ThySlideBodySection));
            footers = fixture.debugElement.queryAll(By.directive(ThySlideFooter));
        }));

        it('should have correct class', fakeAsync(() => {
            fixture.detectChanges();
            expect(layouts.every(layout => layout.nativeElement.classList.contains('thy-slide-layout'))).toBe(true);
            expect(headers.every(header => header.nativeElement.classList.contains('thy-slide-header'))).toBe(true);
            expect(bodys.every(body => body.nativeElement.classList.contains('thy-slide-body'))).toBe(true);
            expect(bodySections.every(bodySection => bodySection.nativeElement.classList.contains('thy-slide-body-section'))).toBe(true);
            expect(footers.every(footer => footer.nativeElement.classList.contains('thy-slide-footer'))).toBe(true);
        }));

        it('should have correct header title icon font', fakeAsync(() => {
            fixture.detectChanges();
            const headerIconElement: DebugElement = fixture.debugElement.query(By.css('.thy-slide-header-title .wtf-task-o'));

            expect(headerIconElement.nativeElement.classList.contains(`wtf-task-o`)).toBe(true);
        }));

        it('should have correct header title svg icon', fakeAsync(() => {
            fixture.componentInstance.iconName = 'close';
            fixture.detectChanges();
            const headerIconElement: DebugElement = fixture.debugElement.query(By.css('.thy-slide-header-title .thy-icon'));

            expect(headerIconElement.nativeElement.classList.contains(`thy-icon`)).toBe(true);
        }));

        it('should have correct header main text', fakeAsync(() => {
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.thy-slide-header-main .header-main-custom')).nativeElement.innerText).toBe(
                '自定义头部操作区'
            );
        }));

        it('should have correct body content', fakeAsync(() => {
            fixture.detectChanges();
            const bodyElement: DebugElement = fixture.debugElement.query(By.css('.thy-slide-body'));
            expect(bodyElement.children.every(child => child.nativeElement.innerText === '测试body')).toBe(true);
        }));

        it('should have correct body content divider border', fakeAsync(() => {
            fixture.componentInstance.thyDividerBorder = true;
            fixture.detectChanges();
            const bodySectionElement: DebugElement = fixture.debugElement.query(By.css('.thy-slide-body-section-divider'));
            expect(bodySectionElement).toBeTruthy();
        }));

        it('should hava correct footer content', fakeAsync(() => {
            fixture.detectChanges();
            const footerButton: DebugElement = fixture.debugElement.query(By.css('.thy-slide-footer .btn-block'));
            footerButton.triggerEventHandler('click', null);

            expect(footerButton.nativeElement.classList.contains('btn-block')).toBe(true);
            expect(footerButton.nativeElement.innerText).toBe('确定');
            expect(fixture.componentInstance.data).toBe(1);
        }));
    });

    describe('ThySlideHeader', () => {
        let slideHeaderFixture!: ComponentFixture<SlideHeaderTestComponent>;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySlideModule],
                providers: [provideHttpClient(), provideNoopAnimations(), { provide: ThySlideService, useValue: ThySlideService }]
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

    describe('THY_SLIDE_DEFAULT_CONFIG', () => {
        let thySlideService!: ThySlideService;
        let overlayContainer!: OverlayContainer;
        let overlayContainerElement!: HTMLElement;
        let viewContainerFixture!: ComponentFixture<SlideLayoutTestComponent>;
        let viewportRuler!: ViewportRuler;

        const newDefaultConfig = {
            backdropClass: 'new-thy-slide-backdrop',
            panel: 'new-thy-slide'
        };

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySlideModule],
                providers: [
                    provideNoopAnimations(),
                    provideHttpClient(),
                    {
                        provide: THY_SLIDE_DEFAULT_CONFIG,
                        useValue: newDefaultConfig
                    }
                ]
            });
            TestBed.compileComponents();
        }));

        beforeEach(inject(
            [ThySlideService, OverlayContainer, ViewportRuler],
            (_thySlideService: ThySlideService, _overlayContainer: OverlayContainer, _viewportRuler: ViewportRuler) => {
                thySlideService = _thySlideService;
                overlayContainer = _overlayContainer;
                viewportRuler = _viewportRuler;
                overlayContainerElement = _overlayContainer.getContainerElement();
            }
        ));

        afterEach(() => {
            overlayContainer.ngOnDestroy();
        });

        beforeEach(() => {
            viewContainerFixture = TestBed.createComponent(SlideLayoutTestComponent);
            viewContainerFixture.detectChanges();
        });

        it('should open slide with new config value', () => {
            const slideRef = thySlideService.open(SlideLayoutTestComponent, {});

            expect(slideRef.containerInstance.config).toEqual(
                Object.assign({}, slideDefaultConfigValue as ThySlideConfig, newDefaultConfig)
            );
        });
    });
});

@Component({
    selector: 'thy-with-layout-view-component',
    template: `
        <thy-slide-layout>
            <thy-slide-header [thyTitle]="'测试title'" [thyIcon]="iconName">
                <ng-template #thyHeaderOperate>
                    <a thyShape="circle-thick-dashed" class="header-main-custom" href="javascript:;"> 自定义头部操作区 </a>
                </ng-template>
            </thy-slide-header>
            <thy-slide-body>
                <thy-slide-body-section [thyDividerBorder]="thyDividerBorder">测试body</thy-slide-body-section>
            </thy-slide-body>
            <thy-slide-footer>
                <button thyButton="primary-square" (click)="save($event)" class="btn-block">确定</button>
            </thy-slide-footer>
        </thy-slide-layout>
    `,
    imports: [ThySlideLayout, ThySlideHeader, ThySlideBody, ThySlideBodySection, ThySlideFooter]
})
class SlideLayoutTestComponent {
    public data: number;

    public iconName = 'wtf-task-o';

    public thyDividerBorder = false;

    save() {
        this.data = 1;
    }
}

@Component({
    selector: 'thy-with-header-view-component',
    template: `
        <thy-slide-header>
            <ng-template #thyHeader>
                <div class="custom-slide-title">头部</div>
            </ng-template>
        </thy-slide-header>
    `,
    imports: [ThySlideHeader]
})
class SlideHeaderTestComponent {}
