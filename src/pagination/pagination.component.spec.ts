import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, NgModule, DebugElement, TemplateRef, ViewChild } from '@angular/core';
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
    @ViewChild('total') totalTemplate: TemplateRef<any>;

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
});
