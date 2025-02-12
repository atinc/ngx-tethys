import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyIconModule } from 'ngx-tethys/icon';
import { dispatchMouseEvent } from 'ngx-tethys/testing';

import { ApplicationRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DEFAULT_RESIZE_DIRECTION, ThyResizableDirective, ThyResizeEvent } from '../index';
import { ThyResizableModule } from '../module';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-resizable-basic-test',
    template: `<div
        class="box"
        thyResizable
        [thyMaxWidth]="600"
        [thyMinWidth]="80"
        [thyMaxHeight]="200"
        [thyMinHeight]="80"
        [thyDisabled]="disabled"
        [style.height.px]="height"
        [style.width.px]="width"
        (thyResize)="onResize($event)">
        <thy-resize-handles></thy-resize-handles>
        content
    </div> `
})
export class ThyResizableBasicTestComponent {
    width = 400;
    height = 200;
    disabled = false;
    @ViewChild(ThyResizableDirective, { static: true }) directive: ThyResizableDirective;

    onResize({ width, height }: ThyResizeEvent): void {
        this.width = width!;
        this.height = height!;
    }
}

@Component({
    selector: 'thy-resizable-customize-test',
    template: `<div
        class="box"
        thyResizable
        [thyMaxWidth]="600"
        [thyMinWidth]="80"
        [thyMaxHeight]="200"
        [thyMinHeight]="80"
        [style.height.px]="height"
        [style.width.px]="width"
        (thyResize)="onResize($event)">
        <thy-resize-handle thyDirection="bottomRight">
            <thy-icon class="bottom-right" thyIconName="caret-right-down"></thy-icon>
        </thy-resize-handle>
        <thy-resize-handle thyDirection="right">
            <div class="right-wrap">
                <thy-icon thyIconName="drag" class="right"></thy-icon>
            </div>
        </thy-resize-handle>
        content
    </div> `
})
export class ThyResizableCustomizeTestComponent {
    width = 400;
    height = 200;

    onResize({ width, height }: ThyResizeEvent): void {
        this.width = width!;
        this.height = height!;
    }
}

@Component({
    selector: 'thy-resizable-grid-test',
    template: `<div thyRow>
        <div
            thyCol
            thyResizable
            class="col"
            (thyResize)="onResize($event)"
            [thyMinColumn]="3"
            [thyMaxColumn]="20"
            [thyGridColumnCount]="24"
            [thySpan]="col">
            <thy-resize-handles [thyDirections]="['right']"></thy-resize-handles>
            col-{{ col }}
        </div>
        <div class="col col-right" thyCol [thySpan]="24 - col">col-{{ 24 - col }}</div>
    </div>`
})
export class ThyResizableGridTestComponent {
    col = 8;

    onResize({ col }: ThyResizeEvent): void {
        this.col = col!;
    }
}

@Component({
    selector: 'thy-resizable-preview-test',
    template: `<div
        class="box"
        thyResizable
        thyPreview
        [style.height.px]="height"
        [style.width.px]="width"
        (thyResizeEnd)="onResize($event)">
        <thy-resize-handles></thy-resize-handles>
        content
    </div> `
})
export class ThyResizablePreviewTestComponent {
    width = 400;
    height = 200;

    onResize({ width, height }: ThyResizeEvent): void {
        this.width = width!;
        this.height = height!;
    }
}

@Component({
    selector: 'thy-resizable-lock-aspect-ratio-test',
    template: `<div
        class="box"
        thyResizable
        [style.height.px]="height"
        [style.width.px]="width"
        thyLockAspectRatio="true"
        (thyResize)="onResize($event)">
        <thy-resize-handles></thy-resize-handles>
        content
    </div> `
})
export class ThyResizableLockAspectRatioTestComponent {
    width = 400;
    height = 200;

    onResize({ width, height }: ThyResizeEvent): void {
        this.width = width!;
        this.height = height!;
    }
}

@Component({
    selector: 'thy-resizable-line-test',
    template: `<div class="container">
        <div thyResizable class="left" (thyResize)="onResize($event)" [style.width.px]="width">
            Left
            <thy-resize-handles (dblclick)="reset()" [thyDirections]="directions" thyLine="true"></thy-resize-handles>
        </div>
        <div class="right">Right</div>
    </div> `
})
export class ThyResizableLineTestComponent {
    width = 200;

    directions = ['right'];

    onResize(event: ThyResizeEvent): void {
        this.width = event.width;
    }

    reset() {
        this.width = 200;
    }
}

@Component({
    template: `
        <div class="box-ref" #boxRef>
            <div class="parent">
                <div
                    class="box"
                    thyResizable
                    [thyBounds]="bounds"
                    [thyMaxWidth]="maxWidth"
                    [thyMinWidth]="80"
                    [thyMaxHeight]="maxHeight"
                    [thyMinHeight]="80"
                    [style.height.px]="height"
                    [style.width.px]="width"
                    (thyResize)="onResize($event)">
                    <thy-resize-handles></thy-resize-handles>
                    content
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .box-ref {
                width: 256px;
                height: 256px;
            }
            .parent {
                width: 200px;
                height: 200px;
            }
        `
    ]
})
class ThyTestResizableBoundsComponent {
    @ViewChild('boxRef', { static: true }) boxRef!: ElementRef<HTMLDivElement>;
    bounds: string | ElementRef = 'parent';
    maxWidth = 300;
    maxHeight = 300;
    width = 100;
    height = 100;
    id = -1;

    onResize({ width, height }: { width: number; height: number }): void {
        cancelAnimationFrame(this.id);
        this.id = requestAnimationFrame(() => {
            this.width = width;
            this.height = height;
        });
    }
}

function mouseMoveTrigger(el: HTMLElement, from: { x: number; y: number }, to: { x: number; y: number }): void {
    dispatchMouseEvent(el, 'mousedown', from.x, from.y);
    dispatchMouseEvent(window.document, 'mousemove', to.x, to.y);
    dispatchMouseEvent(window.document, 'mouseup');
}

describe('resizable', () => {
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyResizableModule, ThyGridModule, ThyIconModule],
            declarations: [
                ThyResizableBasicTestComponent,
                ThyResizableCustomizeTestComponent,
                ThyResizableLockAspectRatioTestComponent,
                ThyResizablePreviewTestComponent,
                ThyResizableGridTestComponent,
                ThyTestResizableBoundsComponent,
                ThyResizableLineTestComponent
            ],
            providers: [provideHttpClient()]
        }).compileComponents();
    }));

    describe('basic', () => {
        let fixture: ComponentFixture<ThyResizableBasicTestComponent>;
        let testComponent: ThyResizableBasicTestComponent;
        let resizableEle: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyResizableBasicTestComponent);
            testComponent = fixture.debugElement.componentInstance;
            resizableEle = fixture.debugElement.query(By.directive(ThyResizableDirective)).nativeElement;
            fixture.detectChanges();
        });

        it('should render handles', () => {
            const handles = resizableEle.querySelectorAll('.thy-resizable-handle');
            expect(handles.length).toBe(8);
            handles.forEach(e => {
                expect(DEFAULT_RESIZE_DIRECTION.some(d => e.classList.contains(`thy-resizable-handle-${d}`))).toBe(true);
            });
        });

        it('should toggle the `thy-resizable-handle-box-hover` class when `mouseenter` and `mouseleave` events are fired and should not run change detection', () => {
            const appRef = TestBed.inject(ApplicationRef);
            spyOn(appRef, 'tick');
            dispatchMouseEvent(resizableEle, 'mouseenter');
            const handles = resizableEle.querySelectorAll('.thy-resizable-handle');
            expect(handles.length).toBe(8);
            handles.forEach(e => {
                expect(e.classList).toContain('thy-resizable-handle-box-hover');
            });
            dispatchMouseEvent(resizableEle, 'mouseleave');
            handles.forEach(e => {
                expect(e.classList).not.toContain('thy-resizable-handle-box-hover');
            });
            expect(appRef.tick).toHaveBeenCalledTimes(0);
        });

        it('should not run change detection on `mousedown` event on the `thy-resize-handle`', () => {
            const appRef = TestBed.inject(ApplicationRef);
            spyOn(appRef, 'tick');
            const thyResizeHandle = resizableEle.querySelector('thy-resize-handle')!;
            dispatchMouseEvent(thyResizeHandle, 'mousedown');
            expect(appRef.tick).toHaveBeenCalledTimes(0);
        });

        it('should not run change detection if there are no `thyResizeStart` observers', () => {
            const thyResizeStartSpy = jasmine.createSpy();
            const appRef = TestBed.inject(ApplicationRef);
            spyOn(appRef, 'tick');
            const thyResizeHandle = resizableEle.querySelector('thy-resize-handle');
            dispatchMouseEvent(thyResizeHandle, 'mousedown');
            expect(appRef.tick).not.toHaveBeenCalled();
            testComponent.directive.thyResizeStart.subscribe(thyResizeStartSpy);
            dispatchMouseEvent(thyResizeHandle, 'mousedown');
            expect(appRef.tick).toHaveBeenCalledTimes(1);
            expect(thyResizeStartSpy).toHaveBeenCalled();
        });

        it('should maximum size work', fakeAsync(() => {
            const rect = resizableEle.getBoundingClientRect();
            const handel = resizableEle.querySelector('.thy-resizable-handle-bottomRight') as HTMLElement;
            mouseMoveTrigger(
                handel,
                {
                    x: rect.right,
                    y: rect.bottom
                },
                {
                    x: rect.right + 500,
                    y: rect.bottom + 200
                }
            );
            fixture.detectChanges();
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
            expect(testComponent.width).toBe(600);
            expect(testComponent.height).toBe(200);
        }));

        it('should minimum size work', fakeAsync(() => {
            const rect = resizableEle.getBoundingClientRect();
            const handel = resizableEle.querySelector('.thy-resizable-handle-bottomRight') as HTMLElement;
            mouseMoveTrigger(
                handel,
                {
                    x: rect.right,
                    y: rect.bottom
                },
                {
                    x: rect.right - 600,
                    y: rect.bottom - 200
                }
            );
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
            expect(testComponent.width).toBe(80);
            expect(testComponent.height).toBe(80);
        }));

        describe('should resize work', () => {
            let rect: ClientRect | DOMRect;

            beforeEach(() => {
                testComponent.height = 200;
                testComponent.width = 400;
                fixture.detectChanges();
                rect = resizableEle.getBoundingClientRect();
                expect(testComponent.width).toBe(400);
                expect(testComponent.height).toBe(200);
            });

            /**
             *  +---↓---+
             *  |       |
             *  +-------+
             */
            it('top', fakeAsync(() => {
                const handle = resizableEle.querySelector('.thy-resizable-handle-top') as HTMLElement;
                mouseMoveTrigger(
                    handle,
                    {
                        x: rect.left,
                        y: rect.top
                    },
                    {
                        x: rect.left,
                        y: rect.top + 100
                    }
                );
                fixture.detectChanges();
                tick(16);
                fixture.detectChanges();
                expect(testComponent.height).toBeLessThanOrEqual(200);
                expect(testComponent.height).toBeGreaterThanOrEqual(100);
            }));

            /**
             *  +-------+
             *  |       |
             *  +---↑---+
             */
            it('bottom', fakeAsync(() => {
                const handle = resizableEle.querySelector('.thy-resizable-handle-bottom') as HTMLElement;
                mouseMoveTrigger(
                    handle,
                    {
                        x: rect.left,
                        y: rect.bottom
                    },
                    {
                        x: rect.left,
                        y: rect.bottom - 100
                    }
                );
                fixture.detectChanges();
                tick(16);
                fixture.detectChanges();
                expect(testComponent.height).toBeLessThanOrEqual(200);
                expect(testComponent.height).toBeGreaterThanOrEqual(100);
            }));

            /**
             *  +-------+
             *  →       |
             *  +-------+
             */
            it('left', fakeAsync(() => {
                const handle = resizableEle.querySelector('.thy-resizable-handle-left') as HTMLElement;
                mouseMoveTrigger(
                    handle,
                    {
                        x: rect.left,
                        y: rect.bottom
                    },
                    {
                        x: rect.left + 100,
                        y: rect.bottom
                    }
                );
                fixture.detectChanges();
                tick(16);
                fixture.detectChanges();
                expect(testComponent.width).toBeLessThanOrEqual(400);
                expect(testComponent.width).toBeGreaterThanOrEqual(300);
            }));

            /**
             *  +-------+
             *  |       ←
             *  +-------+
             */
            it('right', fakeAsync(() => {
                const handle = resizableEle.querySelector('.thy-resizable-handle-right') as HTMLElement;
                mouseMoveTrigger(
                    handle,
                    {
                        x: rect.right,
                        y: rect.bottom
                    },
                    {
                        x: rect.right - 100,
                        y: rect.bottom
                    }
                );
                fixture.detectChanges();
                tick(16);
                fixture.detectChanges();
                expect(testComponent.width).toBeLessThanOrEqual(400);
                expect(testComponent.width).toBeGreaterThanOrEqual(300);
            }));

            /**
             *  +-------↙
             *  |       |
             *  +------+
             */
            it('topRight', fakeAsync(() => {
                const handle = resizableEle.querySelector('.thy-resizable-handle-topRight') as HTMLElement;
                mouseMoveTrigger(
                    handle,
                    {
                        x: rect.right,
                        y: rect.top
                    },
                    {
                        x: rect.right - 100,
                        y: rect.top + 90
                    }
                );
                fixture.detectChanges();
                tick(16);
                fixture.detectChanges();
                expect(testComponent.width).toBeLessThanOrEqual(400);
                expect(testComponent.width).toBeGreaterThanOrEqual(300);
                expect(testComponent.height).toBeLessThanOrEqual(210);
                expect(testComponent.height).toBeGreaterThanOrEqual(100);
            }));

            /**
             *  ↘-------+
             *  |       |
             *  +-------+
             */
            it('topLeft', fakeAsync(() => {
                const handle = resizableEle.querySelector('.thy-resizable-handle-topLeft') as HTMLElement;
                mouseMoveTrigger(
                    handle,
                    {
                        x: rect.left,
                        y: rect.top
                    },
                    {
                        x: rect.left + 100,
                        y: rect.top + 100
                    }
                );
                fixture.detectChanges();
                tick(16);
                fixture.detectChanges();
                expect(testComponent.width).toBeLessThanOrEqual(400);
                expect(testComponent.width).toBeGreaterThanOrEqual(300);
                expect(testComponent.height).toBeLessThanOrEqual(200);
                expect(testComponent.height).toBeGreaterThanOrEqual(100);
            }));

            /**
             *  +-------+
             *  |       |
             *  +-------↖
             */
            it('bottomRight', fakeAsync(() => {
                const handle = resizableEle.querySelector('.thy-resizable-handle-bottomRight') as HTMLElement;
                mouseMoveTrigger(
                    handle,
                    {
                        x: rect.right,
                        y: rect.bottom
                    },
                    {
                        x: rect.right - 100,
                        y: rect.bottom - 90
                    }
                );
                fixture.detectChanges();
                tick(16);
                fixture.detectChanges();
                expect(testComponent.width).toBeLessThanOrEqual(400);
                expect(testComponent.width).toBeGreaterThanOrEqual(300);
                expect(testComponent.height).toBeLessThanOrEqual(190);
                expect(testComponent.height).toBeGreaterThanOrEqual(100);
            }));

            /**
             *  +-------+
             *  |       |
             *  ↗-------+
             */
            it('bottomLeft', fakeAsync(() => {
                const handle = resizableEle.querySelector('.thy-resizable-handle-bottomLeft') as HTMLElement;
                mouseMoveTrigger(
                    handle,
                    {
                        x: rect.left,
                        y: rect.bottom
                    },
                    {
                        x: rect.left + 100,
                        y: rect.bottom - 100
                    }
                );
                fixture.detectChanges();
                tick(16);
                fixture.detectChanges();
                expect(testComponent.width).toBeLessThanOrEqual(400);
                expect(testComponent.width).toBeGreaterThanOrEqual(300);
                expect(testComponent.height).toBeLessThanOrEqual(200);
                expect(testComponent.height).toBeGreaterThanOrEqual(100);
            }));

            it('should resizing', fakeAsync(() => {
                const handle = resizableEle.querySelector('.thy-resizable-handle-left') as HTMLElement;
                expect(resizableEle.classList.contains('thy-resizable-resizing')).toBeFalsy();
                dispatchMouseEvent(handle, 'mousedown', rect.left, rect.bottom);
                dispatchMouseEvent(window.document, 'mousemove', rect.left + 100, rect.bottom);
                fixture.detectChanges();
                tick(16);
                fixture.detectChanges();
                expect(resizableEle.classList.contains('thy-resizable-resizing')).toBeTruthy();
                dispatchMouseEvent(window.document, 'mouseup');
                fixture.detectChanges();
                expect(resizableEle.classList.contains('thy-resizable-resizing')).toBeFalsy();
            }));
        });

        it('should disabled work', fakeAsync(() => {
            testComponent.disabled = true;
            fixture.detectChanges();
            expect(resizableEle.classList).toContain(`thy-resizable-disabled`);
            expect(testComponent.width).toBe(400);
            const rect = resizableEle.getBoundingClientRect();
            const handle = resizableEle.querySelector('.thy-resizable-handle-left') as HTMLElement;
            mouseMoveTrigger(
                handle,
                {
                    x: rect.left,
                    y: rect.bottom
                },
                {
                    x: rect.left + 100,
                    y: rect.bottom
                }
            );
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
            expect(testComponent.width).toBe(400);
        }));
    });

    describe('customize', () => {
        let fixture: ComponentFixture<ThyResizableCustomizeTestComponent>;
        let testComponent: ThyResizableCustomizeTestComponent;
        let resizableEle: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyResizableCustomizeTestComponent);
            testComponent = fixture.debugElement.componentInstance;
            resizableEle = fixture.debugElement.query(By.directive(ThyResizableDirective)).nativeElement;
            fixture.detectChanges();
        });

        it('should customize handles', fakeAsync(() => {
            const bottomRightHandel = resizableEle.querySelector('.thy-resizable-handle-bottomRight') as HTMLElement;
            expect(bottomRightHandel.querySelector('.bottom-right')).toBeTruthy();
            const rightHandel = resizableEle.querySelector('.thy-resizable-handle-right') as HTMLElement;
            expect(rightHandel.querySelector('.right-wrap')).toBeTruthy();

            const rect = resizableEle.getBoundingClientRect();
            mouseMoveTrigger(
                bottomRightHandel,
                {
                    x: rect.right,
                    y: rect.bottom
                },
                {
                    x: rect.right + 200,
                    y: rect.bottom
                }
            );
            fixture.detectChanges();
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
            fixture.detectChanges();
            expect(testComponent.width).toBeGreaterThanOrEqual(600);
        }));
    });

    describe('lock aspect ratio', () => {
        let fixture: ComponentFixture<ThyResizableLockAspectRatioTestComponent>;
        let resizableEle: HTMLElement;
        let testComponent: ThyResizableLockAspectRatioTestComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyResizableLockAspectRatioTestComponent);
            testComponent = fixture.debugElement.componentInstance;
            resizableEle = fixture.debugElement.query(By.directive(ThyResizableDirective)).nativeElement;
            fixture.detectChanges();
        });

        it('should lock aspect ratio when resize', fakeAsync(() => {
            const rect = resizableEle.getBoundingClientRect();
            const leftHandel = resizableEle.querySelector('.thy-resizable-handle-right') as HTMLElement;
            const topHandel = resizableEle.querySelector('.thy-resizable-handle-top') as HTMLElement;
            const bottomRightHandel = resizableEle.querySelector('.thy-resizable-handle-bottomRight') as HTMLElement;
            const ratio = testComponent.width / testComponent.height;
            mouseMoveTrigger(
                leftHandel,
                {
                    x: rect.right,
                    y: rect.bottom
                },
                {
                    x: rect.right + 100,
                    y: rect.bottom
                }
            );
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
            mouseMoveTrigger(
                bottomRightHandel,
                {
                    x: rect.right,
                    y: rect.bottom
                },
                {
                    x: rect.right - 123,
                    y: rect.bottom - 321
                }
            );
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
            mouseMoveTrigger(
                topHandel,
                {
                    x: rect.right,
                    y: rect.top
                },
                {
                    x: rect.right,
                    y: rect.top + 100
                }
            );
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
            expect(Math.round(testComponent.width / testComponent.height)).toBe(ratio);
        }));
    });

    describe('preview', () => {
        let fixture: ComponentFixture<ThyResizablePreviewTestComponent>;
        let resizableEle: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyResizablePreviewTestComponent);
            resizableEle = fixture.debugElement.query(By.directive(ThyResizableDirective)).nativeElement;
            fixture.detectChanges();
        });

        it('should preview work', fakeAsync(() => {
            const rect = resizableEle.getBoundingClientRect();
            const handle = resizableEle.querySelector('.thy-resizable-handle-bottomRight') as HTMLElement;
            dispatchMouseEvent(handle, 'mousedown', rect.right, rect.bottom);
            dispatchMouseEvent(window.document, 'mousemove', rect.right + 20, rect.bottom + 20);
            fixture.detectChanges();
            const preview = resizableEle.querySelector('.thy-resizable-preview') as HTMLElement;
            expect(preview).toBeTruthy();
            dispatchMouseEvent(window.document, 'mouseup');
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
        }));
    });

    describe('grid', () => {
        let fixture: ComponentFixture<ThyResizableGridTestComponent>;
        let resizableEle: HTMLElement;
        let testComponent: ThyResizableGridTestComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyResizableGridTestComponent);
            testComponent = fixture.debugElement.componentInstance;
            resizableEle = fixture.debugElement.query(By.directive(ThyResizableDirective)).nativeElement;
            fixture.detectChanges();
        });

        it('should grid work', fakeAsync(() => {
            const rect = resizableEle.getBoundingClientRect();
            const handle = resizableEle.querySelector('.thy-resizable-handle-right') as HTMLElement;
            mouseMoveTrigger(
                handle,
                {
                    x: rect.right,
                    y: rect.bottom
                },
                {
                    x: 0,
                    y: rect.bottom
                }
            );
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
            expect(testComponent.col).toBe(3);
            mouseMoveTrigger(
                handle,
                {
                    x: rect.right,
                    y: rect.bottom
                },
                {
                    x: 9999,
                    y: rect.bottom
                }
            );
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
            expect(testComponent.col).toBe(20);
        }));
    });

    describe('bounds', () => {
        let fixture: ComponentFixture<ThyTestResizableBoundsComponent>;
        let resizableEle: HTMLElement;
        let testComponent: ThyTestResizableBoundsComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyTestResizableBoundsComponent);
            testComponent = fixture.debugElement.componentInstance;
            resizableEle = fixture.debugElement.query(By.directive(ThyResizableDirective)).nativeElement;
            fixture.detectChanges();
        });

        it('should parent bounds work', fakeAsync(() => {
            const rect = resizableEle.getBoundingClientRect();
            const handle = resizableEle.querySelector('.thy-resizable-handle-bottomRight') as HTMLElement;
            mouseMoveTrigger(
                handle,
                {
                    x: rect.right,
                    y: rect.bottom
                },
                {
                    x: rect.right + 200,
                    y: rect.bottom + 200
                }
            );
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
            expect(testComponent.width).toBe(200);
            expect(testComponent.height).toBe(200);
        }));

        it('should element ref bounds work', fakeAsync(() => {
            const rect = resizableEle.getBoundingClientRect();
            testComponent.bounds = testComponent.boxRef;
            fixture.detectChanges();
            const handle = resizableEle.querySelector('.thy-resizable-handle-bottomRight') as HTMLElement;
            mouseMoveTrigger(
                handle,
                {
                    x: rect.right,
                    y: rect.bottom
                },
                {
                    x: rect.right + 300,
                    y: rect.bottom + 300
                }
            );
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
            expect(testComponent.width).toBe(256);
            expect(testComponent.height).toBe(256);
        }));

        it('should window bounds work', fakeAsync(() => {
            const rect = resizableEle.getBoundingClientRect();
            testComponent.bounds = 'window';
            fixture.detectChanges();
            const handle = resizableEle.querySelector('.thy-resizable-handle-bottomRight') as HTMLElement;
            mouseMoveTrigger(
                handle,
                {
                    x: rect.right,
                    y: rect.bottom
                },
                {
                    x: rect.right + window.innerWidth,
                    y: rect.bottom + window.innerHeight
                }
            );
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
            expect(testComponent.width).toBe(300);
            expect(testComponent.height).toBe(300);
            testComponent.maxHeight = window.innerHeight * 2;
            testComponent.maxWidth = window.innerWidth * 2;
            fixture.detectChanges();
            mouseMoveTrigger(
                handle,
                {
                    x: rect.right,
                    y: rect.bottom
                },
                {
                    x: rect.right + window.innerWidth,
                    y: rect.bottom + window.innerHeight
                }
            );
            fixture.detectChanges();
            tick(16);
            fixture.detectChanges();
            expect(testComponent.width).toBe(window.innerWidth);
            expect(testComponent.height).toBe(window.innerHeight);
        }));
    });

    describe('resize-handles', () => {
        let fixture: ComponentFixture<ThyResizableLineTestComponent>;
        let resizableElement: HTMLElement;
        let testComponent: ThyTestResizableBoundsComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyResizableLineTestComponent);
            testComponent = fixture.debugElement.componentInstance;
            resizableElement = fixture.debugElement.query(By.directive(ThyResizableDirective)).nativeElement;
            fixture.detectChanges();
        });

        it('should has drag line', () => {
            const resizableHandleElement = resizableElement.querySelector('.thy-resizable-handle');
            expect(resizableHandleElement).toBeTruthy();
            expect(resizableHandleElement.children.length).toBe(1);
            expect(resizableHandleElement.classList.contains('thy-resizable-handle-right')).toBeTruthy();
            expect(resizableHandleElement.children.length).toBe(1);
            expect(resizableHandleElement.children[0].classList.contains('thy-resizable-handle-line')).toBeTruthy();
        });

        it('should has multiple drag line', () => {
            fixture.componentInstance.directions = ['left', 'right', 'top'];
            fixture.detectChanges();
            const resizableHandleElement = resizableElement.querySelector('.thy-resizable-handle');
            expect(resizableHandleElement).toBeTruthy();
            const lines = resizableElement.querySelectorAll('.thy-resizable-handle-line');
            expect(lines.length).toBe(3);
        });
    });
});
