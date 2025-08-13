import { Component, DebugElement, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ThyBackTopModule, ThyBackTop } from 'ngx-tethys/back-top';
import { ThyScrollService } from 'ngx-tethys/core';
import { provideHttpClient } from '@angular/common/http';

describe('Component:thy-back-top', () => {
    let scrollService: MockThyScrollService | undefined = undefined;
    let fixture: ComponentFixture<TestBackTopComponent> | undefined = undefined;
    let debugElement: DebugElement | undefined = undefined;
    let component: ThyBackTop | undefined = undefined;
    let componentObject: ThyBackTopPageObject | undefined = undefined;
    const defaultVisibilityHeight = 400;

    class ThyBackTopPageObject {
        scrollTo(el: Element | Window, scrollTop: number): void {
            scrollService.mockTopOffset = scrollTop;
            el.dispatchEvent(new Event('scroll'));
        }

        clickBackTop(): void {
            this.backTopButton().nativeElement.click();
        }

        backTopButton(): DebugElement {
            return debugElement.query(By.css('.thy-back-top'));
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MockThyScrollService,
                provideHttpClient(),
                provideAnimations(),
                {
                    provide: ThyScrollService,
                    useExisting: MockThyScrollService
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBackTopComponent);
        component = fixture.componentInstance.thyBackTopComponent();
        componentObject = new ThyBackTopPageObject();
        debugElement = fixture.debugElement;
        scrollService = TestBed.inject(MockThyScrollService);
    });

    describe('[default]', () => {
        it(`should not show when scroll is below ${defaultVisibilityHeight}`, fakeAsync(() => {
            componentObject.scrollTo(window, defaultVisibilityHeight - 1);
            tick();
            fixture.detectChanges();
            expect(componentObject.backTopButton() === null).toBe(true);
        }));

        it(`should not show when scroll is at ${defaultVisibilityHeight}`, fakeAsync(() => {
            componentObject.scrollTo(window, defaultVisibilityHeight);
            tick();
            fixture.detectChanges();

            expect(componentObject.backTopButton() === null).toBe(true);
        }));

        describe(`when scrolled at least ${defaultVisibilityHeight + 1}`, () => {
            beforeEach(fakeAsync(() => {
                componentObject.scrollTo(window, defaultVisibilityHeight + 1);
                tick();
                fixture.detectChanges();
            }));

            it(`should show back to top button`, () => {
                expect(componentObject.backTopButton() === null).toBe(false);
            });

            it(`should show default template`, () => {
                expect(debugElement.query(By.css('.thy-back-top-content')) === null).toBe(false);
            });

            it(`should scroll to top when button is clicked`, fakeAsync(() => {
                componentObject.clickBackTop();
                tick();

                expect(scrollService.getScroll()).toEqual(0);
            }));
        });
    });

    describe('[thyVisibilityHeight]', () => {
        const customVisibilityHeight = 100;

        beforeEach(() => {
            fixture.componentInstance.visibilityHeight = customVisibilityHeight;
            fixture.detectChanges();
        });

        it(`should not show when scroll is below ${customVisibilityHeight}`, fakeAsync(() => {
            componentObject.scrollTo(window, customVisibilityHeight - 1);
            tick();
            fixture.detectChanges();

            expect(componentObject.backTopButton() === null).toBe(true);
        }));

        it(`should not show when scroll is at ${customVisibilityHeight}`, fakeAsync(() => {
            componentObject.scrollTo(window, customVisibilityHeight);
            tick();
            fixture.detectChanges();

            expect(componentObject.backTopButton() === null).toBe(true);
        }));

        describe(`when scrolled at least ${customVisibilityHeight + 1}`, () => {
            beforeEach(fakeAsync(() => {
                componentObject.scrollTo(window, customVisibilityHeight + 1);
                tick();
                fixture.detectChanges();
            }));

            it(`should show back to top button`, () => {
                expect(componentObject.backTopButton() === null).toBe(false);
            });
        });
    });

    describe('(thyClick)', () => {
        beforeEach(fakeAsync(() => {
            componentObject.scrollTo(window, defaultVisibilityHeight + 1);
            tick();
            fixture.detectChanges();
        }));

        describe('when clicked', () => {
            it(`emit event on click`, fakeAsync(() => {
                component.thyClick.subscribe((returnValue: boolean) => {
                    expect(returnValue).toBe(true);
                });

                componentObject.clickBackTop();
            }));
        });
    });

    describe('(visibleChange)', () => {
        describe('when visible change', () => {
            it(`emit visible change when scroll is at ${defaultVisibilityHeight}`, fakeAsync(() => {
                const visibleChangeSpy = jasmine.createSpy('visibleHide');
                component.visibleChange.subscribe((returnValue: boolean) => {
                    visibleChangeSpy(returnValue);
                });
                componentObject.scrollTo(window, defaultVisibilityHeight + 1);
                tick(100);
                fixture.detectChanges();
                expect(visibleChangeSpy).toHaveBeenCalledWith(true);
                componentObject.scrollTo(window, defaultVisibilityHeight - 1);
                tick(100);
                fixture.detectChanges();
                expect(visibleChangeSpy).toHaveBeenCalledWith(false);
            }));
        });
    });

    describe('[thyContainer]', () => {
        let fakeTarget: HTMLElement | undefined = undefined;
        beforeEach(fakeAsync(() => {
            fakeTarget = debugElement.query(By.css('#fakeTarget')).nativeElement;
            fixture.componentInstance.setTarget(fakeTarget);
            fixture.detectChanges();
        }));

        it('window scroll does not show the button', fakeAsync(() => {
            componentObject.scrollTo(window, defaultVisibilityHeight + 1);
            tick();
            fixture.detectChanges();

            expect(componentObject.backTopButton() === null).toBe(true);
        }));

        it('element scroll shows the button', fakeAsync(() => {
            const throttleTime = 50;

            componentObject.scrollTo(fakeTarget, defaultVisibilityHeight + 1);
            tick(throttleTime + 1);
            fixture.detectChanges();

            expect(componentObject.backTopButton() === null).toBe(false);
        }));

        it('element (use string id) scroll shows the button', fakeAsync(() => {
            fixture.componentInstance.container = '#fakeTarget';
            fixture.detectChanges();

            const throttleTime = 50;

            componentObject.scrollTo(fakeTarget, defaultVisibilityHeight + 1);
            tick(throttleTime + 1);
            fixture.detectChanges();

            expect(componentObject.backTopButton() === null).toBe(false);
        }));
    });

    describe('#thyTemplate', () => {
        it(`should show custom template`, fakeAsync(() => {
            let fixtureTemplate: ComponentFixture<TestBackTopTemplateComponent> | undefined = undefined;
            fixtureTemplate = TestBed.createComponent(TestBackTopTemplateComponent);

            componentObject.scrollTo(window, defaultVisibilityHeight + 1);
            tick();
            fixtureTemplate.detectChanges();
            expect(fixtureTemplate.debugElement.query(By.css('.this-is-my-template')) === null).toBe(false);
        }));
    });
});

@Component({
    template: `
        <thy-back-top [thyContainer]="container" [thyVisibilityHeight]="visibilityHeight"></thy-back-top>
        <div id="fakeTarget"></div>
    `,
    imports: [ThyBackTopModule]
})
class TestBackTopComponent {
    readonly thyBackTopComponent = viewChild.required(ThyBackTop);
    container: HTMLElement | string | null = null;
    visibilityHeight = 400;

    setTarget(container: HTMLElement): void {
        this.container = container;
    }
}

@Component({
    template: `
        <thy-back-top [thyTemplate]="tpl">
            <ng-template #tpl>
                <div class="this-is-my-template"></div>
            </ng-template>
        </thy-back-top>
    `,
    imports: [ThyBackTopModule]
})
class TestBackTopTemplateComponent {
    readonly thyBackTopComponent = viewChild.required(ThyBackTop);
}

class MockThyScrollService {
    mockTopOffset: number = 0;

    getScroll(): number {
        return this.mockTopOffset;
    }

    scrollTo(_containerEl: Element | Window, targetTopValue: number = 0): void {
        this.mockTopOffset = targetTopValue;
    }
}
