import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyIconModule } from 'ngx-tethys/icon';
import { dispatchMouseEvent } from 'ngx-tethys/testing';

import { ApplicationRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ThyResizableBasicExampleComponent } from '../examples/basic/basic.component';
import { ThyResizableCustomizeExampleComponent } from '../examples/customize/customize.component';
import { ThyResizableGridExampleComponent } from '../examples/grid/grid.component';
import { ThyResizableLockAspectRatioExampleComponent } from '../examples/lock-aspect-ratio/lock-aspect-ratio.component';
import { ThyResizablePreviewExampleComponent } from '../examples/preview/preview.component';
import { ThyResizableLineExampleComponent } from '../examples/line/line.component';
import { DEFAULT_RESIZE_DIRECTION, ThyResizableDirective } from '../index';
import { ThyResizableModule } from '../module';

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
                ThyResizableBasicExampleComponent,
                ThyResizableCustomizeExampleComponent,
                ThyResizableLockAspectRatioExampleComponent,
                ThyResizablePreviewExampleComponent,
                ThyResizableGridExampleComponent,
                ThyTestResizableBoundsComponent,
                ThyResizableLineExampleComponent
            ],
            providers: []
        }).compileComponents();
    }));

    describe('basic', () => {
        let fixture: ComponentFixture<ThyResizableBasicExampleComponent>;
        let testComponent: ThyResizableBasicExampleComponent;
        let resizableEle: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyResizableBasicExampleComponent);
            testComponent = fixture.debugElement.componentInstance;
            resizableEle = fixture.debugElement.query(By.directive(ThyResizableDirective)).nativeElement;
            fixture.detectChanges();
        });

        // it('should render handles', () => {
        //     const handles = resizableEle.querySelectorAll('.thy-resizable-handle');
        //     expect(handles.length).toBe(8);
        //     handles.forEach(e => {
        //         expect(DEFAULT_RESIZE_DIRECTION.some(d => e.classList.contains(`thy-resizable-handle-${d}`))).toBe(true);
        //     });
        // });

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
        let fixture: ComponentFixture<ThyResizableCustomizeExampleComponent>;
        let testComponent: ThyResizableCustomizeExampleComponent;
        let resizableEle: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyResizableCustomizeExampleComponent);
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
        let fixture: ComponentFixture<ThyResizableLockAspectRatioExampleComponent>;
        let resizableEle: HTMLElement;
        let testComponent: ThyResizableLockAspectRatioExampleComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyResizableLockAspectRatioExampleComponent);
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
        let fixture: ComponentFixture<ThyResizablePreviewExampleComponent>;
        let resizableEle: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyResizablePreviewExampleComponent);
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
        let fixture: ComponentFixture<ThyResizableGridExampleComponent>;
        let resizableEle: HTMLElement;
        let testComponent: ThyResizableGridExampleComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyResizableGridExampleComponent);
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
        let fixture: ComponentFixture<ThyResizableLineExampleComponent>;
        let resizableElement: HTMLElement;
        let testComponent: ThyTestResizableBoundsComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyResizableLineExampleComponent);
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
