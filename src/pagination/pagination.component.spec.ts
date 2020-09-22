import { log } from './../core/logger/logger';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, NgModule, DebugElement, TemplateRef, ViewChild, QueryList } from '@angular/core';
import { ThyPaginationComponent } from './pagination.component';
import { ThyPaginationModule } from './pagination.module';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'thy-test-pagination-basic',
    template: `
        <thy-pagination
            [thyPageIndex]="pagination.index"
            [thyTotal]="pagination.total"
            [thyPageSize]="pagination.size"
            [thyShowTotal]="showTotal"
            (thyPageChanged)="onPageChange($event)"
            (thyPageIndexChange)="onPageIndexChange($event)"
        ></thy-pagination>
        <ng-template #total let-total>共计{{ total }}条</ng-template>
    `
})
class ThyPaginationBasicComponent implements OnInit {
    pagination = {
        index: 1,
        size: 10,
        total: 50
    };

    showTotal: boolean | TemplateRef<{ $implicit: number; range: { from: number; to: number } }> = false;
    @ViewChild('total', { static: true }) totalTemplate: TemplateRef<any>;

    constructor() {}

    ngOnInit(): void {}

    onPageChange() {
        return 'onPageChange is ok';
    }

    onPageIndexChange() {
        return 'onPageChange is ok';
    }
}

@NgModule({
    imports: [ThyPaginationModule],
    declarations: [ThyPaginationBasicComponent],
    exports: [ThyPaginationBasicComponent]
})
export class ThyPaginationTestModule {}

describe('ThyPagination', () => {
    let basicTestComponent: ThyPaginationBasicComponent;
    let fixture: ComponentFixture<ThyPaginationBasicComponent>;
    let pageComponent: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyPaginationModule, ThyPaginationTestModule]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyPaginationBasicComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        pageComponent = fixture.debugElement.query(By.directive(ThyPaginationComponent));
    });

    it('should create', () => {
        expect(pageComponent).toBeTruthy();
    });

    it('should have total when showTotal is true', () => {
        basicTestComponent.showTotal = true;
        fixture.detectChanges();
        const paginationLeft = pageComponent.nativeElement.querySelector('div.thy-pagination-total');
        expect(paginationLeft).toBeTruthy();
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
        expect((list[2].querySelector('.thy-page-link') as HTMLElement).innerText).toEqual('...');
        expect((list[list.length - 3].querySelector('.thy-page-link') as HTMLElement).innerText).toEqual('...');
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
        let expectValue = (basicTestComponent.pagination.index - 1) * pageSize + 1 + '-' + basicTestComponent.pagination.index * pageSize;
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
