import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
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
        <thy-grid
            [thyCols]="cols"
            [thyGap]="gap"
            [thyXGap]="xGap"
            [thyYGap]="yGap"
            [thyResponsive]="responsive"
            [thyItemResponsive]="itemResponsive"
        >
            <thy-grid-item [thySpan]="span" [thyOffset]="offset"> </thy-grid-item>
            <div thyGridItem [thySpan]="span2" [thyOffset]="offset2"></div>
            <div thyGridItem></div>
            <div thyGridItem></div>
        </thy-grid>
    `
})
export class TestGridBasicComponent {
    cols: number | ThyGridResponsiveDescription;

    gap: number | ThyGridResponsiveDescription;

    xGap: number | ThyGridResponsiveDescription;

    yGap: number | ThyGridResponsiveDescription;

    responsive: ThyGridResponsiveMode;

    itemResponsive: boolean;

    span: number | ThyGridResponsiveDescription;

    span2: number | ThyGridResponsiveDescription;

    offset: number | ThyGridResponsiveDescription;

    offset2: number | ThyGridResponsiveDescription;
}

@Component({
    selector: 'test-grid-collapse',
    template: `
        <thy-grid thyCols="5" thyGap="8" [thyCollapsed]="isCollapsed" [thyCollapsedRows]="collapsedRows" #grid>
            <ng-container *ngFor="let i of gridItems; trackBy: trackByFn">
                <div thyGridItem>Content {{ i + 1 }}</div>
            </ng-container>
            <div *ngIf="showThreeSpanItem" thyGridItem thySpan="3"></div>
            <div *ngIf="showSuffix" thyGridItem [thySuffix]="true">
                {{ grid.overflow ? '存在溢出' : '不存在溢出' }}
            </div>
        </thy-grid>
    `
})
export class TestGridCollapseComponent {
    public gridItemCount: number = 6;

    public isCollapsed: boolean = false;

    public showSuffix: boolean = false;

    public collapsedRows: number = 1;

    public showThreeSpanItem: boolean;

    get gridItems() {
        return Array.from({ length: this.gridItemCount }, (v, k) => k);
    }

    trackByFn(index: number) {
        return index;
    }
}

@Component({
    selector: 'test-grid-use-style-value',
    template: `
        <thy-grid thyCols="6" thyGap="8">
            <div thyGridItem [thyGridColumn]="1"></div>
            <div thyGridItem [thyGridColumn]="'span 2'"></div>
            <div thyGridItem></div>
            <div thyGridItem [thyGridColumn]="'5 / span 2'" [thyGridRow]="'span 2'"></div>
            <div thyGridItem [thyGridColumn]="'1 / 2'"></div>
            <div thyGridItem [thyGridColumn]="'span 3 / 5'"></div>
        </thy-grid>
    `
})
export class TestGridUseStyleValueComponent {}

describe('grid', () => {
    describe('default', () => {
        let fixture: ComponentFixture<TestGridDefaultComponent>;
        let gridDebugElement: DebugElement;
        let gridElement: HTMLElement;
        let gridInstance: ThyGridComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestGridDefaultComponent],
                imports: [ThyGridModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestGridDefaultComponent);
            gridDebugElement = fixture.debugElement.query(By.directive(ThyGridComponent));
            gridElement = gridDebugElement.nativeElement;
            gridInstance = gridDebugElement.componentInstance;
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
            expect(gridInstance.thyResponsive).toBe('self');
            expect(gridInstance.thyItemResponsive).toBeFalsy();
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
        let gridInstance: ThyGridComponent;
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
            gridInstance = gridDebugElement.componentInstance;
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
                testComponent.cols = '2 s:3 m:4 l:5 xl:6 2xl:7';
                fixture.detectChanges();
                gridInstance.ngOnInit();

                assertResponsiveCols(500, 2);
                assertResponsiveCols(700, 3);
                assertResponsiveCols(1200, 4);
                assertResponsiveCols(1280, 5);
                assertResponsiveCols(1600, 6);
                assertResponsiveCols(1920, 7);

                testComponent.cols = '3 xxl:7';
                testComponent.gap = '3 xxl:20';
                fixture.detectChanges();
                gridInstance.ngOnInit();
                assertResponsiveCols(1920, 7);

                testComponent.cols = '2 s:3 2xl:7';
                testComponent.gap = 8;
                fixture.detectChanges();
                gridInstance.ngOnInit();
                assertResponsiveCols(1280, 3);
            }));

            function assertResponsiveCols(width: number, cols: number) {
                resizeWindow(width);
                expect(gridElement.style.gridTemplateColumns).toBe(`repeat(${cols}, minmax(0px, 1fr))`);
            }
        });

        describe('thyXGap, thyYGap and thyGap', () => {
            it('should support setting grid gap', () => {
                expect(gridElement.style.gap).toBe('0px');

                testComponent.gap = 8;
                fixture.detectChanges();
                gridInstance.ngOnInit();
                expect(gridElement.style.gap).toBe('8px');

                testComponent.xGap = 12;
                testComponent.yGap = 16;
                fixture.detectChanges();
                gridInstance.ngOnInit();
                expect(gridElement.style.gap).toBe('16px 12px');
            });

            it('should support responsive setting grid gap', fakeAsync(() => {
                testComponent.responsive = 'screen';
                testComponent.gap = '2 s:4 m:8 l:12 xl:16 2xl:20';
                fixture.detectChanges();
                gridInstance.ngOnInit();

                assertResponsiveGap(500, 2);
                assertResponsiveGap(700, 4);
                assertResponsiveGap(1200, 8);
                assertResponsiveGap(1280, 12);
                assertResponsiveGap(1600, 16);
                assertResponsiveGap(1920, 20);

                testComponent.gap = '3 xxl:18';
                fixture.detectChanges();
                gridInstance.ngOnInit();
                assertResponsiveGap(1920, 18);
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
                expect(gridItemElement.style.gridColumn).toBe('span 1 / auto');
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
                expect(gridItemElement.style.gridColumn).toBe('span 2 / auto');
            });

            it('should support thySpan is a responsive string', fakeAsync(() => {
                testComponent.cols = 5;
                testComponent.responsive = 'screen';
                testComponent.itemResponsive = true;
                testComponent.span = '0 s:2 m:3 l:4 xl:5 xxl:6';
                fixture.detectChanges();
                gridInstance.ngOnInit();
                gridInstance.ngAfterContentInit();

                const gridItem = gridDebugElement.queryAll(By.directive(ThyGridItemComponent))[0];
                const gridItemElement = gridItem.nativeElement;
                assertResponsiveSpan(500, 0);
                assertResponsiveSpan(700, 2);
                assertResponsiveSpan(1200, 3);
                assertResponsiveSpan(1280, 4);
                assertResponsiveSpan(1600, 5);
                assertResponsiveSpan(1920, 5);

                testComponent.span = '2xl:5';
                fixture.detectChanges();
                gridInstance.ngOnInit();
                gridInstance.ngAfterContentInit();
                assertResponsiveSpan(800, 1);
                assertResponsiveSpan(1920, 5);

                function assertResponsiveSpan(width: number, span: number) {
                    resizeWindow(width);

                    if (!span) {
                        expect(gridItemElement.style.display).toBe('none');
                    } else {
                        expect(gridItemElement.style.gridColumn).toBe(`span ${span} / auto`);
                    }
                }
            }));
        });

        describe('thyOffset', () => {
            it('should support default thyOffset', () => {
                const gridItem = gridDebugElement.queryAll(By.directive(ThyGridItemComponent))[0];
                const gridItemElement = gridItem.nativeElement;
                expect(gridItemElement.style.gridColumn).toBe('span 1 / auto');
                expect(gridItemElement.style.marginLeft).toBe('');
            });

            it('should support thyOffset is a number', () => {
                const gridItem = gridDebugElement.queryAll(By.directive(ThyGridItemComponent))[1];
                const gridItemElement = gridItem.nativeElement;

                testComponent.offset2 = 1;
                fixture.detectChanges();
                gridInstance.ngAfterContentInit();
                expect(gridItemElement.style.gridColumn).toBe('span 2 / auto');
                expect(gridItemElement.style.marginLeft).toBe('calc(((100% - 0px) / 2 + 0px) * 1)');

                testComponent.offset2 = 2;
                fixture.detectChanges();
                gridInstance.ngAfterContentInit();
                expect(gridItemElement.style.gridColumn).toBe('span 3 / auto');
                expect(gridItemElement.style.marginLeft).toBe('calc(((100% - 0px) / 3 + 0px) * 2)');

                testComponent.span2 = 2;
                testComponent.gap = 8;
                fixture.detectChanges();
                gridInstance.ngOnInit();
                gridInstance.ngAfterContentInit();
                expect(gridItemElement.style.gridColumn).toBe('span 4 / auto');
                expect(gridItemElement.style.marginLeft).toBe('calc(((100% - 24px) / 4 + 8px) * 2)');
            });

            it('should support thyOffset is a string', () => {
                const gridItem = gridDebugElement.queryAll(By.directive(ThyGridItemComponent))[0];
                const gridItemElement = gridItem.nativeElement;

                testComponent.offset = '2';
                fixture.detectChanges();
                gridInstance.ngAfterContentInit();
                expect(gridItemElement.style.gridColumn).toBe('span 3 / auto');
                expect(gridItemElement.style.marginLeft).toBe('calc(((100% - 0px) / 3 + 0px) * 2)');
            });

            it('should support thyOffset is a responsive string', fakeAsync(() => {
                testComponent.cols = 5;
                testComponent.responsive = 'screen';
                testComponent.itemResponsive = true;
                testComponent.offset = '3 m:2 l:1';
                fixture.detectChanges();
                gridInstance.ngOnInit();
                gridInstance.ngAfterContentInit();

                const gridItem = gridDebugElement.queryAll(By.directive(ThyGridItemComponent))[0];
                const gridItemElement = gridItem.nativeElement;
                assertResponsiveOffset(500, 3);
                assertResponsiveOffset(1024, 2);
                assertResponsiveOffset(1600, 1);

                function assertResponsiveOffset(width: number, offset: number) {
                    resizeWindow(width);

                    const span = gridItem.componentInstance.span;
                    const xGap = fixture.debugElement.query(By.directive(ThyGridComponent)).componentInstance.xGap;
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
    });

    describe('collapse', () => {
        let fixture: ComponentFixture<TestGridCollapseComponent>;
        let gridDebugElement: DebugElement;
        let gridInstance: ThyGridComponent;
        let testComponent: TestGridCollapseComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestGridCollapseComponent],
                imports: [ThyGridModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestGridCollapseComponent);
            testComponent = fixture.debugElement.componentInstance;
            gridDebugElement = fixture.debugElement.query(By.directive(ThyGridComponent));
            gridInstance = gridDebugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should not be collapsed default', () => {
            const gridItems = fixture.debugElement.queryAll(By.directive(ThyGridItemComponent));
            gridItems.forEach(item => {
                expect(item.nativeElement.style.display).not.toBe('none');
            });
        });

        it('should display one row by default when collapsed.', () => {
            testComponent.isCollapsed = true;
            fixture.detectChanges();
            const gridItems = fixture.debugElement.queryAll(By.directive(ThyGridItemComponent));
            gridItems.forEach((item, index) => {
                if (index > 4) {
                    expect(item.nativeElement.style.display).toBe('none');
                } else {
                    expect(item.nativeElement.style.display).not.toBe('none');
                }
            });
        });

        it('should thyCollapsedRows work', () => {
            testComponent.isCollapsed = true;
            testComponent.collapsedRows = 2;
            fixture.detectChanges();

            const gridItems = fixture.debugElement.queryAll(By.directive(ThyGridItemComponent));
            gridItems.forEach(item => {
                expect(item.nativeElement.style.display).not.toBe('none');
            });
        });

        it('should thySuffix work', () => {
            testComponent.showSuffix = true;
            testComponent.gridItemCount = 5;
            fixture.detectChanges();
            gridInstance.ngAfterContentInit();

            const lastItem = gridInstance.gridItems.last;
            expect(lastItem.thySuffix).toBe(true);
            expect(lastItem.elementRef.nativeElement.style.gridColumn).toBe('5 / span 1');
            expect(gridInstance.gridItems.get(4).elementRef.nativeElement.style.display).not.toBe('none');

            testComponent.isCollapsed = true;
            fixture.detectChanges();
            expect(gridInstance.gridItems.get(4).elementRef.nativeElement.style.display).toBe('none');
        });

        it('should be displayed on the next row when current row cannot display the next grid item', () => {
            testComponent.isCollapsed = true;
            testComponent.gridItemCount = 3;
            testComponent.showThreeSpanItem = true;
            fixture.detectChanges();
            gridInstance.ngAfterContentInit();

            const gridItems = fixture.debugElement.queryAll(By.directive(ThyGridItemComponent));
            expect(gridItems[3].nativeElement.style.display).toBe('none');
        });
    });

    describe('use css grid style value', () => {
        let fixture: ComponentFixture<TestGridUseStyleValueComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestGridUseStyleValueComponent],
                imports: [ThyGridModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestGridUseStyleValueComponent);
            fixture.detectChanges();
        });

        it('should set css grid style value successfully', () => {
            const gridItems = fixture.debugElement.queryAll(By.directive(ThyGridItemComponent));

            const item1 = gridItems[0].nativeElement;
            expect(item1.style.gridColumn).toBe('1 / auto');

            const item2 = gridItems[1].nativeElement;
            expect(item2.style.gridColumn).toBe('span 2 / auto');

            const item4 = gridItems[3].nativeElement;
            expect(item4.style.gridArea).toBe('span 2 / 5 / auto / span 2');

            const item5 = gridItems[4].nativeElement;
            expect(item5.style.gridColumn).toBe('1 / 2');

            const item6 = gridItems[5].nativeElement;
            expect(item6.style.gridColumn).toBe('span 3 / 5');
        });
    });
});
