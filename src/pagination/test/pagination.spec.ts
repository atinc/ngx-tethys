import { element } from 'protractor';
import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { NgModule, Component } from '@angular/core';
import { ThyPaginationModule } from '../pagination.module';
import { ThyPaginationComponent } from '../pagination.component';
import { By } from '@angular/platform-browser';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';

@Component({
    template: `
        <thy-pagination
            [(thyPageIndex)]="pagination.pageIndex"
            [thyPageSize]="pagination.pageSize"
            [thyTotal]="pagination.total"
            [thyShowQuickJumper]="canQuickJump"
            (thyPageIndexChange)="pageIndexChange($event)"
            [thyShowSizeChanger]="showSizeChanger"
            [thyPageSizeOptions]="[10, 20, 50, 100]"
            (thyPageSizeChanged)="pageSizeChanged($event)"
        ></thy-pagination>
    `
})
class ThyPaginationExampleComponent {
    pagination = {
        pageIndex: 1,
        pageSize: 20,
        total: 100
    };

    canQuickJump = true;

    showSizeChanger = false;

    pageIndexChange = jasmine.createSpy('pageIndexChange callback');

    pageSizeChanged = jasmine.createSpy('pageSizeChange callback');
}

fdescribe('ThyPagination', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyPaginationModule],
            declarations: [ThyPaginationExampleComponent],
            providers: []
        });
        TestBed.compileComponents();
    });
    describe('basic', () => {
        let fixture: ComponentFixture<ThyPaginationExampleComponent>;
        let componentInstance: ThyPaginationExampleComponent;
        let paginationElement: HTMLElement;
        beforeEach(() => {
            fixture = TestBed.createComponent(ThyPaginationExampleComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            paginationElement = fixture.debugElement.query(By.directive(ThyPaginationComponent)).nativeElement;
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
            componentInstance.pagination.pageIndex = 0;
            const nodes = Array.from(paginationElement.querySelectorAll('.thy-page-item')) as HTMLElement[];
            fixture.detectChanges();
            expect(nodes[0].classList).toContain('disabled');
        });

        it('should next btn disabled status', () => {
            componentInstance.pagination.pageIndex = componentInstance.pagination.total / componentInstance.pagination.pageSize + 1;
            const nodes = Array.from(paginationElement.querySelectorAll('.thy-page-item')) as HTMLElement[];
            fixture.detectChanges();
            expect(nodes[nodes.length - 1].classList).toContain('disabled');
        });

        it('should btn click three page jumper three', () => {
            componentInstance.pagination.pageIndex = 2;
            const nodes = Array.from(paginationElement.querySelectorAll('.thy-page-item')) as HTMLElement[];
            fixture.detectChanges();
            expect(nodes[1].classList).toContain('active');
        });

        it('should pre btn click can works', () => {
            componentInstance.pagination.pageIndex = 2;
            fixture.detectChanges();
            expect(componentInstance.pageIndexChange).toHaveBeenCalledTimes(0);
            (paginationElement.querySelectorAll('.thy-page-item')[1] as HTMLElement).click();
            fixture.detectChanges();
            expect(componentInstance.pageIndexChange).toHaveBeenCalledTimes(1);
            expect(componentInstance.pagination.pageIndex).toBe(1);
        });

        it('should next btn click can works', () => {
            const list = paginationElement.querySelectorAll('.thy-page-item');
            componentInstance.pagination.pageIndex = 2;
            fixture.detectChanges();
            expect(componentInstance.pageIndexChange).toHaveBeenCalledTimes(0);
            (list[list.length - 1] as HTMLElement).click();
            fixture.detectChanges();
            expect(componentInstance.pageIndexChange).toHaveBeenCalledTimes(1);
            expect(componentInstance.pagination.pageIndex).toBe(3);
        });

        it('should QuickJumper can works', fakeAsync(() => {
            const input = (paginationElement.querySelector('input').value = '4');
            function getPickerTriggerElement(): HTMLInputElement {
                return paginationElement.querySelector('button') as HTMLInputElement;
            }
            dispatchMouseEvent(getPickerTriggerElement(), 'click');
            tick(100);
            expect(componentInstance.pagination.pageIndex).toEqual(4);
        }));

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
            expect(paginationElement.querySelectorAll('.thy-pagination-size')[0].children[0].attributes[0].value).toEqual('50');
        }));
    });
});
