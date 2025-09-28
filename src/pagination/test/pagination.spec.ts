import { TestBed, ComponentFixture, tick, fakeAsync, flush } from '@angular/core/testing';
import { Component, ViewChild, TemplateRef, DebugElement } from '@angular/core';
import { ThyPaginationModule, ThyPagination } from 'ngx-tethys/pagination';
import { By } from '@angular/platform-browser';
import { ENTER } from 'ngx-tethys/util';
import { dispatchFakeEvent, dispatchKeyboardEvent } from 'ngx-tethys/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-test-pagination-basic',
    template: `
        <thy-pagination
            [thyPageIndex]="pagination.index"
            [thyTotal]="pagination.total"
            [thyPageSize]="pagination.size"
            [thyShowTotal]="showTotal"
            (thyPageChanged)="onPageChange($event)"
            (thyPageIndexChange)="onPageIndexChange($event)"></thy-pagination>
        <ng-template #total let-total>共{{ total }}条</ng-template>
    `,
    imports: [ThyPaginationModule]
})
class PaginationBasicComponent {
    pagination = {
        index: 1,
        size: 10,
        total: 50
    };

    showTotal: boolean | TemplateRef<{ $implicit: number; range: { from: number; to: number } }> = false;
    @ViewChild('total', { static: true }) totalTemplate: TemplateRef<any>;

    constructor() {}

    onPageChange() {
        return 'onPageChange is ok';
    }

    onPageIndexChange() {
        return 'onPageChange is ok';
    }
}

@Component({
    template: `
        <thy-pagination
            [(thyPageIndex)]="pagination.pageIndex"
            [thyPageSize]="pagination.pageSize"
            [thyTotal]="pagination.total"
            [thyShowQuickJumper]="canQuickJump"
            (thyPageIndexChange)="pageIndexChange($event)"
            [thyShowSizeChanger]="showSizeChanger"
            [thyUnit]="unit"
            [thySize]="size"
            [thyPageSizeOptions]="pageSizeOptions"
            (thyPageSizeChanged)="pageSizeChanged($event)"></thy-pagination>
    `,
    imports: [ThyPaginationModule]
})
class PaginationTestComponent {
    pageSizeOptions = [10, 20, 50, 100];

    pagination = {
        pageIndex: 1,
        pageSize: 20,
        total: 100
    };

    canQuickJump = true;

    showSizeChanger = false;

    size = '';

    unit = '';

    pageIndexChange = jasmine.createSpy('pageIndexChange callback');

    pageSizeChanged(size: number) {
        console.log('===>size', size);
    }
}

describe('ThyPagination', () => {
    @Component({
        template: `
            <thy-pagination
                [(thyPageIndex)]="currentIndex"
                [thyCustomPages]="pages"
                [thyShowQuickJumper]="false"
                (thyPageIndexChange)="pageIndexChange($event)"></thy-pagination>
        `,
        imports: [ThyPaginationModule]
    })
    class PaginationCustomPagesComponent {
        currentIndex = 1;

        pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        pageIndexChange() {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideNoopAnimations()]
        });
        TestBed.compileComponents();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<PaginationTestComponent>;
        let componentInstance: PaginationTestComponent;
        let paginationDebugElement: DebugElement;
        let paginationElement: HTMLElement;
        let pagination: { pageIndex: number; pageSize: number; total: number };

        beforeEach(() => {
            fixture = TestBed.createComponent(PaginationTestComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            paginationDebugElement = fixture.debugElement.query(By.directive(ThyPagination));
            paginationElement = paginationDebugElement.nativeElement;
            pagination = componentInstance.pagination;
        });

        it('should base element toBeTruthy', () => {
            expect(paginationElement).toBeTruthy();
        });

        it('should pagination has next and pre btn', () => {
            const pre = paginationElement.querySelector('.page-link-pre');
            expect(pre).toBeTruthy();
            const next = paginationElement.querySelector('.thy-page-link-next');
            expect(next).toBeTruthy();
        });

        it('should pre btn disabled status', () => {
            pagination.pageIndex = 0;
            const nodes = Array.from(paginationElement.querySelectorAll('.thy-page-item')) as HTMLElement[];
            fixture.detectChanges();
            expect(nodes[0].classList).toContain('disabled');
        });

        it('should next btn disabled status', () => {
            pagination.pageIndex = pagination.total / pagination.pageSize + 1;
            const nodes = Array.from(paginationElement.querySelectorAll('.thy-page-item')) as HTMLElement[];
            fixture.detectChanges();
            expect(nodes[nodes.length - 1].classList).toContain('disabled');
        });

        it('should btn click three page jumper three', () => {
            pagination.pageIndex = 2;
            fixture.detectChanges();
            const nodes = Array.from(paginationElement.querySelectorAll('.thy-page-item.thy-page-number')) as HTMLElement[];
            expect(nodes[1].classList).toContain('active');
        });

        it('should pre btn click can works', () => {
            pagination.pageIndex = 2;
            fixture.detectChanges();
            expect(componentInstance.pageIndexChange).toHaveBeenCalledTimes(0);
            (paginationElement.querySelectorAll('.thy-page-item')[1] as HTMLElement).click();
            fixture.detectChanges();
            expect(componentInstance.pageIndexChange).toHaveBeenCalledTimes(1);
            expect(pagination.pageIndex).toBe(1);
        });

        it('should next btn click can works', () => {
            const list = paginationElement.querySelectorAll('.thy-page-item');
            pagination.pageIndex = 2;
            fixture.detectChanges();
            expect(componentInstance.pageIndexChange).toHaveBeenCalledTimes(0);
            (list[list.length - 1] as HTMLElement).click();
            fixture.detectChanges();
            expect(componentInstance.pageIndexChange).toHaveBeenCalledTimes(1);
            expect(pagination.pageIndex).toBe(3);
        });

        it('should QuickJumper can works', fakeAsync(() => {
            const inputElement = paginationElement.querySelector('input');
            inputElement.value = '4';
            dispatchKeyboardEvent(inputElement, 'keydown', ENTER);
            expect(pagination.pageIndex).toEqual(4);
            expect(inputElement.value).toEqual('');

            inputElement.value = '3';
            dispatchFakeEvent(inputElement, 'blur');
            fixture.detectChanges();
            expect(pagination.pageIndex).toEqual(3);
            expect(inputElement.value).toEqual('');
        }));

        it('should unit can works', fakeAsync(() => {
            componentInstance.showSizeChanger = true;
            componentInstance.pagination.pageSize = 50;
            fixture.detectChanges();
            expect(paginationElement.querySelectorAll('.thy-pagination-size').length).toEqual(1);

            (paginationElement.querySelectorAll('.form-control-custom')[0] as HTMLElement).click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            const el = document.querySelector('.thy-select-dropdown-options') as HTMLElement;
            expect(el.querySelectorAll('.thy-option-item')[0]?.querySelectorAll('.text-truncate')[0]?.innerHTML).toEqual('10 条/页');
        }));

        it('should support set unit', fakeAsync(() => {
            componentInstance.showSizeChanger = true;
            componentInstance.pagination.pageSize = 50;
            fixture.detectChanges();
            expect(paginationElement.querySelectorAll('.thy-pagination-size').length).toEqual(1);

            componentInstance.unit = '组';
            fixture.detectChanges();

            (paginationElement.querySelectorAll('.form-control-custom')[0] as HTMLElement).click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            const option = document.querySelector('.thy-select-dropdown-options') as HTMLElement;
            expect(option.querySelectorAll('.thy-option-item')[0]?.querySelectorAll('.text-truncate')[0]?.innerHTML).toEqual('10 组/页');
        }));
    });

    describe('total', () => {
        let basicTestComponent: PaginationBasicComponent;
        let fixture: ComponentFixture<PaginationBasicComponent>;
        let pageComponent: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(PaginationBasicComponent);
            basicTestComponent = fixture.debugElement.componentInstance;
            pageComponent = fixture.debugElement.query(By.directive(ThyPagination));
        });

        it('should create', () => {
            expect(pageComponent).toBeTruthy();
        });

        it('should have total when showTotal is true', () => {
            basicTestComponent.showTotal = true;
            fixture.detectChanges();
            const paginationLeft = pageComponent.nativeElement.querySelector('div.thy-pagination-total');
            const paginationLeftContent = paginationLeft.querySelectorAll('div');
            expect(paginationLeft).toBeTruthy();
            expect(paginationLeftContent.length).toBe(2);
        });

        it('should have hide total when showTotal is true and without total', () => {
            basicTestComponent.showTotal = true;
            basicTestComponent.pagination.total = 0;
            fixture.detectChanges();
            const paginationLeft = pageComponent.nativeElement.querySelector('div.thy-pagination-total');
            const paginationLeftContent = paginationLeft.querySelectorAll('div');
            expect(paginationLeft).toBeTruthy();
            expect(paginationLeft.children.nativeElement).toBeFalsy();
            expect(paginationLeftContent.length).toBe(0);
            expect(paginationLeftContent.nativeElement).toBeFalsy();
        });

        it('should hide total when total is change', () => {
            basicTestComponent.showTotal = true;
            basicTestComponent.pagination.total = 200;
            fixture.detectChanges();
            const paginationLeft = pageComponent.nativeElement.querySelector('div.thy-pagination-total');
            const paginationLeftContent = paginationLeft.querySelectorAll('div');
            expect(paginationLeft).toBeTruthy();
            expect(paginationLeftContent.length).toBe(2);

            fixture.detectChanges();
            basicTestComponent.pagination.total = 0;
            expect(paginationLeft).toBeTruthy();
            expect(paginationLeft.children.nativeElement).toBeFalsy();
        });

        it('should have total when showTotal is template', () => {
            basicTestComponent.showTotal = basicTestComponent.totalTemplate;
            fixture.detectChanges();
            const paginationLeft = pageComponent.nativeElement.querySelector('div.thy-pagination-total');
            expect(paginationLeft).toBeTruthy();
        });

        it('should pagination total and show ellipsis', () => {
            basicTestComponent.pagination.total = 1000;
            basicTestComponent.pagination.index = 6;
            fixture.detectChanges();
            const list = pageComponent.nativeElement.querySelector('.thy-pagination-pages').children;
            expect((list[2].querySelector('.thy-page-link') as HTMLElement).innerText).toEqual('···');
            expect((list[list.length - 3].querySelector('.thy-page-link') as HTMLElement).innerText).toEqual('···');
            expect(list.length).toEqual(11);

            basicTestComponent.pagination.index = 4;
            fixture.detectChanges();
            expect(list.length).toEqual(10);

            basicTestComponent.pagination.index = 3;
            fixture.detectChanges();
            expect(list.length).toEqual(9);
        });

        it('should show range change after thyPageIndex set different', () => {
            const pageSize = 20;

            basicTestComponent.showTotal = true;
            basicTestComponent.pagination = {
                index: 1,
                size: pageSize,
                total: 100
            };
            fixture.detectChanges();
            const paginationLeft = pageComponent.nativeElement.querySelector('div.thy-pagination-total');
            const rangeEle = paginationLeft.querySelector('.number');
            let testValue = (rangeEle as HTMLElement).innerText.trim();
            let expectValue =
                (basicTestComponent.pagination.index - 1) * pageSize + 1 + '-' + basicTestComponent.pagination.index * pageSize;
            expect(testValue).toEqual(expectValue);

            basicTestComponent.pagination.index = 3;
            fixture.detectChanges();
            testValue = (rangeEle as HTMLElement).innerText.trim();
            expectValue = (basicTestComponent.pagination.index - 1) * pageSize + 1 + '-' + basicTestComponent.pagination.index * pageSize;
            expect(testValue).toEqual(expectValue);
        });

        it('should show page total', () => {
            const pagination = {
                index: 1,
                size: 10,
                total: 50
            };
            basicTestComponent.pagination = pagination;
            fixture.detectChanges();
            const list = pageComponent.nativeElement.querySelector('.thy-pagination-pages').children;
            const pageLength = pagination.total / pagination.size;
            expect((list[list.length - 2].querySelector('.thy-page-link') as HTMLElement).innerHTML).toEqual(pageLength.toString());
        });

        it('should to range less than total', () => {
            const pageSize = 20;

            basicTestComponent.showTotal = true;
            basicTestComponent.pagination = {
                index: 1,
                size: pageSize,
                total: 15
            };
            fixture.detectChanges();
            expect(pageComponent.componentInstance.computedRange()).toEqual({
                from: 1,
                to: 15
            });
        });

        it('should update range when total is changed', () => {
            const pageSize = 20;

            basicTestComponent.showTotal = true;
            basicTestComponent.pagination = {
                index: 1,
                size: pageSize,
                total: 15
            };
            fixture.detectChanges();
            expect(pageComponent.componentInstance.computedRange()).toEqual({
                from: 1,
                to: 15
            });
            basicTestComponent.pagination.total = 30;
            fixture.detectChanges();
            expect(pageComponent.componentInstance.computedRange()).toEqual({
                from: 1,
                to: 20
            });
        });

        it('should recalculate page index when total is changed', () => {
            const pageSize = 20;

            basicTestComponent.showTotal = true;
            basicTestComponent.pagination = {
                index: 2,
                size: pageSize,
                total: 30
            };
            fixture.detectChanges();
            expect(pageComponent.componentInstance.currentPageIndex()).toEqual(2);
            expect(pageComponent.componentInstance.computedRange()).toEqual({
                from: 21,
                to: 30
            });
            basicTestComponent.pagination.total = 19;
            fixture.detectChanges();
            expect(pageComponent.componentInstance.currentPageIndex()).toEqual(1);
            expect(pageComponent.componentInstance.computedRange()).toEqual({
                from: 1,
                to: 19
            });
        });

        it('should active thy-page-item when thyPageIndex set right', () => {
            basicTestComponent.pagination.index = 2;
            fixture.detectChanges();
            const paginationContent = pageComponent.nativeElement.querySelector('div.thy-pagination-content');
            let pageIndexEle = paginationContent.querySelector('.thy-page-item.active .thy-page-link');
            expect((pageIndexEle as HTMLElement).innerHTML).toEqual('2');

            basicTestComponent.pagination.index = 3;
            fixture.detectChanges();
            pageIndexEle = paginationContent.querySelector('.thy-page-item.active .thy-page-link');
            expect((pageIndexEle as HTMLElement).innerHTML).toEqual('3');

            basicTestComponent.pagination.index = 4;
            fixture.detectChanges();
            pageIndexEle = paginationContent.querySelector('.thy-page-item.active .thy-page-link');
            expect((pageIndexEle as HTMLElement).innerHTML).toEqual('4');
        });
    });

    describe('custom pages', () => {
        let fixture: ComponentFixture<PaginationCustomPagesComponent>;
        let componentInstance: PaginationCustomPagesComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(PaginationCustomPagesComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should display custom pages', () => {
            let elements = fixture.debugElement.queryAll(By.css('.thy-page-number'));
            componentInstance.pages.forEach((page, index) => {
                expect(elements[index].nativeElement.innerText).toContain(page.toString());
            });
            // update custom pages
            componentInstance.pages = [9, 10, 11, 12, 13];
            fixture.detectChanges();
            elements = fixture.debugElement.queryAll(By.css('.thy-page-number'));
            componentInstance.pages.forEach((page, index) => {
                expect(elements[index].nativeElement.innerText).toContain(page.toString());
            });
        });

        it('should click last page is work', () => {
            const elements = fixture.debugElement.queryAll(By.css('.thy-page-number'));
            const lastPageElement = elements[componentInstance.pages.length - 1].nativeElement;
            const pageIndexChangeSpy = spyOn(componentInstance, 'pageIndexChange');
            pageIndexChangeSpy.and.callFake((page: number) => {
                expect(page).toEqual(componentInstance.pages[componentInstance.pages.length - 1]);
            });
            lastPageElement.click();
            expect(pageIndexChangeSpy).toHaveBeenCalled();
        });
    });

    describe('page sizes', () => {
        let fixture: ComponentFixture<PaginationTestComponent>;
        let componentInstance: PaginationTestComponent;
        let paginationElement: HTMLElement;
        beforeEach(() => {
            fixture = TestBed.createComponent(PaginationTestComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            paginationElement = fixture.debugElement.query(By.directive(ThyPagination)).nativeElement;
        });

        it('should showSizeChanger can works', fakeAsync(() => {
            componentInstance.showSizeChanger = false;
            fixture.detectChanges();
            expect(paginationElement.querySelectorAll('.thy-pagination-size').length).toEqual(0);
            fixture.detectChanges();
            componentInstance.showSizeChanger = true;
            fixture.detectChanges();
            expect(paginationElement.querySelectorAll('.thy-pagination-size').length).toEqual(1);
        }));

        it('should page size changed can works', fakeAsync(() => {
            componentInstance.showSizeChanger = true;
            componentInstance.pagination.pageSize = 50;
            fixture.detectChanges();
            tick(100);
            expect(
                paginationElement.querySelectorAll('.thy-pagination-size')[0].children[0].attributes['ng-reflect-model'].nodeValue
            ).toEqual('50');
        }));

        it('should set size when thySize changed', fakeAsync(() => {
            componentInstance.showSizeChanger = true;
            componentInstance.size = 'sm';
            fixture.detectChanges();
            expect(paginationElement.querySelector('.form-control').classList).toContain('form-control-sm');
        }));

        it('should pageSizeChanged can works', fakeAsync(() => {
            componentInstance.showSizeChanger = true;
            componentInstance.size = 'sm';
            fixture.detectChanges();

            const pageSizeChangedSpy = spyOn(componentInstance, 'pageSizeChanged');
            expect(pageSizeChangedSpy).toHaveBeenCalledTimes(0);

            (paginationElement.querySelectorAll('.form-control-custom')[0] as HTMLElement).click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            const el = document.querySelector('.thy-select-dropdown-options') as HTMLElement;
            (el.querySelectorAll('.thy-option-item')[3] as HTMLElement).click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            expect(pageSizeChangedSpy).toHaveBeenCalledTimes(1);
            expect(pageSizeChangedSpy).toHaveBeenCalledWith(componentInstance.pageSizeOptions[3]);
        }));
    });
});
