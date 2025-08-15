import { DOCUMENT, PlatformLocation } from '@angular/common';
import { ApplicationRef, Injector, ɵglobal } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ThyScrollService } from 'ngx-tethys/core';

describe('ThyScrollService', () => {
    const TOP = 10;
    let injector!: Injector;
    let document!: MockDocument;
    let scrollService!: ThyScrollService;

    class MockDocument {
        body = new MockElement();
        documentElement = new MockDocumentElement();
        // Needed for the `DOMTestComponentRenderer.removeAllRootElements` since it uses
        // `DOCUMENT` token to remove DOM elements.
        querySelectorAll = ɵglobal.document.querySelectorAll.bind(ɵglobal.document);
    }

    class MockDocumentElement {
        scrollTop = jasmine.createSpy('scrollTop');
    }

    class MockElement {
        scrollTop = jasmine.createSpy('scrollTop');
    }

    class MockPlatformLocation {
        hash!: string;
    }

    beforeEach(() => {
        spyOn(window, 'scrollBy');
    });

    beforeEach(() => {
        injector = TestBed.configureTestingModule({
            providers: [
                ThyScrollService,
                { provide: DOCUMENT, useClass: MockDocument },
                { provide: PlatformLocation, useClass: MockPlatformLocation }
            ]
        });

        document = injector.get<MockDocument>(DOCUMENT);
        scrollService = injector.get(ThyScrollService);
    });

    describe('#setScrollTop', () => {
        it(`should scroll to window ${TOP} x`, () => {
            scrollService.setScrollTop(window, TOP);
            expect(document.body.scrollTop).toBe(TOP);
            scrollService.setScrollTop(window, 0);
        });

        it(`should scroll to dom element ${TOP} x`, () => {
            const el: Element = new MockElement() as any;
            scrollService.setScrollTop(el, TOP);
            expect(el.scrollTop).toBe(TOP);
            scrollService.setScrollTop(el, 0);
        });
    });

    describe('change detection behavior', () => {
        const tickAnimationFrame = (): void => tick(16);

        it('should not trigger change detection when calling `scrollTo`', fakeAsync(() => {
            const appRef = TestBed.inject(ApplicationRef);
            spyOn(appRef, 'tick');

            scrollService.setScrollTop(window, TOP);

            tickAnimationFrame();

            expect(document.body.scrollTop).toBe(TOP);
            expect(appRef.tick).not.toHaveBeenCalled();
        }));
    });
});
