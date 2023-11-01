import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    ThyGrid,
    ThyGridComponent,
    ThyGridItemComponent,
    ThyGridModule,
    ThyGridResponsiveDescription,
    ThyGridResponsiveMode
} from 'ngx-tethys/grid';
import { dispatchFakeEvent } from 'ngx-tethys/testing';

@Component({
    selector: 'test-grid-default',
    template: `
        <thy-grid>
            <thy-grid-item> Content 1 </thy-grid-item>
            <div thyGridItem>Content 2</div>
        </thy-grid>
    `
})
export class TestGridDefaultComponent {}

@Component({
    selector: 'test-grid-basic',
    template: `
        <thy-grid [thyCols]="cols" [thyGap]="gap" [thyXGap]="xGap" [thyYGap]="yGap" [thyResponsive]="responsive">
            <thy-grid-item [thySpan]="span" [thyOffset]="offset"> </thy-grid-item>
            <div thyGridItem [thySpan]="span2" [thyOffset]="offset2"></div>
            <div thyGridItem></div>
            <div thyGridItem></div>
            <div *ngIf="show" thyGridItem></div>
        </thy-grid>
    `
})
export class TestGridBasicComponent {
    cols: number | ThyGridResponsiveDescription;

    gap: number | ThyGridResponsiveDescription;

    xGap: number | ThyGridResponsiveDescription;

    yGap: number | ThyGridResponsiveDescription;

    responsive: ThyGridResponsiveMode;

    span: number | ThyGridResponsiveDescription;

    span2: number | ThyGridResponsiveDescription;

    offset: number | ThyGridResponsiveDescription;

    offset2: number | ThyGridResponsiveDescription;

    show: boolean;
}

describe('grid', () => {
    describe('default', () => {
        let fixture: ComponentFixture<TestGridDefaultComponent>;
        let gridDebugElement: DebugElement;
        let gridElement: HTMLElement;
        let gridInstance: ThyGrid;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestGridDefaultComponent],
                imports: [ThyGridModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestGridDefaultComponent);
            gridDebugElement = fixture.debugElement.query(By.directive(ThyGridComponent));
            gridElement = gridDebugElement.nativeElement;
            gridInstance = gridDebugElement.componentInstance.grid;
            fixture.detectChanges();
        });

        it('should create grid and grid-item successfully', () => {
            expect(fixture).toBeTruthy();
            expect(gridDebugElement).toBeTruthy();
            expect(gridElement).toBeTruthy();
            expect(gridElement.classList.contains('thy-grid')).toBeTruthy();

            const gridItems = gridDebugElement.queryAll(By.directive(ThyGridItemComponent));
            expect(gridItems).toBeTruthy();
            expect(gridItems.length).toBe(2);
        });

        it('should set correct default value for grid', () => {
            expect(gridInstance.thyCols).toBe(24);
            expect(gridInstance.thyGap).toBe(0);
            expect(gridInstance.thyXGap).toBe(0);
            expect(gridInstance.thyYGap).toBe(0);
            expect(gridInstance.thyResponsive).toBe('none');
        });

        it('should have default style for grid', () => {
            expect(gridElement.style.display).toBe('grid');
            expect(gridElement.style.gridTemplateColumns).toBe('repeat(24, minmax(0px, 1fr))');
            expect(gridElement.style.gap).toBe('0px');
        });

        it('should have correct default value for grid item', () => {
            const gridItems = gridDebugElement.queryAll(By.directive(ThyGridItemComponent));
            expect(gridItems).toBeTruthy();
            expect(gridItems.length).toBe(2);
            gridItems.forEach(gridItem => {
                const gridItemElement = gridItem.nativeElement;
                expect(gridItemElement.classList.contains('thy-grid-item')).toBeTruthy();
                const gridItemInstance = gridItem.componentInstance;
                expect(gridItemInstance.thySpan).toBe(1);
                expect(gridItemInstance.thyOffset).toBe(0);
            });
        });
    });

    describe('basic', () => {
        let fixture: ComponentFixture<TestGridBasicComponent>;
        let gridDebugElement: DebugElement;
        let gridElement: HTMLElement;
        let gridInstance: ThyGrid;
        let testComponent: TestGridBasicComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestGridBasicComponent],
                imports: [ThyGridModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestGridBasicComponent);
            testComponent = fixture.debugElement.componentInstance;
            gridDebugElement = fixture.debugElement.query(By.directive(ThyGridComponent));
            gridElement = gridDebugElement.nativeElement;
            gridInstance = gridDebugElement.componentInstance.grid;
            fixture.detectChanges();
        });

        describe('thyCols', () => {
            it('should support default thyCols', () => {
                expect(gridElement.style.gridTemplateColumns).toBe('repeat(24, minmax(0px, 1fr))');
            });

            it('should support thyCols is a number', () => {
                testComponent.cols = 7;
                fixture.detectChanges();
                gridInstance.ngOnInit();
                expect(gridElement.style.gridTemplateColumns).toBe('repeat(7, minmax(0px, 1fr))');
            });

            it('should support thyCols is a string', () => {
                testComponent.cols = '2';
                fixture.detectChanges();
                gridInstance.ngOnInit();
                expect(gridElement.style.gridTemplateColumns).toBe('repeat(2, minmax(0px, 1fr))');
            });

            it('should support thyCols is a responsive string', fakeAsync(() => {
                testComponent.responsive = 'screen';
                testComponent.cols = '2 sm:3 md:4 lg:5 xl:6';
                fixture.detectChanges();
                gridInstance.ngOnInit();

                assertResponsiveCols(500, 2);
                assertResponsiveCols(600, 3);
                assertResponsiveCols(800, 4);
                assertResponsiveCols(1000, 5);
                assertResponsiveCols(1200, 6);
            }));

            function assertResponsiveCols(width: number, cols: number) {
                resizeWindow(width);
                expect(gridElement.style.gridTemplateColumns).toBe(`repeat(${cols}, minmax(0px, 1fr))`);
            }
        });

        describe('thyXGap, thyYGap and thyGap', () => {
            it('should support setting grid gap', () => {
                expect(gridElement.style.gap).toBe('0px');

                assertGap(0, 0, 8, '8px');
                assertGap(0, 16, 8, '16px 8px');
                assertGap(16, 0, 8, '8px 16px');
                assertGap(12, 16, 0, '16px 12px');
                assertGap(0, 0, 0, '0px');
            });

            function assertGap(xGap: number, yGap: number, gap: number, expectGapValue: string) {
                testComponent.xGap = xGap;
                testComponent.yGap = yGap;
                testComponent.gap = gap;
                fixture.detectChanges();
                gridInstance.ngOnInit();
                expect(gridElement.style.gap).toBe(expectGapValue);
            }

            it('should support responsive setting grid gap', fakeAsync(() => {
                testComponent.responsive = 'screen';
                testComponent.gap = '2 sm:4 md:8 lg:12 xl:16';
                fixture.detectChanges();
                gridInstance.ngOnInit();

                assertResponsiveGap(500, 2);
                assertResponsiveGap(600, 4);
                assertResponsiveGap(800, 8);
                assertResponsiveGap(1000, 12);
                assertResponsiveGap(1200, 16);

                testComponent.gap = 'sm:4';
                fixture.detectChanges();
                gridInstance.ngOnInit();
                assertResponsiveGap(500, 0);
            }));

            function assertResponsiveGap(width: number, gap: number) {
                resizeWindow(width);
                expect(gridElement.style.gap).toBe(`${gap}px`);
            }
        });

        describe('thySpan', () => {
            it('should support default thySpan', () => {
                const gridItem = gridDebugElement.queryAll(By.directive(ThyGridItemComponent))[1];
                const gridItemElement = gridItem.nativeElement;
                // expect(gridItemElement.style.gridColumn).toBe('span 1 / auto');
            });

            it('should hidden the grid item when thySpan is 0', () => {
                testComponent.span = 0;
                fixture.detectChanges();
                gridInstance.ngAfterContentInit();

                const gridItem = gridDebugElement.queryAll(By.directive(ThyGridItemComponent))[0];
                const gridItemElement = gridItem.nativeElement;
                expect(gridItemElement.style.display).toBe('none');
            });

            it('should support thySpan is number', () => {
                testComponent.span2 = 2;
                fixture.detectChanges();
                gridInstance.ngAfterContentInit();

                const gridItem = gridDebugElement.queryAll(By.directive(ThyGridItemComponent))[1];
                const gridItemElement = gridItem.nativeElement;
                // expect(gridItemElement.style.gridColumn).toBe('span 2 / auto');
            });

            it('should support thySpan is a responsive string', fakeAsync(() => {
                testComponent.cols = 5;
                testComponent.responsive = 'screen';
                testComponent.span = '0 sm:2 md:3 lg:4 xl:5';
                fixture.detectChanges();
                gridInstance.ngOnInit();
                gridInstance.ngAfterContentInit();

                const gridItem = gridDebugElement.queryAll(By.directive(ThyGridItemComponent))[0];
                const gridItemElement = gridItem.nativeElement;
                assertResponsiveSpan(500, 0);
                assertResponsiveSpan(600, 2);
                assertResponsiveSpan(800, 3);
                assertResponsiveSpan(1000, 4);
                assertResponsiveSpan(1200, 5);

                function assertResponsiveSpan(width: number, span: number) {
                    resizeWindow(width);

                    if (!span) {
                        expect(gridItemElement.style.display).toBe('none');
                    } else {
                        // expect(gridItemElement.style.gridColumn).toBe(`span ${span} / auto`);
                    }
                }
            }));
        });

        describe('thyOffset', () => {
            it('should support default thyOffset', () => {
                const gridItem = gridDebugElement.queryAll(By.directive(ThyGridItemComponent))[0];
                const gridItemElement = gridItem.nativeElement;
                // expect(gridItemElement.style.gridColumn).toBe('span 1 / auto');
                expect(gridItemElement.style.marginLeft).toBe('');
            });

            it('should support thyOffset is a number', () => {
                const gridItem = gridDebugElement.queryAll(By.directive(ThyGridItemComponent))[1];
                const gridItemElement = gridItem.nativeElement;

                testComponent.offset2 = 1;
                fixture.detectChanges();
                gridInstance.ngAfterContentInit();
                // expect(gridItemElement.style.gridColumn).toBe('span 2 / auto');
                expect(gridItemElement.style.marginLeft).toBe('calc(((100% - 0px) / 2 + 0px) * 1)');

                testComponent.offset2 = 2;
                fixture.detectChanges();
                gridInstance.ngAfterContentInit();
                // expect(gridItemElement.style.gridColumn).toBe('span 3 / auto');
                expect(gridItemElement.style.marginLeft).toBe('calc(((100% - 0px) / 3 + 0px) * 2)');

                testComponent.span2 = 2;
                testComponent.gap = 8;
                fixture.detectChanges();
                gridInstance.ngOnInit();
                gridInstance.ngAfterContentInit();
                // expect(gridItemElement.style.gridColumn).toBe('span 4 / auto');
                expect(gridItemElement.style.marginLeft).toBe('calc(((100% - 24px) / 4 + 8px) * 2)');
            });

            it('should support thyOffset is a string', () => {
                const gridItem = gridDebugElement.queryAll(By.directive(ThyGridItemComponent))[0];
                const gridItemElement = gridItem.nativeElement;

                testComponent.offset = '2';
                fixture.detectChanges();
                gridInstance.ngAfterContentInit();
                // expect(gridItemElement.style.gridColumn).toBe('span 3 / auto');
                expect(gridItemElement.style.marginLeft).toBe('calc(((100% - 0px) / 3 + 0px) * 2)');
            });

            it('should support thyOffset is a responsive string', fakeAsync(() => {
                testComponent.cols = 5;
                testComponent.responsive = 'screen';
                testComponent.offset = '3 md:2 lg:1';
                fixture.detectChanges();
                gridInstance.ngOnInit();
                gridInstance.ngAfterContentInit();

                const gridItem = gridDebugElement.queryAll(By.directive(ThyGridItemComponent))[0];
                const gridItemElement = gridItem.nativeElement;
                assertResponsiveOffset(600, 3);
                assertResponsiveOffset(800, 2);
                assertResponsiveOffset(1000, 1);

                function assertResponsiveOffset(width: number, offset: number) {
                    resizeWindow(width);

                    const span = gridItem.componentInstance.span;
                    const xGap = gridInstance.xGap;
                    expect(gridItemElement.style.gridColumn).toBe(`span ${span} / auto`);
                    expect(gridItemElement.style.marginLeft).toBe(
                        `calc(((100% - ${(span - 1) * xGap}px) / ${span} + ${xGap}px) * ${offset})`
                    );
                }
            }));
        });

        function resizeWindow(width: number) {
            window.innerWidth = width;
            dispatchFakeEvent(window, 'resize');
            fixture.detectChanges();
            tick(1000);
        }

        describe('grid items changes', () => {
            it('should show correct grid item added dynamically', () => {
                testComponent.show = true;
                fixture.detectChanges();
                const gridItems = gridDebugElement.queryAll(By.directive(ThyGridItemComponent));
                expect(gridItems.length).toBe(5);
            });
        });
    });
});
