import { log } from './../../core/logger/logger';
import { element } from 'protractor';
import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { NgModule, Component } from '@angular/core';
import { ThyPaginationModule } from '../pagination.module';
import { ThyPaginationComponent } from '../pagination.component';
import { By } from '@angular/platform-browser';
import { dispatchFakeEvent, dispatchMouseEvent } from '../../core/testing';

@Component({
    template: `
        <thy-pagination
            [(thyPageIndex)]="pagination.pageIndex"
            [thyPageSize]="pagination.pageSize"
            [thyTotal]="pagination.total"
            [thyShowQuickJumper]="canQuickJump"
            (thyPageIndexChange)="pageIndexChange($event)"
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

    pageIndexChange = jasmine.createSpy('pageIndexChange callback');
}

describe('ThyPagination', () => {
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
        let currentEle;
        beforeEach(() => {
            fixture = TestBed.createComponent(ThyPaginationExampleComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            paginationElement = fixture.debugElement.query(By.directive(ThyPaginationComponent)).nativeElement;
            currentEle = componentInstance.pagination;
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
            currentEle.pageIndex = 0;
            const nodes = Array.from(paginationElement.querySelectorAll('.thy-page-item')) as HTMLElement[];
            fixture.detectChanges();
            expect(nodes[0].classList).toContain('disabled');
        });

        it('should next btn disabled status', () => {
            currentEle.pageIndex = currentEle.total / currentEle.pageSize + 1;
            const nodes = Array.from(paginationElement.querySelectorAll('.thy-page-item')) as HTMLElement[];
            fixture.detectChanges();
            expect(nodes[nodes.length - 1].classList).toContain('disabled');
        });

        it('should btn click three page jumper three', () => {
            currentEle.pageIndex = 2;
            const nodes = Array.from(paginationElement.querySelectorAll('.thy-page-item')) as HTMLElement[];
            fixture.detectChanges();
            expect(nodes[1].classList).toContain('active');
        });

        it('should pre btn click can works', () => {
            currentEle.pageIndex = 2;
            fixture.detectChanges();
            expect(componentInstance.pageIndexChange).toHaveBeenCalledTimes(0);
            (paginationElement.querySelectorAll('.thy-page-item')[1] as HTMLElement).click();
            fixture.detectChanges();
            expect(componentInstance.pageIndexChange).toHaveBeenCalledTimes(1);
            expect(currentEle.pageIndex).toBe(1);
        });

        it('should next btn click can works', () => {
            const list = paginationElement.querySelectorAll('.thy-page-item');
            currentEle.pageIndex = 2;
            fixture.detectChanges();
            expect(componentInstance.pageIndexChange).toHaveBeenCalledTimes(0);
            (list[list.length - 1] as HTMLElement).click();
            fixture.detectChanges();
            expect(componentInstance.pageIndexChange).toHaveBeenCalledTimes(1);
            expect(currentEle.pageIndex).toBe(3);
        });

        it('should QuickJumper can works', fakeAsync(() => {
            const input = (paginationElement.querySelector('input').value = '4');
            function getPickerTriggerElement(): HTMLInputElement {
                return paginationElement.querySelector('button') as HTMLInputElement;
            }
            dispatchMouseEvent(getPickerTriggerElement(), 'click');
            tick(100);
            expect(currentEle.pageIndex).toEqual(4);
        }));
    });
});
